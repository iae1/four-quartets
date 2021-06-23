const Sequelize = require("sequelize");
const db = require("../db");

const Line = db.define("line", {
  content: {
    type: Sequelize.TEXT
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Line;
