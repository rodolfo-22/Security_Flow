package com.uca.project.controllers;

import com.uca.project.domain.DTOs.ChangeRoleRequest;
import com.uca.project.domain.DTOs.res.HomeResponseDTO;
import com.uca.project.domain.DTOs.res.UserResponseDTO;
import com.uca.project.domain.DTOs.AddHomeDTO;
import com.uca.project.domain.DTOs.AddHomeToUserDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;
import com.uca.project.services.HomeService;
import com.uca.project.services.RoleService;
import com.uca.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
public class HomeController {

    private final HomeService homeService;

    private final UserService userService;

    private final RoleService roleService;

    public HomeController(HomeService homeService, UserService userService, RoleService roleService) {
        this.homeService = homeService;
        this.userService = userService;
        this.roleService = roleService;
    }

    //lo necesito para buscar un hogar y asignarle el usuario residente, asigna solo usuarios con rol residente
    @PostMapping("/assign")
    public ResponseEntity<?> assignUserToHome(@RequestBody AddHomeToUserDTO info) {
        User user = userService.findByIdentifier(info.getIdentifier());
        Home home = homeService.getHome(info.getNum_home());

        if(user == null || home == null){
            return new ResponseEntity<>("User or home not found", HttpStatus.NOT_FOUND);
        }

        Role role = roleService.getRole("RSDT");

        if(user.getRoles().contains(role) && user.getHomes().contains(home)){
            return new ResponseEntity<>("El usuario residente ya esta asignado a una casa", HttpStatus.NOT_MODIFIED);
        } else if(user.getRoles().contains(role)){
            homeService.addUserToHome(user,home);
        } else if(user.getHomes().contains(home)){
            roleService.addRoleToUser(role, user);
        } else{
            roleService.addRoleToUser(role, user);
            homeService.addUserToHome(user, home);
        }

        return new ResponseEntity<>("Residente encargado añadido", HttpStatus.CREATED);
    }

    @PostMapping("/assign/normal")
    public ResponseEntity<?> assignNormalResidentToHome(@RequestBody AddHomeToUserDTO info) {
        User user = userService.findByIdentifier(info.getIdentifier());
        Home home = homeService.getHome(info.getNum_home());

        if(user == null || home == null){
            return new ResponseEntity<>("Usuario o casa no encontrado", HttpStatus.NOT_FOUND);
        }

        Role role = roleService.getRole("RSNR");

        if(user.getRoles().contains(role) && user.getHomes().contains(home)){
            return new ResponseEntity<>("El usuario ya esta asignado a una casa", HttpStatus.NOT_MODIFIED);
        } else if(user.getRoles().contains(role)){
            homeService.addUserToHome(user,home);
        } else if(user.getHomes().contains(home)){
            roleService.addRoleToUser(role, user);
        } else{
            roleService.addRoleToUser(role, user);
            homeService.addUserToHome(user, home);
        }

        return new ResponseEntity<>("Residente añadido", HttpStatus.CREATED);
    }

    //vista en el admin, lista las casas
    @GetMapping("/list")
    public ResponseEntity<?> listAllHomes() {
        return new ResponseEntity<>(homeService.findAllHomes(), HttpStatus.OK);
    }
    //vista en el admin, obtine residente de numero de cas
    @GetMapping("/residents")
    public ResponseEntity<List<UserResponseDTO>> getResidentsByHome(@RequestParam String numHome) {
        List<UserResponseDTO> residents = homeService.findResidentsByNumHome(numHome);
        return ResponseEntity.ok(residents);
    }

    //necesito en vista de administrador
    @PostMapping("/changeRole")
    public ResponseEntity<String> changeUserRole(@RequestParam UUID userId, @RequestParam String newRole, @RequestParam String numHome) {
        try {
            User user = userService.findById(userId);
            Role role = roleService.getRole(newRole);
            roleService.addRoleToUser(role, user);
            if (newRole.equals("VSTT")) {
                homeService.removeUserFromHome(userId, numHome);
            }
            return ResponseEntity.ok("User role updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred");
        }

    }

    @PostMapping("/add")
    public ResponseEntity<?> addHome(@RequestBody AddHomeDTO info){
        if(homeService.findByNumHome(info.getNum_home()) != null){
            return new ResponseEntity<>("La casa ya existe", HttpStatus.CONFLICT);
        }
        homeService.addHome(info.getNum_home());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
