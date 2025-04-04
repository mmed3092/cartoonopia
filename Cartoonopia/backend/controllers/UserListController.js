const UserList = require("../models/UserList")
const AdminList = require("../models/AdminList")

const getAllUserList = async (req, res) => {
  const users = await UserList.find()
  const requester = req.user
  const result = []
  for (const user of users) {
    if (requester._id === user._id) continue
    const isAdmin = await AdminList.findOne({ _id: user._id })
    if (isAdmin !== null) continue
    if (user) {
      result.push({
        _id: user._id,
        username: `${user.firstname} ${user.lastname}`,
        email: user.email,
      })
    }
  }
  res.status(200).json(result)
}

const getSingleUser = async (req, res) => {
  const { id } = req.params
  const user = await UserList.findById(id)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  } else {
    return res.status(200).json(user)
  }
}

module.exports = { getAllUserList }
