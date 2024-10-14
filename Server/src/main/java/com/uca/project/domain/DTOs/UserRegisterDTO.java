package com.uca.project.domain.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRegisterDTO {
    private String username;
    private String email;
    private String pictureurl;
    private String role;

}
