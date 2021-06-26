const router = require("express").Router();
const { requireToken, isAdmin, annotRequireToken } = require("./gateKeeping");

const { models: { User, Poem, Line, Annotation } } = require("../db");
module.exports = router;

// GET all annotations for a given poem

router.get('/:poemId', async (req, res, next) => {
    try {
        const allPoemAnnotations = await Annotation.findAll({
            where: {
                poem: req.params.poemId
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
