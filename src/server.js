const { app } = require("./loaders/app");
const { port } = require("./config/env");
const { logger } = require("./utils/logger");

const server = app.listen(port, () => {
    logger.info("server on running", { port: port });
});

process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Promise Rejection:", { error: err });
    server.close((error) => {
        if (error) {
            logger.error(
                "Error occurred while closing the server:",
                error.message
            );
            process.exit(1);
        }
        console.log("Server gracefully shut down");
        process.exit(1);
    });
});
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err.message);
    server.close(() => {
        logger.error("Server shut down due to uncaught exception");
        process.exit(1);
    });
});
