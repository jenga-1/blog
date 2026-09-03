---
title: "TypeScript: tipos, genéricos y Utility Types que conviene dominar"
description: "Referencia breve de los tipos y herramientas más utilizadas de TypeScript: unions, generics, keyof, typeof, Record, Partial, Pick, Omit y otros Utility Types."
publishedAt: 2026-09-02
updatedAt: 2026-09-02
category: "programacion"
tags:
  - typescript
  - tipos
  - generics
  - utility-types
draft: false
sidebarLabel: "Tipos de TypeScript"
order: 2
---

## Tipos básicos

TypeScript añade un sistema de tipos sobre JavaScript.

Los tipos primitivos más habituales son:

```ts
const name: string = "Julio";
const age: number = 20;
const active: boolean = true;
```

También tenemos:

```ts
null;
undefined;
bigint;
symbol;
```

Normalmente TypeScript puede inferir el tipo, por lo que no siempre hace falta escribirlo:

```ts
const name = "Julio";
// TypeScript infiere string
```

---

## Arrays

Podemos tipar una lista de dos formas:

```ts
const names: string[] = ["Ana", "Luis"];
```

o:

```ts
const names: Array<string> = ["Ana", "Luis"];
```

Ambas representan:

```text
array de strings
```

---

## Objetos

Podemos describir directamente la estructura de un objeto:

```ts
const user: {
  id: string;
  name: string;
  age: number;
} = {
  id: "1",
  name: "Julio",
  age: 20,
};
```

Sin embargo, cuando la estructura se reutiliza suele ser mejor crear un tipo.

---

## `type`

`type` permite crear un alias para representar una estructura o combinación de tipos.

```ts
type User = {
  id: string;
  name: string;
  age: number;
};
```

Después:

```ts
const user: User = {
  id: "1",
  name: "Julio",
  age: 20,
};
```

También puede representar unions, primitives y otros tipos derivados:

```ts
type Id = string | number;
```

---

## `interface`

`interface` también permite describir la forma de un objeto.

```ts
interface User {
  id: string;
  name: string;
}
```

Uso:

```ts
const user: User = {
  id: "1",
  name: "Julio",
};
```

Para objetos, `type` e `interface` pueden resolver muchos de los mismos casos.

Una diferencia importante es que las interfaces pueden extenderse:

```ts
interface User {
  id: string;
}

interface Admin extends User {
  permissions: string[];
}
```

---

## Propiedades opcionales

Utiliza `?` cuando una propiedad puede no existir.

```ts
type User = {
  id: string;
  name: string;
  avatar?: string;
};
```

Esto permite:

```ts
const user: User = {
  id: "1",
  name: "Julio",
};
```

El tipo de `avatar` será conceptualmente:

```text
string | undefined
```

---

## `readonly`

Evita modificar una propiedad después de crear el objeto.

```ts
type User = {
  readonly id: string;
  name: string;
};
```

Esto produce error:

```ts
user.id = "2";
```

---

## Union types `|`

Una unión significa:

> el valor puede ser uno de varios tipos.

```ts
type Id = string | number;
```

Entonces:

```ts
const id1: Id = "abc";
const id2: Id = 123;
```

También es muy útil con valores literales:

```ts
type Status = "idle" | "loading" | "success" | "error";
```

Esto evita aceptar cualquier string.

```ts
const status: Status = "loading";
```

---

## Intersection types `&`

Una intersección combina varios tipos.

```ts
type User = {
  id: string;
  name: string;
};

type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type UserWithDates = User & Timestamp;
```

`UserWithDates` necesita todas las propiedades:

```ts
const user: UserWithDates = {
  id: "1",
  name: "Julio",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

## Literal types

Un tipo puede representar valores concretos.

```ts
type Theme = "light" | "dark";
```

Entonces:

```ts
const theme: Theme = "dark";
```

pero esto fallaría:

```ts
const theme: Theme = "blue";
```

Son muy útiles para:

- estados;
- roles;
- variantes;
- acciones;
- configuraciones.

---

## `any`

`any` básicamente desactiva gran parte de la comprobación de tipos para ese valor.

```ts
let value: any;

value.foo.bar();
value();
value.name;
```

TypeScript permite prácticamente todo.

> [!WARNING]
> Evita `any` cuando sea posible, porque elimina buena parte de la seguridad que TypeScript intenta proporcionar.

---

## `unknown`

`unknown` también representa un valor cuyo tipo todavía desconocemos, pero obliga a comprobarlo antes de utilizarlo.

```ts
function printValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

Regla práctica:

```text
any
→ confía en el valor

unknown
→ comprueba el valor primero
```

Cuando realmente desconoces un dato, normalmente `unknown` es más seguro.

---

## `never`

`never` representa algo que nunca puede ocurrir o una función que nunca produce un valor.

Por ejemplo:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

También es útil para comprobar casos imposibles en unions.

---

## Genéricos `<T>`

Un genérico permite escribir código que funciona con distintos tipos sin perder información sobre ellos.

Ejemplo:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Podemos utilizarlo con:

```ts
identity<string>("hello");
identity<number>(10);
```

Normalmente TypeScript puede inferir `T`:

```ts
const value = identity("hello");
```

Aquí:

```text
T = string
```

> [!NOTE]
> `T` no tiene ningún significado especial. Es simplemente el nombre convencional de un parámetro de tipo.

Podrías escribir:

```ts
function identity<Type>(value: Type): Type {
  return value;
}
```

---

## Un ejemplo sencillo

Supongamos que una API devuelve una respuesta genérica:

```ts
type ApiResponse<T> = {
  data: T;
  success: boolean;
};
```

Podemos reutilizarla con distintos datos:

```ts
type User = {
  id: string;
  name: string;
};

type UserResponse = ApiResponse<User>;
```

El resultado equivale a:

```ts
type UserResponse = {
  data: User;
  success: boolean;
};
```

También:

```ts
type UsersResponse = ApiResponse<User[]>;
```

Ahora:

```text
T = User[]
```

Los genéricos permiten reutilizar estructuras sin recurrir a `any`.

---

## Restricciones con `extends`

Podemos limitar qué tipos acepta un genérico.

```ts
function getId<T extends { id: string }>(value: T) {
  return value.id;
}
```

Esto funciona:

```ts
getId({
  id: "1",
  name: "Julio",
});
```

Pero esto no:

```ts
getId({
  name: "Julio",
});
```

porque falta:

```text
id
```

---

## `keyof`

`keyof` obtiene las claves de un tipo.

```ts
type User = {
  id: string;
  name: string;
  age: number;
};

type UserKey = keyof User;
```

`UserKey` equivale a:

```ts
type UserKey = "id" | "name" | "age";
```

Esto es muy útil para limitar valores a propiedades existentes.

```ts
function getProperty<T, K extends keyof T>(object: T, key: K) {
  return object[key];
}
```

Uso:

```ts
getProperty(user, "name");
```

Pero TypeScript rechazará:

```ts
getProperty(user, "email");
```

si `email` no existe.

---

## `typeof`

En el sistema de tipos, `typeof` puede obtener el tipo de un valor existente.

```ts
const config = {
  theme: "dark",
  sidebar: true,
};

type Config = typeof config;
```

Ahora `Config` se deriva automáticamente del objeto.

Es útil cuando ya existe una fuente de verdad en JavaScript y no quieres repetir su estructura.

---

## `keyof typeof`

`keyof` y `typeof` suelen utilizarse juntos.

```ts
const categories = {
  programacion: {},
  seguridad: {},
  diseno: {},
};

type CategoryKey = keyof typeof categories;
```

El resultado es:

```ts
type CategoryKey = "programacion" | "seguridad" | "diseno";
```

Este patrón es especialmente útil para configuraciones centralizadas.

---

## Indexed Access Types

Podemos obtener el tipo de una propiedad específica utilizando:

```ts
Type["property"];
```

Ejemplo:

```ts
type User = {
  id: string;
  age: number;
};

type UserId = User["id"];
```

`UserId` será:

```ts
string;
```

También podemos obtener varias:

```ts
type UserValue = User["id" | "age"];
```

Resultado:

```text
string | number
```

---

## `Record<K, T>`

`Record` crea un objeto donde:

```text
K = claves
T = tipo de los valores
```

Su forma es:

```ts
Record<Keys, Type>;
```

Por ejemplo:

```ts
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, boolean>;
```

Esto equivale aproximadamente a:

```ts
type Permissions = {
  admin: boolean;
  user: boolean;
  guest: boolean;
};
```

Uso:

```ts
const permissions: Permissions = {
  admin: true,
  user: true,
  guest: false,
};
```

Si falta una propiedad:

```ts
const permissions: Permissions = {
  admin: true,
  user: true,
};
```

TypeScript marcará error porque falta:

```text
guest
```

### Otro ejemplo

```ts
type User = {
  id: string;
};

const users: Record<string, User> = {
  julio: {
    id: "1",
  },

  ana: {
    id: "2",
  },
};
```

Aquí:

```text
key   → string
value → User
```

> [!IMPORTANT]
> `Record` recibe normalmente dos parámetros: `Record<K, T>`, no solamente `Record<T>`.

---

## `Partial<T>`

Convierte todas las propiedades de un tipo en opcionales.

```ts
type User = {
  name: string;
  email: string;
  age: number;
};

type UserUpdate = Partial<User>;
```

Equivale aproximadamente a:

```ts
type UserUpdate = {
  name?: string;
  email?: string;
  age?: number;
};
```

Es útil para actualizaciones parciales:

```ts
function updateUser(values: Partial<User>) {}
```

Entonces puedes enviar:

```ts
updateUser({
  name: "Nuevo nombre",
});
```

---

## `Required<T>`

Hace lo contrario de `Partial`.

Convierte todas las propiedades en obligatorias.

```ts
type Config = {
  api?: string;
  timeout?: number;
};

type CompleteConfig = Required<Config>;
```

Ahora ambas propiedades son necesarias.

---

## `Readonly<T>`

Convierte todas las propiedades en `readonly`.

```ts
type User = {
  id: string;
  name: string;
};

type ImmutableUser = Readonly<User>;
```

Esto impide:

```ts
user.name = "Otro";
```

---

## `Pick<T, K>`

Crea un nuevo tipo seleccionando determinadas propiedades.

```ts
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Pick<User, "id" | "name">;
```

Resultado:

```ts
type PublicUser = {
  id: string;
  name: string;
};
```

Piensa en `Pick` como:

```text
qué propiedades QUIERO
```

---

## `Omit<T, K>`

Es el caso contrario.

Crea un tipo eliminando determinadas propiedades.

```ts
type PublicUser = Omit<User, "password">;
```

Resultado:

```ts
type PublicUser = {
  id: string;
  name: string;
  email: string;
};
```

Piensa en `Omit` como:

```text
qué propiedades NO QUIERO
```

---

## `Exclude<T, U>`

Elimina elementos de una union.

```ts
type Status = "idle" | "loading" | "success" | "error";

type FinalStatus = Exclude<Status, "idle" | "loading">;
```

Resultado:

```ts
type FinalStatus = "success" | "error";
```

---

## `Extract<T, U>`

Hace lo contrario de `Exclude`.

Conserva únicamente los miembros compatibles.

```ts
type Status = "idle" | "loading" | "success" | "error";

type LoadingStatus = Extract<Status, "idle" | "loading">;
```

Resultado:

```ts
type LoadingStatus = "idle" | "loading";
```

---

## `NonNullable<T>`

Elimina:

```text
null
undefined
```

de un tipo.

```ts
type Value = string | null | undefined;

type SafeValue = NonNullable<Value>;
```

Resultado:

```ts
string;
```

---

## `ReturnType<T>`

Obtiene el tipo que devuelve una función.

```ts
function getUser() {
  return {
    id: "1",
    name: "Julio",
  };
}

type User = ReturnType<typeof getUser>;
```

TypeScript infiere:

```ts
type User = {
  id: string;
  name: string;
};
```

---

## `Parameters<T>`

Obtiene los parámetros de una función como tuple.

```ts
function createUser(name: string, age: number) {}
```

Podemos obtener:

```ts
type CreateUserParams = Parameters<typeof createUser>;
```

Resultado conceptual:

```ts
[
  name: string,
  age: number
]
```

---

## `Awaited<T>`

Obtiene el valor final de un tipo asíncrono.

```ts
type Result = Awaited<Promise<string>>;
```

Resultado:

```ts
string;
```

También funciona con promesas anidadas.

---

## Resumen rápido de Utility Types

| Utility Type     | Para qué sirve                               |
| ---------------- | -------------------------------------------- |
| `Record<K, T>`   | Crear un objeto con claves y valores tipados |
| `Partial<T>`     | Hacer todas las propiedades opcionales       |
| `Required<T>`    | Hacer todas las propiedades obligatorias     |
| `Readonly<T>`    | Hacer todas las propiedades de solo lectura  |
| `Pick<T, K>`     | Conservar determinadas propiedades           |
| `Omit<T, K>`     | Eliminar determinadas propiedades            |
| `Exclude<T, U>`  | Eliminar miembros de una union               |
| `Extract<T, U>`  | Conservar miembros de una union              |
| `NonNullable<T>` | Eliminar `null` y `undefined`                |
| `ReturnType<T>`  | Obtener el retorno de una función            |
| `Parameters<T>`  | Obtener los parámetros de una función        |
| `Awaited<T>`     | Obtener el resultado de una Promise          |

---

## Cómo decidir cuál utilizar

Una referencia rápida:

```text
¿Necesito un diccionario tipado?
→ Record<K, T>

¿Quiero permitir actualizaciones parciales?
→ Partial<T>

¿Quiero que todo sea obligatorio?
→ Required<T>

¿Quiero impedir modificaciones?
→ Readonly<T>

¿Quiero algunas propiedades?
→ Pick<T, K>

¿Quiero todas menos algunas?
→ Omit<T, K>

¿Quiero quitar opciones de una union?
→ Exclude<T, U>

¿Quiero quedarme con algunas opciones?
→ Extract<T, U>

¿Quiero eliminar null/undefined?
→ NonNullable<T>

¿Quiero saber qué devuelve una función?
→ ReturnType<T>

¿Quiero saber qué recibe una función?
→ Parameters<T>
```

---

## Combinarlos

Los Utility Types pueden combinarse.

Por ejemplo:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
```

Podemos crear:

```ts
type EditableUser = Partial<Omit<User, "id" | "password">>;
```

Primero:

```ts
Omit<User, "id" | "password">;
```

produce:

```ts
{
  name: string;
  email: string;
}
```

Después:

```ts
Partial<...>
```

produce:

```ts
{
  name?: string;
  email?: string;
}
```

Esto permite expresar tipos complejos utilizando otros tipos existentes.

---

## Regla práctica

No intentes memorizar todos los tipos de TypeScript de una vez.

Los que probablemente utilizarás con mayor frecuencia son:

```text
type
interface
|
&
<T>
keyof
typeof
Record
Partial
Pick
Omit
ReturnType
```

Cuando necesites algo más específico, consulta los Utility Types oficiales.

El objetivo no es construir el tipo más complejo posible.

El objetivo es que TypeScript represente correctamente las reglas de los datos sin volver el código innecesariamente difícil de entender.

## Referencias

- [**TypeScript Handbook**](https://www.typescriptlang.org/docs/handbook/) — Punto de partida oficial para aprender el sistema de tipos de TypeScript.
- [**TypeScript — Everyday Types**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — Tipos básicos, arrays, objetos, unions y type aliases.
- [**TypeScript — Object Types**](https://www.typescriptlang.org/docs/handbook/2/objects.html) — Interfaces, propiedades opcionales, readonly y estructuras de objetos.
- [**TypeScript — Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html) — Parámetros de tipo, restricciones y reutilización mediante genéricos.
- [**TypeScript — Creating Types from Types**](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) — Introducción a las herramientas para construir tipos a partir de otros tipos.
- [**TypeScript — keyof Type Operator**](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) — Uso de `keyof`.
- [**TypeScript — typeof Type Operator**](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) — Obtención de tipos a partir de valores existentes.
- [**TypeScript — Indexed Access Types**](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) — Acceso a tipos mediante `Type["property"]`.
- [**TypeScript — Utility Types**](https://www.typescriptlang.org/docs/handbook/utility-types.html) — Referencia oficial de `Record`, `Partial`, `Pick`, `Omit`, `ReturnType`, `Parameters` y los demás Utility Types.
- [**TypeScript — Unions and Intersection Types**](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html) — Unions con `|` e intersections con `&`.
