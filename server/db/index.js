//this is the access point for all things database related

const db = require("./db");

const Annotation = require("./models/annotation");
const User = require("./models/user");
const LineAnnotated = require("./models/lineAnnotated");

User.hasMany(Annotation, { as: 'annotations' });
Annotation.belongsTo(User, {
  foreignKey: "userId"
});
LineAnnotated.hasMany(Annotation)
Annotation.belongsTo(LineAnnotated, {
  foreignKey: "lineId"
})

module.exports = {
  db,
  models: {
    User,
    Annotation,
    LineAnnotated
  }
};
