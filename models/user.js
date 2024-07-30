const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    passowrd: {
        type: DataTypes.STRING,
        allowNull:false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
    },
    city: { 
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.ENUM('User', 'worker', 'admin'),
        allowNull:false,
        defaultValue: 'user'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }

});

module.exports = User;