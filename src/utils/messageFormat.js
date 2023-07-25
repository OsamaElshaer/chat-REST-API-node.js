const moment = require("moment");
const { Message } = require("../models/message.model");

exports.messageFormat = (userId, roomId, text) => {
    const time = moment().format("h:mm a");
    const message = new Message(userId, roomId, text, time);
    message.save();
    return {
        userId,
        roomId,
        text,
        time: time,
    };
};
