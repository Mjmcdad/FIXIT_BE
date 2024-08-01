const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const validate_login = async(email, password) => {
    const user = await User.findOne({where:{
        email:email
    }}); 

    if(!user)  return {messege: `Email not found `, status: 404}
    
    const p = await bcrypt.compare(password, user.password);

    if(!p) return {messege: `Wrong password `, status: 401};

    return {messege:`Login successful`, status: 200, user};
}

const validate_token = async (token) => {
    try {

        const {user} =  jwt.verify(token, process.env.JWT_SECRET);
        return user.id
      } catch (err) {
       
        console.error('Invalid or expired token', err);
        return null; 
      }
}

module.exports = {validate_login, validate_token};