package com.uca.project.repositories;

import com.uca.project.domain.entities.Entry;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface EntryRepository extends JpaRepository<Entry, UUID> {
    List<Entry> findByArrivalDateTimeBetween(LocalDateTime from, LocalDateTime to);
    List<Entry> findByHomeAndArrivalDateTimeBetween(Home home, LocalDateTime from, LocalDateTime to);
    List<Entry> findEntriesByUser(User user);
}
