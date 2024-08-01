const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Service_type = sequelize.define('Service_type', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.STRING
    },
});

module.exports = Service_type;