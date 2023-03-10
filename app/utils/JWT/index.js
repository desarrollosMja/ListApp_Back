const jwt = require("jsonwebtoken")
const { global } = require("../../config")
const logger = require("../loggers/winston")

function generateToken(user){
    const token = jwt.sign({data: user}, global.JWT_PRIVATE_KEY, {expiresIn: "30d"})
    logger.debug(`Token generado con éxito: ${token}`)
    return token
}

function auth(req,res,next){
    const authHeader = req.headers.authorization

    if (!authHeader){
        logger.warn("Sesión inexistente")
        return res.status(401).json({
            session: false
        })
    }

    jwt.verify(authHeader, global.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err){
            logger.warn("Token inválido")
            return res.status(401).json({
                session: false
            })
        }

        req.user = decoded.data
        next()
    })
}

module.exports = { generateToken, auth }