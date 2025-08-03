const express = require('express');
const router = express.Router();
const Playlist = require("../models/Playlist")
const Song = require("../models/Song")



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


router.post("/",async(req,res)=> {
    try{
        const createdPlaylist = await Playlist.create(req.body)
        console.log(allSongs)
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