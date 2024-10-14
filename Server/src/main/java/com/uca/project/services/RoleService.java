package com.uca.project.services;

import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;

public interface RoleService {
    void addRole(String role, String name);
    void addRoleToUser(Role role, User user);
    Role getRole(String identifier);
}
