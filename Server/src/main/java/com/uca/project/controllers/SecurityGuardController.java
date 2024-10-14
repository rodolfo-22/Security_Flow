package com.uca.project.controllers;

import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.User;
import com.uca.project.services.RoleService;
import com.uca.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/guards")
public class SecurityGuardController {

    private final UserService userService;
    private final RoleService roleService;

    public SecurityGuardController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //asignar rol, la ocupo en la vista del admin
    @PostMapping("/assign")
    public ResponseEntity<?> assignGuardRole(@RequestParam String email) {
        try {
            User user = userService.findByIdentifier(email);
            if (user != null) {
                Role role = roleService.getRole("GRDA");
                if(user.getRoles().contains(role)){
                    return new ResponseEntity<>("Guardia ya asignado", HttpStatus.NOT_MODIFIED);
                }
                roleService.addRoleToUser(role, user);
                return ResponseEntity.ok("Guardia asignado correctamente");
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log de error
            return ResponseEntity.status(500).body("An error occurred");
        }
    }

        //listar los usu con rol guardia, la ocupo en view admin
    @GetMapping("/list")
    public ResponseEntity<?> getGuards() {
        try {
            List<User> guards = userService.findUsersByRole("GRDA");
            return ResponseEntity.ok(guards != null ? guards : "No se encontraron guardias");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
        // elimia al guardia, le cambia a rol visitante
        @PostMapping("/remove")
        public ResponseEntity<?> removeGuardRole(@RequestParam UUID userId) {
            try {
                User user = userService.findById(userId);
                Role role = roleService.getRole("VSTT");
                roleService.addRoleToUser(role, user);
                return ResponseEntity.ok("Guardia removido");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("An error occurred");
            }
        }

}
