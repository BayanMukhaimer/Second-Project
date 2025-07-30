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




module.exports = router