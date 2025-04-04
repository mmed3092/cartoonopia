// Imports
const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes/Routes")
const bodyParser = require("body-parser")

//Environmental variables
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

//Express app
const app = express()

app.use(
  cors({
    origin: "http://localhost:3030",
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Use routes from routes
app.use("/api", routes)

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Running... on port:", PORT)
    })
  })
  .catch((err) => {
    console.error(err)
  })
