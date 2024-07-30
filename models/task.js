const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task = sequelize.define('Task', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.ENUM('pending','in progress', 'finished')
    },
    review: {
        type: DataTypes.TEXT
    },
    rating: {
        type: DataTypes.INTEGER
    },
    
});

module.exports = Task;