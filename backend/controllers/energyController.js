const EnergyData = require('../models/EnergyData');
const generateRandomEnergyData = require('../utils/generateRandomEnergyData');

// Create or update energy data
const addEnergyData = async (req, res) => {
    const userId = req.user.id;

    try {
        const energyData = generateRandomEnergyData(userId);
        await EnergyData.insertMany(energyData);
        res.status(201).json({ message: 'Energy data saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get energy data for user
const getEnergyData = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log(`Fetching energy data for user: ${userId}`);
        const energyData = await EnergyData.find({ userId });
        console.log(`Energy data for user ${userId}:`, energyData);
        res.json(energyData);
    } catch (error) {
        console.error('Error fetching energy data:', error);
        res.status(400).json({ error: error.message });
    }
};

// Generate random energy data for user (for testing purposes)
const generateEnergyData = async (req, res) => {
    const userId = req.user.id;

    try {
        const energyData = generateRandomEnergyData(userId);
        await EnergyData.insertMany(energyData);
        res.status(201).json({ message: 'Random energy data generated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addEnergyData, getEnergyData, generateEnergyData };
