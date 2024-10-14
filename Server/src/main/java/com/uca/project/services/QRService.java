package com.uca.project.services;

import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.QR;
import com.uca.project.domain.entities.User;

public interface QRService {
    String generateQR(User user, Invitation invitation);
    QR findByHash(String hash);
    String reGenerateQR(QR qr);
    void deActivateQR(QR qr);
}
