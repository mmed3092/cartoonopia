const mongoose = require("mongoose")

//TODO: Define the schema for the Character model
const CharactersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
    min: [0, "Strength must be at least 0"],
    max: [100, "Strength cannot exceed 100"],
  },
  speed: {
    type: Number,
    required: true,
    min: [0, "Speed must be at least 0"],
    max: [100, "Speed cannot exceed 100"],
  },
  skill: {
    type: Number,
    required: true,
    min: [0, "Skill must be at least 0"],
    max: [100, "Skill cannot exceed 100"],
  },
  fear_factor: {
    type: Number,
    required: true,
    min: [0, "Fear factor must be at least 0"],
    max: [100, "Fear factor cannot exceed 100"],
  },
  power: {
    type: Number,
    required: true,
    min: [0, "Power must be at least 0"],
    max: [100, "Power cannot exceed 100"],
  },
  intelligence: {
    type: Number,
    required: true,
    min: [0, "Intelligence must be at least 0"],
    max: [100, "Intelligence cannot exceed 100"],
  },
  wealth: {
    type: Number,
    required: true,
    min: [0, "Wealth must be at least 0"],
    max: [100, "Wealth cannot exceed 100"],
  },
})

const CharactersModel = mongoose.model("Characters", CharactersSchema)

module.exports = CharactersModel
