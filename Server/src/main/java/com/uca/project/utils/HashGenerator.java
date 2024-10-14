package com.uca.project.utils;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;
import java.security.MessageDigest;

@Component
public class HashGenerator{

    private final SecureRandom random = new SecureRandom();
    private String hashToGenerate;


    public String genHash() {
        // Generate salt
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        // LocalDateTime to generate a seed
        String seed = LocalDateTime.now().toString();
        try {
            // Get algorithm to hash
            MessageDigest message = MessageDigest.getInstance("SHA-512");
            message.update(salt);
            byte[] bytes = message.digest(seed.getBytes(StandardCharsets.UTF_8));

            // Build the String of the hash
            StringBuilder sb = new StringBuilder();
            for (byte aByte : bytes) {
                sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
            }

            hashToGenerate = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return hashToGenerate;

    }
}
