const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/lines", require("./lines"));
router.use("/poems", require("./poems"));
// router.use('/annotations', require('./annotations'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
