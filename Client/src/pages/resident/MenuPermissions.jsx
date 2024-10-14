import { useState, useEffect } from "react";
import plus from '../../assets/Vectorplus.svg';
import profile from "../../assets/profile.png";
import { useNavigate } from 'react-router-dom';
import { usePopup } from "../../components/PopupContext";
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import axios from 'axios';

const MenuPermissions = () => {
    const navigate = useNavigate();
    const { showPopup } = usePopup();

    const [home, setHome] = useState('');
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

            if (!token) {
                showPopup("Token no encontrado", false);
                setLoading(false);
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
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [showPopup]);

    useEffect(() => {
        if (home) {
            const fetchInvitations = async () => {
                const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

                if (!token) {
                    showPopup("Token no encontrado", false);
                    setLoading(false);
                    return;
                }

                try {
                    const response = await fetch(`https://securityflow.onrender.com/invitation/get/invitations/${home}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Invitaciones:', data); // Imprimir en consola la info obtenida
                        setInvitations(data || []); // Guardar las invitaciones en la variable de estado
                    } else {
                        showPopup("Error al obtener las invitaciones", false);
                    }
                } catch (error) {
                    showPopup("Error de conexión", false);
                } finally {
                    setLoading(false); // Marcar la carga como completa
                }
            };

            fetchInvitations();
        }
    }, [home, showPopup]);

    const handleUnique = () => {
        navigate('/resident/UniqueP');
    }

    const handleMultiple = () => {
        navigate('/resident/MultipleP');
    }

    const handleRevoke = async (invitationId) => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            showPopup("Token no encontrado", false);
            return;
        }

        try {
            const response = await axios.post(`https://securityflow.onrender.com/invitation/deactivate/${invitationId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                showPopup("Removido exitosamente", true);
                // Actualizar la lista de invitaciones después de revocar una
                setInvitations((prevInvitations) => prevInvitations.filter(inv => inv.id !== invitationId));
            } else {
                showPopup("Error al revocar la invitación", false);
            }
        } catch (error) {
            console.error('Error revoking invitation:', error);
            showPopup("Error de conexión", false);
        }
    };

    const VisitCard = ({ id, name, pictureUrl, dates }) => {
        return (
            <motion.div
                className="bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col sm:flex-row justify-between items-center m-2 w-full sm:w-auto font-roboto_mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center mb-2 sm:mb-0">
                    <img className="w-10 h-10 sm:mr-5 m-1" src={pictureUrl || profile} alt="profile" />
                    <div className="flex flex-col justify-center items-start sm:mr-5 m-1">
                        <p className="pt-1">{name}</p>
                        {dates.map((date, index) => (
                            <div key={index}>
                                <p className="pt-1">{new Date(date.start_datetime).toLocaleDateString()}</p>
                                <p className="pt-1">{new Date(date.start_datetime).toLocaleTimeString()} - {new Date(date.end_datetime).toLocaleTimeString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center w-full sm:w-auto">
                    <button className="rounded-md bg-[#F79E9E] p-2 m-1 w-full sm:w-auto hover:bg-red-600 transition duration-300" onClick={() => handleRevoke(id)}>Revocar</button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col items-center font-roboto_mono p-4">
            <h1 className="mt-5 text-2xl text-[#6185A9] text-center font-bold mb-10">Crear permisos de acceso</h1>

            <div onClick={handleUnique} className="bg-[#F5CB50] bg-opacity-70 rounded-lg p-3 m-2 flex flex-row justify-between w-full sm:w-44 cursor-pointer hover:bg-yellow-400 transition duration-300">
                <p className='pr-3'>Único</p>
                <img className='w-4 h-4' src={plus} alt="añadir" />
            </div>
            <div onClick={handleMultiple} className="bg-[#F5CB50] bg-opacity-70 rounded-lg p-3 m-2 flex flex-row items-center justify-between w-full sm:w-44 cursor-pointer hover:bg-yellow-400 transition duration-300">
                <p className='pr-3'>Frecuente</p>
                <img className='w-4 h-4' src={plus} alt="añadir" />
            </div>

            <h2 className='mt-10 text-2xl text-[#6185A9] text-center font-bold mb-10'>Permisos creados</h2>
            {loading ? (
                <div className="flex justify-center items-center h-96 w-full">
                    <ClipLoader size={50} color="#4fa94d" />
                </div>
            ) : (
                <div className='overflow-y-auto h-96 w-full flex justify-center'>
                    {Array.isArray(invitations) && invitations.length > 0 ? (
                        <div className="w-full sm:w-3/4 lg:w-2/3">
                            {invitations.map((invitation, index) => (
                                <VisitCard
                                    key={index}
                                    id={invitation.id}
                                    name={invitation.name}
                                    pictureUrl={invitation.pictureurl}
                                    dates={invitation.dates}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No hay permisos creados</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MenuPermissions;





