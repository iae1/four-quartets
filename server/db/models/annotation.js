const Sequelize = require("sequelize");
const db = require("../db");

const Annotation = db.define("annotation", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  poem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  linesAnnotated: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 5
    }
  },
  charStart: {
    type: Sequelize.INTEGER
  },
  charEnd: {
    type: Sequelize.INTEGER
  }
});

module.exports = Annotation;
