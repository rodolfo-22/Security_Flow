package com.uca.project.domain.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class InvitationAndDatesDTO {

    @NotBlank
    private String house_number;
    @NotBlank
    private String user_identifier;
    @NotBlank
    private boolean request;
    @NotBlank
    private List<String> initial_dates;
    @NotBlank
    private List<String> final_dates;
}
