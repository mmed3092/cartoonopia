const mongoose = require("mongoose")
const { CharacterSchema } = require("./Characters.js")

const dataSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    active: { type: Boolean, required: false },
    name: { type: String, required: false },
    subtitle: { type: String, required: false },
    description: { type: String, required: false },
    image_url: { type: String, required: false },
    strength: { type: Number, required: false, min: 0, max: 100 },
    speed: { type: Number, required: false, min: 0, max: 100 },
    skill: { type: Number, required: false, min: 0, max: 100 },
    fear_factor: { type: Number, required: false, min: 0, max: 100 },
    power: { type: Number, required: false, min: 0, max: 100 },
    intelligence: { type: Number, required: false, min: 0, max: 100 },
    wealth: { type: Number, required: false, min: 0, max: 100 },
  },
  { _id: false }
)

const changesSchema = new mongoose.Schema(
  {
    user_id: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
    },
    reviewed_by: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
    },
    action: {
      type: String,
      required: true,
      enum: ["AddCharacter", "EditCharacter", "DeleteCharacter"],
    },
    date: { type: Date, default: new Date() },
    character_id: { type: String, required: true },
    old_data: { type: dataSchema, required: true },
    new_data: { type: dataSchema, required: true },
  },
  { versionKey: false }
)

const contributions = mongoose.model("changes", changesSchema, "changes")

module.exports = contributions
