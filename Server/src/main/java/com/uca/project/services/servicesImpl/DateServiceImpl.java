package com.uca.project.services.servicesImpl;

import com.uca.project.domain.entities.Date;
import com.uca.project.domain.entities.Invitation;
import com.uca.project.repositories.DateRepository;
import com.uca.project.services.DateService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DateServiceImpl implements DateService {
    private final
    DateRepository dateRepository;

    public DateServiceImpl(DateRepository dateRepository) {
        this.dateRepository = dateRepository;
    }

    @Override
    public void saveDatesToInvitation(Invitation invitation, List<String> initial_dates, List<String> final_dates) {
        for(int i = 0; i < initial_dates.size(); i++) {
            String initial_date = initial_dates.get(i);
            String final_date = final_dates.get(i);

            Date date = new Date();
            date.setStart_datetime(LocalDateTime.parse(initial_date).minusMinutes(30));
            date.setEnd_datetime(LocalDateTime.parse(final_date).plusMinutes(30));
            date.setInvitation(invitation);
            dateRepository.save(date);
        }
    }
}
