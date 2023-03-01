const Router = require("express").Router
const router = new Router()
const usersController = require("./controller")
const { auth } = require("../../utils/JWT")

module.exports = app => {
    app.use("/api/users", router)

    //Rutas GET
    router.get("/", (req,res) => res.send("OK USERS"))
    router.get("/verify-user", auth, usersController.verifyUser)

    //Rutas POST
    router.post("/newUser", usersController.create)
    router.post("/login", usersController.login)

    //Rutas PUT
    router.put("/change-password", usersController.updatePassword)
}