import React, { useState, useEffect } from "react";
import { usePopup } from "../../components/PopupContext";

const UPermission = () => {
  const { showPopup } = usePopup();

  const [formValues, setFormValues] = useState({
    email: '',
    date: '',
    time: '',
    finalTime: ''
  });

  const [home, setHome] = useState(''); // Variable de estado para guardar el valor de home
  const [errors, setErrors] = useState({}); // Variable de estado para errores de validación

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

      if (!token) {
        showPopup("Token no encontrado", false);
        return;
      }

      try {
        const response = await fetch('https://securityflow.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Datos del usuario:', data); // Imprimir en consola la info obtenida
          setHome(data.home || ''); // Guardar el valor de home en la variable de estado
        } else {
          showPopup("Error al obtener los datos del usuario", false);
        }
      } catch (error) {
        showPopup("Error de conexión", false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    let newErrors = {};
    if (!formValues.email) newErrors.email = 'El correo electrónico es obligatorio';
    if (!formValues.date) newErrors.date = 'La fecha es obligatoria';
    if (!formValues.time) newErrors.time = 'La hora de llegada es obligatoria';
    if (!formValues.finalTime) newErrors.finalTime = 'La hora de salida es obligatoria';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

    if (!token) {
      showPopup("Token no encontrado", false);
      return;
    }

    const payload = {
      house_number: home, // Usar el valor de home en el payload
      user_identifier: formValues.email,
      request: true, //para que esta necesita revicion de parte del encargado
      initial_dates: [`${formValues.date}T${formValues.time}:00`],
      final_dates: [`${formValues.date}T${formValues.finalTime}:00`]
    };

    try {
      const response = await fetch('https://securityflow.onrender.com/invitation/add/unique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token Bearer a los encabezados
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 201) {
        showPopup("Solicitud enviada exitosamente", true);
        setFormValues({ email: '', date: '', time: '', finalTime: '' }); // Vaciar los campos del formulario
        setErrors({}); // Limpiar los errores
      } else {
        showPopup("Error al enviar la solicitud", false);
      }
    } catch (error) {
      showPopup("Error de conexión", false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    showPopup("Solicitud cancelada", false);
  };

  return (
    <div className="flex items-center h-screen flex-col w-full font-roboto_mono">
      <h1 className="text-2xl text-[#6185A9] text-center pt-4 pb-1">Detalles de la solicitud</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-4 mb-4 width-auto">
          <label className="text-xl mb-2">Correo electrónico:</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Correo electrónico"
            className={`border ${errors.email ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            value={formValues.email} 
            onChange={handleChange} 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="flex flex-col mt-4 mb-4">
          <label className="text-xl mb-2">Fecha de visita:</label>
          <input 
            type="date" 
            name="date" 
            className={`border ${errors.date ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            value={formValues.date} 
            onChange={handleChange} 
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div className="flex flex-col mt-4 mb-4">
          <label className="text-xl mb-2">Hora de llegada:</label>
          <input 
            type="time" 
            name="time" 
            className={`border ${errors.time ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            value={formValues.time} 
            onChange={handleChange} 
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        <div className="flex flex-col mt-4 mb-8">
          <label className="text-xl mb-2">Hora de salida:</label>
          <input 
            type="time" 
            name="finalTime" 
            className={`border ${errors.finalTime ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            value={formValues.finalTime} 
            onChange={handleChange} 
          />
          {errors.finalTime && <p className="text-red-500 text-sm">{errors.finalTime}</p>}
        </div>
        <div className="flex flex-row pt-2">
          <div className="p-4 mr-4 rounded-lg bg-[#F8BD0D] bg-opacity-70 hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
            <button type="submit">Aceptar</button>
          </div>
          <div className="p-4 rounded-lg bg-[#F79E9E] hover:bg-red-600 transition duration-300 transform hover:scale-105">
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UPermission;


