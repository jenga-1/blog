---
title: "Screaming Architecture: cómo organizar un proyecto por funcionalidades"
description: "Guía detallada para entender Screaming Architecture, saber cuándo utilizarla y organizar correctamente features, componentes, servicios, repositorios y código compartido."
publishedAt: 2026-09-01
updatedAt: 2026-09-01
category: "arquitectura"
tags:
  - arquitectura
  - screaming-architecture
  - clean-architecture
  - frontend
  - typescript
draft: false
sidebarLabel: "Screaming Architecture"
order: 1
---

## 1. Qué es Screaming Architecture

Screaming Architecture es una forma de organizar un proyecto de manera que su estructura de carpetas comunique inmediatamente **qué hace la aplicación**.

El concepto fue popularizado por Robert C. Martin y parte de una idea sencilla:

> La arquitectura de un proyecto debería revelar su propósito antes que las tecnologías utilizadas para construirlo.

En una arquitectura tradicional es común encontrar estructuras como:

```text
src/
├── components/
├── controllers/
├── hooks/
├── repositories/
├── services/
├── types/
└── utils/
```

Esta estructura indica qué tipos de archivos existen, pero no explica realmente qué hace la aplicación.

Si alguien entra al proyecto por primera vez, puede saber que existen servicios, componentes y repositorios, pero todavía no sabe si está viendo:

- una aplicación bancaria;
- una plataforma de música;
- un ecommerce;
- una red social;
- un gestor de contraseñas;
- un sistema de reservas.

Con Screaming Architecture buscamos algo diferente.

Por ejemplo:

```text
src/
├── features/
│   ├── authentication/
│   ├── favorites/
│   ├── playlists/
│   ├── search/
│   └── users/
└── shared/
```

Con solo mirar las carpetas ya podemos empezar a entender lo que hace la aplicación.

La arquitectura está **gritando el dominio del sistema**.

---

## 2. Qué problema intenta solucionar

Cuando una aplicación es pequeña, organizar archivos por tipo puede parecer suficiente.

Por ejemplo:

```text
src/
├── components/
├── hooks/
├── services/
└── utils/
```

Con diez o veinte archivos no suele haber demasiados problemas.

Pero cuando el proyecto crece pueden empezar a aparecer estructuras como:

```text
components/
├── AlbumCard.tsx
├── ArtistCard.tsx
├── FavoriteButton.tsx
├── LoginForm.tsx
├── PlaylistCard.tsx
├── ProfileForm.tsx
├── SearchFilters.tsx
├── SearchInput.tsx
└── TrackRow.tsx

services/
├── albumService.ts
├── authService.ts
├── favoriteService.ts
├── playlistService.ts
├── searchService.ts
└── userService.ts

hooks/
├── useAuth.ts
├── useFavorites.ts
├── usePlaylist.ts
├── useSearch.ts
└── useUser.ts
```

Los archivos de una misma funcionalidad terminan repartidos por todo el proyecto.

Por ejemplo, para modificar favoritos podrías necesitar entrar en:

```text
components/FavoriteButton.tsx
hooks/useFavorites.ts
services/favoriteService.ts
types/favorites.ts
repositories/favoriteRepository.ts
```

Con Screaming Architecture intentamos mantener esas piezas juntas:

```text
features/
└── favorites/
    ├── components/
    ├── hooks/
    ├── services/
    ├── repositories/
    └── types/
```

Ahora todo lo relacionado con favoritos está localizado dentro de una misma feature.

---

## 3. La regla principal

La regla más importante puede resumirse así:

> Organiza primero por funcionalidad o dominio y después, dentro de esa funcionalidad, por responsabilidad técnica.

En lugar de hacer esto:

```text
src/
├── components/
├── services/
├── repositories/
└── hooks/
```

hacemos:

```text
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── services/
│   │   └── repositories/
│   │
│   ├── search/
│   │   ├── components/
│   │   ├── services/
│   │   └── repositories/
│   │
│   └── favorites/
│       ├── components/
│       ├── services/
│       └── repositories/
│
└── shared/
```

La primera pregunta deja de ser:

> ¿Este archivo es un componente o un servicio?

y pasa a ser:

> ¿A qué funcionalidad pertenece este archivo?

Después determinamos qué responsabilidad tiene dentro de esa funcionalidad.

---

## 4. Cuándo utilizar Screaming Architecture

No todos los proyectos necesitan esta arquitectura.

Tiene especialmente sentido cuando la aplicación tiene **varias funcionalidades claramente diferenciadas**.

Por ejemplo:

```text
authentication
users
payments
search
favorites
notifications
orders
playlists
dashboard
settings
```

También es útil cuando:

1. El proyecto seguirá creciendo.
2. Existen varios dominios funcionales.
3. Diferentes funcionalidades tienen su propia lógica.
4. Hay varios desarrolladores trabajando en el mismo proyecto.
5. Quieres evitar carpetas globales con cientos de archivos.
6. Quieres localizar rápidamente todo lo relacionado con una funcionalidad.
7. El frontend contiene lógica de negocio considerable.
8. Planeas mantener el proyecto durante bastante tiempo.

---

## 5. Cuándo probablemente no utilizarla

Screaming Architecture no debería aplicarse únicamente porque parezca una arquitectura más profesional.

Una landing sencilla como:

```text
/
├── Hero
├── Servicios
├── Testimonios
├── Contacto
└── Footer
```

probablemente no necesita:

```text
features/
├── hero/
├── services/
├── testimonials/
├── contact/
└── footer/
```

si cada sección contiene solamente un componente.

Tampoco suele ser necesaria para:

- prototipos muy pequeños;
- páginas temporales;
- sitios de una sola página;
- proyectos educativos extremadamente simples;
- aplicaciones con muy poca lógica.

> [!TIP]
> La arquitectura debe reducir complejidad, no crearla.

Si crear una feature implica generar diez carpetas vacías que nunca utilizarás, probablemente estás sobrearquitectando el proyecto.

---

## 6. Estructura general recomendada

Una estructura común puede ser:

```text
src/
├── features/
├── shared/
├── layouts/
├── pages/
├── config/
└── styles/
```

Cada carpeta tiene una responsabilidad distinta.

---

## 7. `features/`

`features` contiene las funcionalidades reales que ofrece la aplicación.

Por ejemplo, en una aplicación de música:

```text
features/
├── albums/
├── artists/
├── authentication/
├── favorites/
├── history/
├── player/
├── playlists/
└── search/
```

En un ecommerce:

```text
features/
├── authentication/
├── cart/
├── checkout/
├── orders/
├── payments/
├── products/
└── reviews/
```

En una aplicación financiera:

```text
features/
├── accounts/
├── budgets/
├── goals/
├── reports/
├── transactions/
└── transfers/
```

La carpeta `features` debería responder inmediatamente a:

> ¿Qué puede hacer esta aplicación?

---

## 8. Qué puede contener una feature

No todas las features necesitan exactamente las mismas carpetas.

Una feature grande podría tener:

```text
features/
└── authentication/
    ├── components/
    ├── services/
    ├── repositories/
    ├── schemas/
    ├── types/
    ├── utils/
    └── index.ts
```

Pero una feature más pequeña podría ser simplemente:

```text
features/
└── favorites/
    ├── FavoriteButton.tsx
    └── favorite-service.ts
```

> [!IMPORTANT]
> No crees carpetas únicamente para cumplir una plantilla arquitectónica. Créala cuando exista una responsabilidad real que necesite agruparse.

---

## 9. `components/` dentro de una feature

Contiene componentes relacionados exclusivamente con esa funcionalidad.

Ejemplo:

```text
features/
└── authentication/
    └── components/
        ├── LoginForm.tsx
        ├── LogoutButton.tsx
        ├── GoogleLoginButton.tsx
        └── SessionExpiredDialog.tsx
```

Estos componentes pertenecen al dominio de autenticación.

No deberían ir en:

```text
shared/components/
```

si ninguna otra feature los necesita.

La pregunta para decidir dónde colocar un componente puede ser:

> ¿Este componente tiene sentido fuera de esta funcionalidad?

Si la respuesta es no, probablemente pertenece a la feature.

---

## 10. `services/`

Los servicios representan operaciones o casos de uso relacionados con una funcionalidad.

Por ejemplo:

```text
features/
└── authentication/
    └── services/
        ├── login.ts
        ├── logout.ts
        └── refresh-session.ts
```

Un servicio puede:

- coordinar operaciones;
- utilizar repositorios;
- aplicar reglas;
- transformar información;
- representar un caso de uso.

Ejemplo conceptual:

```ts
export async function loginWithGoogle() {
  const session = await authRepository.loginWithGoogle();

  return session;
}
```

El servicio describe una acción de la aplicación.

---

## 11. `repositories/`

Los repositorios abstraen el origen de los datos.

Por ejemplo:

```text
features/
└── authentication/
    └── repositories/
        ├── auth-repository.ts
        └── auth-http-repository.ts
```

Una interfaz podría ser:

```ts
export interface AuthRepository {
  loginWithGoogle(): Promise<Session>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
}
```

Y una implementación concreta:

```ts
export class HttpAuthRepository implements AuthRepository {
  async loginWithGoogle() {
    // Comunicación con API.
  }

  async logout() {
    // Comunicación con API.
  }

  async getSession() {
    // Comunicación con API.
  }
}
```

Esto permite que la lógica de la aplicación no dependa directamente de `fetch`, Axios, Supabase, Firebase u otra fuente concreta.

---

## 12. `types/`

Contiene tipos propios de esa funcionalidad.

Ejemplo:

```text
features/
└── authentication/
    └── types/
        ├── session.ts
        └── user.ts
```

```ts
export interface Session {
  id: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
```

Si un tipo solo existe porque una feature lo necesita, debería mantenerse dentro de ella.

---

## 13. `schemas/`

Puede contener schemas de validación.

Por ejemplo utilizando Zod:

```text
features/
└── authentication/
    └── schemas/
        └── login-schema.ts
```

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

Esto evita llenar una carpeta global:

```text
schemas/
```

con validaciones pertenecientes a dominios completamente distintos.

---

## 14. `hooks/`

En aplicaciones React, los hooks específicos de la funcionalidad pueden vivir dentro de la feature.

```text
features/
└── search/
    └── hooks/
        ├── useSearch.ts
        └── useSearchFilters.ts
```

No deberían trasladarse automáticamente a:

```text
shared/hooks/
```

solo porque técnicamente sean hooks.

Primero importa **a quién pertenecen**.

---

## 15. `utils/` dentro de una feature

Las utilidades específicas de una funcionalidad también deberían permanecer junto a ella.

Ejemplo:

```text
features/
└── payments/
    └── utils/
        └── calculate-payment-fee.ts
```

Si esa función solamente tiene sentido dentro del dominio de pagos, no debería estar en:

```text
shared/utils/
```

---

## 16. Qué debe ir en `shared/`

`shared` contiene código que **no pertenece exclusivamente a ninguna feature** y puede ser utilizado por varias partes de la aplicación.

Ejemplo:

```text
shared/
├── components/
├── icons/
├── utils/
├── types/
└── constants/
```

Algunos ejemplos podrían ser:

```text
shared/
├── components/
│   ├── Button.tsx
│   ├── Dialog.tsx
│   ├── Spinner.tsx
│   └── Tooltip.tsx
│
├── utils/
│   ├── format-date.ts
│   ├── format-currency.ts
│   └── cn.ts
│
└── types/
    └── pagination.ts
```

---

## 17. Cuándo algo debe pasar a `shared`

Supongamos que inicialmente tienes:

```text
features/
└── products/
    └── components/
        └── EmptyState.tsx
```

Más adelante también necesitas `EmptyState` en:

```text
orders
favorites
search
```

En ese momento puede tener sentido moverlo a:

```text
shared/components/EmptyState.tsx
```

No es necesario anticiparlo desde el principio.

> [!TIP]
> Empieza manteniendo el código cerca de la feature que lo utiliza. Promuévelo a `shared` cuando realmente sea compartido.

---

## 18. Qué NO debería convertirse en `shared`

Un error común es tratar `shared` como una carpeta donde colocar cualquier cosa difícil de clasificar.

Esto termina creando:

```text
shared/
├── components/
│   ├── LoginForm.tsx
│   ├── PlaylistCard.tsx
│   ├── ProductGrid.tsx
│   ├── SearchResults.tsx
│   └── UserProfile.tsx
```

Eso destruye poco a poco la intención de Screaming Architecture.

`shared` debería contener cosas genuinamente reutilizables.

Por ejemplo:

```text
Button
Input
Modal
Tooltip
formatDate
formatCurrency
Pagination
```

No funcionalidades completas.

---

## 19. `pages/`

En frameworks con routing basado en archivos, `pages` o `app` representan rutas.

Idealmente deberían mantenerse relativamente delgadas.

Por ejemplo:

```text
pages/
├── index.astro
├── login.astro
├── favorites.astro
└── search.astro
```

Una página puede encargarse de:

- definir la ruta;
- obtener parámetros;
- obtener datos iniciales;
- seleccionar un layout;
- componer features.

Pero no debería concentrar toda la lógica de una funcionalidad.

---

## 20. Una página debería componer, no implementar todo

En lugar de:

```astro
---
// 300 líneas de lógica.
---

<!-- 500 líneas de interfaz -->
```

podemos tener:

```astro
---
import SearchPage from "@/features/search/components/SearchPage.astro";
---

<SearchPage />
```

O una composición:

```astro
---
import SearchFilters from "@/features/search/components/SearchFilters.astro";
import SearchResults from "@/features/search/components/SearchResults.astro";
---

<SearchFilters />
<SearchResults />
```

La ruta sabe qué debe mostrar.

La feature sabe cómo funciona.

---

## 21. `layouts/`

Los layouts definen estructuras de página reutilizables.

Por ejemplo:

```text
layouts/
├── AppLayout.astro
├── ArticleLayout.astro
└── AuthLayout.astro
```

Un layout puede controlar:

- navbar;
- sidebar;
- contenedores;
- metadata;
- composición general.

No debería contener lógica específica de una funcionalidad como pagos o playlists.

---

## 22. `config/`

`config` puede contener configuraciones globales de la aplicación.

Ejemplo:

```text
config/
├── categories.ts
├── navigation.ts
└── site.ts
```

Estas configuraciones describen cómo funciona o se presenta globalmente el sistema.

Por ejemplo:

```ts
export const siteConfig = {
  name: "MyBlog",
  language: "es",
};
```

---

## 23. `styles/`

Contiene estilos globales, tokens o configuración visual compartida.

```text
styles/
└── global.css
```

No conviene introducir aquí estilos específicos de una feature si pueden mantenerse localizados en esa funcionalidad.

---

## 24. Ejemplo completo en Astro

Una aplicación Astro con Screaming Architecture podría tener:

```text
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   │   ├── LoginForm.astro
│   │   │   └── LogoutButton.astro
│   │   ├── services/
│   │   │   └── auth-service.ts
│   │   ├── repositories/
│   │   │   └── auth-repository.ts
│   │   └── types/
│   │       └── auth.ts
│   │
│   ├── search/
│   │   ├── components/
│   │   │   ├── SearchDialog.astro
│   │   │   └── SearchResult.astro
│   │   ├── services/
│   │   │   └── search-service.ts
│   │   └── utils/
│   │       └── normalize-search.ts
│   │
│   └── favorites/
│       ├── components/
│       │   └── FavoriteButton.astro
│       └── services/
│           └── favorites-storage.ts
│
├── shared/
│   ├── components/
│   │   ├── Button.astro
│   │   └── Dialog.astro
│   ├── icons/
│   └── utils/
│       └── format-date.ts
│
├── layouts/
│   ├── AppLayout.astro
│   └── ArticleLayout.astro
│
├── pages/
│   ├── index.astro
│   ├── favoritos.astro
│   └── [...slug].astro
│
├── config/
│   ├── categories.ts
│   ├── navigation.ts
│   └── site.ts
│
└── styles/
    └── global.css
```

Con solo mirar:

```text
authentication
search
favorites
```

ya sabemos parte de lo que hace la aplicación.

---

## 25. Dependencias entre features

Una regla útil es intentar evitar que las features dependan directamente unas de otras de manera descontrolada.

Por ejemplo:

```text
favorites
   ↓
search
   ↓
users
   ↓
authentication
```

puede terminar creando una red difícil de mantener.

Idealmente:

```text
features
   ↓
shared
```

y no:

```text
shared
   ↓
features
```

Una dependencia razonable sería:

```text
features/search
       ↓
shared/components
```

Pero esto sería una señal problemática:

```text
shared/components/Button
       ↓
features/search
```

`shared` debe mantenerse independiente de las funcionalidades concretas.

---

## 26. Regla de dirección de dependencias

Una regla práctica:

```text
pages
  ↓
features
  ↓
shared
```

Puede visualizarse así:

```text
┌────────────────────┐
│       pages        │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│      features      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│       shared       │
└────────────────────┘
```

Evita que `shared` importe código específico de `features`.

También conviene evitar dependencias circulares entre features.

---

## 27. Una feature no necesita todas las capas

Este es uno de los errores más importantes que hay que evitar.

No hagas esto automáticamente:

```text
feature/
├── components/
├── hooks/
├── repositories/
├── schemas/
├── services/
├── stores/
├── types/
└── utils/
```

si solo tienes dos archivos.

Puedes comenzar:

```text
favorites/
├── FavoriteButton.tsx
└── favorite-storage.ts
```

Y cuando crezca:

```text
favorites/
├── components/
│   ├── FavoriteButton.tsx
│   └── FavoritesList.tsx
│
├── services/
│   └── favorite-service.ts
│
└── repositories/
    └── favorite-repository.ts
```

La arquitectura también debe poder crecer progresivamente.

---

## 28. Cómo decidir si algo es una feature

Puedes hacerte estas preguntas.

### ¿Representa una capacidad real de la aplicación?

Por ejemplo:

```text
authentication
checkout
favorites
playlists
search
```

probablemente sí.

### ¿Tiene lógica propia?

Si contiene:

- componentes;
- casos de uso;
- estado;
- validaciones;
- acceso a datos;

es una señal clara.

### ¿El usuario reconoce esta funcionalidad?

Un usuario puede entender:

```text
Favoritos
Buscar
Perfil
Carrito
Pagos
```

Pero probablemente no:

```text
Helpers
Hooks
Utils
Adapters
```

Las primeras son candidatas naturales a features.

---

## 29. Qué NO es una feature

No todo debe convertirse en feature.

Por ejemplo:

```text
button
modal
dateFormatter
apiClient
logger
spinner
```

son piezas técnicas o reutilizables.

Probablemente pertenecen a:

```text
shared/
```

Tampoco tendría sentido:

```text
features/
└── utils/
```

porque `utils` no describe una capacidad del sistema.

---

## 30. Diferencia entre dominio y feature

Dependiendo del tamaño del proyecto puede aparecer un nivel superior.

Por ejemplo:

```text
features/
```

puede ser suficiente para proyectos medianos.

En proyectos más grandes podrías tener dominios:

```text
domains/
├── commerce/
│   ├── cart/
│   ├── checkout/
│   └── products/
│
├── identity/
│   ├── authentication/
│   └── profile/
│
└── content/
    ├── comments/
    └── posts/
```

No introduzcas ese nivel si todavía no lo necesitas.

> [!NOTE]
> Screaming Architecture describe principalmente una intención arquitectónica. No existe una única estructura de carpetas obligatoria.

---

## 31. Screaming Architecture y Clean Architecture

Screaming Architecture puede utilizarse junto con Clean Architecture, pero no son exactamente lo mismo.

Screaming Architecture se preocupa principalmente por que:

> La estructura comunique el propósito de la aplicación.

Clean Architecture se preocupa además por:

- dirección de dependencias;
- separación entre dominio e infraestructura;
- independencia de frameworks;
- casos de uso;
- entidades;
- adaptadores.

Puedes utilizar Screaming Architecture sin implementar toda Clean Architecture.

Por ejemplo:

```text
features/
└── payments/
    ├── components/
    ├── services/
    └── repositories/
```

ya comunica el dominio aunque no exista una arquitectura hexagonal completa.

---

## 32. Screaming Architecture en frontend

En frontend tiene mucho sentido porque proyectos grandes suelen terminar con carpetas globales enormes.

Por ejemplo:

```text
components/
  180 archivos

hooks/
  50 archivos

services/
  40 archivos
```

Una alternativa:

```text
features/
├── authentication/
├── dashboard/
├── notifications/
├── payments/
├── profile/
└── search/
```

Cada equipo puede trabajar principalmente dentro de una funcionalidad.

Esto también reduce la cantidad de contexto necesaria para realizar cambios.

---

## 33. Screaming Architecture en backend

El mismo concepto puede utilizarse en backend.

En NestJS, por ejemplo:

```text
src/
├── modules/
│   ├── auth/
│   ├── payments/
│   ├── products/
│   └── users/
└── shared/
```

Cada módulo puede contener:

```text
payments/
├── controllers/
├── dto/
├── entities/
├── repositories/
├── services/
└── payments.module.ts
```

Primero organizamos por dominio:

```text
payments
```

y después por tipo técnico:

```text
controllers
services
repositories
```

---

## 34. Un ejemplo incorrecto

Una implementación exagerada podría ser:

```text
features/
└── authentication/
    ├── application/
    │   ├── commands/
    │   ├── queries/
    │   ├── ports/
    │   └── use-cases/
    ├── domain/
    │   ├── entities/
    │   ├── events/
    │   ├── repositories/
    │   └── value-objects/
    ├── infrastructure/
    │   ├── adapters/
    │   ├── database/
    │   ├── http/
    │   └── persistence/
    └── presentation/
        ├── components/
        ├── hooks/
        └── stores/
```

Esto puede ser válido en sistemas realmente complejos.

Pero para una aplicación pequeña podría generar más trabajo que beneficios.

La mejor arquitectura no es la que tiene más carpetas.

Es la que permite comprender y modificar el sistema con menor fricción.

---

## 35. Errores comunes

### Crear una feature por componente

Esto:

```text
features/
├── navbar/
├── footer/
├── button/
└── modal/
```

normalmente no es Screaming Architecture.

Son componentes de interfaz, no capacidades del negocio.

### Convertir `shared` en un cajón de sastre

Evita:

```text
shared/
└── todo-lo-que-no-se-donde-poner/
```

### Crear demasiadas capas

No necesitas repositories, use cases y adapters para cada operación trivial.

### Duplicar código demasiado pronto

Dos componentes similares no necesariamente deben convertirse inmediatamente en un componente shared.

A veces la duplicación temporal es más sencilla que crear una abstracción incorrecta.

### Hacer imports cruzados constantemente

Si:

```text
feature-a
```

importa mucho de:

```text
feature-b
```

y viceversa, probablemente los límites están mal definidos.

---

## 36. Cómo migrar un proyecto existente

No recomiendo reestructurar todo el proyecto en un solo movimiento si la aplicación ya es grande.

Puedes hacerlo progresivamente.

Supongamos:

```text
src/
├── components/
├── hooks/
├── repositories/
└── services/
```

Empieza por una funcionalidad.

Por ejemplo:

```text
favorites
```

Identifica:

```text
components/FavoriteButton.tsx
hooks/useFavorites.ts
repositories/favoriteRepository.ts
services/favoriteService.ts
```

y muévelos a:

```text
features/
└── favorites/
    ├── components/
    │   └── FavoriteButton.tsx
    ├── hooks/
    │   └── useFavorites.ts
    ├── repositories/
    │   └── favoriteRepository.ts
    └── services/
        └── favoriteService.ts
```

Después corrige imports y ejecuta tests.

Continúa feature por feature.

---

## 37. Cómo saber si la migración está bien hecha

Después de reorganizar, deberías poder eliminar temporalmente:

```text
features/favorites/
```

y responder aproximadamente:

> He eliminado todo lo relacionado con favoritos.

Si para eliminar Favoritos todavía tienes que buscar archivos por quince carpetas globales, la feature probablemente sigue demasiado dispersa.

---

## 38. Tests

Los tests también pueden vivir cerca de la funcionalidad.

Por ejemplo:

```text
features/
└── authentication/
    ├── components/
    ├── services/
    └── tests/
        ├── login.test.ts
        └── logout.test.ts
```

O colocarse junto al archivo:

```text
services/
├── login.ts
└── login.test.ts
```

Ambas estrategias pueden funcionar.

Lo importante es mantener clara la pertenencia al dominio.

---

## 39. Barrel files e `index.ts`

Puedes utilizar:

```text
features/
└── authentication/
    └── index.ts
```

para definir una API pública de la feature.

Por ejemplo:

```ts
export { LoginForm } from "./components/LoginForm";
export { authService } from "./services/auth-service";
```

Entonces otras partes utilizan:

```ts
import { LoginForm, authService } from "@/features/authentication";
```

en lugar de:

```ts
import { LoginForm } from "@/features/authentication/components/LoginForm";
```

Esto puede ayudar a controlar qué partes de la feature son públicas.

> [!WARNING]
> No abuses de barrel files. En determinados entornos pueden ocultar dependencias, generar ciclos o complicar el tree-shaking. Utilízalos cuando aporten una frontera clara.

---

## 40. Regla práctica para decidir dónde colocar un archivo

Cuando crees un archivo nuevo, puedes seguir este orden.

### Pregunta 1

¿Pertenece claramente a una funcionalidad?

Si sí:

```text
features/<feature>/
```

### Pregunta 2

¿Es realmente reutilizado por diferentes funcionalidades?

Si sí:

```text
shared/
```

### Pregunta 3

¿Representa una ruta?

Entonces:

```text
pages/
```

### Pregunta 4

¿Define composición global de una página?

Entonces:

```text
layouts/
```

### Pregunta 5

¿Es configuración global?

Entonces:

```text
config/
```

Esta pequeña secuencia evita muchas decisiones arbitrarias.

---

## 41. Ejemplo final

Supongamos una plataforma de música.

Una estructura razonable podría ser:

```text
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── repositories/
│   │   └── services/
│   │
│   ├── favorites/
│   │   ├── components/
│   │   └── services/
│   │
│   ├── player/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── store/
│   │
│   ├── playlists/
│   │   ├── components/
│   │   ├── repositories/
│   │   └── services/
│   │
│   └── search/
│       ├── components/
│       ├── services/
│       └── utils/
│
├── shared/
│   ├── components/
│   ├── icons/
│   ├── utils/
│   └── types/
│
├── layouts/
├── pages/
├── config/
└── styles/
```

Al abrir el proyecto podemos identificar inmediatamente:

```text
authentication
favorites
player
playlists
search
```

y entender una parte importante de lo que hace el sistema.

Eso es precisamente lo que buscamos con Screaming Architecture.

---

## 42. Checklist

Antes de considerar que un proyecto utiliza Screaming Architecture correctamente, comprueba:

- ¿Las carpetas principales comunican qué hace la aplicación?
- ¿Las funcionalidades están agrupadas por dominio?
- ¿El código específico permanece dentro de su feature?
- ¿`shared` contiene solamente código realmente compartido?
- ¿Las páginas se encargan principalmente de composición?
- ¿Los layouts contienen estructura global y no lógica de negocio?
- ¿Evitas dependencias circulares entre features?
- ¿Puedes localizar una funcionalidad sin buscar por todo el proyecto?
- ¿Puedes modificar una feature sin tocar diez carpetas diferentes?
- ¿La cantidad de capas corresponde a la complejidad real del proyecto?

Si la mayoría de las respuestas son sí, la estructura probablemente está cumpliendo su propósito.

---

## 43. Conclusión

Screaming Architecture no consiste simplemente en crear una carpeta llamada `features`.

Su idea principal es que la arquitectura haga evidente **qué problema resuelve la aplicación**.

La estructura:

```text
components
hooks
services
repositories
```

describe tecnologías y tipos de archivos.

Mientras que:

```text
authentication
favorites
payments
playlists
search
```

describe capacidades.

La estrategia más práctica suele ser:

```text
primero dominio
      ↓
después responsabilidad técnica
```

Es decir:

```text
features/
└── authentication/
    ├── components/
    ├── services/
    └── repositories/
```

No necesitas aplicar todas las capas posibles desde el principio.

Empieza con la estructura más pequeña que mantenga clara la funcionalidad y deja que la arquitectura crezca junto con la aplicación.

El objetivo no es tener más carpetas.

El objetivo es que alguien pueda abrir el proyecto, observar su estructura y entender rápidamente **qué hace el sistema y dónde debe realizar un cambio**.
