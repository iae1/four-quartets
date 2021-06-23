const router = require("express").Router();
const { requireToken, isAdmin } = require("./gateKeeping");

const { models: { User, Poem, Line, Annotation } } = require("../db");
module.exports = router;

//GET route for all users /api/users/
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Annotation,
        include: { model: Line }
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET route for single user /api/users/:id
router.get("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: {
        model: Annotation,
        include: { model: Line }
      },
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
