# ContaFlow Landing

Landing page estática lista para deploy en Vercel.

## Scripts

- `npm install`
- `npm run build` — transpila `static/landing.source.jsx`, actualiza hash de cache busting y genera `static/landing.bundle.js`.
- `npm run dev` — mismo build en modo watch para desarrollo local.

## Deploy en Vercel

1. Crea un repositorio en GitHub y sube este directorio.
2. En Vercel, elige **Framework: Other**, `Build Command: npm run build`, `Output Directory: static`.
3. Conecta tu dominio en **Settings → Domains**.

`static/index.html` es la página principal; ajusta o reemplaza las imágenes en `static/...` según sea necesario.
