const mongoose = require('mongoose');

const energyDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    production: { type: Number, required: true, min: 0 },
    consumption: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const EnergyData = mongoose.model('EnergyData', energyDataSchema);
module.exports = EnergyData;
