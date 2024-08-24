const bcrypt = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const User = require('../Model/userModel'); // Adjust the path to your user model
const { Op } = require('sequelize');

// Middleware for validation
const validateSignup = [
  // Add validation rules here
  check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  check('email')
    .isEmail().withMessage('Invalid email address')
    .notEmpty().withMessage('Email is required'),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const signup = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error', error });
  }
};

// remove password from response
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email||!password){
        throw new Error({message:"email or password can't be empty"})
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { signup: [validateSignup, signup], login };
