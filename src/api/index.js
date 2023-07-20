const { userRouter } = require("./routes/auth.routes");
const { roomRouter } = require("./routes/room.routes");
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/rooms", roomRouter);

module.exports.router = router;
