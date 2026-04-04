# Portal de Semilleros de Investigación - UdeA

Frontend del portal de semilleros de la Universidad de Antioquia, desarrollado como parte del proyecto SIGSI (Sistema de Gestión de Semilleros de Investigación) de la Vicerrectoría de Investigación.

## ¿De qué trata esto?

Interfaz web para que estudiantes puedan consultar los semilleros de investigación activos de la UdeA, ver sus detalles y solicitar inscripción. 

## Tecnologías usadas

- **React 19** con **TypeScript**
- **Vite** como bundler
- **Bootstrap 5** para los estilos y componentes (modales, tooltips, etc.)
- **Bootstrap Icons** para los íconos

## Estructura del proyecto

```
src/
├── api/
│   └── semillerosApi.ts      
├── types/
│   └── index.ts              
├── styles/
│   └── udea.css              
├── components/
│   ├── Header.tsx
│   ├── FiltersSection.tsx    
│   ├── SemilleroCard.tsx
│   ├── SemilleroList.tsx
│   ├── DetailsModal.tsx      
│   ├── RegistrationModal.tsx 
│   └── Footer.tsx
├── pages/
│   └── HomePage.tsx          
└── App.tsx
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto (ya incluido):

```env
VITE_API_BASE_URL=http://localhost:8080
```

Cambia la URL si el backend corre en otro host o puerto.

## Cómo correr el proyecto

> El backend debe estar corriendo antes de iniciar el frontend.

```bash
npm install
npm run dev
```

Abre el navegador en `http://localhost:5173`

Para el build de producción:

```bash
npm run build
```

## Endpoints del backend consumidos

| Método | Endpoint | Uso |
|--------|----------|-----|
| `GET` | `/api/v1/semilleros` | Listado paginado (params: `pagina`, `tamano`, `idUnidad`, `idCampus`, `idArea`, `q`) |
| `GET` | `/api/v1/semilleros/{id}` | Detalle de un semillero |
| `POST` | `/api/v1/inscripciones` | Enviar solicitud de inscripción |
| `GET` | `/api/v1/filtros/unidades-academicas` | Opciones del dropdown Unidad Académica |
| `GET` | `/api/v1/filtros/campus` | Opciones del dropdown Campus |
| `GET` | `/api/v1/filtros/areas-ocde` | Opciones del dropdown Área OCDE |

## Funcionalidades

- Listado paginado de semilleros con tarjetas
- Filtros por Unidad Académica, Área OCDE, Campus y búsqueda por texto (cargados desde el backend)
- Modal de detalles con toda la información del semillero (carga bajo demanda)
- Formulario de inscripción en 3 pasos con validación y manejo de errores del backend
- Paginación de resultados
- Estados de carga y error en todas las operaciones
