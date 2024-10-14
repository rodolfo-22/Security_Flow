package com.uca.project.services.servicesImpl;

import com.uca.project.domain.entities.Invitation;
import com.uca.project.domain.entities.QR;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.QRRepository;
import com.uca.project.services.QRService;
import com.uca.project.utils.HashGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class QRServiceImpl implements QRService {

    private final HashGenerator hashGenerator;

    private final QRRepository qrRepository;

    public QRServiceImpl(QRRepository qrRepository, HashGenerator hashGenerator) {
        this.qrRepository = qrRepository;
        this.hashGenerator = hashGenerator;
    }

    @Override
    public String generateQR(User user, Invitation invitation) {
        QR qr = new QR();
        String hash = hashGenerator.genHash();
        qr.setHash(hash);
        qr.setInvitation(invitation);
        qr.setUser(user);
        qr.setActive(true);

        LocalDateTime serverLocalDateTime = LocalDateTime.now();

        ZonedDateTime now = serverLocalDateTime.atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("America/Chicago"));


        qr.setFinal_datetime(now.toLocalDateTime().plusMinutes(10));
        qrRepository.save(qr);
        return hash;

    }

    @Override
    public QR findByHash(String hash) {
        return qrRepository.findByHash(hash);
    }

    @Override
    public String reGenerateQR(QR qr) {
        String hash = hashGenerator.genHash();
        qr.setHash(hash);
        LocalDateTime serverLocalDateTime = LocalDateTime.now();

        ZonedDateTime now = serverLocalDateTime.atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("America/Chicago"));

        qr.setFinal_datetime(now.toLocalDateTime().plusMinutes(10));
        qr.setActive(true);
        qrRepository.save(qr);
        return hash;
    }

    @Override
    public void deActivateQR(QR qr) {
        qr.setActive(false);
        qrRepository.save(qr);
    }
}
