import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table';
import { getResidentsByHome, changeUserRole } from '../../services/homeService.js';
import ClipLoader from 'react-spinners/ClipLoader'; // Importar el spinner

const GestionHogar = () => {
  const { houseNumber } = useParams();
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      setLoading(true); // Inicia el spinner
      const data = await getResidentsByHome(houseNumber);
      setResidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching residents:", error);
      setResidents([]);
    } finally {
      setLoading(false); // Detiene el spinner
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    let newRole;
    switch (currentRole) {
      case 'RSNR':
        newRole = 'RSDT';
        break;
      case 'RSDT':
        newRole = 'VSTT';
        break;
      default:
        newRole = 'VSTT';
    }

    try {
      setLoading(true); // Inicia el spinner al cambiar el rol
      await changeUserRole(userId, newRole, houseNumber);
      fetchResidents();
    } catch (error) {
      console.error("Error changing user role:", error);
    } finally {
      setLoading(false); // Detiene el spinner
    }
  };

  const columnas = [
    { Header: 'Nombre', accessor: 'username' },
    { Header: 'Correo electrónico', accessor: 'email' },
    { Header: 'Documento', accessor: 'dui' },
    { Header: 'Rol', accessor: 'role' },
    {
      Header: 'Acciones',
      Cell: ({ row }) => (
        row.original.role === 'Residente encargado' ? (
          <button
            className="bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono hover:bg-yellow-600 transition duration-300"
            onClick={() => handleRoleChange(row.original.code, row.original.role)}
          >
            Eliminar Encargado
          </button>
        ) : null
      )
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-azul-claro mt-4 md:mt-8 font-roboto_mono">
        Gestión de residentes para la casa {houseNumber}
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color={"#F8BD0D"} loading={loading} size={50} />
        </div>
      ) : (
        <Table 
          columnas={columnas} 
          datos={residents} 
        />
      )}
    </div>
  );
};

export default GestionHogar;
