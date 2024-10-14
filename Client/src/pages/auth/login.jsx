import React, { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.css';
import google from '../../assets/google.svg';
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { checkUserExists, registerUser, loginUser } from '../../services/authService';
import { getUserRole } from '../../services/userService';
import { UserContext } from '../../utils/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const nav = (roleCode) => {
        switch (roleCode) {
            case 'ADMN':
                return '/admon';
            case 'RSDT':
                return '/resident';
            case 'RSNR':
                return '/normal';
            case 'GRDA':
                return '/security';
            case 'VSTT':
            default:
                return '/visits';
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const token = codeResponse.access_token;
                localStorage.setItem("access_token", token);
                console.log('Google access token:', token); // Verifica que el token de Google se obtiene

                const userInfo = await getUserInfo(token);
                console.log('User info from Google:', userInfo); // Verifica que la información del usuario se obtiene

                const userExists = await checkUserExists(userInfo.email);
                let backendResponse;
                if (userExists) {
                    backendResponse = await loginUser({ identifier: userInfo.email });
                } else {
                    const registerInfo = {
                        email: userInfo.email,
                        username: userInfo.name, // Usa el email como username
                    };
                    await registerUser(registerInfo);
                    backendResponse = await loginUser({ identifier: userInfo.email });
                }

                console.log('Backend response after login:', backendResponse); // Verifica la respuesta del backend

                const roles = await getUserRole();
                console.log('Roles obtained:', roles);

                let roleCode = 'VSTT';
                if (roles && roles.length > 0) {
                    roleCode = roles[0].role || 'VSTT';
                }

                const picture = userInfo.picture;
                const houseNumber = backendResponse.houseNumber || 'No asignado';

                const user = {
                    name: userInfo.name,
                    email: userInfo.email,
                    houseNumber: houseNumber,
                    picture,
                    id: backendResponse.id
                };

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", roleCode);
                localStorage.setItem("houseNumber", houseNumber);
                localStorage.setItem("picture", picture);

                setUser(user);

                const path = nav(roleCode);
                console.log('Redirigiendo a:', path);
                navigate(path);
            } catch (error) {
                console.error("Error during Google login process:", error);
            }
        },
        onError: (error) => console.log('Fallo al iniciar sesión', error),
    });

    const getUserInfo = async (token) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('User info from Google:', data); // Verifica que la imagen esté aquí
        return {
            name: data.name,
            email: data.email,
            sub: data.sub,
            picture: data.picture,
        };
    };

    return (
        <div className='flex items-center justify-center h-screen flex-col lg:flex-row'>
            <div className='flex flex-col items-center justify-center w-1/2 mx-auto text-center'>
                <h1 className='font-bold text-5xl m-4'>Bienvenido</h1>
                <img src={Logo} className='w-auto h-auto' alt="Logo de la compañía" />
                <h2 className='lg:text-2xl text-base m-4'>Acceso protegido: tu seguridad, nuestra prioridad</h2>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 lg:h-screen px-4 bg-blue-900 rounded-lg relative p-6'>
                <p className="text-white m-4 text-center">Ingresar al sistema</p>
                <button className="bg-white text-blue rounded-md py-2 px-4 flex items-center space-xy-2" 
                        onClick={() => loginWithGoogle()}>
                    <img src={google} alt="Google icon" className="h-6 w-6" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
