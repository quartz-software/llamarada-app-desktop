# GUIDE-dev.md

Guía de desarrollo para proyectos backend con Node.js, Express, Sequelize y Postgres.  
Define el flujo de trabajo, ramas, commits y Pull Requests para mantener un desarrollo organizado y consistente.

---

## Flujo de desarrollo con Gitflow

Se utiliza **Gitflow** con dos ramas principales:

- `main` → Contiene código listo para producción.
- `dev` → Contiene la versión estable en desarrollo.

---

## Ramas temporales

### Feature

- Para nuevas funcionalidades.
- Debe partir de un **issue** en Jira/GitHub con descripción y criterios de aceptación.
- Nombre de la rama: `feature/<descripcion>#<numero>`
  - Ejemplo: `feature/auth-login#152`
- Parte siempre desde `dev`.

### Bugfix

- Para corregir errores detectados en `dev`.
- Nombre de la rama: `bugfix/<descripcion>#<numero>`
  - Ejemplo: `bugfix/fix-login-validation#178`
- Parte desde `dev`.

### Hotfix

- Para corregir errores críticos detectados en producción (`main`).
- Nombre de la rama: `hotfix/<descripcion>#<numero>`
  - Ejemplo: `hotfix/jwt-token-expired#200`
- Parte desde `main`.

### Release

- Preparación de release.
- Nombre de la rama: `release/<version>`
  - Ejemplo: `release/1.2.0`
- No incluye número de issue.
- Parte desde `dev`.
- Merge final hacia `main` y `dev`.

---

## Commits con Conventional Commits

Todos los commits deben seguir la convención **Conventional Commits** y referenciar el número de issue:

```bash
feat(auth-login#152): agregar endpoint de login con JWT
fix(auth-login#152): corregir validación de email
docs(user-api#200): actualizar documentación Swagger
chore: actualizar dependencias
```

feat → Nueva funcionalidad.
fix → Corrección de bug.
docs → Cambios en documentación.
chore → Tareas de mantenimiento o configuración.

---

## Pull Requests (PR)

- Se crean desde la rama temporal hacia `dev`.
- Título del PR debe incluir el número de issue:

```bash
feat(auth-login#152): agregar endpoint de login con JWT
```

- Descripción debe contener:
- Cómo probar los cambios.
- Referencia al issue cerrado: `Closes #<numero>`.
- Revisión obligatoria de endpoints y documentación (Swagger, status codes).

---

## Diferencias Bugfix vs Hotfix

| Tipo   | Rama base | Propósito                               |
| ------ | --------- | --------------------------------------- |
| Bugfix | dev       | Corregir errores en desarrollo          |
| Hotfix | main      | Corregir errores críticos en producción |

---

## Releases

- Se crean a partir de `dev`.
- Nombre de la rama: `release/<version>`
- Ejemplo: `release/1.2.0`
- Merge final hacia `main` y luego `dev`.
- Se asegura que todos los endpoints coincidan con la documentación y status codes.

---

## Nuevas Features

- Cada nueva feature debe estar respaldada por un **issue** en Jira o GitHub.
- El issue debe incluir:
- Descripción clara.
- La rama feature parte desde `dev` y sigue la convención de nombres.
- Validar que cambios de endpoints correspondan con la documentación y status codes.

---

## Validaciones de endpoints y documentación

- Antes de mergear cualquier rama:
- Revisar que endpoints coincidan con Swagger y JSDoc.
- Verificar que los status codes sean correctos: 200, 201, 204, 400, 401, 403, 404, 409, 500.
- Revisar que los valores esperados y tipos estén alineados con Zod/validaciones.
