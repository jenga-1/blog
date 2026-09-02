---
title: "Qué es un proxy, cómo funciona y qué puede ocultar realmente"
description: "Entiende qué es un servidor proxy, cómo actúa como intermediario entre tu dispositivo e Internet, qué tipos existen, para qué se utilizan y cuáles son sus límites de privacidad y seguridad."
publishedAt: 2026-09-02
category: "seguridad"
tags:
  - proxy
  - redes
  - privacidad
  - seguridad-web
  - http
draft: false
sidebarLabel: "Qué es un proxy"
order: 3
---

## Introducción

Cuando visitas una página web normalmente tu dispositivo se comunica con el servidor que aloja esa página.

De forma simplificada:

```text
Tu dispositivo
      │
      ▼
   Internet
      │
      ▼
Servidor web
```

Un **proxy** introduce un intermediario dentro de esa comunicación.

```text
Tu dispositivo
      │
      ▼
Servidor proxy
      │
      ▼
   Internet
      │
      ▼
Servidor web
```

En lugar de conectarte directamente al servidor de destino, determinadas solicitudes pasan primero por el proxy.

Este puede reenviarlas, modificarlas, filtrarlas, almacenarlas temporalmente o incluso bloquearlas dependiendo de cómo esté configurado.

Los proxies aparecen constantemente en Internet, aunque muchas veces el usuario ni siquiera sabe que está utilizando uno.

---

## ¿Qué es exactamente un proxy?

Un **servidor proxy** es un sistema que actúa como intermediario entre un cliente y otro servidor.

El cliente puede ser:

- un navegador;
- una aplicación;
- un ordenador;
- un teléfono;
- una red empresarial;
- otro servidor.

Cuando el cliente quiere acceder a un recurso, envía primero la solicitud al proxy.

El proxy realiza después la petición al servidor de destino.

```text
Cliente
   │
   │ 1. Solicitud
   ▼
 Proxy
   │
   │ 2. Nueva solicitud
   ▼
Servidor
   │
   │ 3. Respuesta
   ▼
 Proxy
   │
   │ 4. Respuesta
   ▼
Cliente
```

Para el servidor final, la conexión puede parecer provenir del proxy en lugar de directamente del dispositivo original.

[MDN define un proxy](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server) como un programa o equipo intermediario utilizado durante la comunicación entre diferentes redes.

---

## Un ejemplo sencillo

Imagina que quieres acceder a:

```text
example.com
```

Sin proxy:

```text
192.0.2.10
    │
    ▼
example.com
```

El servidor recibe directamente una conexión procedente de tu red.

Con un proxy:

```text
192.0.2.10
    │
    ▼
Servidor proxy
198.51.100.20
    │
    ▼
example.com
```

Desde la perspectiva del servidor de destino, la conexión de red puede provenir de:

```text
198.51.100.20
```

que sería la dirección del proxy.

> [!IMPORTANT]
> Esto no significa que el usuario sea automáticamente anónimo. Existen muchas otras formas de identificar o relacionar una sesión con una persona, cuenta o dispositivo.

---

## ¿Para qué sirve un proxy?

Un proxy puede tener objetivos muy diferentes.

Entre los más habituales están:

- controlar el acceso a Internet;
- ocultar la dirección IP directamente expuesta al servidor final;
- aplicar reglas de seguridad;
- filtrar contenido;
- almacenar recursos en caché;
- registrar tráfico;
- administrar redes empresariales;
- distribuir solicitudes entre servidores;
- proteger servidores internos;
- facilitar determinadas arquitecturas web.

Por eso hablar simplemente de "un proxy" puede resultar ambiguo.

Existen diferentes tipos y cada uno resuelve problemas distintos.

---

## Proxy directo o Forward Proxy

El **forward proxy** se coloca principalmente del lado del cliente.

```text
Usuarios
   │
   ├──────────┐
   │          │
   ▼          ▼
        Forward Proxy
             │
             ▼
          Internet
             │
      ┌──────┼──────┐
      ▼      ▼      ▼
    Web A  Web B  Web C
```

Los dispositivos realizan sus solicitudes mediante ese servidor.

El sitio web puede ver al proxy como origen de la conexión en lugar de ver directamente a cada cliente.

Este tipo de proxy puede utilizarse en organizaciones para:

- controlar qué sitios se pueden visitar;
- registrar conexiones;
- aplicar políticas;
- utilizar caché;
- centralizar el acceso a Internet.

También puede emplearse para proporcionar cierta separación entre la dirección IP del cliente y el servidor visitado.

---

## Reverse Proxy

El **reverse proxy** funciona en el otro extremo.

En lugar de representar principalmente al cliente, se coloca delante de uno o varios servidores.

```text
                 Internet
                    │
                    ▼
              Reverse Proxy
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
      Servidor A Servidor B Servidor C
```

El usuario realiza una solicitud al proxy inverso y este decide a qué servidor interno enviarla.

Este patrón es extremadamente común en aplicaciones web.

Puede utilizarse para:

- balanceo de carga;
- caché;
- terminación TLS;
- compresión;
- protección de servidores de origen;
- autenticación;
- distribución del tráfico.

[Cloudflare explica los reverse proxies](https://www.cloudflare.com/es-la/learning/cdn/glossary/reverse-proxy/) como servidores situados delante de los servidores web que reciben las solicitudes de los clientes y posteriormente las reenvían.

---

## Forward Proxy vs Reverse Proxy

Aunque ambos sean proxies, representan lados diferentes de la comunicación.

| Característica            | Forward Proxy             | Reverse Proxy                             |
| ------------------------- | ------------------------- | ----------------------------------------- |
| Representa principalmente | Cliente                   | Servidor                                  |
| Está delante de           | Usuarios                  | Servidores                                |
| Puede ocultar             | Cliente frente al destino | Infraestructura interna frente al cliente |
| Uso típico                | Control de navegación     | Arquitectura web                          |
| Caché                     | Sí                        | Sí                                        |
| Filtrado                  | Sí                        | Sí                                        |
| Balanceo de carga         | Poco habitual             | Muy habitual                              |

Una forma sencilla de recordarlo es:

```text
Forward Proxy
Usuario → Proxy → Internet

Reverse Proxy
Internet → Proxy → Servidores
```

---

## ¿Un proxy cambia tu IP?

Desde la perspectiva del servidor de destino, un proxy puede provocar que la conexión parezca provenir de la dirección IP del propio proxy.

Por ejemplo:

```text
Tu IP
192.0.2.10
     │
     ▼
Proxy
198.51.100.20
     │
     ▼
Sitio web
```

El sitio podría recibir la conexión desde:

```text
198.51.100.20
```

en lugar de directamente desde:

```text
192.0.2.10
```

Pero esto necesita una aclaración importante.

> [!WARNING]
> Cambiar la IP que observa directamente un servidor no equivale a convertirse en anónimo.

---

## Un proxy no te hace invisible

Un sitio web no depende únicamente de una dirección IP para reconocer actividad.

También pueden intervenir elementos como:

- cookies;
- cuentas iniciadas;
- sesiones;
- características del navegador;
- almacenamiento local;
- parámetros enviados en las solicitudes;
- técnicas de fingerprinting.

Imagina esta situación:

```text
Usuario
   │
   ▼
Proxy
   │
   ▼
Instagram
   │
   ▼
Inicio de sesión:
usuario@example.com
```

Aunque la IP utilizada para conectarse sea la del proxy, acabas de identificar tu cuenta explícitamente frente al servicio.

---

## Las cabeceras también pueden revelar información

Algunos proxies incluyen información relacionada con el cliente original dentro de cabeceras HTTP.

Una de las cabeceras estandarizadas es:

```http
Forwarded: for=192.0.2.10
```

También existen cabeceras ampliamente utilizadas como:

```http
X-Forwarded-For: 192.0.2.10
```

Según [la documentación de MDN sobre proxies y tunneling](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling), estas cabeceras pueden utilizarse para transmitir información que normalmente se perdería cuando una conexión pasa a través de intermediarios.

Por eso:

```text
Usar proxy
    ≠
Garantizar que nunca se revele la IP original
```

Todo depende de la infraestructura y de su configuración.

---

## ¿Un proxy cifra tu conexión?

No necesariamente.

Este es uno de los errores más comunes.

```text
Proxy
≠
Cifrado
```

Un proxy simplemente introduce un intermediario.

La protección del contenido depende de los protocolos utilizados y de cómo esté configurada la conexión.

---

## ¿Qué ocurre con HTTPS?

Cuando visitas:

```text
https://example.com
```

HTTPS utiliza TLS para proteger la comunicación.

Cuando se utiliza un proxy HTTP, puede emplearse el método HTTP:

```http
CONNECT
```

para solicitar que el proxy establezca un túnel hacia el servidor.

De forma simplificada:

```text
Navegador
    │
    │ CONNECT example.com:443
    ▼
Proxy
    │
    │ túnel
    ▼
example.com
```

MDN documenta el funcionamiento de [`CONNECT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/CONNECT) como el método utilizado para pedir a un proxy que establezca un túnel hacia otro servidor.

> [!NOTE]
> El comportamiento exacto depende del tipo de proxy, de la aplicación y de la configuración de la red.

---

## HTTP Proxy

Un proxy HTTP está diseñado para manejar tráfico relacionado con HTTP.

Puede recibir solicitudes como:

```http
GET /articles HTTP/1.1
Host: example.com
```

y posteriormente procesarlas o reenviarlas.

Entre otras cosas, puede:

- inspeccionar determinadas cabeceras;
- aplicar reglas;
- guardar contenido en caché;
- modificar solicitudes;
- modificar respuestas.

---

## SOCKS Proxy

SOCKS funciona a un nivel diferente.

En lugar de centrarse específicamente en HTTP, puede transportar distintos tipos de conexiones de red.

Una versión muy utilizada es:

```text
SOCKS5
```

El modelo conceptual sigue siendo parecido:

```text
Aplicación
    │
    ▼
SOCKS Proxy
    │
    ▼
Servidor destino
```

Pero el proxy trabaja de una forma más general que un proxy HTTP.

---

## Proxy transparente

También existen proxies que pueden funcionar sin que el usuario configure conscientemente uno en su navegador.

Una organización podría tener una infraestructura similar a:

```text
Ordenador
   │
   ▼
Red empresarial
   │
   ▼
Proxy / sistema de filtrado
   │
   ▼
Internet
```

Desde la perspectiva del usuario simplemente está utilizando Internet.

Sin embargo, parte de las comunicaciones pueden estar pasando por sistemas administrados por la organización.

---

## Proxy y caché

Los proxies también pueden utilizar caché.

Supongamos que varios usuarios solicitan el mismo recurso:

```text
imagen.webp
```

Sin caché:

```text
Usuario A ───────► Servidor
Usuario B ───────► Servidor
Usuario C ───────► Servidor
```

Con un proxy que almacena ese recurso:

```text
                 ┌── Usuario A
Servidor → Proxy ├── Usuario B
                 └── Usuario C
```

El proxy puede reutilizar determinadas respuestas sin consultar constantemente al servidor de origen.

Esto puede reducir:

- latencia;
- consumo de ancho de banda;
- carga del servidor.

---

## Proxy y empresas

Los proxies son habituales dentro de redes empresariales.

Por ejemplo:

```text
Empleado
   │
   ▼
Proxy corporativo
   │
   ├── Políticas
   ├── Filtrado
   ├── Registro
   └── Caché
   │
   ▼
Internet
```

Esto permite administrar el tráfico desde un punto central.

Un proxy no es únicamente una herramienta de privacidad.

También puede ser una herramienta de **control y observabilidad**.

---

## Proxy y desarrollo web

Los desarrolladores utilizan constantemente proxies sin que necesariamente tengan relación con privacidad.

Por ejemplo, durante el desarrollo:

```text
Frontend
localhost:3000
      │
      ▼
Reverse Proxy
      │
      ▼
Backend
localhost:4000
```

El usuario podría solicitar:

```text
/api/users
```

y el proxy reenviarlo internamente hacia:

```text
http://localhost:4000/users
```

De esta forma, diferentes servicios pueden aparecer hacia el exterior como una sola aplicación.

---

## Proxy y balanceo de carga

Supongamos que una aplicación crece y un único servidor ya no es suficiente.

Podríamos tener:

```text
Servidor 1
Servidor 2
Servidor 3
```

Un reverse proxy puede recibir las solicitudes:

```text
Usuarios
    │
    ▼
Reverse Proxy
    │
    ├──► Servidor 1
    ├──► Servidor 2
    └──► Servidor 3
```

y distribuirlas entre diferentes máquinas.

Esto permite aumentar la capacidad y disponibilidad de una aplicación.

---

## Proxy vs VPN

Proxy y VPN suelen aparecer juntos cuando se habla de privacidad, pero no son exactamente lo mismo.

Un proxy normalmente actúa sobre determinadas conexiones o aplicaciones.

Una VPN crea normalmente un túnel para el tráfico de red que el sistema enruta a través de ella.

Conceptualmente:

### Proxy

```text
Aplicación
    │
    ▼
 Proxy
    │
    ▼
Internet
```

### VPN

```text
Dispositivo
    │
    ▼
Túnel VPN
    │
    ▼
Servidor VPN
    │
    ▼
Internet
```

| Característica                                        | Proxy             | VPN                                          |
| ----------------------------------------------------- | ----------------- | -------------------------------------------- |
| Intermediario                                         | Sí                | Sí                                           |
| Puede cambiar la IP visible                           | Sí                | Sí                                           |
| Cifra automáticamente todo el tráfico del dispositivo | No necesariamente | Normalmente el tráfico enrutado por el túnel |
| Puede configurarse por aplicación                     | Sí                | Depende de la VPN                            |
| Uso en arquitectura de servidores                     | Muy común         | No es su objetivo principal                  |
| Caché HTTP                                            | Puede             | No es su función                             |

> [!IMPORTANT]
> Ni una VPN ni un proxy convierten automáticamente a una persona en completamente anónima.

---

## Proxy vs modo incógnito

También son tecnologías completamente diferentes.

El modo incógnito afecta principalmente a lo que el navegador conserva localmente después de una sesión.

El proxy modifica el recorrido de determinadas conexiones.

```text
Modo incógnito
      │
      ▼
Control de datos locales
del navegador


Proxy
      │
      ▼
Intermediario en
la comunicación
```

Por eso pueden utilizarse juntos y seguir resolviendo problemas distintos.

---

## ¿Puede el proxy ver lo que haces?

Depende del protocolo utilizado, la configuración del proxy y el tipo de tráfico.

Pero hay una regla importante:

> [!WARNING]
> Si utilizas un proxy administrado por otra persona, estás introduciendo deliberadamente un nuevo intermediario dentro de tu conexión.

El operador del proxy podría tener acceso a determinados metadatos y puede registrar información relacionada con las conexiones que pasan por su infraestructura.

Por eso un proxy desconocido no debería considerarse automáticamente una mejora de privacidad.

---

## El problema de los proxies gratuitos

Es habitual encontrar servicios que prometen:

```text
"Proxy gratis"
"Oculta tu IP"
"Navega anónimamente"
```

El problema es que el proxy se convierte en parte de la infraestructura por la que pasan tus conexiones.

Antes:

```text
Tú
 │
 ▼
Internet
```

Después:

```text
Tú
 │
 ▼
Empresa desconocida
 │
 ▼
Internet
```

Has ocultado determinada información frente al destino, pero al mismo tiempo has añadido otra entidad en la que necesitas confiar.

> [!TIP]
> Cuando una herramienta promete privacidad, no basta con preguntarse qué información oculta. También conviene preguntarse **quién opera la infraestructura y qué información puede recibir ese operador**.

---

## ¿Un proxy evita el rastreo?

No por sí solo.

Puede modificar una señal importante:

```text
Dirección IP
```

pero los sistemas modernos pueden utilizar muchas otras señales.

```text
IP
Cookies
Cuenta
Navegador
Sesión
Fingerprint
Actividad
```

La privacidad en Internet no depende de una única tecnología.

---

## ¿Cuándo tiene sentido utilizar un proxy?

Los proxies tienen muchos usos perfectamente legítimos.

### Administración de redes

Para controlar y gestionar conexiones desde un punto central.

### Desarrollo

Para comunicar frontends, APIs y servicios internos.

### Reverse proxy

Para colocar una capa delante de los servidores de una aplicación.

### Balanceo de carga

Para distribuir tráfico entre múltiples servidores.

### Caché

Para evitar descargar repetidamente determinados recursos.

### Seguridad

Para separar servicios públicos de infraestructura interna y aplicar reglas adicionales.

### Privacidad de red

En determinados escenarios puede impedir que el servidor final observe directamente la IP del cliente.

---

## El modelo mental correcto

La forma más sencilla de entenderlo es pensar en el proxy como un mensajero.

Sin proxy:

```text
Tú ───────────────► Servidor
```

Con proxy:

```text
Tú ───► Proxy ───► Servidor
```

El servidor habla con el proxy.

El proxy habla contigo.

Pero el proxy también forma parte de la comunicación.

Por eso la pregunta no debería ser únicamente:

> "¿El proxy me oculta?"

También debería ser:

> "¿Qué información conoce el proxy y cuánto confío en quien lo administra?"

---

## Referencias

- [MDN — Proxy server](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server)
- [MDN — Proxy servers and tunneling](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling)
- [MDN — CONNECT request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/CONNECT)
- [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [Cloudflare — ¿Qué es un proxy inverso?](https://www.cloudflare.com/es-la/learning/cdn/glossary/reverse-proxy/)
