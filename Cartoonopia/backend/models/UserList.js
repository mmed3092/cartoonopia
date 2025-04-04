const mongoose = require("mongoose")
const AdminListModel = require("./AdminList.js")

const userListSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const userListModel = mongoose.model("userlists", userListSchema, "userlist")

module.exports = userListModel
