import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './DashboardPage.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
    const [energyData, setEnergyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching energy data...');
                const { data } = await axios.get('/api/energy', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
                    },
                });
                console.log('Energy data fetched:', data);
                setEnergyData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching energy data:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: energyData.map(data => new Date(data.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Production',
                data: energyData.map(data => data.production),
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Consumption',
                data: energyData.map(data => data.consumption),
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Energy Dashboard</h2>
            {energyData.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>No energy data available.</p>
            )}
        </div>
    );
};

export default DashboardPage;
