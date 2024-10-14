import React, { useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const History = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async (from, to) => {
        const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

        if (!token) {
            console.error('Token no encontrado');
            return;
        }

        try {
            const response = await axios.post('https://securityflow.onrender.com/entry/by-date', {
                from: from,
                to: to
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFilteredData(response.data.details);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilter = () => {
        if (!startDate || !endDate) {
            alert('Por favor seleccione ambas fechas');
            return;
        }
        fetchData(startDate, endDate);
    };

    const groupDataByDay = (data) => {
        const grouped = data.reduce((acc, entry) => {
            const date = new Date(entry.date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date]++;
            return acc;
        }, {});

        return grouped;
    };

    const groupedData = groupDataByDay(filteredData);
    const chartData = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                label: 'Entradas por día',
                data: Object.values(groupedData),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Entradas por día',
            },
        },
    };

    const groupDataByCategory = (data) => {
        const grouped = data.reduce((acc, entry) => {
            if (entry.userEmail) {
                acc.userEntries++;
            } else {
                acc.anonymousEntries++;
            }
            return acc;
        }, { userEntries: 0, anonymousEntries: 0 });

        return grouped;
    };

    const categoryData = groupDataByCategory(filteredData);
    const pieData = {
        labels: ['Entradas de Usuario', 'Entradas Anónimas'],
        datasets: [
            {
                data: [categoryData.userEntries, categoryData.anonymousEntries],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Entradas Anónimas vs Entradas de Usuario',
            },
        },
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className="text-2xl font-bold text-center text-azul-principal m-3 font-roboto_mono">Listado de Entradas</h1>
            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mb-4'>
                    <label htmlFor="houseNumber" className='text-base font-roboto_mono mb-2 md:mb-0'>Filtrar por fechas:</label>
                    <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
                        <input 
                            type="datetime-local" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            className='border p-2 rounded'
                        />
                        <input 
                            type="datetime-local" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            className='border p-2 rounded'
                        />
                        <button 
                            onClick={handleFilter} 
                            className='bg-blue-500 text-white p-2 rounded'
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
                <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-4 overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                            <tr>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Casa</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Correo electrónico</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Documento</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Motivo</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td className='px-6 py-4 whitespace-nowrap'>{entry.houseName || '-'}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{entry.userEmail || '-'}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{entry.document || '-'}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{entry.reason || '-'}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{new Date(entry.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mt-4'>
                    <Bar data={chartData} options={options} />
                </div>
                <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mt-4'>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
};

export default History;




