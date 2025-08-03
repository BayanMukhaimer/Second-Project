const router = require("express").Router();
router.get("/", (req, res) => {
  res.render("homePage/home.ejs", { user: req.session.user });
});
module.exports = router