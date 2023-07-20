const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const CustomError = require("../utils/customError");

class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }

    create = (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError("create room", 422, errors.array()[0].msg);
            }
            const { roomName } = req.body;
            const userId = new ObjectId(req.user["userId"]);
            this.roomModel.create(roomName, userId);
            res.status(201).json({
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
}

exports.RoomService = RoomService;
