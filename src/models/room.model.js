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
        const user = await getDb().collection("rooms").find(query);
        return user;
    };
}

module.exports.RoomModel = RoomModel;
