package com.uca.project.config;

import org.springframework.context.annotation.Configuration;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    private static final String MQTT_BROKER = "tcp://157.230.230.162:1883"; // Dirección y puerto del broker MQTT
    private static final String CLIENT_ID = "SpringBootClient";

    @Bean
    public MqttClient mqttClient() throws MqttException {
        MqttClient client = new MqttClient(MQTT_BROKER, CLIENT_ID, new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);
        // Si necesitas autenticación
        // options.setUserName("username");
        // options.setPassword("password".toCharArray());

        client.connect(options);
        return client;
    }
}

