const express = require('express');
const router = express.Router();
const Playlist = require("../models/Playlist")



router.get("/new",(req,res)=>{
    res.render("playlists/new.ejs")
})


router.post("/",async(req,res)=> {
    try{
        const createdPlaylist = await Playlist.create(req.body)
        res.redirect("/playlist/new")
    }
    catch(error){
        console.log(error)
    }
}
)

module.exports = router