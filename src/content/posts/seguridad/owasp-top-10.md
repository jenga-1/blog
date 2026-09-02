---
title: "OWASP Top 10: riesgos esenciales de seguridad web"
description: "Resumen práctico del OWASP Top 10:2025 para entender los principales riesgos de seguridad en aplicaciones web y cómo reducirlos desde el desarrollo."
publishedAt: 2026-09-01
updatedAt: 2026-09-01
category: "seguridad"
tags:
  - owasp
  - seguridad-web
  - appsec
  - buenas-practicas
draft: false
sidebarLabel: "OWASP Top 10"
order: 1
---

## 1. Qué es OWASP Top 10

OWASP Top 10 es un documento de referencia para desarrolladores y profesionales de seguridad que resume algunos de los riesgos más importantes presentes en aplicaciones web.

No es una lista exhaustiva de todas las vulnerabilidades posibles.

Su principal utilidad es servir como punto de partida para:

- diseñar aplicaciones más seguras;
- revisar código;
- realizar auditorías;
- establecer controles de seguridad;
- detectar áreas que requieren mayor atención.

> [!IMPORTANT]
> OWASP Top 10 no debe tratarse como un simple checklist. Una aplicación puede cumplir estas recomendaciones y seguir teniendo otros problemas de seguridad.

La versión utilizada en esta guía es **OWASP Top 10:2025**.

---

## 2. A01 — Pérdida de Control de Acceso

El control de acceso determina qué recursos y operaciones puede utilizar cada usuario.

El problema aparece cuando el servidor permite acceder a información o ejecutar acciones que el usuario no debería poder realizar.

Por ejemplo:

```text
Usuario normal
      ↓
GET /admin/users
      ↓
Servidor permite acceso
      ↓
Problema de autorización
```

La aplicación nunca debería confiar únicamente en que la interfaz oculte determinada funcionalidad.

### Cómo reducir el riesgo

- Comprueba permisos en el servidor.
- Aplica el principio de mínimo privilegio.
- Utiliza roles y permisos claramente definidos.
- Deniega el acceso por defecto.
- No confíes en identificadores enviados por el cliente para decidir autorización.

Ejemplo conceptual:

```ts
if (!user.permissions.includes("users:read")) {
  return new Response("Forbidden", {
    status: 403,
  });
}
```

> [!WARNING]
> Ocultar un botón en el frontend no constituye un control de acceso.

---

## 3. A02 — Configuración de Seguridad Incorrecta

Una aplicación puede utilizar tecnologías seguras y aun así quedar expuesta por una configuración incorrecta.

Ejemplos:

- modo debug habilitado en producción;
- permisos demasiado amplios;
- credenciales predeterminadas;
- servicios innecesarios habilitados;
- mensajes de error demasiado detallados;
- headers de seguridad ausentes;
- configuración insegura de CORS.

### Buenas prácticas

Mantén configuraciones diferentes para:

```text
development
staging
production
```

Nunca publiques secretos en el repositorio:

```text
DATABASE_URL=...
API_SECRET=...
GOOGLE_CLIENT_SECRET=...
```

Utiliza variables de entorno y limita el acceso a ellas.

También conviene automatizar la configuración de producción para evitar cambios manuales difíciles de reproducir.

---

## 4. A03 — Fallos en la Cadena de Suministro de Software

Las aplicaciones modernas dependen de:

```text
npm packages
frameworks
CI/CD
GitHub Actions
Docker images
APIs
build tools
plugins
```

Una vulnerabilidad o manipulación en alguna de esas dependencias puede afectar al proyecto.

### Cómo reducir el riesgo

- Mantén dependencias actualizadas.
- Elimina paquetes que ya no utilizas.
- Utiliza lockfiles.
- Revisa dependencias antes de introducirlas.
- Limita permisos de pipelines y tokens.
- Utiliza fuentes oficiales.
- Revisa alertas de seguridad del gestor de dependencias.

En proyectos con pnpm:

```bash
pnpm audit
```

puede ayudar a identificar vulnerabilidades conocidas en dependencias.

> [!NOTE]
> Una aplicación no está formada únicamente por el código que escribes. También debes considerar todo el software del que depende.

---

## 5. A04 — Fallos Criptográficos

Se producen cuando información sensible no está protegida adecuadamente.

Puede afectar a:

- contraseñas;
- tokens;
- datos personales;
- claves;
- información financiera;
- comunicaciones.

Un error habitual sería almacenar contraseñas directamente:

```text
password = "mypassword123"
```

Las contraseñas no deberían almacenarse en texto plano.

### Buenas prácticas

- Utiliza HTTPS.
- No inventes algoritmos criptográficos propios.
- Utiliza primitivas y librerías ampliamente revisadas.
- Protege correctamente claves y secretos.
- Utiliza algoritmos adecuados para almacenar contraseñas.
- No registres datos sensibles innecesariamente.

> [!IMPORTANT]
> Codificar un dato con Base64 no significa cifrarlo.

---

## 6. A05 — Inyección

Una inyección ocurre cuando datos externos terminan siendo interpretados como parte de una consulta, comando o expresión.

Un ejemplo clásico es construir consultas mediante concatenación:

```ts
const query = "SELECT * FROM users WHERE email = '" + email + "'";
```

La aplicación está mezclando:

```text
datos
+
instrucciones
```

### Cómo reducir el riesgo

Utiliza consultas parametrizadas:

```ts
await db.execute("SELECT * FROM users WHERE email = ?", [email]);
```

Además:

- valida entradas;
- utiliza APIs seguras;
- evita construir comandos mediante concatenación;
- limita privilegios de las cuentas utilizadas por la aplicación.

> [!IMPORTANT]
> Validar entradas ayuda, pero no sustituye controles específicos como las consultas parametrizadas.

---

## 7. A06 — Diseño Inseguro

No todos los problemas de seguridad son errores de código.

A veces el problema está en cómo fue diseñada la funcionalidad.

Por ejemplo, una aplicación podría permitir:

```text
intentos ilimitados
para una operación sensible
```

Aunque el código funcione exactamente como fue diseñado, el diseño sigue siendo inseguro.

### Antes de implementar una funcionalidad

Pregúntate:

- ¿Quién debería poder hacer esto?
- ¿Qué ocurre si alguien automatiza esta operación?
- ¿Qué información estamos exponiendo?
- ¿Qué pasaría si esta petición se repite miles de veces?
- ¿Cuál sería el peor uso posible de esta funcionalidad?
- ¿Necesitamos límites o verificación adicional?

La seguridad debe considerarse durante el diseño, no únicamente después de escribir el código.

---

## 8. A07 — Fallos de Autenticación

La autenticación responde a:

> ¿Quién es este usuario?

Un sistema débil de autenticación puede permitir que otra persona suplante su identidad.

Debes prestar atención a:

- login;
- recuperación de cuenta;
- cambio de contraseña;
- sesiones;
- tokens;
- MFA;
- cierre de sesión.

### Buenas prácticas

- Utiliza soluciones de autenticación ampliamente probadas.
- Protege intentos repetidos de inicio de sesión.
- Considera MFA para operaciones sensibles.
- Invalida correctamente las sesiones.
- Evita revelar innecesariamente si una cuenta existe.
- Requiere nueva autenticación para operaciones especialmente sensibles.

La autenticación y la autorización no son lo mismo:

```text
Autenticación
→ quién eres

Autorización
→ qué puedes hacer
```

---

## 9. A08 — Fallos de Integridad de Software o Datos

La integridad consiste en poder confiar en que software o datos no han sido alterados de manera no autorizada.

Puede afectar a:

- actualizaciones;
- paquetes;
- artefactos de build;
- pipelines;
- datos serializados;
- código descargado dinámicamente.

### Buenas prácticas

- Utiliza fuentes confiables para dependencias.
- Protege pipelines de CI/CD.
- Limita quién puede publicar releases.
- Revisa cambios antes de desplegar.
- Evita ejecutar código remoto no confiable.
- Protege credenciales utilizadas durante el build.

Un pipeline de despliegue también forma parte de la superficie de seguridad de una aplicación.

---

## 10. A09 — Fallos en Registro, Alertas y Monitoreo

Si ocurre una actividad sospechosa pero el sistema no la registra, puede ser difícil detectarla o investigarla.

Eventos importantes pueden incluir:

```text
inicio de sesión fallido
cambio de contraseña
cambio de permisos
operación administrativa
errores inesperados
actividad anormal
```

### Qué registrar

Registra suficiente información para investigar incidentes, pero evita almacenar secretos.

No deberías registrar:

```text
contraseñas
tokens completos
secretos
claves privadas
```

Además de almacenar logs, debe existir alguna forma de detectar eventos relevantes.

```text
evento
  ↓
log
  ↓
detección
  ↓
alerta
  ↓
investigación
```

---

## 11. A10 — Manejo Inadecuado de Condiciones Excepcionales

Las aplicaciones deben comportarse de forma segura también cuando algo sale mal.

Ejemplos:

- errores inesperados;
- timeouts;
- respuestas incompletas;
- recursos inexistentes;
- servicios externos caídos;
- operaciones parcialmente completadas.

Un error no debería exponer detalles internos como:

```text
stack traces
rutas del servidor
variables internas
consultas SQL
credenciales
```

En producción es preferible devolver respuestas controladas.

Por ejemplo:

```ts
try {
  await processOperation();

  return new Response("OK");
} catch (error) {
  console.error(error);

  return new Response("Internal Server Error", {
    status: 500,
  });
}
```

El usuario recibe una respuesta genérica mientras el servidor conserva la información necesaria para diagnosticar el problema.

---

## 12. Validar entradas sigue siendo fundamental

Muchos riesgos empiezan cuando una aplicación confía demasiado en información externa.

Considera como potencialmente no confiables:

```text
formularios
query parameters
route parameters
headers
cookies
webhooks
APIs externas
JSON
archivos
```

Una estrategia común es:

```text
entrada externa
      ↓
validación
      ↓
autorización
      ↓
lógica
      ↓
persistencia
```

La validación debería realizarse lo antes posible.

Por ejemplo, utilizando Zod:

```ts
import * as z from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
});

const result = CreateUserSchema.safeParse(input);

if (!result.success) {
  return new Response("Invalid input", {
    status: 400,
  });
}
```

Después trabajamos con:

```ts
result.data;
```

en lugar de utilizar directamente los datos recibidos.

---

## 13. Seguridad de sesiones

Después de autenticar al usuario normalmente necesitamos mantener una sesión.

Una sesión debería tratarse como información sensible.

Cuando utilices cookies para sesiones, presta atención a atributos como:

```text
HttpOnly
Secure
SameSite
```

Ejemplo conceptual:

```text
Set-Cookie:
session=...;
HttpOnly;
Secure;
SameSite=Lax
```

También debes considerar:

- expiración;
- invalidación al cerrar sesión;
- rotación cuando corresponde;
- protección del identificador de sesión.

> [!WARNING]
> Si alguien obtiene un token de sesión válido, puede llegar a actuar como el usuario mientras ese token continúe siendo aceptado.

---

## 14. Seguridad no significa solo autenticación

Una aplicación puede tener un login perfectamente implementado y seguir siendo insegura.

Hay que revisar conjuntamente:

```text
Autenticación
      +
Autorización
      +
Validación
      +
Sesiones
      +
Configuración
      +
Dependencias
      +
Logs
      +
Diseño
```

La seguridad debe atravesar toda la aplicación.

---

## 15. Checklist antes de producción

Antes de desplegar una aplicación web, comprueba al menos:

### Acceso

- Los permisos se verifican en el servidor.
- Los usuarios no pueden acceder a recursos de otros usuarios sin autorización.
- Los endpoints administrativos están protegidos.

### Entradas

- Los datos externos se validan.
- Las consultas utilizan parámetros.
- Los errores de validación se gestionan correctamente.

### Autenticación

- Las sesiones expiran.
- Logout invalida correctamente la sesión.
- Los secretos no llegan al cliente.
- Las operaciones sensibles requieren controles adecuados.

### Configuración

- Debug está deshabilitado.
- No existen credenciales por defecto.
- Los secretos están fuera del repositorio.
- HTTPS está habilitado.

### Dependencias

- No existen dependencias innecesarias.
- El lockfile está versionado.
- Las dependencias reciben mantenimiento.

### Errores

- Las respuestas no exponen información interna.
- Los errores relevantes quedan registrados.

### Producción

- Los permisos de producción son mínimos.
- Se revisan logs y alertas.
- Existe una estrategia para aplicar actualizaciones de seguridad.

---

## 16. Cómo utilizar OWASP Top 10

No necesitas memorizar las diez categorías.

Es más útil utilizar OWASP como referencia durante distintas fases:

```text
Diseño
  ↓
Implementación
  ↓
Code review
  ↓
Testing
  ↓
Deploy
  ↓
Mantenimiento
```

Cuando construyas una funcionalidad nueva, pregúntate qué riesgos podrían afectarla.

Por ejemplo, para un panel de administración:

```text
Control de acceso
Autenticación
Sesiones
Logs
Configuración
```

Para un formulario:

```text
Validación
Inyección
Autorización
Manejo de errores
```

Para un sistema que instala muchas dependencias:

```text
Cadena de suministro
Integridad
Configuración
Actualizaciones
```

OWASP Top 10 funciona mejor como un mapa para hacer mejores preguntas que como una lista que simplemente hay que marcar como completada.

---

## 17. Qué aprender después

Una buena ruta después de entender OWASP Top 10 sería:

```text
OWASP Top 10
      ↓
Security Headers
      ↓
Cookies y sesiones
      ↓
XSS
      ↓
CSRF
      ↓
CORS
      ↓
Gestión de secretos
      ↓
Rate limiting
      ↓
Autenticación segura
```

Cada uno puede convertirse en un artículo independiente y profundizar mucho más que este resumen.

---

## 18. Resumen

Los diez riesgos del OWASP Top 10:2025 son:

| Código | Riesgo                                         |
| ------ | ---------------------------------------------- |
| A01    | Pérdida de Control de Acceso                   |
| A02    | Configuración de Seguridad Incorrecta          |
| A03    | Fallos en la Cadena de Suministro de Software  |
| A04    | Fallos Criptográficos                          |
| A05    | Inyección                                      |
| A06    | Diseño Inseguro                                |
| A07    | Fallos de Autenticación                        |
| A08    | Fallos de Integridad de Software o Datos       |
| A09    | Fallos en Registro y Alertas de Seguridad      |
| A10    | Manejo Inadecuado de Condiciones Excepcionales |

La idea fundamental es que la seguridad no debe añadirse únicamente al final del proyecto.

Debe estar presente desde:

```text
diseño
↓
desarrollo
↓
validación
↓
despliegue
↓
mantenimiento
```

OWASP Top 10 proporciona un buen punto de partida para identificar dónde debemos prestar atención.

## Referencias

Para profundizar, consulta principalmente documentación oficial de OWASP:

- [**OWASP Top 10:2025**](https://owasp.org/Top10/2025/) — Lista y documentación oficial de los diez riesgos.
- [**OWASP Top 10:2025 en español**](https://owasp.org/Top10/2025/es/) — Versión oficial en español.
- [**OWASP Secure Code Review Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html) — Revisión de código desde una perspectiva de seguridad.
- [**OWASP Input Validation Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — Validación segura de datos externos.
- [**OWASP Authentication Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — Buenas prácticas de autenticación.
- [**OWASP Session Management Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — Gestión segura de sesiones y cookies.
- [**OWASP Cryptographic Storage Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) — Recomendaciones para proteger datos sensibles.
- [**OWASP Logging Cheat Sheet**](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) — Logging y monitoreo de eventos de seguridad.
