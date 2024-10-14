import React, { useState } from 'react';

const RegistroVisitas = () => {
  const [filtro, setFiltro] = useState(''); // Estado para el filtro
  const [visitas, setVisitas] = useState([
    { id: 1, nombre: 'Carlos', fecha: '2022-05-12', motivo: 'Reunión' },
    { id: 2, nombre: 'María', fecha: '2022-05-13', motivo: 'Entrevista' },
    // Agregar más datos de visita según sea necesario
  ]); // Estado para las visitas

  // Función para manejar cambios en el filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  }

  // Filtrar las visitas según el filtro
  const visitasFiltradas = visitas.filter(visita =>
    visita.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    visita.fecha.includes(filtro) ||
    visita.motivo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className='w-full h-full mt-6 mr-6 ml-6'> {/* Contenedor con tamaño máximo */}

      <div className='m-6 flex justify-center'>
        <h1 className='font-bold text-2xl'>Registro de visitas </h1>
      </div>

      {/* Filtro */}

      <div className='flex justify-end'>
        <input
          type="text"
          placeholder="Filtrar"
          value={filtro}
          onChange={handleFiltroChange}
          className="p-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>

      {/* Tabla de visitas con tamaño fijo */}
      <table className="w-full">
        <thead>
          <tr className='bg-[#F8BD0D] bg-opacity-70'>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Motivo</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Hora</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {visitasFiltradas.map(visita => (
            <tr key={visita.id}>
              <td className="border px-4 py-2">{visita.id}</td>
              <td className="border px-4 py-2">{visita.nombre}</td>
              <td className="border px-4 py-2">{visita.fecha}</td>
              <td className="border px-4 py-2">{visita.motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistroVisitas;
