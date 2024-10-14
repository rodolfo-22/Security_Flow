package com.uca.project.services.servicesImpl;

import com.uca.project.domain.DTOs.EntryDetailsDTO;
import com.uca.project.domain.DTOs.EntryParsedDTO;
import com.uca.project.domain.entities.Entry;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.EntryRepository;
import com.uca.project.services.EntryService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EntryServiceImpl implements EntryService {
    private final EntryRepository entryRepository;

    public EntryServiceImpl(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    @Override
    public void createEntry(User user, Home home, LocalDateTime now) {
        Entry newEntry = new Entry();
        newEntry.setUser(user);
        newEntry.setHome(home);
        newEntry.setReason(null);
        newEntry.setIdentification_doc(null);
        newEntry.setArrivalDateTime(now);
        entryRepository.save(newEntry);
    }

    @Override
    public void crearAnonEntry(String document, String reason, LocalDateTime now) {
        Entry newEntry = new Entry();
        newEntry.setHome(null);
        newEntry.setReason(reason);
        newEntry.setArrivalDateTime(now);
        newEntry.setIdentification_doc(document);
        newEntry.setUser(null);
        entryRepository.save(newEntry);
    }

    @Override
    public EntryParsedDTO getEntriesByTimeRange(LocalDateTime from, LocalDateTime to) {
        List<Entry> entries = entryRepository.findByArrivalDateTimeBetween(from, to);
        EntryParsedDTO entryParsedDTO = new EntryParsedDTO();
        entryParsedDTO.setEntries(entries.size());
        for (Entry entry : entries) {
            EntryDetailsDTO details = new EntryDetailsDTO();
            details.setReason(entry.getReason() != null ? entry.getReason() : null);
            details.setDocument(entry.getIdentification_doc() != null ? entry.getIdentification_doc() : null);
            details.setDate(entry.getArrivalDateTime());
            details.setHouseName(entry.getHome() != null ? entry.getHome().getNumHome() : null);
            details.setUserEmail(entry.getUser() != null ? entry.getUser().getEmail() : null);
            entryParsedDTO.addToEntryDetails(details);
        }

        return entryParsedDTO;
    }

    @Override
    public EntryParsedDTO getEntriesByAnonimity(LocalDateTime from, LocalDateTime to) {
        List<Entry> entries = entryRepository.findByArrivalDateTimeBetween(from, to);
        EntryParsedDTO entryParsedDTO = new EntryParsedDTO();
        int count = 0;

            for (Entry entry : entries) {
                if (entry.getReason() != null){
                    EntryDetailsDTO details = new EntryDetailsDTO();
                    details.setReason(entry.getReason());
                    details.setDocument(entry.getIdentification_doc());
                    details.setDate(entry.getArrivalDateTime());
                    details.setHouseName(null);
                    details.setUserEmail(null);
                    entryParsedDTO.addToEntryDetails(details);
                    count += 1;
                }
            }


        entryParsedDTO.setEntries(count);
        return entryParsedDTO;
    }

    @Override
    public EntryParsedDTO getEntriesByNotAnonimity(LocalDateTime from, LocalDateTime to) {
        List<Entry> entries = entryRepository.findByArrivalDateTimeBetween(from, to);
        EntryParsedDTO entryParsedDTO = new EntryParsedDTO();
        int count = 0;


            for (Entry entry : entries) {
                if (entry.getReason() == null){
                    EntryDetailsDTO details = new EntryDetailsDTO();
                    details.setReason(null);
                    details.setDocument(null);
                    details.setDate(entry.getArrivalDateTime());
                    details.setHouseName(entry.getHome().getNumHome());
                    details.setUserEmail(entry.getUser().getEmail());
                    entryParsedDTO.addToEntryDetails(details);
                    count += 1;
                }
            }

        entryParsedDTO.setEntries(count);
        return entryParsedDTO;
    }

    @Override
    public EntryParsedDTO getEntriesByHome(Home home, LocalDateTime from, LocalDateTime to) {
        List<Entry> entries = entryRepository.findByHomeAndArrivalDateTimeBetween(home, from, to);
        EntryParsedDTO entryParsedDTO = new EntryParsedDTO();
        entryParsedDTO.setEntries(entries.size());

            for (Entry entry : entries) {
                EntryDetailsDTO details = new EntryDetailsDTO();
                details.setReason(entry.getReason() != null ? entry.getReason() : null);
                details.setDocument(entry.getIdentification_doc() != null ? entry.getIdentification_doc() : null);
                details.setDate(entry.getArrivalDateTime());
                details.setHouseName(entry.getHome() != null ? entry.getHome().getNumHome() : null);
                details.setUserEmail(entry.getUser() != null ? entry.getUser().getEmail() : null);
                entryParsedDTO.addToEntryDetails(details);
            }



        return entryParsedDTO;
    }
}
