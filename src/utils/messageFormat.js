const moment = require("moment");
const { Message } = require("../models/message.model");

exports.messageFormat = (userIdentity, roomId, text) => {
    const time = moment().format("h:mm a");
    const message = new Message(userIdentity, roomId, text, time);
    message.save();
    return {
        userIdentity,
        roomId,
        text,
        time: time,
    };
};
