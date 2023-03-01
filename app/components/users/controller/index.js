const usersServices = require("../services")
const { generateToken } = require("../../../utils/JWT")
const logger = require("../../../utils/loggers/winston")

class UsersController{
    async create(req,res,next){
        try {
            const exists = await usersServices.exists(req.body)
            if (exists.length > 0) return res.json({exists: true})
            
            const newInsertion = await usersServices.create(req.body)
            if (newInsertion == true) {
                const access_token = generateToken(req.body)
                return res.json({token: access_token, user: req.body.nickname})
            }
            res.json({insertion: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async login(req,res,next){
        try {
            const log = await usersServices.login(req.body)
            if (log == true) {
                const access_token = generateToken(req.body)
                return res.json({token: access_token, user: req.body.nickname})
            } 
            return res.json({user: "ERROR"})
        } catch (error) {
            res.json(error)
        }        
    }

    async updatePassword(req,res,next){
        try {
            const updateOperation = await usersServices.updatePassword(req.body)
            if (updateOperation == true) {
                return res.json({passwordChange: "OK"})
            } 
            res.json({passwordChange: "Fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async verifyUser(req,res,next){
        try {
            logger.debug(`Token verificado con éxito. Ruta: ${req.path}`)
            res.json({session: true, user: req.user.nickname})
        } catch (error) {
            res.json(error)
        }        
    }
}

module.exports = new UsersController()