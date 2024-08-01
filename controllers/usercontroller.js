const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendVerEmail = require("../Emailver");
const crypto = require("crypto");
const Token = require("../models/tokens");
const validate_login = require("../validations/user_validations");

dotenv.config();

// //verification code
// const createverifcationcode = () => {
//   return Math.floor(1000 + Math.random()* 9000).toString()
// };

// //verification token
// const createverificationtoken = async () => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(32,(err, buffer) => {
//       if (err){
//         reject(err);
//       } else {
//         const token = buffer.toString('hex');
//         console.log('created verfication token', token);
//         resolve(token);
//       }
//     });
//   });
// };

const create = async (req, res) => {
  try {
    const {
      user_name,
      email,
      password,
      number,
      country,
      city,
      address,
      type,
      description,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
      number,
      country,
      city,
      address,
      type,
      description,
    });

    // //jwt token
    // const token = jwt.sign(
    //   {id: user.id,},
    //   process.env.JWT_SECRET,
    // );

    res
      .status(201)
      .json({ user, message: "user has been created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user has not been created",
      error: error.message,
    });
  }
};

// const verficationToken = await createverificationtoken();
// console.log(verficationToken);
// await T
// update user

const update = async (req, res) => {
  try {
    const {
      user_name,
      email,
      password,
      number,
      country,
      city,
      address,
      type,
      description,
    } = req.body;

    const user = await User.update({
      user_name,
      email,
      password,
      number,
      country,
      city,
      address,
      type,
      description,
    });
    res
      .status(201)
      .json({ user, message: "user has been updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user has not been updated",
      error: error.message,
    });
  }
};

//delete user

const delete_user = async (req, res) => {
  try {
    const id = req.param;
    const userToBeDeleted = User.findByPk(id);
    if (!userToBeDeleted) {
      res.status(400).json({ message: "user has not been found" });
    }
    const user = await User.destroy(id);
    res
      .status(201)
      .json({ user, message: "user has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user has not been created",
      error: error.message,
    });
  }
};

//login controller

const logIn = async (req, res) => {

  const { email, password } = req.body;

  const { messege, status, user } = await validate_login(email, password);

  try {
    
    if(!user) throw new Error(messege)
    
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    const { user_name, number, country, city, address, type } = user;

    const reposne = {
      user: { user_name, number, country, city, address, type, token },
      messege,
    };

    res.status(status).json(reposne);
  } catch (error) {

    console.log(error);

    res.status(status).json({
      message: messege,
      error: error.message,
    });

  }
};

module.exports = { create, update, delete_user, logIn };
