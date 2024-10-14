import React from 'react'
import MainSecurityGuard from './MainSecurityGuard'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import AnonymousEntry from './AnonymousEntry';
import ScanQR from './ScanQR';


const SecurityGuardRoutes = () => {
    const adminMenuItems = [
        { label: 'Perfil', url: 'home' },
        { label: 'Entrada anónima', url: 'anonentry'},
        { label: 'Escanear QR', url: 'scan'}

    ];
    return (
        <>
        <Navbar menuItems={adminMenuItems} />
        <Routes>
                <Route path='home' element={<MainSecurityGuard/>}/>
                <Route path='anonentry' element={<AnonymousEntry />} />
                <Route path='scan' element={<ScanQR />}/>
                


                <Route path='/' element={<Navigate to='home'/>}/>
        </Routes>
        
        </>
    )
}

export default SecurityGuardRoutes
