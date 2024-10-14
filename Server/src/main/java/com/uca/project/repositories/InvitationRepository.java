package com.uca.project.repositories;

import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    List<Invitation> findAllByHomeAndInvitationStateTrue(Home home);
    List<Invitation> findAllByUserAndInvitationStateTrue(User user);
}
