import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Configurar la conexión al servidor MQTT
    const client = mqtt.connect('ws://157.230.230.162:9001');

    // Evento cuando la conexión es exitosa
    client.on('connect', () => {
      console.log('Conectado al servidor MQTT');
      setIsConnected(true);

      // Suscribirse a un tema
      client.subscribe('prueba', (err) => {
        if (!err) {
          console.log('Suscrito al tema');
        }
      });
    });

    // Evento cuando llega un mensaje
    client.on('message', (topic, message) => {
      console.log(`Mensaje recibido del tema ${topic}: ${message.toString()}`);
      setMessage(message.toString());
    });

    // Guardar el cliente en el estado
    setClient(client);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      <h1>MQTT en React</h1>
      <p>{isConnected ? 'Conectado' : 'Desconectado'}</p>
      <p>Mensaje recibido: {message}</p>
    </div>
  );
};

export default MQTTComponent;
