#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <Servo.h>
#include <ESP8266HTTPClient.h>

#define TRIGGER_PIN 5
#define ECHO_PIN 4

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

bool status = false;

// Configuración de la red WiFi
const char* ssid = "CLARO_Ytdn5c";
const char* password = "B180976189";

// Crear una instancia del servidor web en el puerto 80
ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);

  // Conexión a la red WiFi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }

  Serial.println("Conectado a la WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Obtener y mostrar la IP pública
  String publicIP = getPublicIP();
  Serial.print("IP Pública: ");
  Serial.println(publicIP);

  // Configurar el manejador para solicitudes POST
  server.on("/entry", HTTP_POST, handlePostData);

  // Iniciar el servidor
  server.begin();
  Serial.println("Servidor iniciado");

  // Servo setup
  myservo.attach(2);  // attaches the servo on GPIO 2 to the servo object

  // Ultrasónico setup
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // Manejar las solicitudes del cliente
  server.handleClient();
  checkStatusServo();
}

void checkStatusServo() {
  if(status == true) {
    myservo.write(0); // Abre el servo
  } else {
    myservo.write(180);
  }
}

// Función para manejar solicitudes POST
void handlePostData() {
  if (server.hasArg("plain")) {
    String message = server.arg("plain");
    Serial.println("Datos recibidos: " + message);

    // Crear un objeto JSON
    DynamicJsonDocument doc(1024);

    // Intentar parsear el JSON
    DeserializationError error = deserializeJson(doc, message);
    
    if (error) {
      Serial.print("Error al parsear JSON: ");
      Serial.println(error.c_str());
      server.send(400, "application/json", "{\"status\":\"failure\",\"reason\":\"Invalid JSON\"}");
      return;
    }

    // Extraer valores del JSON
    status = doc["status"];

    Serial.print("Status: ");
    Serial.println(status);

    // Responder al cliente
    server.send(200, "application/json", "{\"status\":\"success\"}");
  } else {
    server.send(400, "application/json", "{\"status\":\"failure\",\"reason\":\"No data received\"}");
  }
}

// Función para obtener la IP pública
String getPublicIP() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, "http://api.ipify.org"); // API para obtener la IP pública
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
      http.end();
      return payload;
    } else {
      Serial.println("Error al obtener la IP pública");
      http.end();
      return "";
    }
  }
  return "";
}


