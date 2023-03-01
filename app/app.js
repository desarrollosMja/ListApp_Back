const express = require("express")
const cors = require("cors")
const cluster = require("cluster")
const cpus = require("os").cpus().length
const path = require("path")
const logger = require("./utils/loggers/winston")
const { global } = require("./config")
const serverRoutes = require("./routes")

class App{
    constructor(){
        this.app = express()
        this.PORT = global.PORT
        this.middlewares()
        this.listen()
        serverRoutes(this.app)
    }

    middlewares(){
        this.app.use(express.static(path.join(__dirname, "/public")))
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(cors(global.CORS))
    }

    listen(){
        if (cluster.isMaster){
            logger.silly(`Master server on PORT ${global.PORT} with PID ${process.pid} - Working in ${global.NODE_ENV} mode.`)
            for (let i = 0; i < cpus; i++) {
                cluster.fork()
            }
            cluster.on("exit", (worker, code, signal) => {
                logger.silly(`Worker ${worker.process.pid} died!`)
                cluster.fork()
            })
        } else {
            this.app.listen(global.PORT, () => logger.silly(`Worker on http://localhost:${global.PORT} - Worker PID: ${process.pid}`))
        }
    }
}

new App()
