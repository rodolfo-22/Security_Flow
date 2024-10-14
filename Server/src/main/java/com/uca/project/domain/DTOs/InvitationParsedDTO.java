package com.uca.project.domain.DTOs;

import com.uca.project.domain.entities.Date;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class InvitationParsedDTO {
    private String name;
    private String pictureurl;
    private UUID id;
    private List<Date> dates;

    public void addToDateList (Date date) {
        dates.add(date);
    }

}
