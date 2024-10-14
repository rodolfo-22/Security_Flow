import React from 'react';

const SolicitudesVisit = () => {
  const solicitudes = [
    {
      solicitanteEmail: 'marlene@hola.com',
      invitadoEmail: 'invitado1@hola.com',
      fechaHora: '2024-07-10T14:30:00Z',
    },
    {
      solicitanteEmail: 'marlene@hola.com',
      invitadoEmail: 'invitado2@hola.com',
      fechaHora: '2024-07-11T16:00:00Z',
    },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-7 mt-7 font-roboto_mono">Solicitudes de Invitación</h2>
      {solicitudes.length > 0 ? (
        solicitudes.map((solicitud, index) => {
          const fecha = new Date(solicitud.fechaHora).toLocaleDateString();
          const hora = new Date(solicitud.fechaHora).toLocaleTimeString();
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-96 mb-4">
              <p className="text-gray-700 font-roboto_mono mb-5">
                <span className="font-bold text-black ">Email del solicitante:</span> {solicitud.solicitanteEmail}
              </p>
              <p className="text-gray-700 font-roboto_mono mb-5">
                <span className="font-bold text-black">Email del invitado:</span> {solicitud.invitadoEmail}
              </p>
              <p className="text-gray-700 font-roboto_mono mb-5">
                <span className="font-bold text-black">Fecha:</span> {fecha}
              </p>
              <p className="text-gray-700 font-roboto_mono mb-5">
                <span className="font-bold text-black">Hora:</span> {hora}
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono hover:bg-yellow-600 transition duration-300"
                >
                  Aceptar
                </button>
                <button
                  className="bg-red-400 text-white py-2 px-4 rounded-md font-roboto_mono"
                >
                  Rechazar
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No hay solicitudes pendientes.</p>
      )}
    </div>
  );
};

export default SolicitudesVisit;
