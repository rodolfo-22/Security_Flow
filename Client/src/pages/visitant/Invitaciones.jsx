import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Invitaciones = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path); // Navega a la ruta proporcionada
  };

  const [invitations, setInvitations] = useState([]);

  // Función simulada para obtener datos desde una base de datos
  useEffect(() => {
    // Reemplaza esto con tu lógica de obtención de datos
    const fetchData = async () => {
      const data = await new Promise((resolve) =>
        setTimeout(() =>
          resolve([
            { anfitrion: 'Tony Stark', fecha: '25/05/2024', hora: '7:00 am' },
            { anfitrion: 'Peter Parker', fecha: '26/05/2024', hora: '8:00 am' },
            { anfitrion: 'Natasha Romanoff', fecha: '27/05/2024', hora: '9:00 am' },
            { anfitrion: 'Steve Rogers', fecha: '27/05/2024', hora: '9:00 am' },
            { anfitrion: 'Thor Odinson', fecha: '27/05/2024', hora: '9:00 am' },
            { anfitrion: 'Nick Fury', fecha: '27/05/2024', hora: '9:00 am' }

          ]), 1000)
      );
      setInvitations(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-3xl font-bold font-roboto_mono text-azul-claro">Mis invitaciones</h1>
      <div className="w-full max-w-4xl h-96 overflow-y-auto md:h-auto md:overflow-y-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invitations.map((invitation, index) => (
            <div key={index} className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
              <div className="bg-white shadow-md rounded-lg p-4 border">
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold font-roboto_mono mb-2" htmlFor={`anfitrion-${index}`}>
                    Anfitrión:
                  </label>
                  <input
                    className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`anfitrion-${index}`}
                    type="text"
                    value={invitation.anfitrion}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-roboto_mono font-bold mb-2" htmlFor={`fecha-${index}`}>
                    Fecha programada:
                  </label>
                  <input
                    className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`fecha-${index}`}
                    type="text"
                    value={invitation.fecha}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-roboto_mono font-bold mb-2" htmlFor={`hora-${index}`}>
                    Hora:
                  </label>
                  <input
                    className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`hora-${index}`}
                    type="text"
                    value={invitation.hora}
                    readOnly
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-amarillo-principal hover:bg-yellow-600 text-white font-roboto_mono font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleButtonClick('/visits/qr')}
                  >
                    Validar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invitaciones;
