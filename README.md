# NomadVentures

## [See the App!](https://nomadventures.adaptable.app/)

![App Logo](![logo](https://github.com/AlvaroSapata/NomadVentures/assets/128697569/a9b0ea79-31fb-4079-919e-fade34685f30)
)

## Description

NomadVentures es un proyecto de viajes de autor donde guias y usuarios interaccionan entre si, creando y apuntandose a distintos destinos

## User Stories

- **User** -  User: Como User puede hacer el Registro en la pagina web.
- **User** -  User: Como User puede hacer el Login en la pagina web.
- **User** -  User: Como User puede navegar en la barra Destinos.
- **User** -  User: Como User puede apuntarse a un Destino.
- **User** -  User: Como User puede Editar su perfil y ver los viajes que ha realizado.
- **User** -  User: Como User puede ver los detalles de cada destino.
- **User** -  User: Como User puede acceder a la página Sobre Nosotros.


- **Guia** -  Guia: Como Guia puede hacer el Registro en la pagina web.
- **Guia** -  Guia: Como Guia puede hacer el Login en la pagina web. 
- **Guia** -  Guia: Como Guia puede navegar en la barra Destinos.
- **Guia** -  Guia: Como Guia puede apuntarse a un Destino.
- **Guia** -  Guia: Como Guia puede Editar su perfil y ver los viajes que ha realizado.
- **Guia** -  Guia: Como Guia puede ver los detalles de cada destino.
- **Guia** -  Guia: Como Guia puede acceder a la página Sobre Nosotros.
- **Guia** -  Guia: Como Guia puede acceder a crear un nuevo viaje.
- **Guia** -  Guia: Como Guia puede acceder a ver todos los viajes que ha creado 

- **Admin** -  Admin: Como Admin puede hacer el Registro en la pagina web.
- **Admin** -  Admin: Como Admin puede hacer el Login en la pagina web. 
- **Admin** -  Admin: Como Admin puede navegar en la barra Destinos.
- **Admin** -  Admin: Como Admin puede apuntarse a un Destino.
- **Admin** -  Admin: Como Admin puede Editar su perfil y ver los viajes que ha realizado.
- **Admin** -  Admin: Como Admin puede ver los detalles de cada destino.
- **Admin** -  Admin: Como Admin puede acceder a la página Sobre Nosotros.
- **Admin** -  Admin: Como Admin puede acceder a crear un nuevo viaje. 
- **Admin** -  Admin: Como Admin puede acceder a ver todos los viajes que ha creado
- **Admin** -  Admin: Como Admin puede acceder al apartado de validacion de viajes
- **Admin** -  Admin: Como Admin puede acceder al apartado de lista de usuarios y puede eliminar los usuarios.



## Backlog Functionalities

- Añadir multiples imagenes a los destinos
- Añadir videos especificos a los destinos
- Interaccion entre usuarios
- filtrados por paises
- Crear una funcionalidad tipo red social donde se puedan subir fotos relacionadas con algun destino/pais, y que los demas usuarios puedan verlas y actuar sobre ellas

## Technologies used

HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, etc.


## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description


## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

User model
 
```
firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    enum: ["guia", "usuario", "admin"],
    default: "usuario",
  },

  image: {
    type: String,
  },
  viajesApuntado: {
    type: [Schema.Types.ObjectId],
    ref: "Destino",
  },
```

Destino model

```
title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  lider: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  isValidated: {
    type: String,
    enum: ["pendiente", "rechazado", "aceptado"],
    default: "pendiente",
  },
  joinedPeople: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
``` 

## Links

## Collaborators

[Alvaro Martinez](https://github.com/AlvaroSapata)

[Jonathan Iglesias](https://github.com/Johnny-Ig)

### Project

[Repository Link](https://github.com/AlvaroSapata/NomadVentures)

[Deploy Link](https://nomadventures.adaptable.app/)


### Slides

[Slides Link](www.your-slides-url-here.com)
