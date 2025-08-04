const express = require('express');
const router = express.Router();
const Playlist = require("../models/Playlist")
const Song = require("../models/Song")

const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


router.get("/new", async (req, res) => {
    try {
        const allSongs = await Song.find();
        console.log(allSongs)
        res.render("playlists/new.ejs", { allSongs });
    } catch (error) {
        console.log(error);
        res.send("Error loading playlist form.");
    }
});


router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const playlistData = req.body;

    if (req.file) {
      playlistData.coverImagePath = `/uploads/${req.file.filename}`;
    }

    if (playlistData.songIds && !Array.isArray(playlistData.songIds)) {
      playlistData.songIds = [playlistData.songIds];
    }

    const createdPlaylist = await Playlist.create(playlistData);
    res.redirect("/playlists");
  } catch (error) {
    console.log(error);
    res.send("Error creating playlist.");
  }
});

router.get("/", async (req, res) => {
  try {
    const allPlaylists = await Playlist.find().populate("songIds");
    res.render("playlists/all-playlists.ejs", { allPlaylists });
  } catch (error) {
    console.log(error);
  }
});


router.get("/:playlistId", async (req, res) => {
  try {
    const foundPlaylist = await Playlist.findById(req.params.playlistId).populate("songIds");
    res.render("playlists/playlist-details.ejs", { foundPlaylist });
  } catch (error) {
    console.log(error);
  }
});



router.get("/:playlistId/edit", async (req, res) => {
  try {
    const foundPlaylist = await Playlist.findById(req.params.playlistId);
    const allSongs = await Song.find();
    res.render("playlists/playlist-edit.ejs", { foundPlaylist, allSongs });
  } catch (error) {
    console.log(error);
  }
});



router.put("/:playlistId", async (req, res) => {
  try {
    await Playlist.findByIdAndUpdate(req.params.playlistId, req.body);
    res.redirect(`/playlists/${req.params.playlistId}`);
  } catch (error) {
    console.log(error);
  }
});


router.delete("/:playlistId", async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.playlistId);
    res.redirect("/playlists");
  } catch (error) {
    console.log(error);
  }
});


module.exports = router