# NomadVentures

## [See the App!](https://nomadventures.adaptable.app/)

![App Logo](your-image-logo-path-or-name)

## Description

NomadVentures es un proyecto de viajes de autor donde guias y usuarios interaccionan entre si, creando y apuntandose a distintos destinos

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

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
