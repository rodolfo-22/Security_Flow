import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, requiredRole }) => {
    const token = canActivate;
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
