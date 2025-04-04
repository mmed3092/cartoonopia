const AdminList = require("../models/AdminList")
const UserList = require("../models/UserList")
const Contribution = require("../models/Contributions")
const Characters = require("../models/Characters")
const Changes = require("../models/Changes")

const getAllContributions = async (req, res) => {
  const contributions = await Contribution.find({ status: "Pending" })
  const result = []
  for (const con of contributions) {
    const [user, reviewed_by] = await Promise.all([
      UserList.findById(con.user_id._id),
      UserList.findById(con.reviewed_by._id),
    ])
    const userUsername = user
      ? `${user.firstname} ${user.lastname}`
      : "User not found"
    const reviewerUsername = reviewed_by
      ? `${reviewed_by.firstname} ${reviewed_by.lastname}`
      : "Review Pending"
    result.push({
      ...con.toJSON(),
      user_id: userUsername,
      reviewed_by: reviewerUsername,
    })
  }

  return res.status(200).json(result)
}

const getAllChanges = async (req, res) => {
  const changes = await Changes.find()

  const result = changes.map((change) => {
    return {
      ...change.toJSON(),
      user_id: change.user_id.username,
      reviewed_by: change.reviewed_by.username,
    }
  })
  return res.status(200).json(result)
}

const approveContribution = async (req, res) => {
  const { id } = req.params
  const approver = req.user
  const con = await Contribution.findOne({ contribution_id: id })

  if (!con) {
    return res.status(404).json({ error: "Contribution not found" })
  }

  if (con.status === "Approved") {
    return res.status(400).json({ error: "Contribution already approved" })
  }

  let old_data = {}
  let char = null

  if (con.action === "EditCharacter" || con.action === "DeleteCharacter") {
    char = await Characters.findOne({ id: con.data.id })

    if (!char) {
      return res.status(404).json({ error: "Character not found" })
    }
  }

  if (con.action === "AddCharacter") {
    const newCharacterId = con.data.name.toLowerCase().split(" ")[0]
    const existingChar = await Characters.findOne({ id: newCharacterId })
    if (existingChar) {
      return res
        .status(400)
        .json({ error: "Character with that name already exists" })
    }
    try {
      char = await Characters.create({
        ...con.data.toJSON(),
        id: newCharacterId,
        active: true,
      })
      char.save()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  old_data = Object.keys(con.data.toJSON()).reduce((acc, key) => {
    if (key === "id") return acc
    acc[key] = char[key]
    return acc
  }, {})

  let new_data = Object.keys(con.data.toJSON()).reduce((acc, key) => {
    if (key === "id") return acc
    acc[key] = con.data[key]
    return acc
  }, {})

  if (con.action === "DeleteCharacter") {
    if (!char.active) {
      return res.status(400).json({ error: "Character already deleted" })
    }
    char.active = false
    old_data = { active: true }
    new_data = { active: false }
    char.save()
  }

  const user = await UserList.findById(con.user_id)
  const reviewerUsername = `${approver.firstname} ${approver.lastname}`
  const userUsername = `${user.firstname} ${user.lastname}`

  const change = await Changes.create({
    action: con.action,
    reviewed_by: { _id: approver._id, username: reviewerUsername },
    user_id: { _id: con.user_id._id, username: userUsername },
    character_id: char.id,
    old_data: old_data,
    new_data: new_data,
  })

  await Characters.updateOne({ id: con.data.id }, { $set: con.data })

  con.reviewed_by = { _id: approver._id }
  con.status = "Approved"
  await change.save()
  await con.save()
  return res.status(200).json(change)
}

const rejectContribution = async (req, res) => {
  const { id } = req.params
  const approver = req.user
  const con = await Contribution.findOne({ contribution_id: id })
  if (!con) {
    return res.status(404).json({ error: "Contribution not found" })
  }

  if (con.status === "Approved") {
    return res.status(400).json({ error: "Contribution already approved" })
  }

  if (con.status === "Rejected") {
    return res.status(400).json({ error: "Contribution already rejected" })
  }

  con.reviewed_by = { _id: approver._id }
  con.status = "Rejected"
  await con.save()
  return res.status(200).json({ message: "Contribution rejected" })
}

const promoteUser = async (req, res) => {
  const { id } = req.params
  const requester = req.user
  const user = await UserList.findById(id)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  if (user._id === requester._id) {
    return res.status(400).json({ error: "Cannot promote yourself" })
  }

  const isAlreadyAdmin = await AdminList.findById(user._id)
  if (isAlreadyAdmin) {
    return res.status(400).json({ error: "User is already an admin" })
  }

  const admin = await AdminList.create({ _id: user._id })
  return res.status(200).json(admin)
}

const demoteUser = async (req, res) => {
  const { id } = req.params
  const requester = req.user
  const user = await AdminList.findById(id)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  if (user._id === requester._id) {
    return res.status(400).json({ error: "Cannot demote yourself" })
  }

  await AdminList.deleteOne({ _id: user._id })
  return res.status(200).json({ message: "User demoted" })
}

const deleteCharacter = async (req, res) => {
  const { id } = req.params
  const requester = req.user
  const char = await Characters.findOne({ id: id })
  if (!char) {
    return res.status(404).json({ error: "Character not found" })
  }
  const reviewerUsername = `${requester.firstname} ${requester.lastname}`

  const change = await Changes.create({
    action: "DeleteCharacter",
    user_id: { _id: requester._id, username: reviewerUsername },
    reviewed_by: { _id: requester._id, username: reviewerUsername },
    character_id: char.id,
    old_data: { active: true },
    new_data: { active: false },
  })

  await Characters.updateOne({ id: id }, { $set: { active: false } })
  await change.save()
  return res.status(200).json(change)
}

const getAllAdminsList = async (req, res) => {
  const admins = await AdminList.find()
  const requester = req.user
  const result = []
  for (const admin of admins) {
    const user = await UserList.findById(admin._id)
    if (user) {
      if (requester._id === admin._id) continue
      result.push({
        _id: admin._id,
        username: `${user.firstname} ${user.lastname}`,
        email: user.email,
      })
    }
  }
  return res.status(200).json(result)
}

module.exports = {
  approveContribution,
  rejectContribution,
  promoteUser,
  demoteUser,
  deleteCharacter,
  getAllContributions,
  getAllChanges,
  getAllAdminsList,
}
