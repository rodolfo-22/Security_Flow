package com.uca.project.controllers;

import com.uca.project.services.servicesImpl.MqttPublisher;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/mqtt")
@RestController
public class MqttController {

    @Autowired
    private MqttPublisher mqttPublisher;

    @GetMapping("/publish")
    public String publishMessage(@RequestParam String message) {
        try {
            mqttPublisher.publish("prueba", message);
            return "Mensaje publicado exitosamente!";
        } catch (MqttException e) {
            e.printStackTrace();
            return "Error al publicar el mensaje";
        }
    }
}
