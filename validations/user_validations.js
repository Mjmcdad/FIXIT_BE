const User = require('../models/user');
const bcrypt = require('bcrypt');

const validate_login = async(email, password) => {
    const user = await User.findOne({where:{
        email:email
    }}); 

    if(!user)  return {messege: `Email not found `, status: 404}
    
    const p = await bcrypt.compare(password, user.password);

    if(!p) return {messege: `Wrong password `, status: 401};

    return {messege:`Login successful`, status: 200, user}; 
        
    

}

module.exports = validate_login;