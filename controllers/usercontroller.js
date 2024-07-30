const User = require("../models/user");
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
    
    const user = await User.create({
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
      .json({ user, message: "user has been created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user has not been created",
      error: error.message,
    });
  }
};
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
    const userToBeDeleted = User.findByPk(id)
    if(!userToBeDeleted){
      res
      .status(400)
      .json({ message: "user has not been found" });
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

module.exports = {create, update, delete_user};