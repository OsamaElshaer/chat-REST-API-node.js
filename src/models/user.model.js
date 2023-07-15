const { getDb } = require("../loaders/database");

exports.createUser = async (userName, email, password) => {
    const user = {
        userName,
        email,
        password,
    };
    const db = await getDb();
    const result = await db.collection("users").insertOne(user);
    return result.insertedId;
};


exports.find = async (key, value) => {
    const query = { [key]: value }; // Dynamically use key parameter as the key name
    const user = await getDb().collection("users").findOne(query);
    return user;
};

exports.updateUser = async (userId, updatedUserData) => {
    const db = await getDb();
    const result = await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: updatedUserData });
    return result;
};
