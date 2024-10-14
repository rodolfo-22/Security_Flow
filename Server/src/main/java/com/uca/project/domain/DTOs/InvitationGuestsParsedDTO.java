package com.uca.project.domain.DTOs;

import com.uca.project.domain.entities.Date;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class InvitationGuestsParsedDTO {
    private String name;
    private UUID id;
    private String home;
    private List<Date> dates;
}
