const User = require('../models/user.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.render('index', { users });
    // res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create(username, password);

    res.status(201).json({ message: 'User created successfully', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById(id);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[0];
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.delete(id);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(201).json({ message: 'User successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;
    const user = await User.update(username, password, id);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(201).json({ message: 'User successfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
