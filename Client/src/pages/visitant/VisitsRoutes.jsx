import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProfileV from './ProfileV';
import Historial from './Historial';
import Invitaciones from './Invitaciones';
import GenerateQR from './GenerateQR';

const VisitsRoutes = () => {
    const adminMenuItems = [
        { label: 'Mi perfil', url: 'home' },
        { label: 'Historial', url: 'historial' },
        { label: 'Invitaciones', url: 'invitaciones' }
    ];
    return (
        <>
            <Navbar menuItems={adminMenuItems} />
            <Routes>
                <Route path='home' element={<ProfileV />} />
                <Route path='historial' element={<Historial />} />
                <Route path='invitaciones' element={<Invitaciones />} />
                <Route path='/qr' element={<GenerateQR />} />
                <Route path='/' element={<Navigate to='home' />} />
            </Routes>
        </>
    );
}

export default VisitsRoutes;
