package com.uca.project.domain.DTOs.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private UUID code;
    private String username;
    private String email;
    private String dui;
    private String role;
}
