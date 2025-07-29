const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
    Song:{
        ref:"Song"
    }

})

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist
