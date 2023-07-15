const { getDb } = require("../loaders/database");
const crypto = require("crypto");

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

exports.findByUserName = async (userName) => {
    const user = await getDb()
        .collection("users")
        .findOne({ userName: userName });
    return user;
};

exports.updateUser = async (userId, updatedUserData) => {
    const db = await getDb();
    const result = await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: updatedUserData });

    if (result.modifiedCount === 1) {
        return true;
    } else {
        throw new Error("User not found or update failed");
    }
};
