// socket.js

const { messageFormat } = require("../utils/messageFormat");
// Socket connection handling function
const handleSocketConnection = (socket, io) => {
    const { roomName, userName } = socket.handshake.query;

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

module.exports = { handleSocketConnection };
