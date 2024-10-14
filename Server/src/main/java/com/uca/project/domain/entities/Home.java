package com.uca.project.domain.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "homes")
public class Home {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID code;
    private String numHome;

    @OneToMany(mappedBy = "home", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Invitation> invitations;

    @ManyToMany
    @JoinTable(
            name = "casaxusuario",
            joinColumns = @JoinColumn(name = "id_home"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    private Set<User> users;

    @OneToMany(mappedBy = "home")
    private List<Entry> entries;
}
