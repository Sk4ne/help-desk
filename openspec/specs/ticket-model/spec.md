# Especificacion ticket-model

## Purpose
Establece el contrato persistente del modelo `Ticket`, sus identificadores, estados, relaciones principales y campos operativos de ciclo de vida

## Requirements

### Requirement: Contrato del documento Ticket disponible
El sistema SHALL exponer un contrato persistente `Ticket` con identidad tecnica MongoDB, numero visible de ticket, relaciones principales, estado operativo y fechas de ciclo de vida

#### Scenario: Modelo Ticket importado por codigo de aplicacion
- **WHEN** el codigo de la aplicacion importa el modelo `Ticket`
- **THEN** el modelo esta disponible como modelo Mongoose tipado
- **AND** el contrato TypeScript del documento esta disponible desde `src/interfaces/ticket/`

#### Scenario: Ticket almacena identificadores tecnicos y visibles
- **WHEN** un documento `Ticket` existe en MongoDB
- **THEN** MongoDB proporciona `_id` como identificador tecnico automatico
- **AND** el documento contiene `ticketNumber` como referencia visible generada por el sistema

### Requirement: Formato de numero de ticket representado
El sistema SHALL representar `ticketNumber` como string con formato `TCK-YYYY-NNNN` para uso visible del cliente y soporte

#### Scenario: Numero de ticket sigue el formato visible esperado
- **WHEN** un ticket tiene numero visible asignado
- **THEN** el valor usa el prefijo `TCK`
- **AND** incluye el anio de creacion con cuatro digitos
- **AND** incluye un consecutivo anual con minimo cuatro digitos

#### Scenario: Numero de ticket supera el consecutivo anual de cuatro digitos
- **WHEN** el consecutivo anual supera `9999`
- **THEN** el formato permite crecimiento natural del consecutivo
- **AND** un valor como `TCK-2026-10000` sigue siendo valido

### Requirement: Estado de Ticket restringido a estados del workflow V1
El sistema SHALL definir los estados permitidos de ticket como `open`, `inProgress` y `closed`

#### Scenario: Constantes de estado de ticket reutilizadas
- **WHEN** el modelo `Ticket` define el campo `status`
- **THEN** el campo usa la constante literal compartida de estados permitidos
- **AND** el alias TypeScript de estado se deriva de esa constante

#### Scenario: Ciclo de vida de Ticket inicia open
- **WHEN** se instancia un ticket sin estado explicito
- **THEN** el estado inicial por defecto es `open`

### Requirement: Ticket referencia documentos de dominio relacionados
El sistema SHALL tipar las relaciones del ticket con `Types.ObjectId`

#### Scenario: Ticket almacena identificadores de relacion requeridos
- **WHEN** un documento `Ticket` representa una solicitud
- **THEN** `categoryId` referencia `Category`
- **AND** `priorityId` referencia `Priority`
- **AND** `createdBy` referencia el usuario que creo el ticket
- **AND** `clientId` referencia el cliente propietario

#### Scenario: Ticket almacena relaciones operativas nullables
- **WHEN** un ticket no esta asignado ni cerrado
- **THEN** `assignedTo` es `null`
- **AND** `closedBy` es `null`

### Requirement: Campos de asignacion y cierre de Ticket son nullables antes de usarse
El sistema SHALL inicializar los campos operativos de asignacion, cierre y solucion en `null` cuando aun no aplican

#### Scenario: Ticket inicia sin datos de asignacion ni cierre
- **WHEN** se crea una instancia de ticket nueva
- **THEN** `assignedTo` inicia en `null`
- **AND** `assignedAt` inicia en `null`
- **AND** `closedAt` inicia en `null`
- **AND** `closedBy` inicia en `null`
- **AND** `solution` inicia en `null`

### Requirement: Campos de contenido de Ticket soportan HTML sanitizado
El sistema SHALL representar `description` y `solution` como strings pensados para HTML sanitizado

#### Scenario: Ticket almacena contenido enriquecido de descripcion
- **WHEN** un ticket contiene descripcion
- **THEN** `description` se almacena como string
- **AND** el contrato documenta que el contenido debe llegar sanitizado desde la capa correspondiente

#### Scenario: Ticket almacena contenido de solucion de cierre
- **WHEN** un ticket cerrado contiene solucion
- **THEN** `solution` se almacena como string
- **AND** el contrato permite `null` mientras el ticket no esta cerrado

### Requirement: Schema de Ticket sigue los limites de validacion del repositorio
El sistema SHALL mantener validaciones de campos requeridos y reglas de negocio fuera del modelo Mongoose

#### Scenario: Schema de Ticket creado
- **WHEN** se define el schema Mongoose de `Ticket`
- **THEN** no usa `required: true`
- **AND** no usa `unique: true`
- **AND** usa `{ timestamps: true }` para `createdAt` y `updatedAt`

### Requirement: Modelo Ticket excluye metadata embebida de adjuntos en V1
El sistema SHALL mantener el modelo `Ticket` sin una lista embebida de metadata de adjuntos en V1

#### Scenario: Schema de Ticket inspeccionado para adjuntos
- **WHEN** se revisa el schema `Ticket`
- **THEN** no contiene un arreglo embebido de metadata Cloudinary
- **AND** la gestion de documentos cargados queda fuera de este modelo
