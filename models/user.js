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
    password: {
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
        type: DataTypes.ENUM('Home Owner', 'Contractor', 'Admin'),
        allowNull:false,
    },
    service_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }

});

module.exports = User;