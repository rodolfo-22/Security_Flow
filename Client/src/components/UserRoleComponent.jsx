import React, { useState, useEffect } from 'react';
import { getUserRole } from '../../services/userService';

const UserRoleComponent = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const roleData = await getUserRole();
                setRoles(roleData);
            } catch (error) {
                setError('Error fetching user roles');
            }
        };

        fetchUserRole();
    }, []);

    return (
        <div>
            <h1>Roles del Usuario</h1>
            {error && <p>{error}</p>}
            <ul>
                {roles.map((role, index) => (
                    <li key={index}>{role.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserRoleComponent;
