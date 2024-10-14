package com.uca.project.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "QRs")
@EqualsAndHashCode(exclude = "user")
public class QR {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID code;
    private String hash;
    private LocalDateTime final_datetime;
    private boolean active;

    @OneToOne
    @JoinColumn(name = "invitation_id")
    private Invitation invitation;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
