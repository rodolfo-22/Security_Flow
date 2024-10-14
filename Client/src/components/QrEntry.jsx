import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { useMediaQuery } from 'react-responsive';

const QrEntry = ({ invitationId }) => {
  const [qrString, setQrString] = useState('');
  const [userData, setUserData] = useState({ email: '', home: '' });
  const [qrLoaded, setQrLoaded] = useState(false); // Estado para controlar si el QR se ha cargado

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });

  const fetchQrString = async (id) => {
    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    try {
      const response = await axios.get(`https://securityflow.onrender.com/qr/generate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('QR string:', response.data);
      setQrString(response.data);
      setQrLoaded(true); // Marcar que el QR se ha cargado correctamente
    } catch (error) {
      console.error('Error fetching QR string:', error);
      setQrLoaded(false); // Marcar que hubo un error al cargar el QR
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    try {
      const response = await axios.get('https://securityflow.onrender.com/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User data:', response.data);
      setUserData({ email: response.data.email, home: response.data.home });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (invitationId) {
      fetchQrString(invitationId);
    }
    fetchUserData();
  }, [invitationId]); // Dependencias aseguran que se ejecuta al cambiar el ID de la invitación

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {qrLoaded ? (
        <motion.div 
          className='bg-white rounded-lg flex flex-col justify-center items-center'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className=""
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <QRCode value={qrString} size={isDesktopOrLaptop ? 300 : 175} />
          </motion.div>
          <p className='text-2xl text-center m-1 font-bold mt-10'>{userData.email}</p>
          <p className='text-2xl text-center m-1 font-bold'>{userData.home}</p>
        </motion.div>
      ) : (
        <ClipLoader size={50} color="#4fa94d" />
      )}
    </div>
  );
}

export default QrEntry;









