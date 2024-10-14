package com.uca.project.services.servicesImpl;

import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.HomeRepository;
import com.uca.project.repositories.RoleRepository;
import com.uca.project.repositories.UserRepository;
import com.uca.project.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final HomeRepository homeRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository, UserRepository userRepository, HomeRepository homeRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.homeRepository = homeRepository;
    }

    @Override
    public void addRole(String code, String name) {
        Role role = new Role();
        role.setRole(code);
        role.setName(name);
        roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(Role role, User user) {
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        if(user.getRoles() != null && !user.getRoles().isEmpty()){
            if(role.getRole().contains("VSTT") || role.getRole().contains("ADMN") || role.getRole().contains("GRDA")){
                if(user.getRoles().get(0).getRole().contains("RSDT")
                        || user.getRoles().get(0).getRole().contains("RSNR")){
                    user.setHomes(Collections.emptyList());
                }
            }
        }

        user.setRoles(roles);
        userRepository.save(user);
    }

    @Override
    public Role getRole(String identifier) {
        return roleRepository.findByRoleOrName(identifier, identifier);
    }
}
