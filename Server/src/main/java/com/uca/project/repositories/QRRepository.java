package com.uca.project.repositories;

import com.uca.project.domain.entities.QR;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QRRepository extends JpaRepository<QR, UUID> {
    QR findByHash(String hash);
}
