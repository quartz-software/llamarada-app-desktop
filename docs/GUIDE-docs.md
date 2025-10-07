# GUIDE-docs.md

Guía de documentación para proyectos de escritorio con Electron, React, Vite y TypeScript.
Define estándares, convenciones y flujos para mantener documentación técnica clara y consistente en todos los módulos (main, preload, renderer).

---

## Estándares de documentación con JSDoc

Todo archivo con lógica (funciones, clases, servicios, hooks, controladores del proceso principal o modelos compartidos) debe documentarse usando **JSDoc**.
El código de UI (componentes React) debe incluir comentarios solo donde haya lógica relevante, no en renderizado trivial.

Usar **tipos de TypeScript** para definir estructuras de datos, y `@typedef` si el tipo no puede expresarse directamente.

### Ejemplo: Función utilitaria (renderer o preload)

```ts
/**
 * Convierte un string en formato título (primera letra mayúscula).
 * @param str - Texto a transformar.
 * @returns Texto con mayúscula inicial.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

---

### Ejemplo: Servicio en el proceso principal (main)

```ts
import { BrowserWindow } from "electron";

/**
 * Servicio para gestionar la ventana principal de la aplicación.
 */
export class WindowService {
  /**
   * Crea una nueva ventana principal.
   * @returns Instancia de BrowserWindow.
   */
  static createMainWindow(): BrowserWindow {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: `${__dirname}/preload.js`,
      },
    });
    return win;
  }
}
```

---

### Ejemplo: Hook en React (renderer)

```ts
/**
 * Hook que detecta el tema de color del sistema operativo.
 * @returns `"dark"` o `"light"` según la preferencia del usuario.
 */
export function useSystemTheme(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  // ...
  return theme;
}
```

## Generación de documentación

La documentación se genera solo para archivos **TypeScript**, excluyendo directorios de compilación.

```bash
npx jsdoc -c jsdoc.json
```

---

### Flujo de actualización de documentación

1. Detectar cambios en lógica o servicios.
2. Actualizar comentarios JSDoc.
3. Regenerar documentación:

```bash
npx jsdoc -c jsdoc.json
```

4. Revisar los resultados en docs/jsdoc/index.html.

## Revisión de documentación en Code Review

Checklist obligatorio:

- [ ] Todo nuevo servicio, hook o clase está documentado con JSDoc.
- [ ] Tipos e interfaces actualizados en src/shared si se modifican.
- [ ] Los módulos principales (main, preload, renderer) tienen encabezados descriptivos.
- [ ] npx jsdoc -c jsdoc.json genera la documentación sin errores.
- [ ] No se incluyen rutas de build (dist, .vite, etc.) en la documentación.
