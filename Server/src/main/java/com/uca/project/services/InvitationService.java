package com.uca.project.services;

import com.uca.project.domain.DTOs.ArrivalInvitationDTO;
import com.uca.project.domain.DTOs.InvitationParsedDTO;
import com.uca.project.domain.DTOs.InvitationGuestsParsedDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.User;

import java.util.List;

import java.util.UUID;

public interface InvitationService {

    Invitation saveUniqueInvitation(User user, Home home);
    Invitation saveUniqueRequest(User user, Home home);
    Invitation findById(UUID id);
    Invitation saveMultipleInvitation(User user, Home home);
    Invitation saveMultipleRequest(User user, Home home);
    List<InvitationParsedDTO> findAllInvitationsByHome(Home home);
    List<InvitationParsedDTO> findAllRequestedInvitationsByHome(Home home);
    void deactivateInvitation(Invitation invitation);
    void aproveInvitation(Invitation invitation);
    List<InvitationGuestsParsedDTO> findAllInvitationsByUser(User user);
    List<ArrivalInvitationDTO> findAllInvitationInfoByUser(User user);
}


