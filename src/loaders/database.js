const { MongoClient } = require("mongodb");
const { logger } = require("../utils/logger");

const url = "mongodb://localhost:27017";
let _db;

const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect(url, {
            socketTimeoutMS: 1000,
        });
        _db = client.db("chatty");
        logger.info("Connected to MongoDB successfully");
    } catch (error) {
        logger.error("Failed to connect to the database:", error.message);
        throw new Error("Failed to connect to the database");
    }
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error("No database connection");
};

module.exports = { mongoConnect, getDb };
