package com.uca.project.repositories;

import com.uca.project.domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
    Role findByRoleOrName(String role, String name);
    Role findByRole(String role); // Método para encontrar roles por nombre

}
