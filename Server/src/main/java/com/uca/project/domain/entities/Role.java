package com.uca.project.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table
public class Role {

    @Id
    private String role;
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference  //la ocupo para evitar bucle
    List<User> users;

}
