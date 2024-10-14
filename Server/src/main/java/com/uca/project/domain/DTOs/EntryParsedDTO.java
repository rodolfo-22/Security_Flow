package com.uca.project.domain.DTOs;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EntryParsedDTO {
    private int entries;
    private List<EntryDetailsDTO> details = new ArrayList<>();

    public void addToEntryDetails(EntryDetailsDTO info){
        details.add(info);
    }
}
