const { getDb } = require("../loaders/database");

class RoomModel {
    // Create a new room
    async create(name, createdBy) {
        const room = {
            name,
            createdBy,
            createdAt: new Date(),
            participants: [],
        };

        const result = await getDb().collection("rooms").insertOne(room);
        return result.insertedId;
    }

    // Get a room by its ID
    find = async (key, value) => {
        const query = { [key]: value }; // Dynamically use key parameter as the key name
        const room = await getDb().collection("rooms").findOne(query);
        return room;
    };
}

module.exports.RoomModel = RoomModel;
