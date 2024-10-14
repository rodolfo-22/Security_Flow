import React, { useState, useEffect } from 'react';
import { usePopup } from "../../components/PopupContext";
import { assignUserToHome, addHome, getAllHomes } from "../../services/homeService";
import { getUserRole, getUserProfile } from "../../services/userService";

const HomeManager = () => {
  const [numHome, setNumHome] = useState('');
  const [email, setEmail] = useState('');
  const { showPopup } = usePopup();
  const [homes, setHomes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener todas las casas y usuarios al cargar el componente
    const fetchHomesAndUsers = async () => {
      try {
        const homesData = await getAllHomes();
        const usersData = await getUserProfile();
        setHomes(homesData);
        setUsers(usersData);
      } catch (error) {
        showPopup(`Error: ${error.response ? error.response.data : error.message}`, false);
      }
    };

    fetchHomesAndUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verificar si el número de casa ya existe
      const homeExists = homes.some(home => home.numHome === numHome);
      if (homeExists) {
        showPopup("Este número ya ha sido asignado", false);
        return;
      }

      // Verificar el rol del usuario
      const user = users.find(user => user.email === email);
      if (user && user.roles && user.roles.length > 0) {
        showPopup("El usuario ya tiene un rol activo", false);
        return;
      }

      // Agregar la casa
      await addHome(numHome);

      // Asignar el usuario como encargado de la casa
      await assignUserToHome(email, numHome);

      showPopup("Casa y usuario asignado con éxito", true);
      setNumHome('');
      setEmail('');
    } catch (error) {
      showPopup(`Error: ${error.response ? error.response.data : error.message}`, false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col w-full'>
      <h1 className="text-2xl font-bold text-center text-azul-principal m-2 font-roboto_mono">Asignar usuario encargado a Hogar</h1>
      <div className='flex flex-col mt-2 w-[150px] sm:w-[332px]'>
        <label htmlFor="houseNumber" className='text-base m-2 font-roboto_mono'>Número de casa:</label>
        <input
          type="text"
          id="houseNumber"
          placeholder="Ingrese el número de casa"
          className='border border-gray-300 p-2 rounded-md'
          value={numHome}
          onChange={(e) => setNumHome(e.target.value)}
        />
        <label htmlFor="identifier" className='text-base m-2 font-roboto_mono'>Nombre o Correo del Usuario:</label>
        <input
          type="email"
          id="identifier"
          placeholder="Ingrese el nombre o correo electrónico del usuario"
          className="border border-gray-300 p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className='bg-amarillo-principal text-black m-2 w-20 py-2 rounded-md font-roboto_mono mt-7'
          onClick={handleSubmit}
        >
          Asignar Usuario
        </button>
      </div>
    </div>
  );
}

export default HomeManager;
