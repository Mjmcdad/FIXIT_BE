const sequelize = require("../database");

const User = require("./user");
const Task = require("./task");
const Token = require("./tokens");
const Work_photos = require("./work_photos");
const Task_photos = require("./task_photos");

const initModels = async () => {

  User.hasOne(Token, { foreignKey: "user_id", onDelete: "CASCADE" });

  Token.belongsTo(User, {
    foreignKey: "user_id",
  });

  User.hasMany(Work_photos, { foreignKey: "worker_id", onDelete: "CASCADE" });
  Work_photos.belongsTo(User, { foreignKey: "worker_id", onDelete: "CASCADE" });

  User.hasMany(Task, { foreignKey: "user_id", onDelete: "CASCADE" });
  Task.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  User.hasMany(Task, { foreignKey: "worker_id", onDelete: "CASCADE" });
  Task.belongsTo(User, { foreignKey: "worker_id", onDelete: "CASCADE" });

  Task.hasMany(Task_photos, { foreignKey: "task_id", onDelete: "CASCADE" });
  Task_photos.belongsTo(Task, { foreignKey: "task_id", onDelete: "CASCADE" });
};

module.exports = { sequelize, initModels };
