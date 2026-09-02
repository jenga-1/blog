---
# Título principal del artículo.
# Se renderiza automáticamente como H1.
title: "Título del artículo"

# Resumen breve del contenido.
# Aparece debajo del título, en listados, buscador y metadata SEO.
description: "Descripción breve y clara del contenido del artículo."

# Fecha original de publicación.
# Formato: YYYY-MM-DD
publishedAt: 2026-09-01

# Opcional.
# Añádelo solamente cuando hayas realizado una actualización relevante.
# Formato: YYYY-MM-DD
updatedAt: 2026-09-01

# Categoría principal.
#
# Debe coincidir con una categoría definida en:
# src/config/categories.ts
#
# Ejemplo:
category: "programacion"

# Etiquetas relacionadas con el contenido.
# Puedes añadir tantas como necesites.
tags:
  - javascript
  - typescript
  - frontend

# Imagen opcional para OpenGraph y redes sociales.
# Tamaño recomendado: 1200x630.
#
# Guarda la imagen, por ejemplo, en:
# public/images/posts/programacion/mi-articulo/cover.png
#
# Si se omite, se utilizará la imagen OpenGraph global.
image: "/images/posts/programacion/mi-articulo/cover.png"

# false = artículo publicado.
# true = artículo oculto y excluido de rutas, sidebar,
# búsqueda, categorías, RSS y sitemap.
draft: false

# Nombre corto utilizado dentro del sidebar.
# Es especialmente útil cuando el título principal es largo.
sidebarLabel: "Título corto"

# Posición del artículo dentro de su categoría en el sidebar.
# Los números menores aparecen primero.
order: 1
---

## Introducción

Escribe aquí una breve introducción que explique qué aprenderás, resolverás o guardarás en este artículo.

No añadas un encabezado `# Título del artículo`, porque el H1 se genera automáticamente utilizando `title` del frontmatter.

## Primera sección

Escribe aquí el contenido principal.

Puedes utilizar párrafos normales de Markdown.

### Subsección

Utiliza `###` cuando una sección dependa de otra.

Los encabezados `##` y `###` aparecerán automáticamente dentro de **En esta página**.

## Callouts

Puedes utilizar diferentes tipos de avisos.

### Nota

> [!NOTE]
> Información complementaria que vale la pena recordar.

### Tip

> [!TIP]
> Una recomendación práctica que puede facilitar el proceso.

### Importante

> [!IMPORTANT]
> Información especialmente relevante para completar correctamente el proceso.

### Advertencia

> [!WARNING]
> Algo que puede producir problemas, errores o comprometer la seguridad.

## Código inline

Para mencionar código dentro de un párrafo utiliza backticks.

Por ejemplo:

`const user = "Julio";`

También puedes mencionar funciones, comandos o archivos:

`getCollection()`

`pnpm dev`

`src/content.config.ts`

## Bloques de código

Especifica siempre el lenguaje cuando lo conozcas.

### TypeScript

```ts
interface User {
  id: string;
  name: string;
}

const user: User = {
  id: "1",
  name: "Julio",
};
```

### Bash

```bash
pnpm install
pnpm dev
```

### JSON

```json
{
  "name": "myblog",
  "private": true
}
```

### CSS

```css
.container {
  display: flex;
  align-items: center;
}
```

### Variables de entorno

Utiliza `text` para evitar warnings de Shiki:

```text
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Estructuras de carpetas

También utiliza `text`:

```text
src/
├── features/
│   ├── authentication/
│   ├── users/
│   └── payments/
├── shared/
└── pages/
```

El sitio añadirá automáticamente el nombre del lenguaje y el botón **Copiar** a los bloques de código.

## Listas

Lista normal:

- Primer elemento
- Segundo elemento
- Tercer elemento

Lista numerada:

1. Primer paso
2. Segundo paso
3. Tercer paso

También puedes anidar elementos:

- Frontend
  - Astro
  - Next.js
- Backend
  - NestJS
  - Node.js

## Enlaces

Puedes utilizar enlaces Markdown normales:

[Astro](https://astro.build)

Para archivos o funciones puedes combinar enlaces y código cuando sea apropiado.

## Imágenes

Las imágenes públicas pueden guardarse, por ejemplo, en:

```text
public/images/posts/programacion/mi-articulo/
├── cover.png
├── ejemplo-01.webp
└── ejemplo-02.webp
```

Después puedes utilizarlas desde Markdown:

```md
![Descripción de la imagen](/images/posts/programacion/mi-articulo/ejemplo-01.webp)
```

Utiliza siempre un texto alternativo que describa brevemente la imagen.

## Blockquotes normales

Si no necesitas un callout especial, puedes utilizar un blockquote tradicional:

> Este es un detalle que quiero conservar como referencia.

## Tablas

| Propiedad      | Descripción                        |
| -------------- | ---------------------------------- |
| `title`        | Título principal del artículo      |
| `description`  | Resumen breve                      |
| `category`     | Categoría principal                |
| `tags`         | Etiquetas relacionadas             |
| `image`        | Imagen social opcional             |
| `draft`        | Controla si el artículo se publica |
| `sidebarLabel` | Nombre utilizado en el sidebar     |
| `order`        | Orden dentro de la categoría       |

## Pasos de un procedimiento

Cuando el contenido sea una guía, intenta estructurarlo secuencialmente.

### 1. Preparar el proyecto

Explica qué debe hacerse primero.

```bash
pnpm install
```

### 2. Configurar

Explica la configuración.

### 3. Comprobar

Explica cómo verificar que todo funciona correctamente.

## Buenas prácticas

- Explica primero el problema.
- Después explica la solución.
- Incluye ejemplos cuando aporten valor.
- Evita bloques de texto excesivamente grandes.
- Divide los temas complejos mediante `##` y `###`.
- Utiliza callouts solo cuando realmente haya algo que destacar.
- Añade la fuente original cuando el artículo provenga de otra referencia.
- Comprueba ejemplos técnicos antes de publicarlos.

## Fuente

Si el artículo está basado en documentación, un video, Reel, publicación u otra fuente, puedes indicarla aquí.

Ejemplo:

Fuente principal: [Astro Documentation](https://docs.astro.build/)

## Conclusión

Resume brevemente lo más importante del artículo y cualquier detalle que quieras recordar en el futuro.
