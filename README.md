# Portal de Semilleros de Investigación - UdeA

Frontend de SIGSI (Sistema de Gestión de Semilleros de Investigación) de la Vicerrectoría de Investigación de la Universidad de Antioquia. Permite consultar semilleros, gestionar su caracterización y asistencia, y analizar reportes del programa.

- [Repositorio frontend](https://github.com/yiyilopez/semillerosfront)
- [Repositorio backend](https://github.com/AndresT3086/semilleros-udea)

## Tecnologías

React 19, TypeScript, Vite 8, Bootstrap 5 y Bootstrap Icons. Las pruebas usan Vitest y Testing Library; el análisis estático usa ESLint.

## Ejecución local

Requiere Node.js compatible con Vite 8 (`^20.19.0 || >=22.12.0`), npm y el backend con su base de datos y migraciones configuradas. Consulta el repositorio del backend para preparar ese servicio.

```bash
git clone https://github.com/yiyilopez/semillerosfront.git
cd semillerosfront
npm ci
```

Crea `.env.local` en la raíz del frontend:

```env
VITE_API_BASE_URL=http://localhost:8080
```

La variable contiene la URL base del backend, sin el sufijo `/api/v1`. Si no se configura, se usa `http://localhost:8080`. Las variables `VITE_*` son públicas en el navegador: no deben contener secretos.

Con el backend disponible, ejecuta:

```bash
npm run dev
```

Abre la dirección indicada por Vite, normalmente `http://localhost:5173`. El backend debe permitir ese origen mediante CORS. Reinicia Vite cuando cambies las variables de entorno.

### Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Ejecutar las pruebas una vez |
| `npm run lint` | Analizar el código con ESLint |
| `npm run build` | Comprobar TypeScript y generar `dist/` |
| `npm run preview` | Servir localmente el build generado |

Para desplegar, configura `VITE_API_BASE_URL` antes de ejecutar `npm run build` y publica el contenido de `dist/`. `npm run preview` sirve para revisar el build localmente.

## Perfiles y acceso

| Perfil | Funcionalidad |
| --- | --- |
| Público | Listado, filtros, detalle de semilleros y solicitud de inscripción |
| Coordinador | Sus semilleros, caracterización, inscripciones pendientes, sesiones, asistencia y reportes de su alcance |
| Administrador | Panel administrativo, solicitudes de acceso, invitaciones, reportes globales y exportación |
| Semillerista | Navegación preparada con aviso de estadísticas pendientes; todavía sin consulta de reportes |

El inicio de sesión usa captcha matemático y JWT. El frontend reconoce los roles explícitos `ADMIN`, `COORDINADOR` y `SEMILLERISTA`; un rol desconocido no obtiene acceso al panel de coordinador. La autorización de los datos corresponde al backend.

También existen flujos para solicitar acceso, verificar el correo y activar una cuenta mediante enlaces con token. El envío de esos correos depende de la configuración del backend.

La sesión se conserva en `sessionStorage`, solicita confirmación al cerrar sesión y avisa dos minutos antes del límite de 30 minutos de inactividad. También se controla el vencimiento del token cuando incluye `exp`. El formulario de login permite mostrar u ocultar la contraseña.

## Funcionalidades

### Consulta y caracterización

- Listado público paginado con búsqueda y filtros por unidad académica, campus y área OCDE.
- Detalle del semillero y formulario de inscripción.
- Panel del coordinador con selección de semillero y gestión de inscripciones pendientes.
- Caracterización en siete pestañas: General, Organización, Producción, Actividades, Relacionamiento, ODS y DOFA.
- Guardado y finalización de la caracterización, con acceso a reportes desde el flujo.

### Sesiones y asistencia

El coordinador puede crear, consultar, editar y eliminar sesiones fechadas de sus semilleros, y registrar asistentes como presentes, ausentes o excusados.

Las actividades realizadas en los reportes requieren eventos fechados. Marcar una categoría en la pestaña de caracterización no equivale a registrar una sesión realizada.

El porcentaje de asistencia se calcula como `presentes / (presentes + ausentes) × 100`; los excusados no forman parte del denominador. Cuando no existen registros, la interfaz muestra la ausencia de información en lugar de asumir una asistencia de cero.

### Reportes

Los reportes consultan el backend según el alcance del administrador o coordinador. Incluyen:

- KPIs de semilleros activos, usuarios registrados, actividades realizadas y participación, con tendencias cuando el backend las proporciona.
- Distribución por unidad académica, estudiantes por unidad y distribución por campus.
- Composición por sexo y rol, con cantidades y porcentajes.
- Facultades con mayor presencia, evolución anual, actividades por tipo y resumen de asistencia.
- Tabla de rendimiento por semillero con paginación y ordenamiento mediante API.
- Gráficos interactivos que permiten seleccionar una unidad o campus para consultar su segmento.

Los filtros incluyen año completo o semestre, tipo de unidad, unidad académica, campus y semillero. Se envían como parámetros de consulta, se reflejan en la URL y se conservan en la sesión al navegar entre panel y reportes. Se limpian al cambiar o cerrar la sesión.

El acceso directo `?vista=reportes` requiere autenticación. Las consultas muestran estados de carga, error y ausencia de datos. El dashboard y la tabla se actualizan juntos; si falla la actualización, se conserva el último resultado completo y se informa el error.

### Exportación, impresión y actualización

- El administrador puede descargar reportes en Excel (`xlsx`), PDF y CSV generados por el backend con los filtros y orden aplicados.
- La vista permite imprimir con estilos específicos que ocultan los controles de navegación.
- La exportación y el botón de impresión se deshabilitan durante la carga o ante errores de actualización.
- La notificación de descarga exitosa desaparece automáticamente; los errores pueden cerrarse manualmente.
- Los reportes del administrador escuchan cambios mediante Server-Sent Events (SSE), con reconexión y detección de conexiones sin actividad.
- Una consulta periódica de respaldo permite elegir intervalos de 1, 5 o 10 minutos; el valor inicial es 5 minutos.
- La actualización manual sigue disponible. Solo se anuncia éxito cuando se han recibido tanto el dashboard como la tabla.

## Integración con el backend

Las rutas siguientes son relativas a `VITE_API_BASE_URL`. Las operaciones protegidas envían `Authorization: Bearer <token>`.

### Consulta pública y autenticación

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `/api/v1/semilleros` | Listado público paginado |
| `GET` | `/api/v1/semilleros/{id}` | Detalle |
| `POST` | `/api/v1/inscripciones` | Solicitud de inscripción |
| `GET` | `/api/v1/filtros/unidades-academicas` | Catálogo de unidades |
| `GET` | `/api/v1/filtros/campus` | Catálogo de campus |
| `GET` | `/api/v1/filtros/areas-ocde` | Catálogo de áreas |
| `GET` | `/api/v1/auth/captcha-math` | Captcha |
| `POST` | `/api/v1/auth/login` | Inicio de sesión |
| `POST` | `/api/v1/solicitudes-acceso` | Solicitar acceso |
| `POST` | `/api/v1/solicitudes-acceso/verificar` | Verificar correo |
| `POST` | `/api/v1/cuenta/activar` | Activar cuenta |

### Coordinación y administración

| Método | Ruta | Uso |
| --- | --- | --- |
| `POST` | `/api/v1/coordinador/semilleros/iniciar` | Iniciar caracterización |
| `GET` | `/api/v1/coordinador/semilleros/mis-semilleros` | Semilleros del coordinador |
| `GET` | `/api/v1/coordinador/semilleros/{id}` | Detalle para coordinación |
| `GET`, `PATCH` | `/api/v1/coordinador/semilleros/{id}/pestana/{pestana}` | Consultar y guardar caracterización |
| `POST` | `/api/v1/coordinador/semilleros/{id}/finalizar` | Finalizar caracterización |
| `GET`, `POST` | `/api/v1/coordinador/semilleros/{id}/sesiones` | Listar y crear sesiones |
| `GET`, `PUT`, `DELETE` | `/api/v1/coordinador/semilleros/sesiones/{idSesion}` | Consultar, editar y eliminar una sesión |
| `GET` | `/api/v1/coordinador/semilleros/{id}/asistencia/integrantes` | Integrantes y asistencia |
| `GET` | `/api/v1/admin/solicitudes-acceso` | Solicitudes de acceso por estado |
| `GET` | `/api/v1/admin/solicitudes-acceso/resumen` | Resumen de solicitudes |
| `POST` | `/api/v1/admin/solicitudes-acceso/{id}/aprobar` | Aprobar solicitud |
| `POST` | `/api/v1/admin/solicitudes-acceso/{id}/rechazar` | Rechazar solicitud |
| `POST` | `/api/v1/admin/invitaciones` | Invitar coordinador |

### Reportes

`{base}` es `/api/v1/admin/reportes` o `/api/v1/coordinador/reportes`, según el rol.

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `{base}/dashboard` | KPIs y distribuciones |
| `GET` | `{base}/rendimiento` | Tabla paginada y ordenada |
| `GET` | `{base}/semilleros` | Opciones de semilleros para el filtro |
| `GET` | `/api/v1/admin/reportes/exportar` | Archivo Excel, PDF o CSV |
| `GET` | `/api/v1/admin/reportes/eventos` | Flujo SSE de cambios |

Parámetros de filtrado: `periodo` (`2025`, `2025-1` o `2025-2`, por ejemplo), `tipoUnidad`, `idUnidad`, `idCampus` e `idSemillero`. Los filtros vacíos se omiten. La tabla agrega `pagina`, `tamano`, `orden` y `direccion`; la exportación agrega `formato`, `orden` y `direccion`.

Los contratos y tipos completos están en [src/api](src/api).

## Estructura del proyecto

```text
src/
├── api/                 # Clientes de semilleros, accesos, asistencia y reportes
├── auth/                # Interpretación y validación de roles
├── components/
│   ├── admin/           # Componentes del panel administrativo
│   ├── caracterizacion/ # Pestañas de caracterización
│   └── reportes/        # KPIs, gráficos, filtros y tabla
├── pages/               # Vistas públicas y paneles por rol
├── reports/             # Persistencia de filtros y conexión SSE
├── styles/              # Estilos institucionales, administración e impresión
├── types/               # Tipos compartidos
└── App.tsx              # Navegación, sesión y acceso según rol
```

Las pruebas se encuentran junto a los módulos y componentes en archivos `*.test.ts` y `*.test.tsx`.

## Dependencias y pendientes del backend

- **Acceso del semillerista:** falta habilitar el rol y un contrato de estadísticas generales anonimizadas. La pantalla actual informa que no están disponibles y no consulta los endpoints de administrador o coordinador.
- **Históricos:** las series y tendencias dependen de la información histórica que entregue el backend. Usar el estado actual y las fechas de creación no permite reconstruir todos los cambios de estado de períodos anteriores.
- **Actualización en vivo:** queda pendiente que el servidor comunique explícitamente sus errores internos del flujo SSE y detecte todos los cambios relevantes. El frontend dispone de reconexión, detección de inactividad y consulta periódica de respaldo.
- **Datos de actividades y asistencia:** deben existir sesiones fechadas y sus registros de asistencia para obtener métricas reales. Las categorías de caracterización no sustituyen esos registros.

Para verificar una instalación completa, además de las pruebas del frontend, comprueba con el backend desplegado el login, los permisos por rol, los filtros, el registro de sesiones, las descargas y la recepción de eventos SSE. Las pruebas con respuestas simuladas no sustituyen esa validación de integración.
