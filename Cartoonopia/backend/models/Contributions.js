const mongoose = require("mongoose")
const { CharacterSchema } = require("./Characters.js")

const dataSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    name: { type: String, required: false },
    active: { type: Boolean, required: false },
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

const contributionsSchema = new mongoose.Schema(
  {
    contribution_id: { type: String, required: true },
    user_id: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    action: {
      type: String,
      required: true,
      enum: ["AddCharacter", "EditCharacter", "DeleteCharacter"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Approved", "Pending", "Rejected"],
    },
    reviewed_by: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: false },
    },
    date: { type: String, required: true },
    data: { type: dataSchema, required: true },
  },
  { versionKey: false }
)

const contributions = mongoose.model("contributions", contributionsSchema)

module.exports = contributions
