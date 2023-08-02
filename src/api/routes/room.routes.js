const express = require("express");
const { isAuth } = require("../../middlewares/isAuth");
const { RoomModel } = require("../../models/room.model");
const { RoomService } = require("../../services/room.service");
const router = express.Router();
const roomModel = new RoomModel();
const roomService = new RoomService(roomModel);
const {
    validateCreateRoom,
    validateRoomJoin,
} = require("../../utils/validations");

router.post("/create", isAuth, validateCreateRoom, roomService.create);
router.post("/join/:roomName", roomService.join);

exports.roomRouter = router;
