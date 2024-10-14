import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Approve = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState('');
  const [home, setHome] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get('https://securityflow.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        const userHome = profileResponse.data.home;
        if (userHome) {
          setHome(userHome);
          fetchSolicitudes(userHome);
        } else {
          throw new Error('User home not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error al cargar el perfil del usuario. Inténtalo de nuevo más tarde.');
      }
    };

    const fetchSolicitudes = async (home) => {
      try {
        const solicitudesResponse = await axios.get(`https://securityflow.onrender.com/invitation/get/requests/${home}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (Array.isArray(solicitudesResponse.data)) {
          setSolicitudes(solicitudesResponse.data);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
        setError('Error al cargar las solicitudes. Inténtalo de nuevo más tarde.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleAccept = async (invitationId) => {
    try {
      const response = await axios.post(`https://securityflow.onrender.com/invitation/aprove/${invitationId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(response.data);

      // Actualizar el estado para reflejar el cambio
      setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== invitationId));
    } catch (error) {
      console.error('Error approving invitation:', error);
      setError('Error al aceptar la invitación. Inténtalo de nuevo más tarde.');
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const response = await axios.post(`https://securityflow.onrender.com/invitation/deactivate/${invitationId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(response.data);

      // Actualizar el estado para reflejar el cambio
      setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== invitationId));
    } catch (error) {
      console.error('Error deactivating invitation:', error);
      setError('Error al rechazar la invitación. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 font-roboto_mono">
      <h1 className="mt-5 text-2xl text-[#6185A9] text-center font-bold mb-10">Solicitudes de Invitación</h1>
      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}
      {solicitudes.length > 0 ? (
        solicitudes.map((solicitud, index) => (
          solicitud.dates.map((date, dateIndex) => {
            const startDate = new Date(date.start_datetime).toLocaleDateString();
            const startTime = new Date(date.start_datetime).toLocaleTimeString();
            const endDate = new Date(date.end_datetime).toLocaleDateString();
            const endTime = new Date(date.end_datetime).toLocaleTimeString();
            return (
              <div key={`${index}-${dateIndex}`} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-96 mb-4">
                <div className="flex items-center mb-4">
                  <img src={solicitud.pictureurl} alt={solicitud.name} className="w-16 h-16 rounded-full mr-4" />
                  <p className="text-gray-700 font-roboto_mono mb-5">
                    <span className="font-bold text-black">Nombre:</span> {solicitud.name}
                  </p>
                </div>
                <p className="text-gray-700 font-roboto_mono mb-5">
                  <span className="font-bold text-black">Fecha de inicio:</span> {startDate} {startTime}
                </p>
                <p className="text-gray-700 font-roboto_mono mb-5">
                  <span className="font-bold text-black">Fecha de fin:</span> {endDate} {endTime}
                </p>
                <div className="flex justify-around">
                  <button
                    className="bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono hover:bg-yellow-600 transition duration-300"
                    onClick={() => handleAccept(solicitud.id)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="bg-red-400 text-white py-2 px-4 rounded-md font-roboto_mono"
                    onClick={() => handleReject(solicitud.id)}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            );
          })
        ))
      ) : (
        !error && <p>No hay solicitudes pendientes.</p>
      )}
    </div>
  );
};

export default Approve;



