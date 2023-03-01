const logger = require("../../../../utils/loggers/winston")
const { client, dbName } = require("./index")
const db = client.db(dbName)
const col = db.collection("lists")

class CloudMongo{
    async startConnection(){
        try {
            await client.connect()
        } catch (error) {
            logger.warn(`CONNECTION - ERROR: ${error}`)
        }
    }

    async get(){
        try {
            await this.startConnection();
            return await col.find({}).toArray()
        } catch (error) {
            logger.warn(`Get - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async getUserList(data){
        try {
            await this.startConnection();
            return await col.find({nickname: data.nickname}).toArray()
        } catch (error) {
            logger.warn(`Get - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async create(data){
        try {
            await this.startConnection();
            return (await col.insertOne(data)).acknowledged
        } catch (error) {
            logger.warn(`Create - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async updateLists(data){ 
        try {
            await this.startConnection();
            return (await col.updateOne(
                {nickname: data.nickname}, 
                {$set: {
                    lists: data.lists
                }}
            )).acknowledged
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async removeListElement(data){ 
        try {
            await this.startConnection();
            return (await col.updateOne(
                {nickname: data.nickname}, 
                {$set: {
                    lists: data.lists
                }}
            )).acknowledged
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async delete(data){
        try {
            await this.startConnection();
            return (await col.deleteOne({nickname: data.nickname})).acknowledged
        } catch (error) {
            logger.warn(`Delete - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }
}

module.exports = new CloudMongo()
