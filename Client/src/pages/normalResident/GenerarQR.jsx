import React, { useState, useEffect } from 'react';
import QrEntry from '../../components/QrEntry';

const GenerarQR = () => {

    return (
      <div>
        <div className="flex pt-10 flex-col" >
          <QrEntry />
        </div>
      </div>

    );
  }

export default GenerarQR;

/* const [filtro, setFiltro] = useState(''); // Estado para el filtro
const [visitas, setVisitas] = useState([
  { id: 1, nombre: 'Carlos', fecha: '2022-05-12', motivo: 'Reunión' },
  { id: 2, nombre: 'María', fecha: '2022-05-13', motivo: 'Entrevista' },
  // Agregar más datos de visita según sea necesario
]); // Estado para las visitas

// Función para manejar cambios en el filtro
const handleFiltroChange = (event) => {
  setFiltro(event.target.value);
}

  // Función para eliminar una visita por id
  const handleEliminar = (id) => {
    setVisitas(visitas.filter(visita => visita.id !== id));
  }


// Definir las columnas para la tabla de visitas
const columnas = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Nombre', accessor: 'nombre' },
  { Header: 'Fecha', accessor: 'fecha' },
  { Header: 'Motivo', accessor: 'motivo' },
];

return (
  <div>
  <h1 className="text-3xl font-bold mb-4 text-center text-azul-claro mt-4 md:mt-8 font-roboto_mono" > Generar clave </h1>
  


  <Table
  columnas={columnas}
  datos={visitas}
  filtro={filtro}
  handleFiltroChange={handleFiltroChange}
  handleEliminar={handleEliminar}

  />
</div>

);
} */