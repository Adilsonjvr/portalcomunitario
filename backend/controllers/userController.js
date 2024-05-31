const User = require('../models/User');
const EnergyData = require('../models/EnergyData');
const jwt = require('jsonwebtoken');
const generateRandomEnergyData = require('../utils/generateRandomEnergyData');

// Register new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        // Generate random energy data for the new user
        const energyData = generateRandomEnergyData(user._id);
        await EnergyData.insertMany(energyData);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
