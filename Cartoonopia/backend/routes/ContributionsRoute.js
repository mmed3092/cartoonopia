const express = require("express")
const {
  editContribution,
  addContribution,
  deleteContribution,
  revokeContribution,
  getUserContributions,
} = require("../controllers/ContributionsController")
const router = express.Router()
const { authenticateUserToken } = require("../auth/authentication")

// Routes

router.use(authenticateUserToken)
router.get("/", getUserContributions)
router.post("/", addContribution)
router.put("/:id", editContribution)
router.patch("/:id", revokeContribution)

module.exports = router
