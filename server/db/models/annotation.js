const Sequelize = require("sequelize");
const db = require("../db");

const Annotation = db.define("annotation", {
  poem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 1
    }
  },
});

module.exports = Annotation;
