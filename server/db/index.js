//this is the access point for all things database related

const db = require("./db");

const Annotation = require("./models/annotation");
const Poem = require("./models/poem");
const Line = require("./models/line");
const User = require("./models/user");

Poem.hasMany(Line);
Line.belongsTo(Poem, {
  foreignKey: {
    field: "poemId",
    allowNull: false
  },
  onDelete: "cascade"
});

User.hasMany(Annotation);
Annotation.belongsTo(User);
Line.hasMany(Annotation);
Annotation.belongsTo(Line);

module.exports = {
  db,
  models: {
    Poem,
    Line,
    User,
    Annotation
  }
};
