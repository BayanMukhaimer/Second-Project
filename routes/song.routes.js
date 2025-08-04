const express = require("express");
const router = express.Router();
const Song = require("../models/Song")
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['audio/mpeg', 'audio/mp3', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });



router.get("/new", (req, res) => {
  res.render("songs/new.ejs");
});


router.post('/', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, genre, duration } = req.body;
    const audioPath = req.files['audio'] ? `/uploads/${req.files['audio'][0].filename}` : null;
    const imagePath = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
    
const newSong = new Song({
      title,
      artist,
      genre,
      duration,
      audioPath,
      imagePath,
    });

    await newSong.save();
    res.redirect('/songs');
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