import { useState, useEffect } from "react";
import axios from "axios";
import image from '../../assets/profile.png';  // Ruta de la imagen proporcionada
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";

const AddResidents = () => {
    const [residents, setResidents] = useState([]);
    const [numHome, setNumHome] = useState(null);
    const [formValues, setFormValues] = useState({
        email: ''
    });
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [message, setMessage] = useState('');  // Estado para el mensaje de éxito o error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos nulos
        if (!formValues.email) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axios.post('https://securityflow.onrender.com/home/assign/normal', {
                    identifier: formValues.email,
                    num_home: numHome
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setMessage('Residente añadido');
                // Actualizar la lista de residentes después de añadir uno nuevo
                fetchUserProfile();
                // Vaciar los campos del formulario
                setFormValues({ email: '' });
                // Borrar el mensaje después de 3 segundos
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } catch (error) {
                setMessage('Error al añadir residente');
                setFormValues({ email: '' });
                console.error('Error adding resident:', error);
                // Borrar el mensaje después de 3 segundos
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } else {
            setMessage('No token found in local storage');
            // Borrar el mensaje después de 3 segundos
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleDelete = async (email) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                await axios.post('https://securityflow.onrender.com/auth/user-role', {
                    identifier: email,
                    role_name: "VSTT"  // Rol a ser asignado como visitante
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setMessage('Residente eliminado');
                // Actualizar la lista de residentes después de eliminar uno
                fetchUserProfile();
                // Borrar el mensaje después de 3 segundos
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } catch (error) {
                setMessage('Error al eliminar residente');
                console.error('Error deleting resident:', error);
                // Borrar el mensaje después de 3 segundos
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } else {
            setMessage('No token found in local storage');
            // Borrar el mensaje después de 3 segundos
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const userProfileResponse = await axios.get('https://securityflow.onrender.com/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userProfile = userProfileResponse.data;
                setNumHome(userProfile.home);

                if (userProfile.home) {
                    const residentsResponse = await axios.get(`https://securityflow.onrender.com/home/residents?numHome=${userProfile.home}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const filteredResidents = residentsResponse.data.filter(resident => resident.role === "Residente normal");
                    setResidents(filteredResidents);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);  // Finaliza la carga
            }
        } else {
            console.error('No token found in local storage');
            setLoading(false);  // Finaliza la carga si no hay token
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen w-full font-roboto_mono p-4">
            <h1 className="text-2xl text-[#6185A9] text-center font-bold">Añadir residentes al hogar</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
                <div className="flex flex-col mt-4 mb-4">
                    <label className="text-lg mb-2">Correo electrónico:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Correo electrónico"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.email} 
                        onChange={handleChange} 
                    />
                </div>

                <button type="submit" className="p-3 rounded-md bg-[#F79E9E] w-full mb-4 hover:bg-[#F79E9E] hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                    Añadir
                </button>
            </form>

            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

            <h1 className='text-2xl text-[#6185A9] text-center font-bold mb-4'>Residentes activos</h1>

            {loading ? (
                <ClipLoader color={"#6185A9"} loading={loading} size={50} />  // Muestra el spinner mientras carga
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {residents.map(resident => (
                        <motion.div 
                            key={resident.code} 
                            className='bg-[#D9D9D9] bg-opacity-52 p-4 rounded-md flex flex-col justify-between items-center w-full min-h-[150px]'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img className='w-16 h-16 mb-4' src={image} alt="profile"/>
                            <div className='flex flex-col justify-center items-center text-center'>
                                <p className="font-semibold">{resident.username}</p>
                                <p>{resident.email}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(resident.email)} 
                                className='bg-[#F8BD0D] bg-opacity-70 p-2 mt-4 rounded-md hover:bg-[#F8BD0D] hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95'
                            >
                                Eliminar
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AddResidents;








