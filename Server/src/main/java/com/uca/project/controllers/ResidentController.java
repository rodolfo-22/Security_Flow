package com.uca.project.controllers;

import com.uca.project.domain.DTOs.AddUserToHomeRequest;
import com.uca.project.services.servicesImpl.ResidentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/resident")
public class ResidentController {

    private final ResidentServiceImpl residentService;

    public ResidentController(ResidentServiceImpl residentService) {
        this.residentService = residentService;
    }

    @PostMapping("/addUserToHome")
    public ResponseEntity<?> addUserToHome(@RequestBody AddUserToHomeRequest request) {
        boolean result = residentService.addUserToHome(request);
        if (result) {
            return new ResponseEntity<>("User added successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not added", HttpStatus.BAD_REQUEST);
        }
    }

}
