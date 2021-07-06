//this is the access point for all things database related

const db = require("./db");

const Annotation = require("./models/annotation");
const User = require("./models/user");

User.hasMany(Annotation, { as: 'annotations' });
Annotation.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = {
  db,
  models: {
    User,
    Annotation
  }
};
