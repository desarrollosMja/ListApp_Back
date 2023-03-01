const cloudMongo = require("./DAOS/cloud/mongo/crudLists.js")
const logger = require("../utils/loggers/winston")

class DaoFactoryLists{
    static client
    constructor(){
        if (DaoFactoryLists.client) return DaoFactoryLists.client
        DaoFactoryLists.client = cloudMongo
    }

    async get(){
        try {
            return await DaoFactoryLists.client.get()
        } catch (error) {
            logger.warn(`Get - ERROR: ${error}`)
        }
    }

    async getUserList(data){
        try {
            return await DaoFactoryLists.client.getUserList(data)
        } catch (error) {
            logger.warn(`Get - ERROR: ${error}`)
        }
    }

    async create(data){
        try {
            return await DaoFactoryLists.client.create(data)
        } catch (error) {
            logger.warn(`Create - ERROR: ${error}`)
        }
    }

    async updateLists(data){
        try {
            return await DaoFactoryLists.client.updateLists(data)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }


    async removeListElement(data){
        try {
            return await DaoFactoryLists.client.removeListElement(data)
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }
    }

    async delete(data){
        try {
            return await DaoFactoryLists.client.delete(data)
        } catch (error) {
            logger.warn(`Delete - ERROR: ${error}`)
        }
    }
}

module.exports = new DaoFactoryLists()