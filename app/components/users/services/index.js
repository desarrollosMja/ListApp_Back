const daoFactoryUsers = require("../../../models/daoFactoryUsers.js")
const { generateToken } = require("../../../utils/JWT")
let bcrypt = require("bcryptjs")

class UsersServices{
    async create(data){ //Recibe un obj data con formato {nickname,password}
        try {
            let { nickname, password } = data
            const passString = String(password)
            let hash = bcrypt.hashSync(passString, 8);
            let user_obj = {
                nickname: nickname,
                password: hash
            }
            return await daoFactoryUsers.create(user_obj)
        } catch (error) {
            return error
        }        
    }

    async login(data){ //Recibe un obj data con formato {nickname,password}
        try {
            const users = await daoFactoryUsers.get()
            const userByEmail = users.filter(elem => elem.nickname == data.nickname)
            return bcrypt.compareSync(String(data.password), userByEmail[0].password) 
        } catch (error) {
            return error
        }        
    }

    async updatePassword(data){ //Recibe un obj data con formato {nickname,password}
        try {
            let { nickname, password } = data
            const passString = String(password)
            let hash = bcrypt.hashSync(passString, 8);
            let user_obj = {
                nickname: nickname,
                password: hash
            }
            return await daoFactoryUsers.update(user_obj)
        } catch (error) {
            return error
        }        
    }

    async exists(data){ //Recibe un obj data con formato {nickname}
        try {
            return await daoFactoryUsers.exists(data.nickname)
        } catch (error) {
            return error
        }        
    }

    async verifyUser(data){ //Recibe un obj data con formato {nickname,password}
        try {
            
        } catch (error) {
            return error
        }        
    }
}

module.exports = new UsersServices()