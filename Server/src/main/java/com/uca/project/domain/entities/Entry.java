package com.uca.project.domain.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "entries")
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID code;
    private String identification_doc;
    private LocalDateTime arrivalDateTime;
    private String reason;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_id")
    private Home home;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Entry entry = (Entry) o;
        return code != null && code.equals(entry.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }



}
