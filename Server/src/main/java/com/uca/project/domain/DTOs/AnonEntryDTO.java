package com.uca.project.domain.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnonEntryDTO {

    @NotBlank
    private String reason;
    @NotBlank
    private String document;
}
