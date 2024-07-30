const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Token = sequelize.define('Token', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    otp_pass: {
        type: DataTypes.STRING
    },
    otp_email: {
        type: DataTypes.STRING
    },
    fcb_token: {
        type: DataTypes.STRING
    }
    
});

module.exports = Token;