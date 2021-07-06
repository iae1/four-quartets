const Sequelize = require("sequelize");
const db = require("../db");

const LineAnnotated = db.define("lineAnnotated", { 
    linesAnnotated: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          min: 5
        }
      },
      poem: {
        type: Sequelize.STRING,
        allowNull: false
      },
})

module.exports = LineAnnotated