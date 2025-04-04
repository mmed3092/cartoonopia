const mongoose = require("mongoose")

const AdminListSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

const AdminListModel = mongoose.model(
  "adminlists",
  AdminListSchema,
  "adminlist"
)

module.exports = AdminListModel
