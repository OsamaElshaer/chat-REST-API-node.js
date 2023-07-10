const { EventEmitter } = require("events");
const { logger } = require("./logger");
const emitter = new EventEmitter();

emitter.on("audit", (e) => {
    logger.info(JSON.stringify(e));
});

const audit = (model, action, by, date, method, statusCode) => {
    const auditData = {
        model,
        action,
        by,
        date,
        method,
        statusCode,
    };
    emitter.emit("audit", auditData);
};

module.exports = audit;
