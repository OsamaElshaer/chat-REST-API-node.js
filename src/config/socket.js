const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/env");
const { RoomModel } = require("../models/room.model");
const roomModel = new RoomModel();

const { messageFormat } = require("../utils/messageFormat");
// Socket connection handling function
const handleSocketConnection = (socket, io) => {
    const { roomName } = socket.handshake.query;
    const { userName } = socket.user;

    socket.join(roomName);

    // Send a welcome message to the user
    socket.emit(
        "message",
        messageFormat(
            "BOT",
            roomName,
            `Welcome ${userName} to ${roomName} chat`
        )
    );

    // Broadcast a message to all users in the room when a new user joins
    socket.broadcast
        .to(roomName)
        .emit(
            "message",
            messageFormat("BOT", roomName, `${userName} has joined the chat`)
        );

    // Chat message handling specific to this room
    socket.on("message", async (msg) => {
        io.to(roomName).emit("message", messageFormat(userName, roomName, msg));
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        io.to(roomName).emit(
            "message",
            messageFormat(
                "BOT",
                roomName,
                `${userName} has left the ${roomName} chat`
            )
        );
    });
};

const isAuthSocket = (socket, next) => {
    try {
        const { token } = socket.handshake.query;
        const user = jwt.verify(token, jwtSecretKey);
        socket.user = user; // Attach the user object to the socket
        next();
    } catch (error) {
        next(new Error(error.message)); // that error will be sent to the event listener connect_error
    }
};

const validateRoomName = async (socket, next) => {
    const { roomName } = socket.handshake.query;

    if (!roomName || roomName.trim() === "") {
        return next(new Error("Room name is required"));
    }

    // Check if the room exists in the database (you may need to change the model method accordingly)
    const room = await roomModel.find("name", roomName);
    if (!room) {
        return next(new Error("There is no room with this name"));
    }

    // Attach the room name to the socket object for later use
    socket.roomName = roomName;

    next();
};

module.exports = { isAuthSocket, handleSocketConnection, validateRoomName };
