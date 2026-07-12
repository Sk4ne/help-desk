## Context

El proyecto ya tiene infraestructura Express, TypeScript estricto y conexion MongoDB, pero no tiene modelos de dominio implementados

La especificacion funcional define `Ticket` como entidad central del MVP de mesa de ayuda y ya fija los campos definitivos para V1

## Goals / Non-Goals

**Goals:**

- Crear el contrato TypeScript del documento `Ticket`
- Crear constantes y alias tipados para los estados del ticket
- Crear el modelo Mongoose `Ticket` con referencias `ObjectId`
- Alinear el schema con las reglas del repositorio: sin `required: true`, sin `unique: true` y con `{ timestamps: true }`
- Dejar `ticketNumber` como campo visible generado por el sistema, sin implementar aun la generacion del consecutivo

**Non-Goals:**

- No crear endpoints ni controladores de tickets
- No crear validadores `express-validator`
- No crear swagger
- No implementar carga de adjuntos ni persistencia de metadata de archivos
- No implementar generacion atomica del consecutivo `TCK-YYYY-NNNN`
- No implementar auditoria de cambios de estado

## Decisions

1. Separar interface, alias y modelo

   Rationale: el repositorio exige interfaces en `src/interfaces/<module>/` y aliases en `src/typeAlias/<module>/`

   Alternatives considered: definir tipos dentro del modelo; se descarta porque rompe las reglas de organizacion del proyecto

2. Definir estados con constante literal reutilizable

   Rationale: `open`, `inProgress` y `closed` deben tener una sola fuente de verdad para modelo, validadores futuros y swagger futuro

   Alternatives considered: repetir strings en el schema; se descarta porque facilita inconsistencias

3. Usar `Types.ObjectId` para referencias

   Rationale: `categoryId`, `priorityId`, `createdBy`, `clientId`, `assignedTo` y `closedBy` son referencias Mongo y deben tiparse explicitamente

   Alternatives considered: usar `string`; se descarta porque debilita el contrato Mongoose y contradice las convenciones del proyecto

4. Mantener campos de asignacion y cierre como nullable

   Rationale: un ticket recien creado inicia sin soporte asignado, sin cierre y sin solucion

   Alternatives considered: omitir los campos hasta que ocurran eventos; se descarta porque complica respuestas consistentes y filtros futuros

5. No modelar adjuntos embebidos en `Ticket`

   Rationale: los requisitos actuales indican que `attachments` no debe ser una lista embebida de metadata dentro del ticket

   Alternatives considered: guardar metadata Cloudinary embebida; se descarta para respetar la decision actual del requisito

## Risks / Trade-offs

- `ticketNumber` existe sin generacion automatica en este cambio -> la creacion real de tickets debera implementar un helper o servicio de consecutivos antes de exponer el endpoint
- No usar `required: true` en el schema deja validacion estructural para capas futuras -> los validadores de request deberan cubrir campos obligatorios
- No incluir adjuntos en `Ticket` retrasa la relacion final con archivos -> el cambio de adjuntos debera definir su propio modelo o referencia
- No declarar `unique: true` en `ticketNumber` evita reglas de schema prohibidas por el repo -> si se requiere indice unico, debera resolverse con una decision explicita de indices fuera de validaciones de modelo
