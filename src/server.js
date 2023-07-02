const { app } = require("./loaders/app");
const { port } = require("./config/env");
const { logger } = require("./utils/logger");
const { mongoConnect } = require("./loaders/database");

mongoConnect();

const server = app.listen(port, () => {
    logger.info("server on running", { port: port });
});
process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Promise Rejection:");
    server.close((error) => {
        if (error) {
            logger.error(
                "Error occurred while closing the server:",
                error.message
            );
            process.exit(1);
        }
        logger.info("Server gracefully shut down");
        process.exit(1);
    });
});
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:");
    server.close(() => {
        logger.error("Server shut down due to uncaught exception");
        process.exit(1);
    });
});
