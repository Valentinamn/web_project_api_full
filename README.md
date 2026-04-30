# Tripleten web_project_api_full

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

Frontend: pendiente

Backend/API: pendiente
