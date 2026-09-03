# MyBlog

Biblioteca personal de notas y artículos técnicos construida como un sitio estático.

## Stack

- Astro
- TypeScript
- Tailwind CSS 4
- Content Collections
- Markdown
- Lucide

## Desarrollo

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Estructura principal

- `src/content/posts`: artículos Markdown organizados por categoría.
- `src/config/categories.ts`: fuente de verdad de categorías.
- `src/components`: componentes de interfaz y comportamiento del sitio.
- `src/pages/articulos.astro`: índice completo de artículos.
- `src/styles`: tokens, estilos globales, Markdown y estados de interfaz.
- `public/images/posts`: imágenes públicas de artículos.
- `docs/article.example.md`: referencia para escribir artículos.

## Crear un artículo

Crea un archivo en `src/content/posts/<category>/<slug>.md`. Usa
`docs/article.example.md` como plantilla de frontmatter y contenido.

## Crear una categoría

Añade la categoría en `src/config/categories.ts`. Desde esa configuración se
derivan el schema de contenido, la navegación y las rutas de categoría.

## Imágenes

Guarda las imágenes de un artículo en:

```text
public/images/posts/<category>/<slug>/
```

Úsalas desde Markdown con una ruta pública:

```md
![Texto alternativo](/images/posts/<category>/<slug>/imagen.webp)
```

## Producción

Ejecuta `pnpm build` para generar la salida estática compatible con Vercel.
Configura la URL y los metadatos globales del sitio en `src/config/site.ts`.
