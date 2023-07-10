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
