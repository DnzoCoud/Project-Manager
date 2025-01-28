# Proyecto de Microservicios con NestJS

¡Bienvenidos al **Proyecto de Microservicios con NestJS**! Este proyecto está compuesto por varios microservicios independientes, cada uno con su propia base de datos. El proyecto utiliza un **API Gateway** que se encarga de la gestión centralizada de las solicitudes.

## Arquitectura

Este proyecto está compuesto por los siguientes microservicios:

- **Authentication Service**: Gestiona la autenticación y autorización de usuarios.
- **Users Service**: Gestiona la información de los usuarios.
- **Projects Service**: Gestiona los proyectos.
- **Tasks Service**: Gestiona las tareas asociadas a los proyectos.
- **Teams Service**: Gestiona los equipos dentro de los proyectos.
- **Comments Service**: Gestiona los comentarios asociados a las tareas.

Cada microservicio tiene su propia base de datos para garantizar la independencia de los servicios.
Y esta hecha con SQLITE por lo que no te preocupes por configurar la db 😎👌

## Requisitos

Asegúrate de tener lo siguiente instalado en tu máquina:

- [Node.js](https://nodejs.org/) (v22 o superior)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) (Administrador de paquetes)

## Instalación

Sigue estos pasos para clonar el repositorio y poner en marcha el proyecto en tu máquina local:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/DnzoCoud/Project-Manager
   ```

2. Accede al directorio del proyecto:
   ```bash
   cd project-manager
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. No requieres vaeriables de entorno para este proyecto

## Ejecutar el Proyecto

Para ejecutar los microservicios y el API Gateway, sigue estos pasos:

1. Ejecuta el API Gateway:

   ```bash
   npm run start:dev
   ```

   Esto arrancará la aplicación en [http://localhost:8000](http://localhost:8000). donde manejará las solicitudes y las redirigirá a los microservicios correspondientes.

2. Ejecuta cada microservicio individualmente en los puertos correspondientes. En una terminal separada, ejecuta:

- **Authentication Service** en el puerto 8001:
  ```bash
  nest start authentication
  ```
- **Users Service** en el puerto 8002:
  ```bash
  nest start users
  ```
- **Projects Service** en el puerto 8003:
  ```bash
  nest start projects
  ```
- **Tasks Service** en el puerto 8004:
  ```bash
  nest start tasks
  ```
- **Teams Service** en el puerto 8005:
  ```bash
  nest start teams
  ```
- **Comments Service** en el puerto 8006:
  ```bash
  nest start comments
  ```

Una vez que todos los microservicios estén corriendo, deberías tener los siguientes servicios activos:

- **API Gateway**: en [http://localhost:8000](http://localhost:8000).
- **Authentication Service**: en [http://localhost:8001](http://localhost:8001).
- **Users Service**: en [http://localhost:8002](http://localhost:8002).
- **Projects Service**: en [http://localhost:8003](http://localhost:8003).
- **Tasks Service**: en [http://localhost:8004](http://localhost:8004).
- **Teams Service**: en [http://localhost:8005](http://localhost:8005).
- **Comments Service**: en [http://localhost:8006](http://localhost:8006).
