package com.uca.project.domain.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestUniqueVisitDTO {

    private String email;
    private LocalDate arrivalDate;
    private LocalTime arrivalTime;

}
