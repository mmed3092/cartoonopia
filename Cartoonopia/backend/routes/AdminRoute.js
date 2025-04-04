const express = require("express")
const {
  approveContribution,
  rejectContribution,
  promoteUser,
  demoteUser,
  deleteCharacter,
  getAllContributions,
  getAllChanges,
  getAllAdminsList,
} = require("../controllers/AdminController")
const { getAllUserList } = require("../controllers/UserListController")
const { authenticateAdminToken } = require("../auth/authentication")
const router = express.Router()

// Routes
router.use(authenticateAdminToken)
router.get("/users", getAllUserList)
router.get("/admins", getAllAdminsList)
router.get("/changes", getAllChanges)
router.get("/contributions", getAllContributions)
router.post("/approve/:id", approveContribution)
router.post("/reject/:id", rejectContribution)
router.post("/promote/:id", promoteUser)
router.post("/demote/:id", demoteUser)
router.delete("/character/:id", deleteCharacter)

module.exports = router
