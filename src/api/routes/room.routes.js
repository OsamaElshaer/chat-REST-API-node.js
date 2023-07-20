const express = require("express");
const { isAuth } = require("../../middlewares/isAuth");
const {RoomModel} = require("../../models/room.model");
const { RoomService } = require("../../services/room.service");
const router = express.Router();
const roomModel = new RoomModel();
const roomService = new RoomService(roomModel);
const { validateCreateRoom } = require("../../utils/validations");

router.post("/create", isAuth, validateCreateRoom, roomService.create);

exports.roomRouter = router;
