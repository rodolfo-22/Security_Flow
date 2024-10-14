package com.uca.project.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "invitations")
public class Invitation {

    @Id
    private UUID code;
    private boolean invitationState;
    private boolean unique_invitation;
    private boolean request;

    @OneToOne(mappedBy = "invitation")
    private QR qr;

    @ManyToOne
    @JoinColumn(name = "home_id")
    private Home home;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "invitation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Date> dates;

    public Invitation() {
        super();
        this.code = UUID.randomUUID();
    }
}
