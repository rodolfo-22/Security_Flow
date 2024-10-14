package com.uca.project.services;

import com.uca.project.domain.DTOs.EntryParsedDTO;
import com.uca.project.domain.entities.Entry;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;

import java.time.LocalDateTime;

public interface EntryService {
    void createEntry(User user, Home home, LocalDateTime now);
    void crearAnonEntry(String document, String reason, LocalDateTime now);
    EntryParsedDTO getEntriesByTimeRange(LocalDateTime from, LocalDateTime to);
    EntryParsedDTO getEntriesByAnonimity(LocalDateTime from, LocalDateTime to);
    EntryParsedDTO getEntriesByNotAnonimity(LocalDateTime from, LocalDateTime to);
    EntryParsedDTO getEntriesByHome(Home home, LocalDateTime from, LocalDateTime to);
}
