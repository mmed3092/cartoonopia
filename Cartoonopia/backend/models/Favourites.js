const mongoose = require("mongoose")

const favouritesSchema = new mongoose.Schema({
  user_id: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  characters: { type: [String], required: true },
}, {versionKey: false})

const favourites = mongoose.model("favourites", favouritesSchema)

module.exports = favourites

