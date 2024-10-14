import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainNormalResident from './MainNormalResident'
import Navbar from '../../components/Navbar';
import SolicitudVisita from './SolicitudVisita';
import GenerarQR from './GenerarQR';
import SolicitudUnica from './SolicitudUnica';
import SolicitudFrecuente from './SolicitudFrecuente';

const NormalResidentRoutes = () => {
    const adminMenuItems = [
        { label: 'Mi perfil', url: 'perfil' },
        { label: 'Solicitud de visita', url: 'solicitud'},
        { label: 'Generar QR', url: 'generar-qr'},
        

    ];


    return (
        <>
        <Navbar menuItems={adminMenuItems} />
        <Routes>
                <Route path='perfil' element={<MainNormalResident/>}/>
                <Route path='solicitud' element={<SolicitudVisita/>}/>
                <Route path='generar-qr' element={<GenerarQR/>}/>  
                <Route path='/unique' element={<SolicitudUnica/>}/>
                <Route path='/frequent' element={<SolicitudFrecuente/>}/>



                


                <Route path='/' element={<Navigate to='perfil'/>}/>
        </Routes>
        
        </> 
    )
    }

export default NormalResidentRoutes
