const daoFactoryLists = require("../../../models/daoFactoryLists.js")

class ListsServices{
    async get(){
        try {
            return await daoFactoryLists.get()
        } catch (error) {
            res.json(error)
        }        
    }

    async getUserList(data){
        try {
            return await daoFactoryLists.getUserList(data)
        } catch (error) {
            res.json(error)
        }        
    }
    
    async create(data){ //Recibe un obj "data" con estructura {nickname,lists}
        try {
            const lists = await daoFactoryLists.get()
            for (const list of lists) {
                if (list.nickname == data.nickname){
                    list.lists.push(data.lists[0])
                    return await daoFactoryLists.updateLists({nickname: data.nickname, lists: list.lists})
                }
            }
            return await daoFactoryLists.create(data)
        } catch (error) {
            res.json(error)
        }        
    }

    async addListElement(data){ //Recibe un obj "data" con estructura {nickname,title,element}
        try {
            const users = await daoFactoryLists.get()
            for (const user of users) {
                if (user.nickname == data.nickname){
                    for (const list of user.lists) {
                        if (list.title == data.title){
                            list.elements.push(data.element)
                            return await daoFactoryLists.updateLists({nickname: data.nickname, lists: user.lists})
                        }
                    }
                }
            }
        } catch (error) {
            res.json(error)
        }        
    }

    async updateListElement(data){ //Recibe un obj "data" con estructura {nickname,title,element,oldElementName}
        try {
            const users = await daoFactoryLists.get()
            for (const user of users) {
                
                //Buscar las listas del usuario
                if (user.nickname == data.nickname){
                    for (const list of user.lists) {
                        
                        //Buscar la lista por título
                        if (list.title == data.title){
                            for (const element of list.title.elements) {
                                
                                //Buscar elemento por nombre
                                const comparisonName = oldElementName ? oldElementName : data.element.name
                                if (element.name == comparisonName){
                                    element.name = comparisonName
                                    element.done = data.element.done
                                    return await daoFactoryLists.updateLists({nickname: data.nickname, lists: user.lists})
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            res.json(error)
        }        
    }

    async deleteAllLists(data){ //Recibe un obj "data" con estructura {nickname}
        try {
            await daoFactoryLists.delete(data)
        } catch (error) {
            res.json(error)
        }        
    }

    async deleteList(data){ //Recibe un obj "data" con estructura {nickname,title}
        try {
            const users = await daoFactoryLists.get()
            for (const user of users) {
                if (user.nickname == data.nickname){
                    const listsFiltered = user.lists.filter(elem => elem.title != data.title)
                    return await daoFactoryLists.updateLists({nickname: data.nickname, lists: listsFiltered})
                }
            }
        } catch (error) {
            res.json(error)
        }        
    }

    async removeListElement(data){ //Recibe un obj "data" con estructura {nickname,title,position}
        try {
            const users = await daoFactoryLists.get()
            for (const user of users) {
                if (user.nickname == data.nickname){
                    for (const list of user.lists) {
                        if (list.title == data.title){
                            list.elements.splice(data.position, 1)
                            return await daoFactoryLists.updateLists({nickname: data.nickname, lists: user.lists})
                        }
                    }
                }
            }
        } catch (error) {
            res.json(error)
        }        
    }

    async saveLists(data){ //Recibe un obj "data" con estructura {nickname,lists}
        try {
            const users = await daoFactoryLists.get()
            for (const user of users) {
                //Buscar las listas del usuario y actualizarlas
                if (user.nickname == data.nickname){
                    return await daoFactoryLists.updateLists({nickname: data.nickname, lists: data.lists})
                }
            }
        } catch (error) {
            res.json(error)
        }        
    }
}

module.exports = new ListsServices()