---
title: "Principios fundamentales de diseño de interfaces"
description: "Guía práctica para diseñar interfaces claras, consistentes y fáciles de usar mediante jerarquía, espaciado, tipografía, contraste, feedback y accesibilidad."
publishedAt: 2026-09-01
updatedAt: 2026-09-01
category: "design"
tags:
  - ui
  - ux
  - diseño
  - interfaces
  - accesibilidad
draft: false
sidebarLabel: "Principios de UI"
order: 1
---

## 1. El objetivo de una interfaz

Una buena interfaz no es simplemente una interfaz bonita.

Su objetivo principal es permitir que una persona:

- entienda dónde está;
- sepa qué puede hacer;
- encuentre rápidamente lo importante;
- complete una tarea con poca fricción;
- entienda qué ocurrió después de una acción.

La estética importa, pero debe apoyar la comprensión.

> [!IMPORTANT]
> Antes de decidir colores, sombras o animaciones, define qué necesita hacer el usuario y qué información necesita para hacerlo.

---

## 2. Jerarquía visual

La jerarquía visual determina qué elementos llaman primero la atención.

Una pantalla debería comunicar qué es:

1. principal;
2. secundario;
3. complementario.

Puedes crear jerarquía mediante:

- tamaño;
- peso tipográfico;
- contraste;
- posición;
- espacio;
- color.

Ejemplo:

```text
Título principal

Descripción secundaria

Contenido

Acción principal
Acción secundaria
```

No todo debería competir por la misma atención.

### Mal

```text
TÍTULO GRANDE

BOTÓN GRANDE

SUBTÍTULO GRANDE

OTRO BOTÓN GRANDE

TEXTO DESTACADO
```

Todo intenta ser importante.

### Mejor

```text
Título

Descripción secundaria

Contenido

[ Acción principal ]  Acción secundaria
```

> [!TIP]
> Si todo destaca, nada destaca.

---

## 3. Espaciado y ritmo

El espacio vacío ayuda a entender qué elementos están relacionados.

Dos elementos cercanos parecen pertenecer al mismo grupo.

Dos elementos separados parecen pertenecer a grupos diferentes.

Por ejemplo:

```text
Título
Descripción

        ← espacio mayor

Configuración
Opción
Opción

        ← espacio mayor

Seguridad
Opción
Opción
```

El espaciado debería seguir un sistema.

Una escala sencilla podría ser:

```text
4
8
12
16
24
32
48
64
```

No es obligatorio utilizar exactamente estos valores.

Lo importante es evitar decisiones arbitrarias como:

```text
13px
17px
29px
41px
```

sin una razón concreta.

---

## 4. Alineación

Una interfaz se siente mucho más ordenada cuando los elementos comparten líneas visuales.

Por ejemplo:

```text
Título
Descripción
Botón
Lista
```

deberían comenzar desde un mismo eje cuando pertenecen a la misma sección.

Evita pequeñas diferencias accidentales:

```text
Título
 Descripción
   Botón
 Lista
```

Aunque sean pocos píxeles, producen ruido visual.

> [!TIP]
> Antes de añadir decoración para mejorar una interfaz, revisa primero alineación y espaciado.

Muchas interfaces pueden mejorar considerablemente únicamente corrigiendo esos dos aspectos.

---

## 5. Proximidad

La proximidad ayuda a comunicar relaciones.

Considera:

```text
Nombre
Correo

Contraseña
Confirmar contraseña
```

Cada pareja debería estar visualmente relacionada.

Esto puede conseguirse mediante:

```text
label
4px
input

16px

label
4px
input
```

No necesitas colocar bordes alrededor de cada elemento para crear grupos.

El espacio también puede cumplir esa función.

---

## 6. Contraste

El contraste permite diferenciar importancia y estados.

Por ejemplo, en una interfaz oscura:

```text
Título
#ededed

Texto
#a1a1a1

Texto secundario
#737373

Borde
#262626

Fondo
#000000
```

Esto genera diferentes niveles sin utilizar muchos colores.

El contraste también debe permitir leer correctamente el contenido.

Evita textos tan tenues que resulten difíciles de distinguir del fondo.

---

## 7. No abuses de los bordes

Un error frecuente es colocar un borde alrededor de absolutamente todo:

```text
┌──────────────┐
│ ┌──────────┐ │
│ │ contenido│ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │ contenido│ │
│ └──────────┘ │
└──────────────┘
```

Antes de añadir un borde pregúntate:

> ¿Necesito realmente separar estos elementos?

Muchas veces puedes utilizar:

- espacio;
- fondo;
- tipografía;
- alineación.

Por ejemplo:

```text
Cuenta

Nombre
Julio García

Correo
user@example.com
```

puede ser más limpio que envolver cada dato en una tarjeta.

---

## 8. Tipografía

La tipografía debe facilitar la lectura y establecer jerarquía.

Una interfaz normalmente necesita muy pocos niveles.

Por ejemplo:

```text
H1
40px / semibold

H2
24px / semibold

Título pequeño
16px / medium

Body
14-16px / regular

Metadata
12-13px / regular
```

Evita utilizar demasiados tamaños diferentes sin necesidad.

También presta atención a:

- `line-height`;
- ancho de línea;
- peso;
- contraste;
- espaciado entre títulos y párrafos.

### Texto largo

Para contenido extenso, evita líneas demasiado anchas.

Una columna aproximadamente entre:

```text
600px - 800px
```

suele ser más cómoda que utilizar todo el ancho disponible de un monitor.

---

## 9. Consistencia

Elementos que realizan la misma acción deberían verse y comportarse de forma similar.

Si todos los botones principales son:

```text
fondo claro
texto oscuro
border-radius 6px
altura 40px
```

no conviertas uno arbitrariamente en:

```text
fondo azul
radius 20px
altura 52px
```

sin una razón funcional.

La consistencia debe aplicarse a:

- botones;
- inputs;
- cards;
- diálogos;
- iconos;
- tamaños;
- bordes;
- estados;
- animaciones;
- espaciado.

Esto reduce la cantidad de cosas que el usuario necesita aprender.

---

## 10. Acción primaria y secundaria

Una pantalla puede tener varias acciones, pero normalmente una debería ser la principal.

Por ejemplo:

```text
[ Guardar cambios ]   Cancelar
```

En lugar de:

```text
[ Guardar cambios ]   [ Cancelar ]
```

con exactamente el mismo peso visual.

La jerarquía de botones puede ser:

```text
Primario
→ acción principal

Secundario
→ alternativa

Ghost / texto
→ acción de menor importancia

Destructivo
→ eliminar, cerrar cuenta, etc.
```

No todas las acciones necesitan parecer botones principales.

---

## 11. Estados interactivos

Un componente no está terminado cuando solo diseñaste su estado normal.

Por ejemplo, un botón puede necesitar:

```text
default
hover
focus
active
disabled
loading
```

Un input:

```text
default
focus
filled
invalid
disabled
```

Ejemplo:

```text
Input normal
──────────────

Input focus
══════════════

Input error
──────────────
Correo inválido
```

El usuario debe poder entender el estado actual del elemento.

---

## 12. Feedback

Una interfaz debe responder cuando el usuario realiza una acción.

Ejemplos:

```text
Guardar
   ↓
Guardando...
   ↓
Guardado
```

o:

```text
Copiar
   ↓
Copiado
```

Sin feedback, el usuario puede preguntarse:

> ¿Funcionó?

El feedback puede ser:

- cambio de texto;
- cambio de estado;
- mensaje;
- toast;
- animación pequeña;
- actualización visible del contenido.

> [!IMPORTANT]
> No utilices animaciones largas para reemplazar feedback funcional.

---

## 13. Affordance

Un elemento interactivo debería parecer interactivo.

Un botón debe parecer pulsable.

Un enlace debería poder reconocerse como enlace.

Un campo debe parecer editable.

Evita interfaces donde el usuario tenga que descubrir mediante prueba y error qué elementos pueden pulsarse.

Por ejemplo:

```text
Configuración →
```

comunica navegación con mayor claridad que:

```text
Configuración
```

si visualmente parece únicamente texto.

---

## 14. Reduce decisiones innecesarias

Cada opción adicional aumenta la cantidad de decisiones que debe tomar el usuario.

Por ejemplo:

```text
Crear proyecto

Plantilla A
Plantilla B
Plantilla C
Plantilla D
Plantilla E
Plantilla F
Plantilla G
Plantilla H
```

puede convertirse en:

```text
Crear proyecto

Recomendado
[ Proyecto estándar ]

Más opciones
```

No significa ocultar funcionalidades importantes.

Significa priorizar aquello que probablemente necesita la mayoría.

---

## 15. Diseño responsive

Responsive no significa únicamente reducir tamaños.

Una interfaz debería reconsiderar su composición según el espacio disponible.

Desktop:

```text
Sidebar | Contenido | Índice
```

Móvil:

```text
Navbar
Contenido
Índice desplegable
```

No necesariamente:

```text
Sidebar pequeño | Contenido pequeño | Índice pequeño
```

En pantallas pequeñas puede ser necesario:

- ocultar información secundaria;
- cambiar columnas por filas;
- convertir sidebars en drawers;
- aumentar áreas táctiles;
- simplificar navegación.

---

## 16. Diseña primero para el contenido

Evita crear componentes únicamente porque quieres llenar espacio.

Por ejemplo, si una página contiene:

```text
Título
Descripción
3 artículos
```

no necesita obligatoriamente:

```text
hero
estadísticas
4 cards
gráfico
banner
CTA
carousel
```

El contenido debería justificar los componentes.

> [!TIP]
> Una interfaz vacía no siempre necesita más elementos. A veces necesita mejor composición, proporción o espaciado.

---

## 17. Accesibilidad

La accesibilidad forma parte del diseño.

Debes considerar:

- contraste suficiente;
- navegación con teclado;
- focus visible;
- textos alternativos;
- labels;
- tamaños táctiles;
- estructura semántica;
- reduced motion.

Por ejemplo, eliminar completamente el focus:

```css
button:focus {
  outline: none;
}
```

puede dificultar la navegación mediante teclado.

Si cambias el estilo del focus, proporciona una alternativa visible.

---

## 18. Tamaño de objetivos táctiles

En dispositivos táctiles los elementos interactivos no deberían ser demasiado pequeños.

Un botón visualmente pequeño puede tener un área interactiva mayor:

```text
┌──────────────┐
│      ×       │
└──────────────┘
```

en lugar de hacer clic únicamente sobre:

```text
×
```

Esto es especialmente importante para:

- cerrar;
- menus;
- navegación;
- icon buttons;
- controles multimedia.

---

## 19. Animaciones

Las animaciones deberían ayudar a entender cambios.

Buenos usos:

```text
modal aparece
drawer entra
accordion se abre
elemento cambia de estado
```

Evita utilizar movimiento simplemente porque puedes hacerlo.

Una animación normalmente debería ser:

- corta;
- predecible;
- consistente;
- interrumpible;
- respetuosa con `prefers-reduced-motion`.

### Hover

Para interacciones pequeñas:

```text
hover
focus
active
```

CSS suele ser suficiente.

No necesitas una librería de animación para cada cambio de color.

---

## 20. Densidad visual

No todas las aplicaciones necesitan grandes cantidades de espacio vacío.

Una landing comercial puede beneficiarse de:

```text
mucho espacio
grandes titulares
grandes imágenes
```

Mientras que:

```text
dashboard
documentación
IDE
panel administrativo
```

pueden necesitar mayor densidad.

El contexto determina cuánto contenido debe verse simultáneamente.

---

## 21. Diseña sistemas, no pantallas aisladas

Cuando crees una interfaz, piensa en reglas reutilizables.

Por ejemplo:

```text
radius
6px / 8px / 12px

spacing
4 / 8 / 12 / 16 / 24 / 32

border
#262626

surface
#0a0a0a

foreground
#ededed

muted
#a1a1a1
```

Estas reglas pueden convertirse después en **design tokens**.

Esto evita decidir nuevamente:

```text
¿Qué gris utilizo aquí?
¿Qué radius pongo?
¿Cuánto espacio dejo?
```

en cada componente.

---

## 22. No copies estilos sin entenderlos

Puedes inspirarte en interfaces como:

- Apple;
- Linear;
- Vercel;
- GitHub;
- Stripe;
- Notion.

Pero copiar:

```text
blur
glass
gradients
border
shadow
```

sin entender por qué funcionan puede producir una interfaz incoherente.

Analiza primero:

```text
jerarquía
spacing
tipografía
contraste
densidad
navegación
interacción
```

y después los detalles decorativos.

---

## 23. Cómo evitar una interfaz genérica

Una interfaz puede utilizar buenos componentes y aun así sentirse genérica.

Esto suele ocurrir cuando todas las decisiones provienen directamente de una librería:

```text
default card
default button
default modal
default colors
default spacing
```

Puedes construir identidad mediante:

- tipografía;
- composición;
- ritmo;
- iconografía;
- proporciones;
- movimiento;
- tratamiento de imágenes;
- pequeñas decisiones visuales consistentes.

No necesitas añadir:

```text
neon
gradientes
glassmorphism
shadows enormes
```

para tener personalidad.

---

## 24. Menos componentes puede ser mejor

Antes de crear:

```text
<Card>
  <CardHeader>
    <CardTitle />
  </CardHeader>

  <CardBody />

  <CardFooter />
</Card>
```

pregúntate si realmente necesitas una card.

A veces esto:

```text
Título

Descripción

────────────────

Título

Descripción
```

es más claro.

Los componentes visuales deben resolver un problema de organización, interacción o reutilización.

---

## 25. Checklist para revisar una interfaz

Antes de considerar terminada una pantalla, revisa:

### Jerarquía

- ¿Sé inmediatamente qué es lo más importante?
- ¿Existe una acción principal clara?
- ¿Hay demasiados elementos compitiendo?

### Espaciado

- ¿Elementos relacionados están próximos?
- ¿Las secciones se distinguen?
- ¿Existe una escala consistente?

### Tipografía

- ¿Hay demasiados tamaños?
- ¿El texto es legible?
- ¿Las líneas son demasiado largas?

### Consistencia

- ¿Botones iguales funcionan igual?
- ¿Los mismos estados utilizan los mismos estilos?
- ¿Los bordes y radios siguen un sistema?

### Interacción

- ¿Hover y focus existen cuando corresponden?
- ¿El usuario recibe feedback?
- ¿Los estados disabled y loading son claros?

### Responsive

- ¿Funciona en móvil?
- ¿Los elementos táctiles tienen tamaño suficiente?
- ¿Existe overflow horizontal?

### Accesibilidad

- ¿El contraste es suficiente?
- ¿Se puede navegar con teclado?
- ¿El focus es visible?
- ¿Las imágenes tienen texto alternativo?

---

## 26. Orden recomendado al diseñar

Una forma práctica de trabajar es:

```text
1. Contenido
      ↓
2. Jerarquía
      ↓
3. Layout
      ↓
4. Espaciado
      ↓
5. Tipografía
      ↓
6. Componentes
      ↓
7. Colores
      ↓
8. Estados
      ↓
9. Animaciones
      ↓
10. Detalles visuales
```

No empieces necesariamente por:

```text
colores
gradientes
sombras
animaciones
```

porque estarías decorando una estructura que quizá todavía no funciona.

---

## 27. Resumen

Los principios más importantes pueden resumirse en:

```text
Jerarquía
↓
qué importa

Espaciado
↓
qué está relacionado

Alineación
↓
qué pertenece al mismo sistema

Contraste
↓
qué debe destacar

Tipografía
↓
cómo se consume la información

Consistencia
↓
cómo aprende el usuario la interfaz

Feedback
↓
qué acaba de ocurrir

Responsive
↓
cómo se adapta

Accesibilidad
↓
quién puede utilizarla
```

Una buena interfaz no necesita mostrar la mayor cantidad posible de diseño.

Necesita comunicar claramente:

```text
dónde estoy
qué puedo hacer
qué es importante
qué ocurrió después de actuar
```

Los detalles visuales deberían construirse sobre esa base.

## Referencias

Para profundizar, estas son buenas fuentes de referencia sobre diseño de interfaces y experiencia de usuario:

- [**Apple Human Interface Guidelines**](https://developer.apple.com/design/human-interface-guidelines/) — Principios, componentes, interacción y diseño de productos dentro del ecosistema Apple.
- [**Material Design 3**](https://m3.material.io/) — Sistema de diseño de Google con documentación sobre layout, componentes, color, tipografía y estados.
- [**Nielsen Norman Group — 10 Usability Heuristics**](https://www.nngroup.com/articles/ten-usability-heuristics/) — Diez principios clásicos para evaluar la usabilidad de una interfaz.
- [**Nielsen Norman Group — Visual Hierarchy**](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) — Explicación de cómo la jerarquía visual ayuda a comunicar importancia y relaciones.
- [**W3C — Web Content Accessibility Guidelines (WCAG)**](https://www.w3.org/WAI/standards-guidelines/wcag/) — Estándar internacional de referencia para accesibilidad web.
- [**W3C — Understanding WCAG**](https://www.w3.org/WAI/WCAG22/Understanding/) — Explicaciones detalladas de los criterios de WCAG.
- [**web.dev — Accessibility**](https://web.dev/accessibility/) — Guías prácticas de accesibilidad aplicadas al desarrollo web.
- [**MDN — Accessibility**](https://developer.mozilla.org/en-US/docs/Web/Accessibility) — Documentación técnica sobre accesibilidad, HTML semántico, ARIA y comportamiento web.
