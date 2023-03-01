const listsServices = require("../services")

class ListsController{
    async get(req,res,next){
        try {
            const lists = await listsServices.get()
            res.json(lists)
        } catch (error) {
            res.json(error)
        }        
    }

    async getUserList(req,res,next){
        try {
            const lists = await listsServices.getUserList(req.query)
            res.send(lists)
        } catch (error) {
            res.json(error)
        }        
    }

    async create(req,res,next){
        try {
            const newInsertion = await listsServices.create(req.body)
            if (newInsertion == true) return res.json({insertion: "ok"})
            res.json({insertion: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async addListElement(req,res,next){
        try {
            const newInsertion = await listsServices.addListElement(req.body)
            if (newInsertion == true) {
                const userLists = await listsServices.getUserList({nickname: req.body.nickname})
                return res.json({insertion: "ok", userLists: userLists[0].lists})
            }
            res.json({insertion: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async updateListElement(req,res,next){
        try {
            const update = await listsServices.updateListElement(req.body)
            if (update == true) {
                const userLists = await listsServices.getUserList({nickname: req.body.nickname})
                return res.json({update: "ok", userLists: userLists[0].lists})
            }
            res.json({update: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async deleteAllLists(req,res,next){
        try {
            await listsServices.deleteAllLists(req.body)
        } catch (error) {
            res.json(error)
        }        
    }

    async deleteList(req,res,next){
        try {
            const listDeleted = await listsServices.deleteList(req.body)
            if (listDeleted == true) {
                const userLists = await listsServices.getUserList({nickname: req.body.nickname})
                return res.json({ListDeleted: "ok", userLists: userLists[0].lists})
            }
            res.json({ListDeleted: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async removeListElement(req,res,next){
        try {
            const elementRemoved = await listsServices.removeListElement(req.body)
            if (elementRemoved == true) return res.json({ElementRemoved: "ok"})
            res.json({ElementRemoved: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }

    async saveLists(req,res,next){
        try {
            const update = await listsServices.saveLists(req.body)
            if (update == true) return res.json({update: "ok"})
            res.json({update: "fail"})
        } catch (error) {
            res.json(error)
        }        
    }
}

module.exports = new ListsController()