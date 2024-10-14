package com.uca.project.services.servicesImpl;

import com.uca.project.domain.DTOs.ArrivalInvitationDTO;
import com.uca.project.domain.DTOs.InvitationParsedDTO;
import com.uca.project.domain.DTOs.InvitationGuestsParsedDTO;
import com.uca.project.domain.entities.*;
import com.uca.project.repositories.*;
import com.uca.project.services.InvitationService;
import com.uca.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final EntryRepository entryRepository;

    private final RoleRepository roleRepository;

    private final InvitationRepository invitationRepository;

    public InvitationServiceImpl(InvitationRepository invitationRepository, RoleRepository roleRepository, EntryRepository entryRepository) {
        this.invitationRepository = invitationRepository;
        this.roleRepository = roleRepository;
        this.entryRepository = entryRepository;
    }

    @Override
    public Invitation findById(UUID id) {
        return invitationRepository.findById(id).orElse(null);
    }

    @Override
    public Invitation saveUniqueInvitation(User user, Home home) {

        Invitation invitation = new Invitation();

        invitation.setUser(user);
        invitation.setHome(home);
        invitation.setInvitationState(true);
        invitation.setUnique_invitation(true);
        invitation.setRequest(false);
        invitationRepository.save(invitation);
        return invitation;

    }

    @Override
    public Invitation saveUniqueRequest(User user, Home home) {
        Invitation invitation = new Invitation();

        invitation.setUser(user);
        invitation.setHome(home);
        invitation.setInvitationState(true);
        invitation.setUnique_invitation(true);
        invitation.setRequest(true);
        invitationRepository.save(invitation);
        return invitation;
    }

    @Override
    public Invitation saveMultipleInvitation(User user, Home home) {
        Invitation invitation = new Invitation();

        invitation.setUser(user);
        invitation.setHome(home);
        invitation.setInvitationState(true);
        invitation.setUnique_invitation(false);
        invitation.setRequest(false);
        invitationRepository.save(invitation);
        return invitation;


    }

    @Override
    public Invitation saveMultipleRequest(User user, Home home) {
        Invitation invitation = new Invitation();

        invitation.setUser(user);
        invitation.setHome(home);
        invitation.setInvitationState(true);
        invitation.setUnique_invitation(false);
        invitation.setRequest(true);
        invitationRepository.save(invitation);
        return invitation;
    }

    @Override
    public List<InvitationParsedDTO> findAllInvitationsByHome(Home home) {
        List<Invitation> invitations = invitationRepository.findAllByHomeAndInvitationStateTrue(home);
        List<InvitationParsedDTO> invitationsDTO = new ArrayList<>();
        if(invitations != null){
            for (Invitation invitation : invitations) {
                if(!invitation.isRequest()){
                    InvitationParsedDTO invitationParsedDTO = new InvitationParsedDTO();
                    invitationParsedDTO.setId(invitation.getCode());
                    invitationParsedDTO.setName(invitation.getUser().getUsername());
                    invitationParsedDTO.setPictureurl(invitation.getUser().getPictureurl());
                    invitationParsedDTO.setDates(invitation.getDates());
                    invitationsDTO.add(invitationParsedDTO);
                }

            }
        }

        return invitationsDTO;
    }

    @Override
    public List<InvitationParsedDTO> findAllRequestedInvitationsByHome(Home home) {
        List<Invitation> invitations = invitationRepository.findAllByHomeAndInvitationStateTrue(home);
        List<InvitationParsedDTO> invitationsDTO = new ArrayList<>();
        if(invitations != null){
            for (Invitation invitation : invitations) {
                if(invitation.isRequest()){
                    InvitationParsedDTO invitationParsedDTO = new InvitationParsedDTO();
                    invitationParsedDTO.setId(invitation.getCode());
                    invitationParsedDTO.setName(invitation.getUser().getUsername());
                    invitationParsedDTO.setPictureurl(invitation.getUser().getPictureurl());
                    invitationParsedDTO.setDates(invitation.getDates());
                    invitationsDTO.add(invitationParsedDTO);
                }

            }
        }
        return invitationsDTO;
    }

    @Override
    public void deactivateInvitation(Invitation invitation) {
        invitation.setInvitationState(false);
        invitationRepository.save(invitation);
    }

    @Override
    public void aproveInvitation(Invitation invitation) {
        invitation.setRequest(false);
        invitationRepository.save(invitation);
    }

    @Override
    public List<InvitationGuestsParsedDTO> findAllInvitationsByUser(User user) {
        List<Invitation> invitations = invitationRepository.findAllByUserAndInvitationStateTrue(user);
        List<InvitationGuestsParsedDTO> invitationsDTO = new ArrayList<>();
        Role role = roleRepository.findByRoleOrName("RSDT", "RSDT");

        if(invitations != null){
            for (Invitation invitation : invitations) {
                if(!invitation.isRequest()){
                    InvitationGuestsParsedDTO parsedDTO = new InvitationGuestsParsedDTO();
                    for(User resident: invitation.getHome().getUsers()){
                        if(resident.getRoles().contains(role)){
                            parsedDTO.setName(user.getUsername());
                            break;
                        }
                    }
                    parsedDTO.setId(invitation.getCode());
                    parsedDTO.setHome(invitation.getHome().getNumHome());
                    parsedDTO.setDates(invitation.getDates());
                    invitationsDTO.add(parsedDTO);
                }
            }
        }
        return invitationsDTO;
    }

    @Override
    public List<ArrivalInvitationDTO> findAllInvitationInfoByUser(User user) {
        List<Entry> entries = entryRepository.findEntriesByUser(user);
        List<ArrivalInvitationDTO> data = new ArrayList<>();
        Role role = roleRepository.findByRole("RSDT");

        for(Entry entry: entries){
            ArrivalInvitationDTO invitationDTO = new ArrivalInvitationDTO();
            for(User resident: entry.getHome().getUsers()){
                if(resident.getRoles().contains(role)){
                    invitationDTO.setName(user.getUsername());
                    break;
                }
            }
            invitationDTO.setHome(entry.getHome().getNumHome());
            invitationDTO.setArrivalTime(entry.getArrivalDateTime());
            data.add(invitationDTO);
        }

        return data;
    }
}
