package com.uca.project.repositories;

import com.uca.project.domain.entities.Date;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DateRepository extends JpaRepository<Date, UUID> {
}
