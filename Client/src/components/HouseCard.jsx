import React from 'react';
import { useNavigate } from 'react-router-dom';

const HouseCard = ({ houseNumber, representative, onGestionClick }) => {
  const navigate = useNavigate();

  const handleGestionClick = () => {
    navigate(`/admon/gestionar/${houseNumber}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-96 mb-4">
      <p className="text-gray-700 font-roboto_mono mb-2">
        <span className="font-bold">Casa Número:</span> {houseNumber}
      </p>
      <p className="text-gray-700 font-roboto_mono mb-4">
        <span className="font-bold">Representante:</span> {representative}
      </p>
      <button
        className="bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono hover:bg-yellow-600 transition duration-300"
        onClick={handleGestionClick}
      >
        Gestión de residentes
      </button>
    </div>
  );
};

export default HouseCard;
