const router = require("express").Router();
module.exports = router;

router.use("/poems", require("./poems"))
router.use("/users", require("./users"));
router.use('/annotations', require('./annotations'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
