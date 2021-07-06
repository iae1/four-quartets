const { models: { User } } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const annotateRequireToken = async (req, res, next) => {
  try {
    const token = req.body.token;
    const user = await User.findByToken(token);
    req.user = user;
    if (!user) {
      return res.status(403).send("You are not a user");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin) {
      next();
    } else {
      return res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
  isAdmin,
  annotateRequireToken
};
