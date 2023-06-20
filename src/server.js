const { app } = require("./loaders/app");
const { port } = require("./config/env");

const server = app.listen(port);

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err.message);
    server.close((error) => {
        if (error) {
            console.error(
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
    console.error("Uncaught Exception:", err.message);
    server.close(() => {
        console.error("Server shut down due to uncaught exception");
        process.exit(1);
    });
});
