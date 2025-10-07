# Líneas de Estilo - Hotel Llamarada

## 1. Introducción

Este documento define las **líneas de estilo** del proyecto Hotel Llamarada, incluyendo guía de colores, tipografía, elementos de marca, componentes UI, flujos de uso y buenas prácticas.  
Su objetivo es garantizar consistencia visual y de experiencia en todas las interfaces y comunicaciones del hotel.

---

## 2. Paleta de Colores

| Color             | Código / OKLCH          | Uso principal                                    |
| ----------------- | ----------------------- | ------------------------------------------------ |
| Naranja Principal | #F24C3D                 | Botones pricipales, enlaces                      |
| Blanco            | #FFFFFF                 | Fondos principales, textos sobre colores oscuros |
| Negro             | #0A0A0A                 | Texto                                            |
| Gris Claro        | oklch(0.92 0.05 50)     | Fondos de tarjetas, secciones secundarias        |
| Gris Oscuro       | oklch(0.35 0.05 50)     | Texto principal, headers secundarios             |
| Amarillo          | oklch(0.75 0.2 90)      | Alertas / advertencias                           |
| Verde Éxito       | oklch(0.55 0.18 145)    | Alertas de éxito, confirmaciones                 |
| Rojo Destructivo  | oklch(0.57 0.25 27.325) | Alertas de error o acciones destructivas         |
| Secundario        | oklch(0.85 0.08 30)     | Botones secundarios, hover, elementos destacados |
| Acento            | oklch(0.95 0.12 60)     | Destacados, iconos, indicadores                  |

**Notas de uso:**

- Mantener contraste suficiente entre texto y fondo para accesibilidad.
- Rojo Principal y Acentos deben destacar sobre fondos neutros.
- Verde, Amarillo y Destructivo para alertas y feedback del usuario.

---

## 3. Tipografía

- **Fuente principal:** `Inter`, sans-serif
- **Jerarquía:**
  - H1: 36px, Bold
  - H2: 28px, SemiBold
  - H3: 22px, Medium
  - P: 16px, Regular
  - Button: 16px, Medium

**Uso:**

- Títulos importantes y CTAs en negrita.
- Texto secundario en gris oscuro.

---

## 4. Elementos de Marca

- **Logo:**

  - Formato vectorial preferido (SVG).
  - Siempre sobre fondo claro o azul oscuro.
  - No alterar proporciones ni colores del logo.

- **Iconografía:**

  - Estilo lineal, consistente en grosor de línea y tamaño.
  - Usar para botones, servicios, alertas y navegación.

- **Tono visual:**
  - Profesional, acogedor, confiable.
  - Evitar colores estridentes fuera de la paleta.

---

## 5. Componentes UI

### Botones

- **Primario:** Naranja Principal con texto blanco
- **Secundario:** Blanco con borde Secundario
- **Hover/Active:** Intensificar color de fondo o sombra sutil

### Inputs / Formularios

- Bordes redondeados (`border-radius: 0.625rem`)
- Placeholder gris claro
- Estado de error: borde rojo Destructivo (#EF4444) y mensaje debajo

### Tarjetas

- Fondo Gris Claro
- Sombra suave (`box-shadow: 0 2px 6px rgba(0,0,0,0.1)`)
- Contenido con márgenes consistentes

### Alertas / Notificaciones

- **Éxito:** Verde Éxito con texto blanco
- **Error:** Rojo Destructivo con texto blanco
- **Advertencia:** Amarillo con texto negro

---

## 6. Flujos de Uso

- **Registro / Login:** pasos claros, mostrar errores debajo del input.
- **Reserva de habitación:**
  1. Selección de fechas y habitación
  2. Confirmación de disponibilidad
  3. Pago / Confirmación final
- **Navegación:** menú principal visible en todas las páginas
- **Mensajes y feedback:** siempre informar al usuario sobre éxito o error.

---

## 7. Buenas Prácticas

- Mantener consistencia en colores, tipografía y espaciado.
- Evitar saturar de información visual las pantallas.
- Nunca alterar proporciones de logo o iconos.
- Respetar jerarquía de títulos y botones para guiar al usuario.
- Priorizar accesibilidad: contraste suficiente y textos legibles.

---

## 8. Uso Incorrecto

- No usar colores fuera de la paleta principal para elementos clave.
- No rotar, deformar ni recolorear el logo.
- No mezclar tipografías que no sean `Inter`.
- Evitar superponer textos sobre fondos que dificulten su lectura.
