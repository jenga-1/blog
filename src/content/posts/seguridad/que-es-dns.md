---
title: "Qué es DNS, cómo funciona y por qué es esencial para Internet"
description: "Entiende qué es el sistema DNS, cómo traduce dominios a direcciones IP, qué servidores participan en una consulta, qué registros existen y qué implicaciones tiene para la privacidad y la seguridad."
publishedAt: 2026-09-02
category: "seguridad"
tags:
  - dns
  - redes
  - dominios
  - privacidad
  - seguridad-web
draft: false
sidebarLabel: "Qué es DNS"
order: 4
---

## Introducción

Cuando escribes una dirección como:

```text
example.com
```

tu navegador necesita saber a qué servidor debe conectarse.

Los seres humanos recordamos fácilmente nombres como `example.com`, `github.com` o `wikipedia.org`, pero los dispositivos se comunican mediante direcciones IP.

Ahí aparece **DNS**, siglas de **Domain Name System** o **Sistema de Nombres de Dominio**.

De forma simplificada, DNS convierte esto:

```text
example.com
```

en algo que una computadora puede utilizar para localizar un servidor:

```text
93.184.216.34
```

Por eso suele describirse como una especie de **agenda telefónica de Internet**.

[ICANN explica el DNS](https://www.icann.org/resources/pages/dns-2022-09-13-es) como el sistema que permite utilizar nombres de dominio fáciles de recordar en lugar de tener que memorizar direcciones IP.

---

## Un ejemplo sencillo

Supongamos que quieres entrar a:

```text
tienda.example
```

Tu navegador conoce el nombre, pero todavía necesita encontrar la dirección IP correspondiente.

El proceso se parece a esto:

```text
Escribes:
tienda.example
      │
      ▼
Consulta DNS
      │
      ▼
"¿Cuál es la IP de tienda.example?"
      │
      ▼
Respuesta DNS
      │
      ▼
203.0.113.20
      │
      ▼
El navegador se conecta al servidor
```

DNS no descarga la página web.

Su trabajo principal en este ejemplo es decir:

> "`tienda.example` se encuentra en esta dirección."

Después de obtener la dirección, el navegador puede comenzar la conexión con el servidor correspondiente.

> [!NOTE]
> En una navegación real pueden intervenir cachés, CDN, varias direcciones IP, IPv6, balanceadores y otros sistemas. El ejemplo está simplificado para mostrar la función principal del DNS.

---

## ¿Por qué existe DNS?

Imagina que para visitar cada página tuvieras que escribir directamente una IP:

```text
142.250.x.x
```

o una dirección IPv6 mucho más larga:

```text
2607:f8b0:4005:80a::200e
```

Sería difícil recordar decenas o cientos de direcciones.

DNS permite separar dos conceptos:

```text
Nombre fácil de recordar
        │
        ▼
    example.com

Dirección utilizada por la red
        │
        ▼
      IP
```

Además, el propietario de un dominio puede cambiar la infraestructura que existe detrás sin obligar a todos los usuarios a memorizar una dirección nueva.

---

## DNS no es una base de datos única

Una idea importante es que DNS no funciona como un único servidor gigantesco que contiene todos los dominios de Internet.

Es un sistema **distribuido y jerárquico**.

De forma simplificada:

```text
DNS
│
├── Servidores raíz
│
├── Servidores de TLD
│   ├── .com
│   ├── .org
│   ├── .net
│   └── .pe
│
└── Servidores autoritativos
    └── Información de cada dominio
```

Esto permite que el sistema pueda funcionar a escala global.

---

## ¿Qué ocurre cuando escribes un dominio?

Supongamos que visitas:

```text
www.example.com
```

Una resolución DNS completa puede involucrar varias etapas.

```text
Tu dispositivo
      │
      ▼
Resolver DNS
      │
      ▼
Servidor raíz
      │
      ▼
Servidor de .com
      │
      ▼
Servidor autoritativo de example.com
      │
      ▼
Dirección IP
```

Normalmente tu dispositivo no realiza manualmente cada una de estas consultas.

Esa tarea suele realizarla un **resolver DNS recursivo**.

[Cloudflare describe este proceso de resolución DNS](https://www.cloudflare.com/es-la/learning/dns/what-is-dns/) y diferencia los resolvers recursivos de los servidores de nombres autoritativos.

---

## El resolver DNS recursivo

El **resolver recursivo** es el sistema que recibe inicialmente la pregunta de tu dispositivo.

Por ejemplo:

```text
"¿Cuál es la IP de example.com?"
```

Tu dispositivo puede utilizar un resolver proporcionado por:

- tu proveedor de Internet;
- una empresa;
- una universidad;
- una VPN;
- un proveedor DNS público;
- una configuración personalizada.

Su función es obtener la respuesta y devolvértela.

```text
Dispositivo
    │
    │ example.com
    ▼
Resolver recursivo
    │
    │ búsqueda
    ▼
Sistema DNS
    │
    │ 93.184.216.34
    ▼
Resolver
    │
    ▼
Dispositivo
```

Un ejemplo de este tipo de servicio es [Google Public DNS](https://developers.google.com/speed/public-dns/docs/intro?hl=es-419), que Google describe como un resolver DNS recursivo público.

---

## Servidores raíz

Si el resolver no conoce la respuesta y no la tiene almacenada en caché, puede comenzar consultando la jerarquía DNS.

Los **servidores raíz** están en la parte superior de esa jerarquía.

No suelen responder directamente con:

```text
example.com = 93.184.216.34
```

En su lugar, orientan al resolver hacia los servidores responsables del dominio de nivel superior correspondiente.

Para:

```text
example.com
```

la parte relevante es:

```text
.com
```

Conceptualmente:

```text
Resolver
   │
   │ "¿example.com?"
   ▼
Servidor raíz
   │
   │ "Pregunta a los servidores de .com"
   ▼
Resolver
```

---

## Servidores TLD

TLD significa **Top-Level Domain** o dominio de nivel superior.

Algunos ejemplos:

```text
.com
.org
.net
.edu
.pe
.es
```

Para `example.com`, el resolver puede consultar a los servidores responsables de `.com`.

Estos tampoco tienen necesariamente que devolver directamente la IP final.

Pueden indicar qué servidores son autoritativos para:

```text
example.com
```

El recorrido sería:

```text
Servidor raíz
      │
      ▼
Servidor de .com
      │
      ▼
Servidor autoritativo de example.com
```

---

## Servidor DNS autoritativo

El **servidor autoritativo** contiene la información DNS publicada por el dominio.

Por ejemplo, podría contener un registro como:

```text
example.com → 203.0.113.20
```

Cuando el resolver llega a este servidor, puede obtener la respuesta necesaria.

```text
Resolver
    │
    ▼
DNS autoritativo
    │
    │ example.com = 203.0.113.20
    ▼
Resolver
    │
    ▼
Usuario
```

> [!IMPORTANT]
> Un resolver recursivo y un servidor autoritativo no cumplen la misma función. El resolver busca respuestas para el usuario; el autoritativo publica respuestas sobre los dominios que administra.

---

## ¿Qué son los registros DNS?

DNS puede almacenar mucho más que una dirección IP.

La información se organiza mediante distintos tipos de **registros DNS**.

Entre los más habituales están:

| Registro | Uso principal                                          |
| -------- | ------------------------------------------------------ |
| `A`      | Relaciona un nombre con una dirección IPv4             |
| `AAAA`   | Relaciona un nombre con una dirección IPv6             |
| `CNAME`  | Crea un alias hacia otro nombre                        |
| `MX`     | Indica servidores de correo                            |
| `TXT`    | Almacena texto utilizado para distintas verificaciones |
| `NS`     | Indica servidores de nombres del dominio               |
| `SOA`    | Contiene información administrativa de la zona         |
| `PTR`    | Se utiliza habitualmente para resolución DNS inversa   |

---

## Registro A

Un registro `A` relaciona un nombre con una dirección IPv4.

Por ejemplo:

```text
example.com
      │
      ▼
203.0.113.20
```

Conceptualmente:

```text
A example.com 203.0.113.20
```

Es uno de los registros más conocidos.

---

## Registro AAAA

`AAAA` cumple una función equivalente, pero con IPv6.

Ejemplo:

```text
example.com
      │
      ▼
2001:db8::20
```

Por tanto:

```text
A     → IPv4
AAAA  → IPv6
```

---

## Registro CNAME

Un `CNAME` permite que un nombre actúe como alias de otro.

Por ejemplo:

```text
www.example.com
       │
       ▼
example.pages-provider.com
```

Esto puede resultar útil cuando un servicio externo administra la infraestructura real.

En lugar de apuntar directamente a una IP, un nombre puede apuntar a otro nombre DNS.

---

## Registro MX

`MX` significa **Mail Exchange**.

Indica qué servidores están encargados de recibir correo para un dominio.

Por ejemplo:

```text
usuario@example.com
        │
        ▼
Registros MX de example.com
        │
        ▼
Servidor de correo
```

Por eso DNS también es fundamental para el funcionamiento del correo electrónico.

---

## Registro TXT

Los registros `TXT` permiten publicar información textual.

Se utilizan para muchas cosas, entre ellas:

- verificar que controlas un dominio;
- configurar políticas relacionadas con correo;
- publicar información utilizada por SPF;
- configurar DKIM mediante registros relacionados;
- configurar DMARC;
- validar servicios externos.

Por ejemplo, una plataforma puede pedirte añadir algo parecido a:

```text
service-verification=abc123
```

al DNS del dominio para comprobar que realmente tienes control sobre él.

---

## Registro NS

Los registros `NS` indican cuáles son los servidores de nombres responsables de una zona DNS.

Conceptualmente:

```text
example.com
   │
   ├── ns1.provider.example
   └── ns2.provider.example
```

Estos servidores contienen o sirven la información autoritativa del dominio.

---

## ¿Qué es una zona DNS?

Una **zona DNS** es una parte administrable del espacio de nombres DNS.

Por ejemplo, la zona de:

```text
example.com
```

podría contener registros como:

```text
example.com      A       203.0.113.20
www.example.com  CNAME   example.com
example.com      MX      mail.example.com
example.com      TXT     "..."
```

Cuando administras DNS desde un proveedor de dominios o infraestructura, normalmente estás modificando registros dentro de una zona.

---

## La caché DNS

Consultar toda la jerarquía DNS para cada solicitud sería muy ineficiente.

Por eso DNS utiliza ampliamente **caché**.

Supongamos que el resolver ya preguntó por:

```text
example.com
```

y obtuvo:

```text
203.0.113.20
```

Puede guardar temporalmente esa respuesta.

La siguiente consulta puede resolverse así:

```text
Usuario A
   │
   ▼
Resolver
   │
   ├── Respuesta almacenada
   │
   ▼
203.0.113.20
```

sin repetir inmediatamente todo el proceso.

Esto mejora considerablemente el rendimiento.

---

## ¿Qué es el TTL?

Los registros DNS suelen incluir un valor llamado **TTL**, abreviatura de **Time To Live**.

El TTL indica durante cuánto tiempo una respuesta puede permanecer almacenada en caché antes de necesitar ser consultada de nuevo.

Conceptualmente:

```text
Registro:
example.com → 203.0.113.20

TTL:
3600 segundos
```

Después de determinado tiempo, el resolver tendrá que volver a comprobar la información.

Esto explica por qué cuando cambias los DNS de un dominio el cambio puede no ser visible inmediatamente para todos.

---

## ¿Qué significa "propagación DNS"?

Es frecuente escuchar:

> "Hay que esperar a que se propaguen los DNS."

La expresión es útil, pero puede resultar un poco engañosa.

No existe necesariamente una actualización que viaje literalmente servidor por servidor hasta cubrir todo Internet.

Muchas veces lo que está ocurriendo es que diferentes resolvers mantienen en caché información anterior hasta que expira su TTL.

Ejemplo:

```text
Antes:
example.com → 203.0.113.10

Después:
example.com → 203.0.113.20
```

Resolver A:

```text
Ya actualizó
→ 203.0.113.20
```

Resolver B:

```text
Todavía tiene caché
→ 203.0.113.10
```

Durante un periodo ambos usuarios podrían recibir respuestas diferentes.

---

## ¿Dónde guarda DNS esa información?

La respuesta puede aparecer temporalmente en diferentes niveles.

Por ejemplo:

```text
Navegador
    │
    ▼
Sistema operativo
    │
    ▼
Router
    │
    ▼
Resolver DNS
    │
    ▼
Servidores DNS
```

No todos los sistemas almacenan exactamente los mismos datos ni durante el mismo tiempo.

Además, navegadores modernos pueden utilizar mecanismos propios de DNS seguro y saltarse parte de la configuración tradicional del sistema.

---

## DNS y el modo incógnito

El modo incógnito no hace desaparecer el sistema DNS.

Si visitas:

```text
example.com
```

el dispositivo todavía necesita encontrar dónde está ese dominio.

Por tanto, puede seguir existiendo una consulta DNS aunque la página se abra en una ventana privada.

```text
Modo incógnito
      │
      ▼
Consulta DNS
      │
      ▼
Resolver
```

> [!IMPORTANT]
> El modo incógnito controla principalmente qué información conserva el navegador localmente después de la sesión. No convierte las consultas de red en anónimas.

---

## DNS y privacidad

El DNS tradicional presenta una cuestión importante de privacidad.

Cuando consultas:

```text
example.com
```

el resolver necesita recibir el nombre solicitado para poder responder.

Además, las consultas DNS tradicionales pueden viajar sin cifrado.

Mozilla explica en su documentación sobre [DNS sobre HTTPS](https://support.mozilla.org/es/kb/firefox-dns-sobre-https) que las consultas DNS tradicionales pueden enviarse mediante conexiones sin cifrar, haciendo posible que determinados actores de la red observen los nombres consultados.

Esto no significa necesariamente que DNS revele la URL completa.

Existe una diferencia entre:

```text
example.com
```

y:

```text
https://example.com/cuenta/mensajes?id=123
```

DNS normalmente trabaja con nombres de dominio o hosts, no con toda la ruta HTTP.

---

## DNS tradicional

De forma simplificada:

```text
Tu dispositivo
      │
      │ Consulta DNS
      ▼
Red / proveedor
      │
      ▼
Resolver DNS
```

Si la consulta no está cifrada, alguien situado en determinados puntos de la red podría observar o manipular esa consulta.

Para mejorar este aspecto existen tecnologías como:

- DNS over HTTPS;
- DNS over TLS.

---

## DNS over HTTPS

**DNS over HTTPS**, normalmente abreviado como `DoH`, transporta consultas DNS mediante una conexión HTTPS cifrada.

DNS tradicional:

```text
Consulta DNS
    │
    ▼
Resolver
```

DNS over HTTPS:

```text
Consulta DNS
    │
    ▼
HTTPS cifrado
    │
    ▼
Resolver compatible con DoH
```

Mozilla indica que [DoH envía las consultas DNS mediante una conexión HTTPS cifrada](https://support.mozilla.org/en-US/kb/dns-over-https).

Esto dificulta que actores situados entre tu dispositivo y el resolver puedan leer o modificar directamente esas consultas.

> [!NOTE]
> El proveedor del resolver DNS que utilizas sigue necesitando procesar las consultas para responderlas. DoH protege el trayecto hacia el resolver; no convierte DNS en un sistema de anonimato absoluto.

---

## DNS over TLS

Otra alternativa es **DNS over TLS**, abreviado normalmente como `DoT`.

La idea general también consiste en cifrar la comunicación DNS, pero utilizando TLS de una forma específica para DNS.

Google Public DNS, por ejemplo, ofrece soporte para:

```text
DNS tradicional
DNS over HTTPS
DNS over TLS
```

como indica su [documentación oficial](https://developers.google.com/speed/public-dns).

---

## DNS no es una VPN

Cambiar de servidor DNS no equivale a utilizar una VPN.

DNS:

```text
"¿Dónde está example.com?"
           │
           ▼
        Resolver
```

VPN:

```text
Tráfico del dispositivo
          │
          ▼
      Túnel VPN
          │
          ▼
      Servidor VPN
```

Un servidor DNS se ocupa principalmente de resolver nombres.

No transporta automáticamente todo tu tráfico web como lo haría una VPN.

Por eso:

```text
Cambiar DNS
    ≠
Ocultar todo tu tráfico
```

---

## DNS tampoco es un proxy

Aunque ambos participan en comunicaciones de red, cumplen funciones distintas.

### DNS

Resuelve:

```text
example.com
      │
      ▼
203.0.113.20
```

### Proxy

Intermedia:

```text
Usuario
   │
   ▼
Proxy
   │
   ▼
Servidor
```

Una vez que DNS devuelve una dirección, la conexión con el servicio puede realizarse directamente o mediante otros intermediarios.

---

## ¿Cambiar DNS cambia tu dirección IP?

No.

Supongamos que cambias el resolver DNS proporcionado por tu operador por otro resolver.

Antes:

```text
Tu dispositivo
      │
      ▼
DNS del proveedor
```

Después:

```text
Tu dispositivo
      │
      ▼
Otro proveedor DNS
```

Tu dirección IP pública de conexión a Internet no cambia simplemente por hacer esto.

Lo que cambia es **quién resuelve determinadas consultas DNS**.

---

## DNS público

Existen resolvers DNS que cualquier usuario puede configurar en su dispositivo o red.

Por ejemplo, [Google Public DNS](https://developers.google.com/speed/public-dns/docs/intro?hl=es-419) es un resolver recursivo público.

También existen otros proveedores.

Un resolver público puede ofrecer características relacionadas con:

- rendimiento;
- disponibilidad;
- seguridad;
- soporte para DNS cifrado;
- políticas específicas de filtrado.

> [!TIP]
> Al cambiar de proveedor DNS también estás decidiendo qué entidad procesará tus consultas. Conviene revisar sus políticas de privacidad, seguridad y retención de datos antes de elegir uno.

---

## ¿Puede un DNS bloquear páginas?

Sí, dependiendo del resolver y de su configuración.

Un proveedor DNS puede decidir no devolver una dirección válida para determinados dominios.

Esto puede utilizarse para:

- controles parentales;
- políticas empresariales;
- bloqueo de dominios maliciosos;
- filtrado de contenido;
- cumplimiento de determinadas reglas de red.

El flujo podría ser:

```text
Usuario
   │
   │ dominio-malicioso.example
   ▼
Resolver DNS
   │
   ├── Bloqueado
   │
   ▼
Sin resolución normal
```

Esto tampoco significa que DNS sea un firewall completo.

Es una capa concreta de control.

---

## DNS y seguridad

DNS es una infraestructura crítica y también puede ser objetivo de ataques.

Entre los problemas relacionados con DNS se encuentran:

- respuestas DNS falsas;
- manipulación de cachés;
- secuestro de configuración DNS;
- servidores mal configurados;
- suplantación de respuestas;
- ataques contra disponibilidad.

Uno de los conceptos más conocidos es **DNS cache poisoning**, donde se intenta introducir información incorrecta dentro de una caché DNS.

La consecuencia conceptual sería:

```text
Consulta:
banco.example

Respuesta correcta:
203.0.113.10

Respuesta manipulada:
198.51.100.50
```

Si un sistema acepta la respuesta falsa, podría intentar conectarse al servidor equivocado.

---

## ¿Qué es DNSSEC?

**DNSSEC** añade mecanismos criptográficos que permiten verificar la autenticidad de determinados datos DNS.

Su objetivo principal no es cifrar las consultas.

Es ayudar a comprobar que la respuesta recibida corresponde a los datos publicados correctamente y no fue modificada en el camino.

Por tanto:

```text
DoH / DoT
    │
    └── Protegen la comunicación con el resolver

DNSSEC
    │
    └── Ayuda a verificar la autenticidad de datos DNS
```

Son tecnologías diferentes que resuelven problemas distintos.

---

## ¿DNSSEC oculta los dominios que visitas?

No.

Este es un punto importante.

```text
DNSSEC
   ≠
Privacidad de consultas
```

DNSSEC se centra principalmente en integridad y autenticidad de la información DNS.

Para proteger las consultas durante el transporte existen mecanismos como DoH y DoT.

---

## DNS inverso

Normalmente DNS funciona así:

```text
Dominio
   │
   ▼
Dirección IP
```

Existe también el proceso inverso:

```text
Dirección IP
   │
   ▼
Nombre asociado
```

Esto se conoce como **reverse DNS** o DNS inverso.

Habitualmente utiliza registros:

```text
PTR
```

Es común en infraestructura de servidores y sistemas de correo electrónico.

---

## DNS en una aplicación web

Supongamos que tienes una aplicación desplegada en un servidor con IP:

```text
203.0.113.50
```

y compras:

```text
miapp.com
```

Podrías configurar algo conceptualmente parecido a:

```text
miapp.com      A       203.0.113.50
www.miapp.com  CNAME   miapp.com
```

El flujo sería:

```text
Usuario escribe miapp.com
          │
          ▼
         DNS
          │
          ▼
     203.0.113.50
          │
          ▼
Servidor de la aplicación
```

DNS es la capa que conecta el nombre público de tu proyecto con la infraestructura que debe responder.

---

## DNS con servicios como Vercel o Cloudflare

En plataformas modernas muchas veces no apuntas directamente el dominio a un único servidor propio.

El proveedor puede pedirte configurar registros como:

```text
A
CNAME
TXT
```

Por ejemplo:

```text
www.miapp.com
      │
      ▼
CNAME
      │
      ▼
Proveedor
```

El proveedor se encarga después de enrutar el tráfico hacia su infraestructura.

Por eso entender DNS resulta especialmente útil cuando trabajas con:

- dominios personalizados;
- Vercel;
- CDN;
- hosting;
- correo;
- APIs;
- certificados;
- verificación de servicios.

---

## Un error DNS no significa necesariamente que la web esté caída

Supongamos que intentas abrir:

```text
example.com
```

y DNS no puede resolver el dominio.

Puedes recibir un error aunque el servidor web siga funcionando perfectamente.

```text
Servidor web
   │
   │ funcionando
   ▼
203.0.113.20

DNS
   │
   └── configuración incorrecta
```

El usuario no puede encontrar la dirección, por lo que nunca llega al servidor.

Esto demuestra que:

```text
DNS
Servidor web
Aplicación
```

son capas diferentes.

---

## Qué ocurre si DNS deja de funcionar

Si tu resolver DNS deja de responder, muchas aplicaciones pueden parecer desconectadas de Internet.

Por ejemplo:

```text
example.com
github.com
wikipedia.org
```

podrían dejar de cargar porque el dispositivo no puede convertir esos nombres en direcciones.

Sin embargo, la conexión física a Internet podría seguir funcionando.

Conceptualmente:

```text
Internet         ✓
DNS              ✕
Resolución nombres ✕
```

Por eso un fallo DNS a veces se confunde con una caída completa de Internet.

---

## Cómo pensar en DNS

Una forma útil de recordarlo es imaginar que quieres visitar una casa.

Tienes el nombre:

```text
"Casa de ejemplo"
```

pero necesitas la dirección:

```text
Calle 123
```

DNS realiza una función parecida:

```text
example.com
      │
      ▼
DNS
      │
      ▼
203.0.113.20
```

Después de conocer la dirección comienza otra parte del proceso: establecer la conexión con ese servidor.

Por tanto, DNS no es Internet completo.

Es una de las piezas que hacen que Internet sea práctico de utilizar.

---

## Referencias

- [ICANN — El Sistema de Nombres de Dominio](https://www.icann.org/resources/pages/dns-2022-09-13-es)
- [Cloudflare — ¿Qué es DNS y cómo funciona?](https://www.cloudflare.com/es-la/learning/dns/what-is-dns/)
- [Cloudflare — ¿Qué es un servidor DNS?](https://www.cloudflare.com/es-la/learning/dns/what-is-a-dns-server/)
- [Google for Developers — Introducción a Google Public DNS](https://developers.google.com/speed/public-dns/docs/intro?hl=es-419)
- [Google for Developers — Public DNS](https://developers.google.com/speed/public-dns)
- [Mozilla — Firefox DNS sobre HTTPS](https://support.mozilla.org/es/kb/firefox-dns-sobre-https)
- [Mozilla — Configurar DNS over HTTPS](https://support.mozilla.org/en-US/kb/dns-over-https)
