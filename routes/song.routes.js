const express = require("express");
const router = express.Router();
const Song = require("../models/Song")


router.get("/new", (req, res) => {
  res.render("songs/new.ejs");
});


router.post("/", async (req, res) => {
  try {
    await Song.create(req.body);
    res.redirect("/songs");
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;