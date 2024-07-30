const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

const db_name = process.env.DB_NAME;
console.log(db_name)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS , {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.PORT
  });

  (async () => {
    try {
      await sequelize.sync({alter:true});
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  module.exports = sequelize ;