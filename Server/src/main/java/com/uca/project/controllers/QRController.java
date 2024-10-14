package com.uca.project.controllers;

import com.uca.project.domain.entities.Date;
import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.QR;
import com.uca.project.domain.entities.User;
import com.uca.project.services.EntryService;
import com.uca.project.services.InvitationService;
import com.uca.project.services.QRService;
import com.uca.project.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/qr")
public class QRController {

    private final UserService userService;

    private final EntryService entryService;

    private final InvitationService invitationService;

    private final QRService qrService;

    public QRController(InvitationService invitationService, QRService qrService, EntryService entryService, UserService userService) {
        this.invitationService = invitationService;
        this.qrService = qrService;
        this.entryService = entryService;
        this.userService = userService;
    }

    @GetMapping("/generate/{id}")
    public ResponseEntity<?> generateQR(@PathVariable String id) {

        String hash;
        boolean checkValidDate = false;
        User user = null;
        LocalDateTime serverLocalDateTime = LocalDateTime.now();

        ZonedDateTime now = serverLocalDateTime.atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("America/Chicago"));

        Invitation invi = invitationService.findById(UUID.fromString(id));

        if(invi == null){
            return new ResponseEntity<>("Invitacion no encontrada", HttpStatus.NOT_FOUND);
        }

        for(Date date: invi.getDates()){
            ZonedDateTime StartZonedDate = date.getStart_datetime().atZone(ZoneId.of("America/Chicago"));
            ZonedDateTime EndZonedDate = date.getEnd_datetime().atZone(ZoneId.of("America/Chicago"));

            if (now.isAfter(StartZonedDate) && now.isBefore(EndZonedDate)) {
                checkValidDate = true;
                break;
            }
        }

        if(!checkValidDate){
            return new ResponseEntity<>("No esta en una fecha permitida", HttpStatus.FORBIDDEN);
        }


        if(invi.getQr() != null ){
            ZonedDateTime FinalDate = invi.getQr().getFinal_datetime().atZone(ZoneId.of("America/Chicago"));
            if(invi.getQr().isActive() && now.isBefore(FinalDate)){
                return new ResponseEntity<>(invi.getQr().getHash(), HttpStatus.OK);
            }
            hash = qrService.reGenerateQR(invi.getQr());
            return new ResponseEntity<>(hash, HttpStatus.CREATED);
        }


        hash = qrService.generateQR(user, invi);
        return new ResponseEntity<>(hash, HttpStatus.CREATED);
    }

    // Solamente usar para usuarios que NO SEAN visitantes
    @GetMapping("/general/generate")
    public ResponseEntity<?> generateGeneralQR() {
        User user = userService.findUserAuthenticated();
        Invitation invi = null;
        String hash;

        LocalDateTime serverLocalDateTime = LocalDateTime.now();

        ZonedDateTime now = serverLocalDateTime.atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("America/Chicago"));

        if(user.getQr() != null){
            ZonedDateTime FinalDate = user.getQr().getFinal_datetime().atZone(ZoneId.of("America/Chicago"));

            if(user.getQr().isActive() && now.isBefore(FinalDate)){
                return new ResponseEntity<>(user.getQr().getHash(), HttpStatus.OK);
            }
            hash = qrService.reGenerateQR(user.getQr());
            return new ResponseEntity<>(hash, HttpStatus.CREATED);
        }

        hash = qrService.generateQR(user, invi);
        return new ResponseEntity<>(hash, HttpStatus.CREATED);
    }

    @PostMapping("/validate/{hash}")
    public ResponseEntity<?> validateQR(@PathVariable String hash) {
        QR qr = qrService.findByHash(hash);
        LocalDateTime serverLocalDateTime = LocalDateTime.now();

        ZonedDateTime now = serverLocalDateTime.atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("America/Chicago"));

        if(qr == null){
            return new ResponseEntity<>("QR no encontrado", HttpStatus.NOT_FOUND);
        } else if(!qr.isActive()){
            return new ResponseEntity<>("QR invalido", HttpStatus.FORBIDDEN);
        }

        ZonedDateTime FinalDate = qr.getFinal_datetime().atZone(ZoneId.of("America/Chicago"));

        if(now.isAfter(FinalDate)){
            return new ResponseEntity<>("El tiempo valido ha pasado", HttpStatus.FORBIDDEN);
        }

        if(qr.getInvitation() != null){
            if(!qr.getInvitation().isInvitationState()){
                return new ResponseEntity<>("Invitacion no valida", HttpStatus.FORBIDDEN);
            }

            if(qr.getInvitation().isUnique_invitation()){
                invitationService.deactivateInvitation(qr.getInvitation());
            }

            qrService.deActivateQR(qr);
            entryService.createEntry(qr.getInvitation().getUser(), qr.getInvitation().getHome(), now.toLocalDateTime());
            return new ResponseEntity<>("Entrada validada", HttpStatus.OK);

        }

        qrService.deActivateQR(qr);
        entryService.createEntry(qr.getUser(), qr.getUser().getHomes().get(0), now.toLocalDateTime());
        return new ResponseEntity<>("Entrada validada", HttpStatus.OK);
    }
}
