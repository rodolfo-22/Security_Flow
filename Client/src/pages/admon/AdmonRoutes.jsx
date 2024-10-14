// src/pages/AdmonRoutes.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Guard from './Guards';
import History from './History';
import Home from './Home';
import Navbar from '../../components/Navbar';
import HomeManager from './HomeManager';
import GestionHogar from './GestionHogar';

const AdmonRoutes = () => {

    const adminMenuItems = [
        { label: 'Entradas', url: '/admon' },
        { label: 'Gestionar Hogares', url: '/admon/manager' },
        { label: 'Historial', url: '/admon/home' },
        { label: 'Gestionar Guardias', url: '/admon/guard' },
    ];

    return (
        <>
            <Navbar menuItems={adminMenuItems} />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/manager" element={<HomeManager />} />
                <Route path="/guard" element={<Guard />} />
                <Route path="/" element={<History />} />
                <Route path="/gestionar/:houseNumber" element={<GestionHogar />} />
                <Route path="/" element={<Navigate to="/admon/history" />} />
            </Routes>
        </>
    );
}

export default AdmonRoutes;
