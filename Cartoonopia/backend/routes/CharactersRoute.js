const express = require("express")
const router = express.Router()
const {
  getAllCharacters,
  getSingleCharacter,
} = require("../controllers/CharactersController")
const { authenticateUserToken } = require("../auth/authentication")

// Routes
router.use(authenticateUserToken)
router.get("/", getAllCharacters)
router.get("/:id", getSingleCharacter)

module.exports = router
