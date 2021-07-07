const router = require("express").Router();
const { requireToken, isAdmin, annotateRequireToken } = require("./gateKeeping");

const { models: { User, Annotation, LineAnnotated } } = require("../db");
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
            },
            include: [{
                model: User,
                attributes: ["id", "email"]
            }, {
                model: LineAnnotated,
                attributes: ["id", "linesAnnotated"]
            }]
        })
        res.json(allPoemAnnotations)
    } catch (error) {
        next(error)
    }
})

// POST an annotation for a given poem
router.post('/:poemId', annotateRequireToken, async (req, res, next) => {
    try {
        const poem = req.params.poemId.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        const {annotation, selectedText} = req.body
        const replica = await LineAnnotated.findOne({
            where: {
                poem,
                linesAnnotated: selectedText
            }
        })
        if (replica) {
            const newAnnotation = await Annotation.create({poem, content: annotation, userId: req.user.id, lineId: replica.id })
            res.status(201).json(newAnnotation)
        }
        
        const newLineAnnotated = await LineAnnotated.create({linesAnnotated: selectedText, poem})
        const newAnnotation = await Annotation.create({poem, content: annotation, userId: req.user.id, lineId: newLineAnnotated.id })

        res.status(201).json(newAnnotation)
    } catch (error) {
        next(error)
    }
})

// GET all annotations written by a specific user
router.get(':userId', async (req, res, next) => {
    try {
        const userSpecificAnotations = await Annotation.findAll({
            where: {
                userId: req.params.userId
            },
            include: [{
                model: User,
                attributes: ["id", "email"]
            }, {
                model: LineAnnotated,
                attributes: ["id", "linesAnnotated"]
            }]
        })
        res.json(userSpecificAnotations)
    } catch (error) {
        next(error)
    }  
})

// DELETE specific annotation
router.delete('/:noteId', async (req, res, next) => {
  try {
    const toBeDeletedNote = await Annotation.findByPk(req.params.noteId)
    const toBeDeletedLine = await LineAnnotated.findByPk(toBeDeletedNote.lineId)
    if (toBeDeletedLine.length === 1) {
        await LineAnnotated.destroy(toBeDeletedNote.lineId)
    }
    const deletedNote = await Annotation.destroy(req.params.noteId)
    res.json(deletedNote)
  } catch (error) {
    next(error)
  }
})
