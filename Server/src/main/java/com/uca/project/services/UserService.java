package com.uca.project.services;

import com.uca.project.domain.DTOs.UserRegisterDTO;
import com.uca.project.domain.entities.User;
import com.uca.project.domain.entities.Token;

import java.util.List;
import java.util.UUID;

public interface UserService {
    // Agregar metodos aqui
    User findByIdentifier(String identifier);
    void registerUser(UserRegisterDTO info);
    User findByUsername(String username);
    User findById(UUID id);
    List<User> findUsersByRole(String roleName);
    void updateUser(User user);


    //Find User authenticated
    User findUserAuthenticated();

    //Token management
    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;


}
