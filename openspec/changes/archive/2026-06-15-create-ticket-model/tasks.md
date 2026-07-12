## 1. Contratos de tipos

- [x] 1.1 Crear `src/enums/ticket/` y definir una constante literal exportada `TICKET_STATUS_VALUES` con `open`, `inProgress` y `closed`
- [x] 1.2 Crear `src/typeAlias/ticket/` y definir `TicketStatus` a partir de `typeof TICKET_STATUS_VALUES[number]`
- [x] 1.3 Crear `src/interfaces/ticket/` y definir `ITicket` con campos explicitos para el documento `Ticket`
- [x] 1.4 Tipar todos los ids de relaciones de ticket con `Types.ObjectId`
- [x] 1.5 Tipar los campos operativos nullables como `Types.ObjectId | null`, `Date | null` o `string | null` segun corresponda

## 2. Implementacion del modelo

- [x] 2.1 Crear `src/models/Ticket.ts`
- [x] 2.2 Definir un schema Mongoose tipado con `ITicket`
- [x] 2.3 Agregar campos escalares para `ticketNumber`, `title`, `description`, `status`, `solution` e `isActive`
- [x] 2.4 Agregar campos de referencia para `categoryId`, `priorityId`, `createdBy`, `clientId`, `assignedTo` y `closedBy`
- [x] 2.5 Agregar campos de fecha para `assignedAt` y `closedAt`
- [x] 2.6 Configurar valores por defecto para `status`, `isActive`, `assignedTo`, `assignedAt`, `closedAt`, `closedBy` y `solution`
- [x] 2.7 Usar los valores compartidos de estado de ticket en el enum del schema
- [x] 2.8 Usar `{ timestamps: true }` y no definir manualmente `createdAt` ni `updatedAt`
- [x] 2.9 No agregar `required: true`, `unique: true` ni metadata embebida de adjuntos al schema de `Ticket`
- [x] 2.10 Exportar el modelo `Ticket` usando el patron existente de nombres PascalCase para modelos

## 3. Verificacion

- [x] 3.1 Ejecutar `npx tsc --noEmit`
- [x] 3.2 Confirmar que el modelo `Ticket` compila sin `any`, imports sin usar ni type assertions
- [x] 3.3 Confirmar que el cambio no agrega routes, controllers, validators ni archivos swagger
