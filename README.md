# Tripleten web_project_api_full

## Descripcion

Aplicacion full stack para compartir tarjetas con imagenes. Permite registrar usuarios, iniciar sesion, editar perfil, actualizar avatar, crear y eliminar tarjetas, y agregar o quitar likes.

## Funcionalidad

- Registro y autorizacion de usuarios.
- Inicio de sesion con JWT.
- Proteccion de rutas privadas.
- Edicion de perfil y avatar.
- Creacion y eliminacion de tarjetas.
- Likes y dislikes en tarjetas.
- Validacion de datos en el servidor.
- Manejo centralizado de errores.
- Registro de solicitudes y errores.
- Despliegue en servidor remoto con HTTPS.

## Tecnologias

- React
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Celebrate/Joi
- Winston
- Nginx
- PM2
- Google Cloud
- Certbot/HTTPS

Proyecto full stack con estructura:

```txt
.git/
backend/
frontend/
README.md
```

## Backend

API Node.js/Express con MongoDB, autorizacion JWT, validacion con Celebrate, manejo centralizado de errores, logs y CORS.

### Scripts

```bash
cd backend
npm install
npm run dev
```

### Variables de entorno en produccion

El archivo `.env` debe existir solo en el servidor:

```env
NODE_ENV=production
JWT_SECRET=pon_aqui_una_clave_segura
MONGO_URL=mongodb://127.0.0.1:27017/aroundb
PORT=3000
```

En desarrollo el servidor funciona sin `.env` usando `dev-secret`.

### Rutas publicas

- `POST /signup`
- `POST /signin`
- `GET /crash-test`

### Rutas protegidas

Todas requieren:

```txt
Authorization: Bearer <token>
```

- `GET /users`
- `GET /users/me`
- `GET /users/:userId`
- `PATCH /users/me`
- `PATCH /users/me/avatar`
- `GET /cards`
- `POST /cards`
- `DELETE /cards/:cardId`
- `PUT /cards/:cardId/likes`
- `DELETE /cards/:cardId/likes`

## Dominios

Frontend: https://valentina-mn14.com.chickenkiller.com

Backend/API: https://api.valentina-mn14.com.chickenkiller.com
