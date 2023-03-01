const { MongoClient } = require("mongodb");
const { db } = require("../../../../config")

const url = db.MONGO_ATLAS_URI;
const client = new MongoClient(url);
const dbName = db.DB_NAME;

module.exports = { client, dbName };