---
title: "Zod: validación de datos con TypeScript"
description: "Guía práctica para entender qué es Zod, cuándo utilizarlo y cómo validar datos externos de forma segura en aplicaciones TypeScript."
publishedAt: 2026-09-01
updatedAt: 2026-09-01
category: "programacion"
tags:
  - zod
  - typescript
  - validacion
  - schemas
draft: false
sidebarLabel: "Zod"
order: 1
---

## 1. Qué es Zod

Zod es una librería de validación de datos orientada a TypeScript.

Permite definir un **schema** que describe cómo debe ser un dato y comprobar en tiempo de ejecución si ese dato realmente cumple dicha estructura.

Por ejemplo:

```ts
import * as z from "zod";

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});
```

El schema establece que un usuario debe tener:

```text
name → string
age  → number
```

Después podemos validar datos desconocidos:

```ts
const user = UserSchema.parse({
  name: "Julio",
  age: 20,
});
```

Si los datos son válidos, Zod devuelve el valor validado.

Si no lo son, genera un error de validación.

---

## 2. Por qué utilizar Zod si ya existe TypeScript

TypeScript comprueba tipos durante el desarrollo, pero sus tipos desaparecen cuando el código se convierte en JavaScript.

Por ejemplo:

```ts
interface User {
  name: string;
  age: number;
}
```

Esto ayuda al escribir código:

```ts
const user: User = {
  name: "Julio",
  age: 20,
};
```

Pero no puede garantizar que una API externa realmente envíe esos datos.

Podríamos recibir:

```json
{
  "name": 123,
  "age": "veinte"
}
```

TypeScript no valida automáticamente ese JSON en tiempo de ejecución.

Zod sí puede hacerlo.

```ts
const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const user = UserSchema.parse(data);
```

> [!IMPORTANT]
> TypeScript describe cómo esperamos que sean los datos. Zod permite comprobar cómo son realmente cuando la aplicación está ejecutándose.

---

## 3. Dónde utilizar Zod

Zod es especialmente útil en los límites de una aplicación, donde recibimos información que no controlamos completamente.

Ejemplos habituales:

- formularios;
- cuerpos de una API;
- parámetros de una URL;
- respuestas de APIs externas;
- variables de entorno;
- archivos JSON;
- datos almacenados en `localStorage`;
- webhooks;
- configuración externa.

Por ejemplo:

```text
Usuario
   ↓
Formulario
   ↓
Zod
   ↓
Datos válidos
   ↓
Aplicación
```

O:

```text
API externa
     ↓
    Zod
     ↓
datos confiables
     ↓
lógica interna
```

---

## 4. Dónde no hace falta utilizarlo

No necesitas validar cada variable o función interna.

Esto normalmente sería innecesario:

```ts
function sum(a: number, b: number) {
  return a + b;
}
```

Si `a` y `b` son valores creados y controlados completamente por tu propia aplicación, TypeScript suele ser suficiente.

Una regla práctica es:

> Valida datos cuando entran a tu sistema y trabaja con datos tipados después.

---

## 5. Instalación

Instala Zod:

```bash
pnpm add zod
```

Después puedes importarlo:

```ts
import * as z from "zod";
```

---

## 6. Schemas básicos

Zod incluye schemas para los tipos más comunes.

```ts
z.string();
z.number();
z.boolean();
z.bigint();
z.null();
z.undefined();
```

Ejemplo:

```ts
const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  available: z.boolean(),
});
```

---

## 7. Validar strings

Puedes añadir restricciones:

```ts
const UsernameSchema = z.string().min(3).max(20);
```

También existen validadores para formatos comunes:

```ts
const EmailSchema = z.email();
const UrlSchema = z.url();
const IdSchema = z.uuid();
```

Y transformaciones sencillas:

```ts
const NameSchema = z.string().trim().toLowerCase();
```

---

## 8. Validar números

Ejemplo:

```ts
const AgeSchema = z.number().int().min(0).max(120);
```

También puedes comprobar valores positivos:

```ts
const PriceSchema = z.number().positive();
```

---

## 9. Objetos

Una de las operaciones más utilizadas es `z.object()`.

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.email(),
  age: z.number().int().positive(),
});
```

Ahora este objeto será válido:

```ts
UserSchema.parse({
  id: "1",
  name: "Julio",
  email: "user@example.com",
  age: 20,
});
```

Pero este no:

```ts
UserSchema.parse({
  id: "1",
  name: "",
  email: "no-es-un-email",
  age: "20",
});
```

---

## 10. Arrays

Para validar una lista:

```ts
const TagsSchema = z.array(z.string());
```

Ejemplo:

```ts
TagsSchema.parse(["typescript", "astro", "zod"]);
```

También puede utilizarse dentro de objetos:

```ts
const PostSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
});
```

---

## 11. Propiedades opcionales

Una propiedad puede ser opcional utilizando `.optional()`.

```ts
const UserSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
});
```

Esto permite:

```ts
{
  name: "Julio";
}
```

y también:

```ts
{
  name: "Julio",
  bio: "Desarrollador"
}
```

---

## 12. `null`, `undefined` y `optional`

No significan exactamente lo mismo.

### Opcional

```ts
z.string().optional();
```

Permite:

```text
string | undefined
```

### Nullable

```ts
z.string().nullable();
```

Permite:

```text
string | null
```

### Ambos

```ts
z.string().nullish();
```

Permite:

```text
string | null | undefined
```

---

## 13. Valores por defecto

Puedes establecer un valor por defecto:

```ts
const SettingsSchema = z.object({
  theme: z.string().default("dark"),
});
```

Si `theme` no existe:

```ts
SettingsSchema.parse({});
```

el resultado contiene:

```ts
{
  theme: "dark",
}
```

---

## 14. `parse()`

La forma más directa de validar es:

```ts
UserSchema.parse(data);
```

Si los datos son correctos:

```ts
const user = UserSchema.parse(data);
```

`user` contiene los datos validados.

Si son incorrectos, Zod lanza un error.

Por eso `parse()` es útil cuando un dato inválido realmente debe interrumpir esa operación.

---

## 15. `safeParse()`

En muchos casos es más cómodo utilizar:

```ts
const result = UserSchema.safeParse(data);
```

Zod devuelve uno de dos estados.

Si todo es correcto:

```ts
if (result.success) {
  console.log(result.data);
}
```

Si existe un error:

```ts
if (!result.success) {
  console.log(result.error);
}
```

Un patrón habitual es:

```ts
const result = UserSchema.safeParse(input);

if (!result.success) {
  return {
    error: result.error,
  };
}

const user = result.data;
```

> [!TIP]
> Utiliza `safeParse()` cuando esperas que la validación pueda fallar como parte normal del flujo, por ejemplo al procesar un formulario.

---

## 16. Inferir tipos automáticamente

Una de las ventajas principales de Zod es evitar escribir el schema y el tipo TypeScript por separado.

En lugar de:

```ts
interface User {
  name: string;
  email: string;
}

const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
});
```

puedes definir una sola fuente de verdad:

```ts
const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

type User = z.infer<typeof UserSchema>;
```

`User` será equivalente a:

```ts
type User = {
  name: string;
  email: string;
};
```

Si modificas el schema, el tipo cambia automáticamente.

---

## 17. Coerción

Los formularios y parámetros de URL suelen devolver strings incluso cuando representan números.

Por ejemplo:

```text
"25"
```

en lugar de:

```text
25
```

Zod puede convertir el valor antes de validarlo:

```ts
const AgeSchema = z.coerce.number();
```

Entonces:

```ts
AgeSchema.parse("25");
```

devuelve:

```ts
25;
```

Un ejemplo habitual:

```ts
const QuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
});
```

---

## 18. Validaciones personalizadas con `refine()`

Cuando las reglas incorporadas no son suficientes puedes utilizar `.refine()`.

Ejemplo:

```ts
const PasswordSchema = z
  .string()
  .min(8)
  .refine((value) => /[A-Z]/.test(value), {
    error: "Debe contener una mayúscula",
  });
```

Otro ejemplo habitual es comparar dos campos:

```ts
const RegisterSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
```

Usa `refine()` para reglas de negocio o relaciones que no puedan expresarse directamente mediante los validadores normales.

---

## 19. Ejemplo con un formulario

Supongamos que recibimos:

```ts
const formData = {
  name: "Julio",
  email: "user@example.com",
  age: "20",
};
```

Creamos el schema:

```ts
const RegisterSchema = z.object({
  name: z.string().trim().min(2),

  email: z.email(),

  age: z.coerce.number().int().min(18),
});
```

Validamos:

```ts
const result = RegisterSchema.safeParse(formData);

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log(result.data);
}
```

El resultado válido será:

```ts
{
  name: "Julio",
  email: "user@example.com",
  age: 20,
}
```

Observa que:

```text
"20"
```

fue convertido en:

```text
20
```

---

## 20. Ejemplo con una API externa

Nunca deberíamos asumir automáticamente que una API mantiene siempre la estructura esperada.

Por ejemplo:

```ts
const response = await fetch("/api/user");

const data = await response.json();
```

Podemos validar inmediatamente:

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

const user = UserSchema.parse(data);
```

A partir de ese momento:

```ts
user;
```

ya cumple el contrato que hemos definido.

---

## 21. Ejemplo con variables de entorno

Las variables de entorno también son datos externos.

Podemos validar que las necesarias existan:

```ts
const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  API_URL: z.url(),
});
```

Después:

```ts
const env = EnvSchema.parse({
  DATABASE_URL: import.meta.env.DATABASE_URL,

  API_URL: import.meta.env.API_URL,
});
```

Esto permite detectar una configuración incorrecta al iniciar la aplicación en lugar de descubrirla mucho después.

---

## 22. Validar en cliente y servidor

En un formulario puedes utilizar Zod en el navegador para ofrecer feedback inmediato.

Pero esa validación no sustituye la validación del servidor.

```text
Browser
   ↓
validación Zod
   ↓
request
   ↓
Servidor
   ↓
validación Zod
   ↓
lógica
```

> [!WARNING]
> Nunca confíes únicamente en la validación del cliente. Un usuario puede enviar peticiones directamente al servidor sin pasar por tu interfaz.

El servidor debe validar cualquier entrada que no controle.

---

## 23. Dónde guardar los schemas

Los schemas deberían mantenerse cerca del dominio al que pertenecen.

Por ejemplo, utilizando una arquitectura por features:

```text
src/
└── features/
    └── authentication/
        ├── components/
        ├── schemas/
        │   ├── login-schema.ts
        │   └── register-schema.ts
        └── services/
```

Un schema:

```text
login-schema.ts
```

podría contener:

```ts
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof LoginSchema>;
```

Si un schema es realmente utilizado por múltiples dominios, entonces puede tener sentido moverlo a código compartido.

---

## 24. Patrón recomendado

Una estrategia sencilla es:

```text
datos desconocidos
       ↓
schema Zod
       ↓
parse / safeParse
       ↓
datos validados
       ↓
lógica de aplicación
```

Por ejemplo:

```ts
const result = CreateUserSchema.safeParse(input);

if (!result.success) {
  return {
    success: false,
    errors: result.error.issues,
  };
}

return createUser(result.data);
```

Esto crea una frontera clara entre datos externos y código interno.

---

## 25. Errores comunes

### Utilizar Zod para absolutamente todo

No necesitas validar constantemente datos que ya están bajo control de tu aplicación.

### Duplicar schemas y tipos

Evita mantener:

```ts
interface User {}
```

y:

```ts
const UserSchema = ...
```

si ambos representan exactamente el mismo contrato.

Cuando tenga sentido, utiliza:

```ts
z.infer<typeof UserSchema>;
```

### Confiar únicamente en TypeScript

Los tipos de TypeScript no validan respuestas HTTP, formularios o JSON en tiempo de ejecución.

### Confiar únicamente en el cliente

Las entradas importantes también deben validarse en el servidor.

### Crear schemas gigantes

Si un schema se vuelve demasiado complejo, divídelo:

```ts
const AddressSchema = z.object({
  city: z.string(),
  country: z.string(),
});

const UserSchema = z.object({
  name: z.string(),
  address: AddressSchema,
});
```

---

## 26. Cuándo utilizar `parse` y `safeParse`

Regla práctica:

```text
¿Un dato inválido representa
un fallo excepcional?
        │
       sí
        ↓
      parse()
```

```text
¿Un dato inválido es parte
normal del flujo?
        │
       sí
        ↓
    safeParse()
```

Ejemplos de `safeParse()`:

- formularios;
- parámetros recibidos;
- datos introducidos por usuarios.

Ejemplos de `parse()`:

- configuración que obligatoriamente debe ser válida;
- respuestas que no deberían continuar si rompen un contrato.

No es una regla absoluta, pero es un buen punto de partida.

---

## 27. Qué aprender primero

Para utilizar Zod en la mayoría de proyectos no necesitas conocer toda su API.

Empieza dominando:

```ts
z.object()
z.string()
z.number()
z.boolean()
z.array()

.optional()
.nullable()
.default()

.parse()
.safeParse()

z.infer<>
z.coerce
.refine()
```

Con estas herramientas puedes resolver una gran parte de los casos habituales.

---

## 28. Resumen

Zod sirve para transformar datos desconocidos en datos que nuestra aplicación puede utilizar con confianza.

La idea principal es:

```text
TypeScript
→ seguridad durante desarrollo

Zod
→ validación durante ejecución
```

Utilízalo principalmente donde datos externos entran al sistema:

```text
formularios
APIs
URL
variables de entorno
JSON
localStorage
servicios externos
```

Define un schema:

```ts
const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
});
```

valídalo:

```ts
const result = UserSchema.safeParse(data);
```

y deriva el tipo cuando sea conveniente:

```ts
type User = z.infer<typeof UserSchema>;
```

La idea no es añadir validaciones por todas partes, sino crear fronteras claras:

```text
mundo exterior
      ↓
     Zod
      ↓
datos confiables
      ↓
aplicación
```

## Referencias

Para profundizar y comprobar los detalles de esta guía, consulta principalmente fuentes oficiales:

- [**Zod — Documentación oficial**](https://zod.dev/) — Introducción, instalación y requisitos.
- [**Zod — Basic usage**](https://zod.dev/basics) — Schemas, `parse()`, `safeParse()` e inferencia de tipos.
- [**Zod — API**](https://zod.dev/api) — Referencia completa de strings, objetos, coerción, opcionales, refinements y transforms.
- [**Zod — Repositorio oficial**](https://github.com/colinhacks/zod) — Código fuente, releases y cambios entre versiones.
- [**TypeScript Handbook — The Basics**](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) — Explicación oficial sobre el sistema de tipos de TypeScript.
