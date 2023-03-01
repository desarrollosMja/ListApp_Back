const logger = require("../../../../utils/loggers/winston")
const { client, dbName } = require("./index")
const db = client.db(dbName)
const col = db.collection("users")

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

    async update(data){
        try {
            await this.startConnection();
            return (await col.updateOne(
                {nickname: data.nickname},
                {$set: {
                    password: data.password
                }}
            )).acknowledged
        } catch (error) {
            logger.warn(`Update - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async delete(){
        try {
            await this.startConnection();
        } catch (error) {
            logger.warn(`Delete - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async exists(nickname){
        try {
            await this.startConnection();
            return await col.find({nickname: nickname}).toArray()
        } catch (error) {
            logger.warn(`Exists - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }

    async verifyUser(){
        try {
            await this.startConnection();
        } catch (error) {
            logger.warn(`Verify User - ERROR: ${error}`)
        }

        finally{
            await client.close()
        }
    }
}

module.exports = new CloudMongo()
