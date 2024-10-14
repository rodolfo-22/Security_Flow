import React, { useState, useEffect } from 'react';

const Historial = () => {
  const [invitations, setInvitations] = useState([]);

  // Función simulada para obtener datos desde una base de datos
  useEffect(() => {
    // Reemplaza esto con tu lógica de obtención de datos
    const fetchData = async () => {
      const data = await new Promise((resolve) =>
        setTimeout(() =>
          resolve([
            { host: 'Peter Parker', date: '27/04/2024', time: '1:00 pm' },
            { host: 'Natasha Romanoff', date: '27/04/2024', time: '10:00 pm' },
            { host: 'Tony Stark', date: '27/04/2024', time: '8:00 am' },
            { host: 'Bruce Banner', date: '27/04/2024', time: '1:00 pm' },
            { host: 'Wanda Maximoff', date: '27/04/2024', time: '10:00 pm' },
            { host: 'Steve Rogers', date: '27/04/2024', time: '8:00 am' },
            { host: 'Bucky Barnes', date: '27/04/2024', time: '1:00 pm' },
            { host: 'Thor Odinson', date: '27/04/2024', time: '10:00 pm' },
            { host: 'Jane Foster', date: '27/04/2024', time: '8:00 am' },
          
          ]), 1000)
      );
      setInvitations(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

      <h1 className="mb-6 text-center text-2xl md:text-2xl lg:text-4xl  font-bold font-roboto_mono text-azul-claro">Historial de invitaciones</h1>
      <div className="overflow-y-auto w-full max-w-4xl max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-amarillo-principal">
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Anfitrión</th>
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Fecha</th>
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Hora</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invitations.map((invitation, index) => (
              <tr key={index}>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.host}</td>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.date}</td>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
