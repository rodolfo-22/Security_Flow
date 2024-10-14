package com.uca.project.services;

import com.uca.project.domain.DTOs.AddUserToHomeRequest;

public interface ResidentService {
    boolean addUserToHome(AddUserToHomeRequest request);
}
