// src/pages/ViewVisits.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VisitCard from '../../components/VisitCard';
import { motion } from 'framer-motion';

const ViewVisits = () => {
  const [visits, setVisits] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [numHome, setNumHome] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://securityflow.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data); // Mostrar los datos de perfil en la consola
        setNumHome(response.data.home);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error al cargar el perfil del usuario. Inténtalo de nuevo más tarde.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchVisits = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, seleccione ambas fechas.');
      return;
    }

    if (!numHome) {
      setError('Error al obtener el número de casa. Inténtalo de nuevo más tarde.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('https://securityflow.onrender.com/entry/by-home', {
        home: numHome,
        from: `${startDate}T00:00:00`,
        to: `${endDate}T00:00:00`
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data); // Mostrar en la consola los datos recibidos de la API

      setVisits(response.data.details);
      setError('');
    } catch (error) {
      console.error('Error fetching visits:', error);
      setError('Error al cargar las visitas. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className='flex items-center flex-col w-full font-roboto_mono'>
      <h1 className="text-2xl text-[#6185A9] text-center mt-4 font-roboto_mono font-bold">Registro de visitas</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center w-full mt-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="startDate" className="text-gray-700 mb-2">Desde</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="endDate" className="text-gray-700 mb-2">Hasta</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            onClick={fetchVisits}
            className="bg-amarillo-principal text-black py-1 px-4 rounded-md text-sm font-roboto_mono mt-4 hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Buscar
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-7 overflow-y-auto h-96 mb-8 w-full px-4 sm:px-0">
        {visits.length > 0 ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${visits.length === 1 ? 'justify-center' : ''}`}>
            {visits.map((visit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VisitCard
                  email={visit.userEmail}
                  fecha={new Date(visit.date).toLocaleDateString()}
                  hora={new Date(visit.date).toLocaleTimeString()}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 mt-4 text-center">No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default ViewVisits;





