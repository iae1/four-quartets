const router = require("express").Router();
const { requireToken, isAdmin, annotRequireToken } = require("./gateKeeping");

const { models: { User, Poem, Line, Annotation } } = require("../db");
module.exports = router;

// GET all annotations for a given poem

router.get('/:poemId', async (req, res, next) => {
    try {
        const poemName = req.params.poemId.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        const allPoemAnnotations = await Annotation.findAll({
            where: {
                poem: poemName
            }
        })
        res.json(allPoemAnnotations)
    } catch (error) {
        next(error)
    }
})

//DELETE annotation /api/annotations/:id
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deletedNote = await Annotation.findByPk(req.params.id)

//   } catch (error) {

//   }
// })
