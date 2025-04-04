const Contributions = require("../models/Contributions")
const AdminList = require("../models/AdminList")

async function editContribution(req, res) {
  const { id } = req.params
  const contribution = req.body
  const user = req.user
  const exists = await Contributions.find({
    status: "Pending",
    "data.id": id,
  })
  if (exists.length > 0) {
    return res
      .status(400)
      .json({ error: "A contribution for that character already exists" })
  }

  const length = await Contributions.countDocuments()
  const newContribution = new Contributions({
    contribution_id: length + 1,
    user_id: { _id: user._id },
    action: "EditCharacter",
    status: "Pending",
    reviewed_by: null,
    date: new Date().toISOString(),
    data: { id: id, ...contribution },
  })
  try {
    await newContribution.save()
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  res.status(201).json({ newContribution })
}

async function addContribution(req, res) {
  const contribution = req.body
  const user = req.user
  const id = contribution.name.toLowerCase()

  const exists = await Contributions.findOne({
    status: "Pending",
    data: { id: contribution.id },
  }).countDocuments()
  if (exists) {
    return res
      .status(400)
      .json({ error: "A contribution for that character already exists" })
  }

  const isAdmin = await AdminList.findOne({ _id: user._id })

  const length = await Contributions.countDocuments()
  const newContribution = new Contributions({
    contribution_id: length + 1,
    user_id: { _id: user._id },
    action: "AddCharacter",
    status: "Pending",
    reviewed_by: null,
    date: new Date().toISOString(),
    data: { id: id, ...contribution },
  })
  try {
    await newContribution.save()
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  res.status(201).json({ newContribution })
}

async function getUserContributions(req, res) {
  const user = req.user
  const contributions = await Contributions.find({ "user_id._id": user._id })
  res.status(200).json(contributions)
}

async function deleteContribution(req, res) {
  const { id } = req.params
  const user = req.user
  const exists = await Contributions.find({
    status: "Pending",
    data: { id: id },
  })
  if (exists.length > 0) {
    return req
      .status(400)
      .json({ error: "A contribution for that character already exists" })
  }
  const length = await Contributions.countDocuments()
  const newContribution = new Contributions({
    contribution_id: length + 1,
    user_id: { _id: user._id },
    action: "DeleteCharacter",
    status: "Pending",
    reviewed_by: null,
    date: new Date().toISOString(),
    data: { id: id },
  })
  try {
    await newContribution.save()
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  res.status(201).json({ newContribution })
}

async function revokeContribution(req, res) {
  const { id } = req.params
  const user = req.user

  const contribution = await Contributions.findOne({
    status: "Pending",
    contribution_id: id,
  })

  if (!contribution) {
    return res.status(400).json({ error: "Contribution not found" })
  }

  if (user._id !== contribution.user_id._id.toString()) {
    return res
      .status(403)
      .json({ error: "Cannot revoke a contribution that is not yours" })
  }
  await Contributions.updateOne(
    {
      contribution_id: contribution.contribution_id,
    },
    { status: "Rejected" }
  )
  res.status(200).json({ message: "Contribution revoked" })
}

async function getContributions(req, res) {
  const contributions = await Contributions.find()
  res.status(200).json(contributions)
}

module.exports = {
  editContribution,
  addContribution,
  deleteContribution,
  getContributions,
  revokeContribution,
  getUserContributions,
}
