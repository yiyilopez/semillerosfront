# Portal de Semilleros de Investigación - UdeA

Frontend del portal de semilleros de la Universidad de Antioquia, desarrollado como parte del proyecto SIGSI (Sistema de Gestión de Semilleros de Investigación) de la Vicerrectoría de Investigación.

## ¿De qué trata esto?

Este proyecto es la interfaz web para que estudiantes puedan consultar los semilleros de investigación activos de la UdeA, ver sus detalles y solicitar inscripción.

## Tecnologías usadas

- **React 19** con **TypeScript**
- **Vite** como bundler
- **Bootstrap 5** para los estilos y componentes (modales, tooltips, etc.)
- **Bootstrap Icons** para los íconos

## Estructura del proyecto

```
src/
├── api/
│   └── semillerosApi.ts      # acá van las llamadas al backend (por ahora mock)
├── data/
│   └── mockData.ts           # datos de prueba de semilleros
├── types/
│   └── index.ts              # tipos de TypeScript
├── styles/
│   └── udea.css              # estilos propios con la paleta de la UdeA
├── components/
│   ├── Header.tsx
│   ├── FiltersSection.tsx
│   ├── SemilleroCard.tsx
│   ├── SemilleroList.tsx
│   ├── DetailsModal.tsx      # modal con info completa del semillero
│   ├── RegistrationModal.tsx # formulario de inscripción en 3 pasos
│   └── Footer.tsx
├── pages/
│   └── HomePage.tsx          # página principal, acá vive todo el estado
└── App.tsx
```

## Cómo correr el proyecto

Primero instalar dependencias (si no lo has hecho):

```bash
npm install
```

Levantar el servidor de desarrollo:

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173`

Para hacer el build de producción:

```bash
npm run build
```

## Funcionalidades actuales

- Listado de semilleros con tarjetas
- Filtros por Unidad Académica, Área OCDE y búsqueda por texto
- Modal de detalles con toda la información del semillero
- Formulario de inscripción en 3 pasos con validación
- Estados de carga y error

## Pendiente / Próximos pasos

- [ ] Conectar con el backend real (el archivo `src/api/semillerosApi.ts` ya está listo para eso, solo hay que cambiar los mocks por llamadas `fetch`)
- [ ] Autenticación con cuenta institucional
- [ ] Página de login (`login.html` referenciada en el header)
- [ ] Formulario de creación de semillero (`registrosemillero3.html`)
- [ ] Paginación en la lista de semilleros

## Notas

El archivo `src/api/semillerosApi.ts` simula delays de red para que se pueda ver el spinner de carga. Cuando haya backend real, cada función async se reemplaza por un `fetch` a la API correspondiente sin tener que tocar los componentes.
