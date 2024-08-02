const User = require("../models/user.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.render("index", { users });
    // res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
};
