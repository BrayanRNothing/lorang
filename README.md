# Lorang
## Backend dual: MongoDB o JSON local

### Importante: Local vs Produccion

- `DATA_MODE=local` en `backend/.env` solo afecta tu servidor local.
- Tu celular/laptop en la URL publica usan el backend desplegado (no tu PC).
- Si quieres que se vea para todos, el producto debe guardarse en el backend de produccion.
- En Vercel/hosting, configura `VITE_BACKEND_URL` en variables de entorno del proyecto (no solo en tu `.env` local).

Recomendado para este proyecto:

```
VITE_BACKEND_URL=https://focused-presence-production-6e28.up.railway.app
```

El backend ahora soporta dos modos de almacenamiento, seleccionables por variable de entorno `DATA_MODE`:

- `mongo`: usa MongoDB Atlas a través de Mongoose (como antes).
- `local`: guarda y lee productos desde `backend/data/products.json` (sin DB).

### Variables de entorno (`backend/.env`)

Puedes copiar `backend/.env.example` a `backend/.env` y ajustar:

```
DATA_MODE=local
PORT=3000
MONGO_URI=... # solo si DATA_MODE=mongo
CLOUDINARY_*=  # opcional, para /api/upload
```

### Endpoints

- `GET /api/products` — lista productos (según modo actual)
- `GET /api/products/:id` — detalle
- `POST /api/products` — crea producto (en DB o en JSON)
- `DELETE /api/products/:id` — elimina
- `GET /api/products/__mode` — devuelve `{ mode: 'local' | 'mongo' }`

Formato esperado de `POST /api/products`:

```json
{
	"nombre": "...",
	"descripcion": "...",
	"precio": "400",
	"imagen": "https://...",     // principal
	"images": ["https://..."],    // opcional, galería
	"category": "all"
}
```

En modo `local`, el backend genera `id` automáticamente y lo persiste en `data/products.json`.

## Despliegue en Hostinger (resumen)

1. Crea un sitio Node.js en tu panel (o usa SSH). Asegúrate de tener Node 18+.
2. Sube el repo (git pull o File Manager). Instala dependencias en `backend`.
3. Crea `backend/.env` con `DATA_MODE=local` para iniciar rápido sin DB.
4. Arranca el servidor en `backend/server.js` (PM2 recomendado) y abre el puerto.
5. En el frontend, define `VITE_BACKEND_URL` apuntando al dominio/puerto del backend.

Para usar `mongo`, cambia `DATA_MODE=mongo` y configura `MONGO_URI`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
