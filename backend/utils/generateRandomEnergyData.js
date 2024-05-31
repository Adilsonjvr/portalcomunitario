const generateRandomEnergyData = (userId) => {
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            userId,
            production: Math.floor(Math.random() * 100),
            consumption: Math.floor(Math.random() * 100),
            date: new Date(new Date().setDate(new Date().getDate() - i)),
        });
    }
    return data;
};

module.exports = generateRandomEnergyData;
