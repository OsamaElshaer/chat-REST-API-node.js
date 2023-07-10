const { userRouter } = require("./routes/user.routes");

const router = require("express").Router();

router.use("/users", userRouter);

module.exports.router = router;
