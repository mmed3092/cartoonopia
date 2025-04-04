const jwt = require("jsonwebtoken")
const AdminList = require("../models/AdminList")

// Secret key for JWT
const secretKey = process.env.ACCESS_TOKEN_SECRET

// Middleware to authenticate JWT token
const authenticateUserToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) {
    return res.status(401).json({ error: "No token provided" })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" })
    }
    req.user = user
    next()
  })
}

const authenticateAdminToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) {
    return res.status(401).json({ error: "No token provided" })
  }

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" })
    }
    const admins = await AdminList.findById(user._id)
    if (!admins) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" })
    }
    req.user = user
    next()
  })
}

module.exports = { authenticateUserToken, authenticateAdminToken }
