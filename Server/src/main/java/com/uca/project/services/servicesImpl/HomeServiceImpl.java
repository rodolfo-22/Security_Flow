package com.uca.project.services.servicesImpl;

import com.uca.project.domain.DTOs.res.HomeResponseDTO;
import com.uca.project.domain.DTOs.res.UserResponseDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import com.uca.project.domain.entities.Role;
import com.uca.project.repositories.HomeRepository;
import com.uca.project.repositories.UserRepository;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.HomeRepository;
import com.uca.project.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HomeServiceImpl implements HomeService {

    private final HomeRepository homeRepository;
    private final UserRepository userRepository;

    public HomeServiceImpl(HomeRepository homeRepository, UserRepository userRepository) {
        this.homeRepository = homeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addHome(String num_home) {
        Home home = new Home();
        home.setNumHome(num_home);
        homeRepository.save(home);
    }

    @Override
    public void addUserToHome(User user, Home home) {
        home.getUsers().add(user);
        homeRepository.save(home);
    }

    @Override
    public Home getHome(String num_home) {
        return homeRepository.findByNumHome(num_home);
    }

    // Servicios de rodolfo a partir de aqui


    @Override   //lo uso
    public void assignUserToHome(UUID userId, UUID homeId) {
        Home home = homeRepository.findById(homeId).orElseThrow(() -> new RuntimeException("Home not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Agregar el usuario al hogar
        home.getUsers().add(user);
        homeRepository.save(home);

        // También puedes agregar una declaración de impresión para depurar
        System.out.println("Usuario " + user.getUsername() + " asignado al hogar " + home.getNumHome());

    }

    @Override   //lo uso
    public Home findById(UUID homeId) {
        return homeRepository.findById(homeId).orElseThrow(() -> new RuntimeException("Home not found"));
    }

    @Override   //lo uso
    public Home findByNumHome(String numHome) {    //usado para vista admin
        return homeRepository.findByNumHome(numHome);
    }

    @Override   //necesito en la vista del admin
    public List<HomeResponseDTO> findAllHomes() {
        List<Home> homes = homeRepository.findAll();
        List<HomeResponseDTO> response = new ArrayList<>();

        for(Home home: homes){
            HomeResponseDTO homeDTO = new HomeResponseDTO();
            homeDTO.setCode(home.getCode());
            homeDTO.setNumHome(home.getNumHome());

            if(home.getUsers() != null){
                for(User user: home.getUsers()){
                    if(user.getRoles().get(0).getRole().equals("RSDT")){
                        homeDTO.AddToRepresentatives(user.getEmail());
                        break;
                    }
                }
            }


            if(homeDTO.getRepresentatives().isEmpty()){
                homeDTO.AddToRepresentatives("N/A");
            }
            response.add(homeDTO);
        }

        return response;

    }

    @Override   //necesito en la vista deladmin
    public List<UserResponseDTO> findResidentsByNumHome(String numHome) {
        Home home = homeRepository.findByNumHome(numHome);
        if (home == null) {
            return Collections.emptyList();
        }

        return home.getUsers().stream()
                .map(user -> new UserResponseDTO(
                        user.getCode(),
                        user.getUsername() != null ? user.getUsername() : "N/A",
                        user.getEmail() != null ? user.getEmail() : "N/A",
                        user.getDui() != null ? user.getDui() : "N/A",
                        user.getRoles().stream().findFirst().map(Role::getName).orElse("N/A") // Obtener el nombre del rol
                ))
                .collect(Collectors.toList());
    }

    @Override   //lo uso para quitar user
    public void removeUserFromHome(UUID userId, String numHome) {
        Home home = homeRepository.findByNumHome(numHome);
        if (home == null) {
            throw new RuntimeException("Home not found");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        home.getUsers().remove(user);
        homeRepository.save(home);
    }
}


