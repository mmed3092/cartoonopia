const Favourites = require("../models/Favourites")
const Characters = require("../models/Characters")

const isFavourite = async (req, res) => {
  const { id } = req.params
  const user = req.user
  let favourites = await Favourites.findOne({ "user_id._id": user._id })
  if (!favourites) {
    favourites = new Favourites({ "user_id._id": user._id, characters: [] })
    favourites.save()
  }
  let isFavourite = favourites.characters.includes(id)
  res.status(200).json(isFavourite)
}

const getAllFavourites = async (req, res) => {
  const user = req.user
  let favourites = await Favourites.findOne({ "user_id._id": user._id })
  if (!favourites) {
    favourites = new Favourites({ "user_id._id": user._id, characters: [] })
    favourites.save()
  }
  res.status(200).json([...favourites.characters])
}

const toggleFavourite = async (req, res) => {
  const { id } = req.params
  const user = req.user
  let favourites = await Favourites.findOne({ "user_id._id": user._id })
  console.log(user._id, favourites)
  if (!favourites) {
    favourites = new Favourites({ "user_id._id": user._id, characters: [] })
  }

  const isFavourite = favourites.characters.includes(id)
  if (isFavourite) {
    favourites.characters = favourites.characters.filter((char) => char !== id)
  } else {
    favourites.characters.push(id)
  }
  await favourites.save()
  res.status(200).json({ isFavourite: !isFavourite })
}

module.exports = { isFavourite, getAllFavourites, toggleFavourite }
