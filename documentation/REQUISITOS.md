# Help Desk - Especificacion funcional y tecnica V1

## 1. Objetivo del proyecto

Construir un sistema de mesa de ayuda para gestionar solicitudes de clientes que usan un software SaaS; el sistema debe permitir que los clientes creen tickets, que el equipo interno los consulte, asigne, atienda y cierre, y que todos los eventos principales queden trazables

La version V1 sera un MVP operativo con backend API, frontend administrativo/cliente, autenticacion, gestion de tickets, comentarios, adjuntos, notificaciones por correo, usuarios, categorias, prioridades y exportaciones basicas

## 2. Alcance V1

### Incluido

- Autenticacion con email, password y JWT
- Portal para clientes
- Panel interno para usuarios admin y soporte
- Creacion, consulta, asignacion, seguimiento y cierre de tickets
- Historial de comentarios publicos entre cliente y soporte
- Adjuntos PDF e imagenes usando Cloudinary
- Notificaciones por correo usando Resend
- Gestion de usuarios, categorias y prioridades
- Exportacion de tickets a CSV y Excel
- Paginacion y filtros en listados
- Soft delete general mediante estado interno

### Fuera de alcance V1

- SLA, vencimientos y escalamiento automatico
- Dashboard avanzado de metricas
- Exportacion PDF
- Reapertura de tickets cerrados
- Multiempresa o clientes con multiples usuarios compartiendo tickets
- Asignacion automatica por carga, disponibilidad o reglas
- Notificaciones en tiempo real por WebSocket
- Notas internas privadas
- Aplicacion movil nativa

## 3. Tecnologias

### Backend

- Node.js en la ultima version estable
- TypeScript
- Express.js
- MongoDB
- Mongoose
- JWT para autenticacion
- Cloudinary para adjuntos
- Resend para correos transaccionales
- Programacion funcional cuando aplique sin forzar abstracciones innecesarias

### Frontend

- Vue 3
- Vue Router
- Pinia
- PrimeVue
- Tailwind CSS
- SweetAlert2
- Editor enriquecido para descripcion y comentarios; la idea inicial es usar Summernote.js, pero se debe validar compatibilidad con Vue 3 antes de implementarlo

## 4. Convenciones del proyecto

- El codigo debe estar en ingles: rutas, campos, modelos, controllers, services, DTOs, middlewares y nombres de archivos
- La documentacion funcional, textos visibles al usuario y comentarios necesarios pueden estar en espanol
- La API debe usar JSON para request y response, excepto endpoints de descarga o carga de archivos
- Las fechas deben guardarse en UTC en base de datos
- El frontend debe mostrar fechas en formato legible con dia, mes, anio, hora, minuto y segundo
- No se debe eliminar informacion fisicamente en V1; se usara soft delete o cambio de estado interno

## 5. Roles y permisos

### Client

Usuario cliente del SaaS

Puede:

- Iniciar sesion
- Crear tickets propios
- Consultar solo sus tickets
- Ver el detalle de sus tickets
- Agregar comentarios publicos en sus tickets mientras no esten cerrados
- Adjuntar PDF e imagenes al crear tickets o comentar

No puede:

- Ver tickets de otros clientes
- Asignar tickets
- Cerrar tickets
- Gestionar usuarios, categorias o prioridades
- Exportar listados globales

### Support

Usuario interno encargado de atender tickets

Puede:

- Iniciar sesion
- Consultar tickets
- Ver el detalle de tickets
- Agregar comentarios publicos
- Cerrar tickets registrando una solucion obligatoria
- Ver tickets asignados a el

No puede:

- Asignar o reasignar tickets
- Gestionar usuarios
- Gestionar categorias o prioridades
- Eliminar informacion fisicamente

### Admin

Usuario interno con permisos administrativos

Puede:

- Iniciar sesion
- Consultar todos los tickets
- Crear tickets para clientes si es necesario
- Asignar tickets manualmente a usuarios soporte
- Cerrar tickets registrando una solucion obligatoria
- Gestionar usuarios
- Gestionar categorias
- Gestionar prioridades
- Exportar tickets a CSV y Excel
- Desactivar registros mediante soft delete

No puede:

- Eliminar informacion fisicamente

## 6. Modulo de autenticacion

### Funcionalidades

- Login con email y password
- Emision de access token JWT
- Proteccion de rutas por autenticacion
- Proteccion de rutas por rol
- Hash seguro de password
- Validacion de usuario activo antes de permitir acceso

### Reglas

- El email debe ser unico
- Un usuario inactivo no puede iniciar sesion
- El token debe incluir como minimo `userId` y `role`
- Las rutas protegidas deben rechazar usuarios no autenticados
- Las rutas administrativas deben rechazar roles no autorizados

## 7. Modulo de tickets

### Campos principales

Entidad sugerida: `Ticket`

- `_id`: identificador tecnico automatico de MongoDB
- `ticketNumber`: numero legible y unico generado por el sistema para uso visible del cliente y soporte
- `title`: titulo del ticket
- `categoryId`: referencia a `Category`
- `priorityId`: referencia a `Priority`
- `description`: descripcion enriquecida del problema o solicitud en HTML sanitizado
- `status`: estado operativo del ticket
- `createdBy`: usuario que creo el ticket
- `clientId`: cliente propietario del ticket
- `assignedTo`: usuario soporte asignado, o `null` si esta sin asignar
- `assignedAt`: fecha de asignacion, o `null` si esta sin asignar
- `closedAt`: fecha de cierre, o `null` si no esta cerrado
- `closedBy`: usuario que cerro el ticket, o `null`
- `solution`: solucion del ticket en HTML sanitizado, o `null` mientras el ticket no este cerrado
- `attachments`: no debe llevar lista embebida es simplemente un documento que el usuario carga
- `isActive`: estado interno para soft delete
- `createdAt`: fecha de creacion
- `updatedAt`: fecha de ultima actualizacion

Formato de `ticketNumber`:

- Debe usar el formato `TCK-YYYY-NNNN`
- `TCK` es el prefijo fijo para tickets
- `YYYY` corresponde al anio de creacion del ticket
- `NNNN` corresponde al consecutivo anual con minimo 4 digitos
- Ejemplos validos: `TCK-2026-0001`, `TCK-2026-0600`, `TCK-2026-9999`
- Si el consecutivo anual supera `9999`, puede crecer de forma natural, por ejemplo `TCK-2026-10000`
- El cliente no debe enviar `ticketNumber` al crear tickets


### Estados

El campo `status` debe permitir:

- `open`: ticket creado y pendiente de atencion
- `inProgress`: ticket asignado o en proceso de atencion
- `closed`: ticket cerrado con solucion registrada

Flujo permitido en V1:

- `open` -> `inProgress`
- `open` -> `closed`
- `inProgress` -> `closed`

No se permite reapertura en V1

### Creacion de tickets

Puede crear tickets:

- Un usuario `client` para si mismo
- Un usuario `admin` o `support` en nombre de un cliente

Campos requeridos:

- `title`
- `categoryId`
- `priorityId`
- `description`
- `clientId` cuando el ticket sea creado por un usuario interno

Campos opcionales:

- Adjuntos PDF e imagenes

Reglas:

- Al crear un ticket, el estado inicial debe ser `open`
- Al crear un ticket, `assignedTo`, `assignedAt`, `closedAt`, `closedBy` y `solution` deben iniciar en `null`
- El sistema debe generar un `ticketNumber` unico
- `description` debe guardarse como HTML sanitizado
- Se debe enviar un correo al cliente informando que el ticket fue creado, incluyendo titulo, fecha y categoria

### Consulta de tickets

El listado debe soportar:

- Paginacion
- Filtro por `title`
- Filtro por `categoryId`
- Filtro por `priorityId`
- Filtro por `status`
- Filtro por `assignedTo`
- Ordenamiento por fecha de creacion

El listado debe mostrar:

- `ticketNumber`
- Categoria
- Titulo
- Prioridad
- Estado
- Fecha de creacion
- Fecha de asignacion o texto interno equivalente a "sin asignar"
- Fecha de cierre o texto interno equivalente a "sin cerrar"
- Soporte asignado o texto interno equivalente a "sin asignar"
- Acceso al detalle del ticket

Reglas por rol:

- `client` solo ve sus tickets
- `support` puede ver tickets, priorizando los asignados a el en el frontend
- `admin` puede ver todos los tickets

### Detalle del ticket

El detalle debe mostrar:

- Datos principales del ticket
- Cliente propietario
- Soporte asignado
- Estado actual
- Adjuntos
- Historial de comentarios
- Fechas relevantes
- Solucion registrada si esta cerrado

V1 no incluye historial tecnico de cambios de estado dentro del modelo `Ticket`; el historial visible se cubre con los campos principales, fechas y comentarios

### Asignacion de tickets

Solo `admin` puede asignar tickets

Datos requeridos:

- `ticketId`
- `supportId`

Reglas:

- El usuario asignado debe existir, estar activo y tener rol `support`
- Al asignar un ticket, se debe establecer `assignedTo` y `assignedAt`
- Al asignar un ticket abierto, el estado debe pasar a `inProgress`
- Si el ticket esta `closed`, no se puede asignar
- Se debe enviar un correo al usuario soporte notificando la asignacion

### Cierre de tickets

Pueden cerrar tickets:

- `admin`
- `support`

Datos requeridos:

- `solution`

Reglas:

- La solucion es obligatoria y no puede estar vacia
- La solucion debe guardarse como HTML sanitizado
- Al cerrar, se debe establecer `status` en `closed`
- Al cerrar, se debe establecer `closedAt` y `closedBy`
- Un ticket cerrado no puede recibir nuevos comentarios en V1
- Un ticket cerrado no puede ser reasignado
- Se debe enviar un correo al cliente informando el cierre y la solucion registrada

## 8. Comentarios de ticket

Entidad sugerida: `TicketComment`

Campos:

- `ticketId`: referencia al ticket
- `authorId`: usuario que comenta
- `body`: contenido del comentario
- `attachments`: PDF o imagenes asociadas al comentario
- `isActive`: estado interno para soft delete
- `createdAt`
- `updatedAt`

Reglas:

- Los comentarios son publicos para el cliente propietario, soporte y admin
- `client` solo puede comentar en sus tickets
- `support` y `admin` pueden comentar en tickets visibles para su rol
- No se permiten comentarios en tickets cerrados
- Los comentarios no se eliminan fisicamente

## 9. Adjuntos

Los adjuntos deben almacenarse en Cloudinary y referenciarse desde MongoDB

Metadata minima por archivo:

- `url`: URL del archivo en Cloudinary
- `publicId`: identificador del recurso en Cloudinary
- `resourceType`: tipo de recurso
- `originalName`: nombre original del archivo
- `mimeType`: tipo MIME
- `size`: tamanio en bytes
- `uploadedAt`: fecha de carga
- `uploadedBy`: usuario que cargo el archivo

Tipos permitidos en V1:

- PDF
- Imagenes comunes: JPG, JPEG, PNG y WEBP

Reglas:

- Validar tipo de archivo antes de subir o persistir metadata
- Los archivos pueden asociarse a tickets o comentarios
- No se debe guardar el binario del archivo en MongoDB
- Si falla la carga del archivo, no se debe crear metadata incompleta

## 10. Categorias y prioridades

### Category

Campos sugeridos:

- `name`: puede usar estos valores: `serviceRequest` o `incident`
- `isActive`: boolean para activar o inactivar la categoria

### Priority

Campos sugeridos:

- `name`
- `level`
- `description`
- `isActive`
- `createdAt`
- `updatedAt`

Prioridades iniciales sugeridas:

- `low`
- `medium`
- `high`
- `urgent`

Categorias iniciales sugeridas:

- `serviceRequest`
- `incident`

Reglas:

- Solo `admin` puede crear, editar o desactivar categorias y prioridades
- No se deben eliminar fisicamente
- No se debe permitir crear tickets con categorias o prioridades inactivas
- Si una categoria o prioridad ya esta asociada a tickets, solo se debe desactivar, no borrar

## 11. Usuarios

Entidad sugerida: `User`

Campos:

- `name`
- `email`
- `passwordHash`
- `role`: `client`, `admin` o `support`
- `isActive`
- `createdAt`
- `updatedAt`

Reglas:

- El email debe ser unico
- El password nunca debe almacenarse en texto plano
- Solo `admin` puede gestionar usuarios
- No se deben eliminar usuarios fisicamente
- Un usuario inactivo no puede iniciar sesion
- Un usuario soporte inactivo no puede recibir asignaciones

## 12. Notificaciones por correo

Proveedor: Resend

Eventos V1:

- Ticket creado: correo al cliente
- Ticket asignado: correo al usuario soporte asignado
- Ticket cerrado: correo al cliente

Contenido minimo por evento:

- Ticket creado:
  - Numero del ticket
  - Titulo
  - Categoria
  - Prioridad
  - Fecha de creacion
- Ticket asignado:
  - Numero del ticket
  - Titulo
  - Cliente
  - Prioridad
  - Fecha de asignacion
- Ticket cerrado:
  - Numero del ticket
  - Titulo
  - Solucion
  - Fecha de cierre

Reglas:

- El fallo de envio de correo no debe corromper el ticket
- Los errores de correo deben registrarse para diagnostico
- Las plantillas deben poder mantenerse separadas de la logica principal del ticket

## 13. Exportaciones

Formatos V1:

- CSV
- Excel

Reglas:

- Solo `admin` puede exportar listados globales
- La exportacion debe respetar filtros aplicados
- Los clientes no pueden exportar informacion global
- El contenido exportado debe incluir los campos principales del listado
- PDF queda fuera de alcance V1

## 14. API esperada

Los nombres de rutas, controllers, services y campos deben estar en ingles

### Auth

- `POST /auth/login`: iniciar sesion
- `GET /auth/me`: obtener usuario autenticado

### Tickets

- `POST /tickets`: crear ticket
- `GET /tickets`: listar tickets con filtros y paginacion
- `GET /tickets/:id`: consultar detalle
- `PATCH /tickets/:id`: editar campos permitidos del ticket
- `PATCH /tickets/:id/assign`: asignar ticket a soporte
- `PATCH /tickets/:id/close`: cerrar ticket con solucion

### Ticket comments

- `POST /tickets/:id/comments`: crear comentario
- `GET /tickets/:id/comments`: listar comentarios del ticket

### Catalogs

- `POST /categories`: crear categoria
- `GET /categories`: listar categorias
- `PATCH /categories/:id`: editar categoria
- `PATCH /categories/:id/deactivate`: desactivar categoria
- `POST /priorities`: crear prioridad
- `GET /priorities`: listar prioridades
- `PATCH /priorities/:id`: editar prioridad
- `PATCH /priorities/:id/deactivate`: desactivar prioridad

### Users

- `POST /users`: crear usuario
- `GET /users`: listar usuarios
- `GET /users/:id`: consultar usuario
- `PATCH /users/:id`: editar usuario
- `PATCH /users/:id/deactivate`: desactivar usuario

### Exports

- `GET /exports/tickets.csv`: exportar tickets en CSV
- `GET /exports/tickets.xlsx`: exportar tickets en Excel

## 15. Frontend V1

### Pantallas principales

- Login
- Layout principal con navegacion segun rol
- Listado de tickets con filtros, paginacion y acciones permitidas
- Creacion de ticket
- Detalle de ticket con datos, adjuntos y comentarios
- Asignacion de ticket para admin
- Cierre de ticket con solucion obligatoria
- Gestion de usuarios para admin
- Gestion de categorias para admin
- Gestion de prioridades para admin

### Reglas de experiencia

- El cliente debe ver una experiencia enfocada en crear y seguir sus tickets
- El soporte debe ver con claridad tickets asignados y tickets pendientes
- El admin debe poder operar asignaciones, catalogos, usuarios y exportaciones
- Las acciones no permitidas por rol no deben mostrarse o deben estar bloqueadas
- Las operaciones criticas deben confirmar accion con SweetAlert2
- Los formularios deben validar campos requeridos antes de enviar
- Los errores de API deben mostrarse con mensajes claros

## 16. Criterios de aceptacion V1

- Un cliente puede iniciar sesion, crear un ticket con categoria, prioridad, descripcion y adjuntos permitidos
- Al crear un ticket, el cliente recibe correo por Resend
- Un admin puede listar tickets, filtrar, paginar y ver detalles
- Un admin puede asignar un ticket abierto a un usuario soporte activo
- Al asignar un ticket, el soporte recibe correo por Resend
- Un soporte puede ver el ticket asignado, comentar y cerrar con solucion obligatoria
- Al cerrar un ticket, el cliente recibe correo con la solucion
- Un ticket cerrado no permite nuevos comentarios, reasignacion ni reapertura en V1
- Un admin puede crear, editar y desactivar usuarios, categorias y prioridades
- No se elimina informacion fisicamente; se usa soft delete o estados internos
- Un admin puede exportar tickets filtrados en CSV y Excel
- Un cliente solo puede ver y comentar sus propios tickets

## 17. Pruebas sugeridas

### Backend

- Login correcto e incorrecto
- Rechazo de usuario inactivo
- Proteccion de rutas por JWT
- Proteccion de rutas por rol
- Creacion de ticket por cliente
- Creacion de ticket por usuario interno para un cliente
- Filtros y paginacion de tickets
- Asignacion valida por admin
- Rechazo de asignacion por rol no autorizado
- Rechazo de asignacion a usuario no soporte o inactivo
- Cierre con solucion obligatoria
- Rechazo de comentarios en tickets cerrados
- Upload de PDF e imagenes validos
- Rechazo de tipos de archivo no permitidos
- Exportacion CSV y Excel respetando filtros

### Frontend

- Login y persistencia de sesion
- Navegacion segun rol
- Formularios con validacion
- Listado con filtros y paginacion
- Creacion de ticket con adjuntos
- Detalle con comentarios
- Asignacion por admin
- Cierre con solucion obligatoria
- Gestion de catalogos y usuarios
- Mensajes de exito y error

## 18. Configuracion requerida

Variables de entorno esperadas:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `EMAIL_FROM`

## 19. Pendientes futuros

- SLA y tiempos maximos por prioridad
- Dashboard de metricas
- Exportacion PDF
- Reapertura de tickets
- Notas internas privadas
- Multiempresa con varios usuarios por cliente
- Asignacion automatica
- Notificaciones por comentarios
- Auditoria avanzada de cambios
- Recuperacion de password
