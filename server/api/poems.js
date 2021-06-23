const router = require("express").Router();
const { models: { Poem, Annotation, Line } } = require("../db");
const {
  requireToken,
  isAdmin,
  annotateRequireToken
} = require("./gateKeeping");
module.exports = router;

// GET all poems including their lines w/o annotations /api/poems/
router.get("/", async (req, res, next) => {
  try {
    const poems = await Poem.findAll();
    res.json(poems);
  } catch (err) {
    next(err);
  }
});

// GET single poem including their lines w/ annotations /api/poems/:id
router.get("/:id", async (req, res, next) => {
  try {
    const poem = await Poem.findByPk(req.params.id, {
      include: {
        model: Line,
        include: { model: Annotation }
      }
    });
    // const sortedPoem =
    poem.lines.sort((a, b) => a.number - b.number);
    res.json(poem);
  } catch (err) {
    next(err);
  }
});

// POST poems /api/poems/
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Poem.create(req.body));
  } catch (err) {
    next(err);
  }
});

// EDIT poem details /api/poems/:id
router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const poem = await Poem.findByPk(req.params.id);
    await poem.update(req.body);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

// DELETE poems /api/poems/:id
router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const poem = await Poem.findByPk(req.params.id);
    await poem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
