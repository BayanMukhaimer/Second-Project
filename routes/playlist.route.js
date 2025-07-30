const express = require('express');
const router = express.Router();
const Playlist = require("../models/Playlist")
const Song = require("../models/Song")



router.get("/new", async (req, res) => {
    try {
        const allSongs = await Song.find();
        res.render("playlists/new.ejs", { allSongs });
    } catch (error) {
        console.log(error);
        res.send("Error loading playlist form.");
    }
});


router.post("/",async(req,res)=> {
    try{
        const createdPlaylist = await Playlist.create(req.body)
        res.redirect("/playlists/new")
    }
    catch(error){
        console.log(error)
    }
})


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





module.exports = router