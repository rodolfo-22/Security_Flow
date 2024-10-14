import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import defaultImage from '../assets/profile.png';
import { getUserProfile, changeUsername, changeDui } from '../services/userService';

const PerfilCardComp = () => {
    const { user, setUser } = useContext(UserContext);
    const [userImage, setUserImage] = useState(defaultImage);
    const [username, setUsername] = useState('');
    const [dui, setDui] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUser(profile);
                setUsername(profile.name);
                setDui(profile.dui || '00000000-0'); // Set default DUI if none is assigned
                const picture = localStorage.getItem("picture") || profile.pictureurl;
                if (picture) {
                    setUserImage(picture);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [setUser]);

    const handleSaveChanges = async () => {
        try {
            await changeUsername(username);
            await changeDui(dui);
            setIsEditing(false);
            const profile = await getUserProfile(); // Refresca los datos del perfil
            setUser(profile);
            setUsername(profile.name);
            setDui(profile.dui || '00000000-0'); // Set default DUI if none is assigned
            const picture = localStorage.getItem("picture") || profile.pictureurl;
            if (picture) {
                setUserImage(picture);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="flex flex-col items-center bg-gray-900 w-4/5 rounded-2xl font-roboto_mono text-white p-6">
                <div className="mt-12 mb-4">
                    <img src={userImage} alt="Avatar" className="w-40 h-40 rounded-full object-cover" />
                </div>
                {isEditing ? (
                    <div className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-center text-3xl mb-2 bg-gray-700 p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            value={dui}
                            onChange={(e) => setDui(e.target.value)}
                            className="text-center text-base sm:text-2xl mb-2 bg-gray-700 p-2 rounded w-full"
                        />
                        <button
                            className='bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono mt-4'
                            onClick={handleSaveChanges}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full">
                        <p className='text-center text-3xl mb-2'>{username}</p>
                        <p className='text-center text-base sm:text-2xl mb-2'>{user.email}</p>
                        <p className='text-center text-base sm:text-2xl mb-2'>
                            <span className="font-bold">DUI: </span>{dui}
                        </p>
                        <button
                            className='bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono mt-4'
                            onClick={() => setIsEditing(true)}
                        >
                            Editar Perfil
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerfilCardComp;
