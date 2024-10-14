import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';

const ScanQR = () => {
  const [message, setMessage] = useState('');
  const [isScannerActive, setIsScannerActive] = useState(true);

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
    setMessage('Error al escanear el QR');
  };

  const validateQR = async (qrValue, token) => {
    try {
      const response = await axios.post(`https://securityflow.onrender.com/qr/validate/${qrValue}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage('QR validado');
        return true;
      } else {
        setMessage('QR incorrecto');
        return false;
      }
    } catch (error) {
      console.error('Validation Error:', error);
      setMessage('QR incorrecto');
      return false;
    }
  };

  const sendMessage = async (token) => {
    try {
      const response = await axios.get('https://securityflow.onrender.com/mqtt/publish?message=open', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessage('Error al enviar el mensaje');
    }
  };

  const handleScan = async (data) => {
    if (data != null && isScannerActive) {
      const qrValue = data.text;
      console.log(qrValue);

      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('No se encontró el token de acceso');
        return;
      }

      setIsScannerActive(false); // Deshabilitar el escáner

      const isValid = await validateQR(qrValue, token);
      if (isValid) {
        await sendMessage(token);
      }

      // Mostrar mensaje y recargar la página después de una breve demora
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Demora de 3 segundos
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 px-4">
      <h1 className="text-3xl font-roboto_mono mb-4 text-center mt-8 text-sky-700">Escanear QR</h1>
      <section className="bg-gray-300 shadow-md rounded p-6 mb-8 flex flex-col items-center">
        {isScannerActive ? (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="outline outline-4 outline-slate-600 rounded justify-center"
          />
        ) : (
          <p>Escaneando...</p>
        )}
      </section>
      {message && (
        <p className="text-center mt-4 p-2 rounded bg-blue-100 text-blue-800 border border-blue-200">
          {message}
        </p>
      )}
    </div>
  );
};

export default ScanQR;




