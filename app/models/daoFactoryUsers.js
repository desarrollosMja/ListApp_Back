const cloudMongo = require("./DAOS/cloud/mongo/crudUsers.js")
const logger = require("../utils/loggers/winston")

class DaoFactoryUsers{
    static client
    constructor(){
        if (DaoFactoryUsers.client) return DaoFactoryUsers.client
        DaoFactoryUsers.client = cloudMongo
    }

    async get(){
        try {
            return await DaoFactoryUsers.client.get()
        } catch (error) {
            logger.warn(`Get - ERROR: ${error}`)
        }
    }

    async create(data){
        try {
            return await DaoFactoryUsers.client.create(data)
        } catch (error) {
            logger.warn(`Create - ERROR: ${error}`)
        }
    }

    async update(data){
        try {
            return await DaoFactoryUsers.client.update(data)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }


    async delete(data){
        try {
            return await DaoFactoryUsers.client.delete(data)
        } catch (error) {
            logger.warn(`Delete - ERROR: ${error}`)
        }
    }

    async update(data){
        try {
            return await DaoFactoryUsers.client.update(data)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }

    async exists(nickname){
        try {
            return await DaoFactoryUsers.client.exists(nickname)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }

    async verifyUser(data){
        try {
            return await DaoFactoryUsers.client.verifyUser(data)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }
}

module.exports = new DaoFactoryUsers()