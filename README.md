# MAI — Web oficial

Landing one-page para MAI. Stack: Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## Instalación y uso

```bash
npm install
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Configuración inicial

Editar `src/data/config.ts`:

```ts
export const siteConfig = {
  googleScriptEndpoint: "REPLACE_WITH_GOOGLE_APPS_SCRIPT_URL", // URL de tu Google Apps Script publicado
  whatsappUrl: "https://wa.me/549TUNUMERO?text=...",            // Reemplazar con tu número
  email: "tu@email.com",
  ...
}
```

## Cómo configurar Google Apps Script

1. Crear un Google Sheet para recibir los leads.
2. En el Sheet, ir a **Extensiones → Apps Script**.
3. Pegar una función `doPost(e)` que lea `e.postData.contents` (JSON) y lo escriba en el Sheet.
4. Publicar el script como **Web App** (acceso: Anyone, incluso anónimo).
5. Copiar la URL generada y pegarla en `googleScriptEndpoint`.

### Nota importante sobre `no-cors`

Los formularios envían datos con `mode: 'no-cors'` y `Content-Type: 'text/plain'`. Esto es necesario porque Google Apps Script no devuelve headers CORS para peticiones anónimas. Con esta configuración:

- **El frontend no puede leer la respuesta del servidor.** La respuesta es opaca (tipo `opaque`).
- Si el fetch no lanza una excepción de red, se muestra el mensaje de éxito al usuario.
- **La verificación real de que el dato llegó se hace revisando el Google Sheet** — no hay forma de confirmarlo desde el navegador.
- El bloque `catch` sigue manejando errores de red (sin conexión, URL inválida).

El payload que llega al GAS en `e.postData.contents` tiene esta estructura JSON:

```json
{
  "source": "contact | lead-magnet | popup",
  "name": "...",
  "email": "...",
  "whatsapp": "...",
  "company": "...",
  "businessType": "...",
  "process": "...",
  "language": "es | en"
}
```

## Deploy en GitHub Pages

1. Asegurarse de tener `base: './'` en `vite.config.ts` (ya configurado).
2. Hacer build: `npm run build`
3. El contenido de `dist/` se sube a la rama `gh-pages` (o configurar Pages para que sirva desde `dist/`).
4. Con `gh-pages`: `npx gh-pages -d dist`

Si el repo está en un subpath (ej: `usuario.github.io/mai`), cambiar `base` en `vite.config.ts`:

```ts
base: '/mai/',
```

## Dónde editar textos

Todos los textos en español e inglés están en:

```
src/data/translations.ts
```

## Dónde editar casos de uso

Las 7 cards de casos de uso están en:

```
src/data/useCases.ts
```

## Dónde editar configuración

Google Apps Script URL, WhatsApp, email y configuración del popup en:

```
src/data/config.ts
```

## Imagen Open Graph

Crear `public/og-image.png` (1200×630px) con la imagen de preview para redes sociales.
