---
title: "Autenticación con Google en Astro paso a paso"
description: "Guía práctica para implementar inicio de sesión con Google en un sitio Astro."
publishedAt: 2026-09-01
updatedAt: 2026-09-01
category: "autenticacion"
tags:
  - astro
  - google
  - oauth
draft: false
sidebarLabel: "Google en Astro"
order: 4
---

## 1. Crear credenciales en Google Cloud

Primero debes crear las credenciales que utilizará tu aplicación para comunicarse con Google.

Entra a Google Cloud Console, crea un proyecto y configura un cliente OAuth para una aplicación web.

Durante el desarrollo puedes utilizar una URI de redirección similar a:

```text
http://localhost:4321/api/auth/callback/google
```

> Nunca publiques secretos, claves privadas o credenciales OAuth en el cliente ni dentro de un repositorio público.

## 2. Instalar dependencias

Instala las dependencias necesarias para la solución de autenticación que utilizará el proyecto.

```bash
pnpm add auth-astro
```

La librería exacta dependerá de la estrategia de autenticación elegida.

## 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto.

```text
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Estas variables deben utilizarse únicamente desde código ejecutado en el servidor.

> [!WARNING]
> Nunca expongas `GOOGLE_CLIENT_SECRET` dentro de código que se ejecute en el navegador.

## 4. Configurar la autenticación

La implementación concreta dependerá del proveedor que utilices.

Una estructura posible sería:

```ts
const googleConfig = {
  clientId: import.meta.env.GOOGLE_CLIENT_ID,
  clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
};
```

## 5. Proteger rutas

Una vez configurado el inicio de sesión, puedes comprobar la sesión antes de permitir acceso a determinadas páginas.

Por ejemplo:

```ts
if (!session) {
  return Astro.redirect("/login");
}
```

## 6. Probar autenticación

Antes de desplegar, comprueba al menos los siguientes flujos:

1. Inicio de sesión correcto.
2. Cancelación del proceso.
3. Credenciales incorrectas.
4. Sesión expirada.
5. Cierre de sesión.

## 7. Despliegue

Cuando despliegues la aplicación tendrás que registrar también la URL de producción como URI autorizada dentro de Google Cloud.

La URL local y la URL de producción son diferentes, por lo que ambas deben estar configuradas correctamente.
