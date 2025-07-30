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


router.get("/", async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.render("songs/all-songs.ejs", { allSongs });
  } catch (error) {
    console.log(error);
  }
});


router.get("/:songId", async (req, res) => {
  try {
    const foundSong = await Song.findById(req.params.songId);
    res.render("songs/song-details.ejs", { foundSong });
  } catch (error) {
    console.log(error);
  }
});



router.get("/:songId/edit", async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    res.render("songs/song-edit.ejs", { song });
  } catch (error) {
    console.log(error);
  }
});


router.put("/:songId", async (req, res) => {
  try {
    await Song.findByIdAndUpdate(req.params.songId, req.body);
    res.redirect("/songs");
  } catch (error) {
    console.log(error);
  }
});


router.delete("/:songId", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.songId);
    res.redirect("/songs");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;