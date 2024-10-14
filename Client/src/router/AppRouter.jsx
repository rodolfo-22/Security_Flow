import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import Login from "../pages/auth/login";
import AdmonRoutes from "../pages/admon/AdmonRoutes";
import ResidentRoutes from "../pages/resident/ResidentRoutes";
import NormalResidentRoutes from "../pages/normalResident/NormalResidentRoutes";
import VisitsRoutes from "../pages/visitant/VisitsRoutes";
import SecurityGuardRoutes from "../pages/securityGuard/SecurityGuardRoutes";

const AppRouter = () => {
    const token = localStorage.getItem('access_token');

    return (
    <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route element={<ProtectedRoute canActivate={!!token} requiredRole={'ADMN'}/>}>
                <Route path='/admon/*' element={<AdmonRoutes/>}/>
            </Route>
            <Route element={<ProtectedRoute canActivate={!!token} requiredRole={'RSDT'}/>}>
                <Route path='/resident/*' element={<ResidentRoutes/>}/>
            </Route>
            <Route element={<ProtectedRoute canActivate={!!token} requiredRole={'RSNR'}/>}>
                <Route path='/normal/*' element={<NormalResidentRoutes/>}/>
            </Route>
            <Route element={<ProtectedRoute canActivate={!!token} requiredRole={'VSTT'}/>}>
                <Route path='/visits/*' element={<VisitsRoutes/>}/>
            </Route>
            <Route element={<ProtectedRoute canActivate={!!token} requiredRole={'GRDA'}/>}>
                <Route path='/security/*' element={<SecurityGuardRoutes/>}/>
            </Route>
        </Routes>
    </>
    );
}

export default AppRouter;
