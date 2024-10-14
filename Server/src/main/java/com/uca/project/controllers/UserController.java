package com.uca.project.controllers;

//Controller de uso general sin importar rol
import com.uca.project.domain.DTOs.ProfileDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import com.uca.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(){
        User user = userService.findUserAuthenticated();

        ProfileDTO profile = new ProfileDTO();
        profile.setName(user.getUsername());
        profile.setPictureurl(user.getPictureurl());
        profile.setEmail(user.getEmail());
        profile.setDui(user.getDui());

        // TODO: Si en algun momento se implementa en forma de lista de casas, cambiar ESTO de abajo
        profile.setHome(user.getHomes().isEmpty() ? null : user.getHomes().get(0).getNumHome());
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PostMapping("/change-dui/{dui}")
    public ResponseEntity<?> changeDui(@PathVariable String dui){
        User user = userService.findUserAuthenticated();
        if(!dui.matches("^\\d{8}-\\d$")){
            return new ResponseEntity<>("Formato de DUI no valido", HttpStatus.BAD_REQUEST);
        }
        user.setDui(dui);
        userService.updateUser(user);
        return new ResponseEntity<>("DUI cambiado con exito", HttpStatus.OK);

    }

    @PostMapping("/change-username/{username}")
    public ResponseEntity<?> changeUsername(@PathVariable String username){
        if(username.isBlank()){
            return new ResponseEntity<>("No se puede poner nombres en blanco", HttpStatus.BAD_REQUEST);
        }
        User user = userService.findUserAuthenticated();
        user.setUsername(username);
        userService.updateUser(user);
        return new ResponseEntity<>("Usuario cambiado con exito", HttpStatus.OK);
    }

    @GetMapping("/get-role")
    public ResponseEntity<?> getRole(){
        User user = userService.findUserAuthenticated();

        return new ResponseEntity<>(user.getRoles(), HttpStatus.OK);
    }

    @GetMapping("/get-role-code")
    public ResponseEntity<?> getRoleCode(){
        User user = userService.findUserAuthenticated();

        // TODO:Cambiar esto si se manejan varias entidades de rol en la lista de roles
        return new ResponseEntity<>(user.getRoles().get(0).getRole(), HttpStatus.OK);
    }


}
