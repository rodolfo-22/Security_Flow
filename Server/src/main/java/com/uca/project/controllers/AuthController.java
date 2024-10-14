package com.uca.project.controllers;

import com.uca.project.domain.DTOs.UserLoginDTO;
import com.uca.project.domain.DTOs.UserRegisterDTO;
import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;
import com.uca.project.services.RoleService;
import com.uca.project.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.uca.project.domain.entities.Token;
import com.uca.project.domain.DTOs.TokenDTO;

// Controller de uso publico, no requiere autenticacion
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final RoleService roleService;
    private final UserService userService;

    public AuthController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/exists/{identifier}")
    public ResponseEntity<?> userExists(@PathVariable String identifier) {
        boolean exists = false;
        User user = userService.findByIdentifier(identifier);
        if(user == null){
            return new ResponseEntity<>(exists, HttpStatus.OK);
        }
        
        exists = true;
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    // @Valid valida las validaciones de los DTO, los errores los arroja en un objeto de tipo BindingResult
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserRegisterDTO info, BindingResult validations){
        // Si validations del BindingResult tiene errores, se retorna un response entity con los errores y un bad request
        if (validations.hasErrors()) {
            return new ResponseEntity<>(validations.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        if(userService.findByIdentifier(info.getEmail()) != null){
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

        userService.registerUser(info);
        User user = userService.findByIdentifier(info.getEmail());
        Role role = roleService.getRole("VSTT");
        roleService.addRoleToUser(role, user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginDTO info, BindingResult validations){
        if (validations.hasErrors()) {
            return new ResponseEntity<>(validations.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByIdentifier(info.getIdentifier());
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        try {
            Token token = userService.registerToken(user);
            return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
}
