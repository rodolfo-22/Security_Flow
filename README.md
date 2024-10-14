# Sistema de Control de Acceso para la Colonia HLVS

## Descripción del Proyecto
Este proyecto tiene como objetivo mejorar la seguridad y el control de acceso en la colonia HLVS mediante la implementación de un sistema automatizado basado en códigos QR. La solución proporcionará una gestión eficiente de entradas para residentes, visitantes autorizados y servicios de autoridades.

## Características Principales
- **Generación de Claves Dinámicas**: Claves temporales en forma de códigos QR para acceso de residentes y visitantes.
- **Validación Automática**: Uso de tablets para la lectura y validación de códigos QR en puntos de control.
- **Gestión de Permisos**: Residente puede crear permisos para visitantes con parámetros de duración, fecha y hora.
- **Integración con Google Accounts**: Uso de cuentas de Google para la autenticación de usuarios.
- **Historial de Entradas**: Registro detallado de todas las entradas para fines de control y seguridad.

## Arquitectura del Sistema
El sistema se desarrollará con una arquitectura cliente/servidor utilizando las siguientes tecnologías:
- **Backend**: Spring Framework para Java con Spring Boot.
- **Base de Datos**: PostgreSQL, accesible mediante Spring Data y JPA Repositories.
- **Frontend**: Aplicación web utilizando ReactJS para una interfaz dinámica y moderna.

## Usuario de Prueba
Para facilitar las pruebas de la aplicación, se han creado los siguientes usuarios de prueba con diferentes roles:
- Usuario Administrador (ADMN)
  El correo a utilizar es admonhlvs@gmail.com
- Usuario Residente (RSDT)
  El correo a utilizar es 00082421@uca.edu.sv
- Usuario Residente Secundario (RSNR)
  El correo a utilizar es cprogratiss@gmail.com
- Usuario Guardia (GRDA)
  El correo a utilizar es juanlohlvs@gmail.com
- Usuario Visitante (VSTT)
  El correo a utilizar es normaltestinghlvs@gmail.com
  
  Recordar que los usuarios se crean a partir de correos electronicos de google, no necesitas crear contraseña.

## Requisitos de Instalación
### Prerrequisitos
- Java JDK 11 o superior
- Node.js y npm
- PostgreSQL

### Instalación del Backend
1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio/Server
    ```
2. Configura la base de datos en `application.properties`.
3. Ejecuta el backend:
    ```bash
    ./mvnw spring-boot:run
    ```

### Instalación del Frontend
1. Ve al directorio del cliente:
    ```bash
    cd ../Client
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Ejecuta la aplicación:
    ```bash
    npm start
    ```

## Uso del Sistema
### Generación de Claves
1. Los residentes pueden generar una clave desde su perfil.
2. Los visitantes recibirán un permiso que les permitirá generar claves válidas durante un periodo específico.

### Validación de Claves
1. Las tablets en los puntos de control escanearán los códigos QR.
2. Si la clave es válida, se permitirá la entrada automática.

## Contribuciones
1. Clona el repositorio y crea una nueva rama:
    ```bash
    git checkout -b feature-nueva
    ```
2. Realiza los cambios necesarios y realiza commit:
    ```bash
    git commit -m "Descripción de la nueva característica"
    ```
3. Sube tus cambios y abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE.txt) para obtener más información.

## Contacto
Para cualquier duda o consulta, puedes contactar al administrador del proyecto a través de su correo electrónico: 00002721@uca.edu.sv


