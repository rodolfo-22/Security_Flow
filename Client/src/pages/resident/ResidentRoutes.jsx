import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import MPermission from './MPermission';
import MenuPermissions from './MenuPermissions';
import UPermission from './UPermission';
import PerfilCard from './PerfilCard';
import AddResidents from './AddResidents';
import ViewVisits from './ViewVisits';
import Entries from './Entries';
import SolicitudesVisit from './Approve';

const ResidentRoutes = () => {
    const adminMenuItems = [
        { label: 'Home', url: 'home' },
        { label: 'Crear permisos', url: 'MPermissions' },
        { label: 'Solicitudes', url: 'Nsolicitudes'},
        { label: 'Entradas', url: 'QR' },
        { label: 'Gestionar residentes', url: 'addResidents' },
        { label: 'Registro de visitas', url: 'visits' }

    ];
    
    return (
        <>
        <Navbar menuItems={adminMenuItems} />
            <Routes>
                    <Route path='home' element={<PerfilCard/>}/>
                    <Route path='MPermissions' element={<MenuPermissions/>}/>
                    <Route path='Nsolicitudes' element={<SolicitudesVisit/>}/>
                    <Route path='QR' element={<Entries/>}/>
                    <Route path='MultipleP' element={<MPermission/>}/>
                    <Route path='UniqueP' element={<UPermission/>}/>
                    <Route path='addResidents' element={<AddResidents/>}/>
                    <Route path='visits' element={<ViewVisits/>}/>
                    
                    <Route path='/' element={<Navigate to='home'/>}/>
            </Routes>
            
        </>
    )
}

export default ResidentRoutes
