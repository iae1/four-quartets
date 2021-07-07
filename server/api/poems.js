const router = require("express").Router();
const Genius = require("genius-lyrics");
const Client = new Genius.Client(); // Scrapes if no key is provided

const { models: { Poem, Annotation, Line } } = require("../db");
const {
  isAdmin,
} = require("./gateKeeping");
module.exports = router;

// GET single poem from the rap genius api /api/poems/:id
router.get("/:id", async (req, res, next) => {
  try {
    const title = req.params.id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const searches = await Client.songs.search(`Four Quartets: ${title}`);
    const firstSong = searches[0];
    const lyrics = await firstSong.lyrics();

    res.json(lyrics)
  } catch (error) {
    next(error)
  }
})