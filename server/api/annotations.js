const router = require("express").Router();
const { requireToken, isAdmin, annotRequireToken } = require("./gateKeeping");

const { models: { User, Poem, Line, Annotation } } = require("../db");
module.exports = router;

//DELETE annotation /api/annotations/:id
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deletedNote = await Annotation.findByPk(req.params.id)

//   } catch (error) {

//   }
// })
