import AddIcon  from "../../assets/add.png"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';



const  SolicitudVisita = () => {


  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path); // Navega a la ruta proporcionada
  };
  
    return (
      <div className=" p-4">
                <h1 className="text-3xl font-bold font-roboto_mono mb-4 text-center text-azul-claro mt-5 md:mt-8"> Crear solicitudes de visita </h1>
                <p className="text-2xl font-medium mb-6 text-center text-black mt-5">Selecciona la opcion que desees</p>

                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10">
        <button
          className="bg-amarillo-principal font-roboto_mono font-bold p-3 sm:p-5 md:p-6 lg:p-8 flex items-center justify-center space-x-2 rounded-md w-full sm:w-auto border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleButtonClick('/normal/unique')}
        >
          <span className="text-sm sm:text-base md:text-lg lg:text-xl">Única vez</span>
          <img src={AddIcon} alt="Añadir" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        </button>
        <button
          className="bg-amarillo-principal font-roboto_mono font-bold p-3 sm:p-5 md:p-6 lg:p-8 flex items-center justify-center space-x-2 rounded-md w-full sm:w-auto border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleButtonClick('/normal/frequent')}
        >
          <span className="text-sm sm:text-base md:text-lg lg:text-xl">Frecuente</span>
          <img src={AddIcon} alt="Añadir" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        </button>
      </div>
    </div>
  );
  }

export default SolicitudVisita;