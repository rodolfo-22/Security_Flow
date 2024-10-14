package com.uca.project.domain.DTOs.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class HomeResponseDTO {
    private UUID code;
    private String numHome;
    private List<String> representatives = new ArrayList<>();

    public void AddToRepresentatives(String representative){
        representatives.add(representative);
    }

}
