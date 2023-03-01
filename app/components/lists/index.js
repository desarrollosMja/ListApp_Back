const Router = require("express").Router
const router = new Router()
const listsController = require("./controller")

module.exports = app => {
    app.use("/api/lists", router)

    //Rutas GET
    router.get("/", listsController.get)
    router.get("/get-user-lists", listsController.getUserList)

    //Rutas POST
    router.post("/new-list", listsController.create)

    //Rutas PUT
    router.put("/add-list-element", listsController.addListElement)
    router.put("/update-list", listsController.updateListElement)
    router.put("/delete-all-lists", listsController.deleteAllLists)
    router.put("/delete-list", listsController.deleteList)
    router.put("/remove-list-element", listsController.removeListElement)
    router.put("/save-lists", listsController.saveLists)
}