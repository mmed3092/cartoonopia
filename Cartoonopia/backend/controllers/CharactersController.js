const Characters = require("../models/Characters")
const Contributions = require("../models/Contributions")
const Users = require("../models/UserList")

const getAllCharacters = async (req, res) => {
  const characters = await Characters.find({ active: true })
  res.status(200).json(characters)
}

const getSingleCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Characters.findOne({ id: id })
  const contributions = await Contributions.findOne({
    "data.id": id,
    action: "AddCharacter",
    status: "Approved",
  })
  let created_by = "No user found"
  if (contributions) {
    const user = await Users.findOne({ _id: contributions.user_id._id })
    if (user) {
      created_by = `${user.firstname} ${user.lastname}`
    }
  }
  if (!character) {
    return res.status(404).json({ error: "Character not found" })
  } else {
    return res
      .status(200)
      .json({ ...character.toJSON(), created_by: created_by })
  }
}

module.exports = { getAllCharacters, getSingleCharacter }
