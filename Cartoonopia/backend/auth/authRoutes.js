const express = require("express")
const jwt = require("jsonwebtoken")
const { getUser, isAdmin, getUserFromUsername } = require("./authController")
const User = require("../models/UserList")
const bcrypt = require("bcryptjs")
const router = express.Router()

// Secret key for JWT
const secretKey = process.env.ACCESS_TOKEN_SECRET

router.post("/login", async (req, res) => {
  // Replace with your own user authentication logic
  const { username, password } = req.body

  const user = await getUserFromUsername(username)

  if (!user) {
    return res.status(404).json({ error: "Incorrect username or password" })
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.status(404).json({ error: "Incorrect username or password" })
  }

  const isUserAdmin = await isAdmin(user._id)

  const jwt_token = jwt.sign(user.toJSON(), secretKey, {
    expiresIn: "1h",
  })

  console.log(jwt_token)
  res.status(200).json({ token: jwt_token, isAdmin: isUserAdmin })
})

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  const username = firstname + " " + lastname
  const isUser = await getUserFromUsername(username)

  if (isUser !== null) {
    return res.status(404).json({ error: "This user already exists" })
  }

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  })

  await user.save()
  res.status(200).json({ message: "User created successfully" })
})

module.exports = router
