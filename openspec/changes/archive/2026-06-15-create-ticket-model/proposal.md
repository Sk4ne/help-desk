## Why

El modulo de tickets necesita un contrato de datos estable antes de implementar controladores, validadores y flujos operativos

Este cambio define el modelo Mongoose `Ticket` con los campos definitivos documentados para V1, incluyendo identidad tecnica, numero visible, relaciones principales, estados y fechas de asignacion/cierre

## What Changes

- Crear el modelo `Ticket` con tipado TypeScript explicito y schema Mongoose
- Definir `_id` como identificador tecnico automatico de MongoDB
- Definir `ticketNumber` como referencia visible generada por el sistema con formato `TCK-YYYY-NNNN`
- Definir referencias a `Category`, `Priority` y `User` mediante `Types.ObjectId`
- Definir estados permitidos `open`, `inProgress` y `closed`
- Definir campos nullable para asignacion, cierre y solucion
- Usar `{ timestamps: true }` para `createdAt` y `updatedAt`
- Mantener validaciones de negocio y campos requeridos fuera del modelo
- No crear endpoints, controladores, validadores, swagger ni logica de carga de adjuntos en este cambio

## Capabilities

### New Capabilities

- `ticket-model`: contrato persistente del documento `Ticket`, sus campos, estados y relaciones principales

### Modified Capabilities

- None

## Impact

- `src/models/`: nuevo modelo Mongoose `Ticket`
- `src/interfaces/`: nueva interfaz compartida para el documento `Ticket`
- `src/enums/`: constantes reutilizables para estados de ticket
- `src/typeAlias/`: alias derivado para estados de ticket
- Futuras capacidades de tickets, comentarios, adjuntos, notificaciones y exportaciones dependeran de este contrato
