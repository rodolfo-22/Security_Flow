package com.uca.project.controllers;

import com.uca.project.domain.DTOs.InvitationAndDatesDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.User;
import com.uca.project.services.DateService;
import com.uca.project.services.HomeService;
import com.uca.project.services.servicesImpl.InvitationServiceImpl;
import com.uca.project.services.servicesImpl.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/invitation")
public class InvitationController {

    private final DateService dateService;

    private final InvitationServiceImpl invitationServiceImpl;

    private final UserServiceImpl userService;

    private final HomeService homeService;

    public InvitationController(InvitationServiceImpl invitationServiceImpl, UserServiceImpl userService, HomeService homeService, DateService dateService) {
        this.invitationServiceImpl = invitationServiceImpl;
        this.userService = userService;
        this.homeService = homeService;
        this.dateService = dateService;
    }

    @PostMapping("/add/unique")
    public ResponseEntity<?> addInvitation(@RequestBody InvitationAndDatesDTO invitation, BindingResult validations) {
        if (validations.hasErrors()) {
            return new ResponseEntity<>(validations.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        Invitation invitationID;

        Home home = homeService.getHome(invitation.getHouse_number());
        User user = userService.findByIdentifier(invitation.getUser_identifier());

        if(home == null){
            return new ResponseEntity<>("Casa no encontrada", HttpStatus.NOT_FOUND);
        } else if (user == null){
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        if(invitation.isRequest()){
            invitationID = invitationServiceImpl.saveUniqueRequest(user, home);
        } else {
            invitationID = invitationServiceImpl.saveUniqueInvitation(user, home);
        }

        dateService.saveDatesToInvitation(invitationID, invitation.getInitial_dates(), invitation.getFinal_dates());


        return new ResponseEntity<>("Invitacion creada", HttpStatus.CREATED);
    }

    @PostMapping("/add/multiple")
    public ResponseEntity<?> addMultiple(@RequestBody InvitationAndDatesDTO invitation, BindingResult validations) {
        if (validations.hasErrors()) {
            return new ResponseEntity<>(validations.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        Invitation invitationID;
        Home home = homeService.getHome(invitation.getHouse_number());
        User user = userService.findByIdentifier(invitation.getUser_identifier());

        if(home == null){
            return new ResponseEntity<>("Casa no encontrada", HttpStatus.NOT_FOUND);
        } else if (user == null){
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        if(invitation.isRequest()){
            invitationID = invitationServiceImpl.saveMultipleRequest(user, home);
        } else{
            invitationID = invitationServiceImpl.saveMultipleInvitation(user, home);
        }
        dateService.saveDatesToInvitation(invitationID, invitation.getInitial_dates(), invitation.getFinal_dates());


        return new ResponseEntity<>("Invitacion creada", HttpStatus.CREATED);
    }

    // Ruta solamente para los residentes
    @GetMapping("/get/invitations/{homeNumber}")
    public ResponseEntity<?> getInvitations(@PathVariable String homeNumber) {
        Home home = homeService.getHome(homeNumber);
        if(home == null) {
            return new ResponseEntity<>("Casa no encontrada", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(invitationServiceImpl.findAllInvitationsByHome(home), HttpStatus.OK);
    }

    @GetMapping("/get/requests/{homeNumber}")
    public ResponseEntity<?> getRequests(@PathVariable String homeNumber) {
        Home home = homeService.getHome(homeNumber);
        if(home == null) {
            return new ResponseEntity<>("Casa no encontrada", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(invitationServiceImpl.findAllRequestedInvitationsByHome(home), HttpStatus.OK);
    }

    // Ruta solamente para los usuarios invitados
    @GetMapping("/get/invitations")
    public ResponseEntity<?> getInvitations() {
        User user = userService.findUserAuthenticated();
        return new ResponseEntity<>(invitationServiceImpl.findAllInvitationsByUser(user), HttpStatus.OK);
    }

    @GetMapping("get/invitations-info")
    public ResponseEntity<?> getInvitationInfo() {
        User user = userService.findUserAuthenticated();
        return new ResponseEntity<>(invitationServiceImpl.findAllInvitationInfoByUser(user), HttpStatus.OK);
    }


    @PostMapping("/deactivate/{invitationID}")
    public ResponseEntity<?> deActivateInvitation(@PathVariable String invitationID){
        Invitation invitation = invitationServiceImpl.findById(UUID.fromString(invitationID));
        if(invitation == null) {
            return new ResponseEntity<>("Invitacion no encontrada", HttpStatus.NOT_FOUND);
        }
        invitationServiceImpl.deactivateInvitation(invitation);
        return new ResponseEntity<>("Invitacion desactivada", HttpStatus.OK);
    }

    @PostMapping("/aprove/{invitationID}")
    public ResponseEntity<?> approveInvitation(@PathVariable String invitationID){
        Invitation invitation = invitationServiceImpl.findById(UUID.fromString(invitationID));
        if(invitation == null) {
            return new ResponseEntity<>("Invitacion no encontrada", HttpStatus.NOT_FOUND);
        }
        invitationServiceImpl.aproveInvitation(invitation);
        return new ResponseEntity<>("Invitacion aprovada", HttpStatus.OK);
    }

}
