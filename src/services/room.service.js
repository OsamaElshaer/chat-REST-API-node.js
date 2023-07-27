const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const CustomError = require("../utils/customError");
const { messageFormat } = require("../utils/messageFormat");

class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }

    create = (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError(
                    "create room",
                    422,
                    errors.array()[0].msg
                );
            }
            const { roomName } = req.body;
            const userId = new ObjectId(req.user["userId"]);
            this.roomModel.create(roomName, userId);
            return res.status(201).json({
                msg: `${roomName} has been created`,
                data: {
                    userId: userId,
                    roomName: roomName,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    join = async (req, res, next) => {
        try {
            const roomName = req.params.roomName;
            const user = req.user;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next();
            }

            const io = req.io; // Get the io instance from the req.app object

            // Join the user to the specific room
            io.on("connection", async (socket) => {
                socket.join(roomName);

                // Send a welcome message to the user
                socket.emit(
                    "message",
                    messageFormat(
                        "BOT",
                        roomName,
                        `Welcome ${user.userName} to ${roomName} chat`
                    )
                );

                // Broadcast a message to all users in the room when a new user joins
                socket.broadcast
                    .to(roomName)
                    .emit(
                        "message",
                        messageFormat(
                            "BOT",
                            roomName,
                            `${user.userName} has joined the chat`
                        )
                    );

                // Chat message handling specific to this room
                socket.on("message", async (msg) => {
                    io.to(roomName).emit(
                        "message",
                        messageFormat(user.userName, roomName, msg)
                    );
                });

                // Handle user disconnection
                socket.on("disconnect", () => {
                    io.to(roomName).emit(
                        "message",
                        messageFormat(
                            "BOT",
                            roomName,
                            `${user.userName} has left the ${roomName} chat`
                        )
                    );
                });
            });

            res.status(200).json({
                msg: "bidirectional communication established",
            });
        } catch (error) {
            next(error);
        }
    };
}

exports.RoomService = RoomService;
