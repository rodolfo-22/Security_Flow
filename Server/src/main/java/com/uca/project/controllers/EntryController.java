package com.uca.project.controllers;

import com.uca.project.domain.DTOs.AnonEntryDTO;
import com.uca.project.domain.DTOs.DatesToCompareDTO;
import com.uca.project.domain.DTOs.EntryParsedDTO;
import com.uca.project.domain.DTOs.HomeAndDatesToCompareDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.services.EntryService;
import com.uca.project.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

// Controller auxiliar para evitar conflictos
// TODO: Mover a securityGuardController una vez resueltos
@RestController
@RequestMapping("/entry")
public class EntryController {

    private final HomeService homeService;

    private final EntryService entryService;

    public EntryController(EntryService entryService, HomeService homeService) {
        this.entryService = entryService;
        this.homeService = homeService;
    }

    @PostMapping("/anon-entry")
    public ResponseEntity<?> anonEntry(@RequestBody AnonEntryDTO info, BindingResult validations) {
        if (validations.hasErrors()) {
            return new ResponseEntity<>(validations.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        entryService.crearAnonEntry(info.getDocument(), info.getReason(), LocalDateTime.now());
        return new ResponseEntity<>("Anonymous entry created", HttpStatus.CREATED);
    }

    @PostMapping("/by-date")
    public ResponseEntity<?> byDate(@RequestBody DatesToCompareDTO dates) {
        EntryParsedDTO info = entryService.getEntriesByTimeRange(
                LocalDateTime.parse(dates.getFrom()), LocalDateTime.parse(dates.getTo())
        );

        return new ResponseEntity<>(info, HttpStatus.OK);

    }

    @PostMapping("/by-anon")
    public ResponseEntity<?> byAnon(@RequestBody DatesToCompareDTO dates) {
        EntryParsedDTO info = entryService.getEntriesByAnonimity(
                LocalDateTime.parse(dates.getFrom()), LocalDateTime.parse(dates.getTo())
        );
        return new ResponseEntity<>(info, HttpStatus.OK);
    }

    @PostMapping("/by-non-anon")
    public ResponseEntity<?> byNonAnon(@RequestBody DatesToCompareDTO dates) {
        EntryParsedDTO info = entryService.getEntriesByNotAnonimity(
                LocalDateTime.parse(dates.getFrom()), LocalDateTime.parse(dates.getTo())
        );
        return new ResponseEntity<>(info, HttpStatus.OK);
    }

    @PostMapping("/by-home")
    public ResponseEntity<?> byHome(@RequestBody HomeAndDatesToCompareDTO dates) {
        Home home = homeService.findByNumHome(dates.getHome());

        if (home == null) {
            return new ResponseEntity<>("Home not found", HttpStatus.NOT_FOUND);
        }
        EntryParsedDTO info = entryService.getEntriesByHome(
                home, LocalDateTime.parse(dates.getFrom()), LocalDateTime.parse(dates.getTo())
        );
        return new ResponseEntity<>(info, HttpStatus.OK);
    }
}
