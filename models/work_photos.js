const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Work_photos = sequelize.define('Work_photos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Work_photos;