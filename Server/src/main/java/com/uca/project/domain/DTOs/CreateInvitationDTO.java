package com.uca.project.domain.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateInvitationDTO {

    private UUID invitation_id;
    private boolean invitation_state;
    private String invitation_type;
}
