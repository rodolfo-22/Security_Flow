package com.uca.project.services;

import com.uca.project.domain.DTOs.res.HomeResponseDTO;
import com.uca.project.domain.DTOs.res.UserResponseDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import java.util.List;
import java.util.UUID;

public interface HomeService {
    void assignUserToHome(UUID userId, UUID homeId);

    Home findById(UUID homeId);

    //las necesito para el admin view
    Home findByNumHome(String numHome);
    List<HomeResponseDTO> findAllHomes();
    List<UserResponseDTO> findResidentsByNumHome(String numHome);
    void removeUserFromHome(UUID userId, String numHome);

    // Servicios aparte
    void addHome(String num_home);
    void addUserToHome(User user, Home home);
    Home getHome(String num_home);
}

