package com.uca.project.services.servicesImpl;

import com.uca.project.domain.DTOs.AddUserToHomeRequest;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.HomeRepository;
import com.uca.project.repositories.UserRepository;
import com.uca.project.services.HomeService;
import com.uca.project.services.ResidentService;
import com.uca.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResidentServiceImpl implements ResidentService {


    private final UserRepository userRepository;


    private final HomeRepository homeRepository;

    public ResidentServiceImpl(UserRepository userRepository, HomeRepository homeRepository) {
        this.userRepository = userRepository;
        this.homeRepository = homeRepository;
    }

    @Override
    public boolean addUserToHome(AddUserToHomeRequest request) {
        System.out.println("Iniciando el método addUserToHome con la solicitud: " + request);

        Home home = homeRepository.findByNumHome(request.getNumHome());
        System.out.println("Hogar encontrado: " + home);

        User resident = userRepository.findUserByEmail(request.getUserEmail());
        System.out.println("Residente encontrado: " + resident);

        if (home != null && resident != null) {
            // Agregar el residente al hogar
            home.getUsers().add(resident);
            homeRepository.save(home);
            System.out.println("Residente agregado al hogar y guardado en la base de datos: " + resident);
            return true;
        }
        System.out.println("Hogar o residente no encontrado");
        return false;
    }
}
