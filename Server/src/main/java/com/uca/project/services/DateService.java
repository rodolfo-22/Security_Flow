package com.uca.project.services;

import com.uca.project.domain.entities.Invitation;

import java.util.List;

public interface DateService {
    void saveDatesToInvitation(Invitation invitation, List<String> initial_dates, List<String> final_dates);
}
