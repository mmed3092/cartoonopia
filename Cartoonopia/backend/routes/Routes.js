const express = require("express")
const router = express.Router()
const characterRoutes = require("./CharactersRoute")
const userRoutes = require("./UsersRoute")
const adminRoutes = require("./AdminRoute")
const favouritesRoutes = require("./FavouritesRoute")
const contributionsRoutes = require("./ContributionsRoute")
const authRoutes = require("../auth/authRoutes")

async function logger(req, res, next) {
  // Middleware'
  console.log("[REQ]", req.method, res.statusCode, req.url)
  next()
}

router
  .use("/", logger)
  .use("/character", characterRoutes)
  .use("/user", userRoutes)
  .use("/admin", adminRoutes)
  .use("/favourites", favouritesRoutes)
  .use("/contributions", contributionsRoutes)
  .use("/auth", authRoutes)

module.exports = router
