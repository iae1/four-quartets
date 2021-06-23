const Sequelize = require("sequelize");
const db = require("../db");

const Poem = db.define("poem", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  linecount: {
    type: Sequelize.INTEGER
  }
});

module.exports = Poem;
