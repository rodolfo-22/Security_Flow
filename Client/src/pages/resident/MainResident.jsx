import React, {useState} from 'react';

import logo from '../../assets/Logo.png'
import miPerfilImg from '../../assets/profile_lg.png'
import registro from '../../assets/register_lg.png'
import gestion from '../../assets/manag_lg.png'
import visitas from '../../assets/invita_lg.png'
import qr from '../../assets/qr_lg.png'
import exit from '../../assets/exit_lg.png'
import PerfilCard from './PerfilCard';
import RegistroVisitas from './RegistroVisitas';
import { useNavigate } from 'react-router-dom';
import { MenuIcon} from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';


const MainResident = () => {

  const navigate = useNavigate();

  const menuOptions = ['Perfil', 'Registro', 'Gestion', 'Solicitud', 'Qr', 'Exit'];

  const [optionSelected, setOptionSelected] = useState(menuOptions[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleClick = (option) => {

    setOptionSelected(option);
    setIsMenuOpen(false); // Cierra el menú desplegable

  }

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    navigate('/');
  }

  return (

    <div className='flex flex-col lg:flex-row h-full w-screen font-roboto_mono' >

      <div className='bg-[#D9D9D9] lg:w-1/8 p-2'>

        <div className='flex flex-row items-center justify-between lg:flex-col lg:justify-between'>

          <div>
            <img src={logo} alt="Logo" className='w-15 h-10 lg:w-50 lg:h-40'/>
          </div>

          <button className="lg:hidden">
            <MenuIcon className="w-8 h-8" onClick={() => setIsMenuOpen(!isMenuOpen)}/>
          </button>
      
          <div class='text-2xl flex flex-col items-center  lg:block'>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Perfil')}>
              <img src={miPerfilImg} alt="Mi perfil" class='w-8 h-8 mr-4'/>
              Mi perfil
            </div>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Registro')}>
              <img src={registro} alt="Registro" class='w-8 h-8 mr-4'/>
              Historial
            </div>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Gestion')}>
              <img src={gestion} alt="Gestión" class='w-8 h-8 mr-4'/>
              Residentes
            </div>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Solicitud')}>
              <img src={visitas} alt="Visitas" class='w-8 h-8 mr-4'/>
              Solicitudes
            </div>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Qr')}>
              <img src={qr} alt="QR" class='w-8 h-8 mr-4'/>
              Generar QR
            </div>
            <div class='p-1 rounded-md m-6 flex items-center hover:bg-[#F8BD0D] hover:bg-opacity-60 cursor-pointer' onClick={() => logOut()}>
              <img src={exit} alt="Salir" class='w-8 h-8 mr-4'/>
              Cerrar sesión
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={isMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className="lg:hidden absolute right-0 top-0 w-2/2 h-full bg-[#F8BD0D] bg-opacity-80 z-50"
          >
            {/* Botón para cerrar el menú */}
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
              <XIcon className="w-8 h-8" />
            </button>
            {/* Contenido de la transición aquí */}
            <ul className='text-2xl flex flex-col items-start lg:hidden'>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Perfil')}>
                <img src={miPerfilImg} alt="Mi perfil" className='w-8 h-8 mr-4'/>
                Mi perfil
              </li>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Registro')}>
                <img src={registro} alt="Registro" className='w-8 h-8 mr-4'/>
                Registro de visitas
              </li>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Gestion')}>
                <img src={gestion} alt="Gestión" className='w-8 h-8 mr-4'/>
                Gestión de residentes
              </li>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Solicitud')}>
                <img src={visitas} alt="Visitas" className='w-8 h-8 mr-4'/>
                Solicitudes de visita
              </li>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#6185A9] cursor-pointer' onClick={() => handleClick('Qr')}>
                <img src={qr} alt="QR" className='w-8 h-8 mr-4'/>
                Generación de códigos QR
              </li>
              <li className='p-4 rounded-md m-6 flex items-center hover:bg-[#F8BD0D] hover:bg-opacity-60 cursor-pointer' onClick={() => logOut()}>
                <img src={exit} alt="Salir" className='w-8 h-8 mr-4'/>
                Cerrar sesión
              </li>
            </ul>
          </div>
        )}
      </Transition>

      <div className='bg-white lg:w-4/5 h-screen'>
        {/* Renderiza el componente correspondiente a la opción seleccionada */}
        {optionSelected === 'Perfil' && <PerfilCard />}
        {optionSelected === 'Registro' && <RegistroVisitas />}
        {optionSelected === 'Gestion' && <p>Gestión de residentes</p>}
        {optionSelected === 'Solicitud' && <p>Solicitud de visitas</p>}
        {optionSelected === 'Qr' && <p>Generar Qr</p>}
        {optionSelected === 'Exit' && <p>Cerrar sesión</p>}
      </div>

    </div>

  );
}

export default MainResident;