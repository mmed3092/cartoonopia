const express = require("express");
const router = express.Router();
const {getAllFavourites, isFavourite, toggleFavourite} = require("../controllers/FavouritesController")
const { authenticateUserToken } = require("../auth/authentication")
// Routes
router.use(authenticateUserToken)
router.get("/", getAllFavourites);
router.get("/:id", isFavourite);
router.post("/:id", toggleFavourite);


module.exports = router;
