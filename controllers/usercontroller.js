const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const Token = require("../models/tokens");
const { validate_login } = require("../validations/user_validations");

dotenv.config();

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
     service_type,
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
      service_type,
    });

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
//todo
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

//todo
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
    if (!user) throw new Error(messege);

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

const get_workers = async (req, res) => {
  try {
    const { service_type } = req.query;

    const workers = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        type: "Contractor",
        service_type:service_type,
      },
    });

    if (workers.length == 0) throw new Error("there are no workers");
    res.status(201).json({
      workers,
      message: "Workers have been returned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error loading Workers",
      error: error.message,
    });
  }
};

module.exports = { create, update, delete_user, logIn, get_workers };