package com.uca.project.repositories;

import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findOneUserByUsernameOrEmail(String username, String email);
    User findOneUserByUsernameOrEmailOrCode(String username, String email, UUID id);
    User findUserByUsername(String username);   //tambien lo uso admin view
    User findUserByEmail(String email); //lo uso para el login con google

    List<User> findByRolesContaining(Role role);    //lo uso para vista admin, listar los usu con rol guardia
}
