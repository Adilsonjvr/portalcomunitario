const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addEnergyData, getEnergyData, generateEnergyData } = require('../controllers/energyController');

router.route('/').post(protect, addEnergyData).get(protect, getEnergyData);
router.route('/generate').post(protect, generateEnergyData);

module.exports = router;
