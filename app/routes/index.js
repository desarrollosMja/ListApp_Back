const users = require("../components/users")
const lists = require("../components/lists")

module.exports = app => {
    users(app)
    lists(app)
}