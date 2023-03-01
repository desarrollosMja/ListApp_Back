require("dotenv").config()

const global = {
    PORT: process.env.PORT || 8080,
    CORS: process.env.CORS || "*",
    NODE_ENV: process.env.NODE_ENV,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}

const db = {
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
    DB_NAME: process.env.DB_NAME
}

const email = {
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}

module.exports = { global, db, email }