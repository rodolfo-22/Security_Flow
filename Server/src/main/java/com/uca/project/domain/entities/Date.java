package com.uca.project.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "dates")
public class Date {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonIgnore
    private UUID code;
    private LocalDateTime start_datetime;
    private LocalDateTime end_datetime;

    @ManyToOne
    @JoinColumn(name = "invitation_id")
    @JsonBackReference
    private Invitation invitation;

}
