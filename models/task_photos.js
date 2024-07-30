const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task_photos = sequelize.define('Task_photos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type:DataTypes.ENUM('user','worker'),
        allowNull: false
    }
});

module.exports = Task_photos;