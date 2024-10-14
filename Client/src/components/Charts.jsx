// src/components/Charts.jsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Charts = ({ data }) => {
    const casaData = data.reduce((acc, curr) => {
        acc[curr.Casa] = (acc[curr.Casa] || 0) + 1;
        return acc;
    }, {});

    const motivoData = data.reduce((acc, curr) => {
        acc[curr.Motivo] = (acc[curr.Motivo] || 0) + 1;
        return acc;
    }, {});

    const casaChartData = {
        labels: Object.keys(casaData),
        datasets: [
            {
                label: 'Entradas por Casa',
                data: Object.values(casaData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    const motivoChartData = {
        labels: Object.keys(motivoData),
        datasets: [
            {
                label: 'Entradas por Motivo',
                data: Object.values(motivoData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    return (
        <div className="w-full max-w-4xl mt-8">
            <h2 className="text-xl font-bold text-center mb-4">Entradas por Casa</h2>
            <Pie data={casaChartData} />
            <h2 className="text-xl font-bold text-center mt-8 mb-4">Entradas por Motivo</h2>
            <Bar data={motivoChartData} />
        </div>
    );
};

export default Charts;
