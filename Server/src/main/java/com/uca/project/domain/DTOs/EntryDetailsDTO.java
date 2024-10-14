package com.uca.project.domain.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EntryDetailsDTO {
    private String houseName;
    private String userEmail;
    private String document;
    private String reason;
    private LocalDateTime date;
}
