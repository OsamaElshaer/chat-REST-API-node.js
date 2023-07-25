const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const CustomError = require("../utils/customError");
const { messageFormat } = require("../utils/messageFormat");
const { RoomModel } = require("../models/room.model");
const { ioObj } = require("../loaders/app");
const roomModel = new RoomModel();
const io = ioObj();

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
                next();
            }
            io.on("connection", async (socket) => {
                // when user join room
                await socket.emit(
                    "message",
                    messageFormat(
                        "BOT",
                        roomName,
                        `Welecome ${user.userId} to ${roomName} chat`
                    )
                );
                // make channel for room
                await socket.join(roomName);
                await roomModel.addParticipants(room._id, user.userId);
                // chat message
                await socket.on("message", (msg) => {
                    io.to(roomName).emit(
                        "message",
                        messageFormat(user.userId, roomName, msg)
                    );
                });
                // to tell other users that user join this room
                socket.broadcast
                    .to(roomName)
                    .emit(
                        "message",
                        messageFormat(
                            "BOT",
                            roomName,
                            `${user.userId} has join the chat`
                        )
                    );
            });
            res.status(200).json({
                msg: "bidirection communication istablish",
            });
        } catch (error) {
            next(error);
        }
    };
}

exports.RoomService = RoomService;
