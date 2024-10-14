import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseCard from '../../components/HouseCard';
import { getAllHomes } from '../../services/homeService';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    setLoading(true); // Inicia el spinner
    try {
      const data = await getAllHomes();
      const housesWithDefaultReps = data.map(house => ({
        ...house,
        representatives: house.representatives.length > 0 ? house.representatives : ['N/A']
      }));
      setHouses(housesWithDefaultReps);
      setFilteredHouses(housesWithDefaultReps);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setLoading(false); // Detiene el spinner
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = houses.filter(
      house =>
        house.numHome.toString().includes(term) ||
        house.representatives.join(", ").toLowerCase().includes(term.toLowerCase())
    );
    setFilteredHouses(filtered);
  };

  const handleGestionClick = (houseNumber) => {
    navigate(`/gestionar/${houseNumber}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center w-full">
        <h2 className='text-3xl font-bold text-center text-azul-principal m-2 font-roboto_mono'>
          Búsqueda de Hogar
        </h2>
        <p className='text-center text-base mb-2 font-roboto_mono mt-5'>
          Ingrese número de casa o nombre de encargado para realizar su búsqueda
        </p>
        <div className='flex flex-col sm:flex-row justify-center items-center mt-2 w-full sm:w-auto'>
          <input
            type="text"
            placeholder="Número Hogar o Encargado"
            className='border border-gray-300 p-2 rounded-md w-full sm:w-64'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h2 className='text-3xl font-bold text-center text-azul-principal m-2 font-roboto_mono mt-7 mb-7'>
          Listado de Hogares
        </h2>
        <div className="flex flex-col items-center w-full">
          {loading ? (
            <ClipLoader color={"#F8BD0D"} loading={loading} size={50} />
          ) : (
            filteredHouses.length > 0 ? (
              filteredHouses.map((house) => (
                <HouseCard
                  key={house.numHome}
                  houseNumber={house.numHome}
                  representative={house.representatives.join(", ")}
                  onGestionClick={handleGestionClick}
                />
              ))
            ) : (
              <p className="text-gray-700 font-roboto_mono mt-4">No se encontraron resultados.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
