// Respuesta resumida del listado de semilleros
export interface SemilleroResumen {
  id: number;
  codigo: string;
  nombre: string;
  siglas: string;
  facultad: string;
  campus: string;
  anioCreacion: number;
  grupoInvestigacion: string;
  totalSemilleristas: number;
  totalActividadesCientificas: number;
  estado: string;
}

// Respuesta detallada de un semillero individual
export interface SemilleroDetalle {
  id: number;
  codigo: string;
  nombre: string;
  siglas: string;
  correoSemillero: string;
  telefono: string;
  anioCreacion: number;
  mision: string;
  vision: string;
  objetivo: string;
  lineasInvestigacion: string;
  palabrasClave: string;
  grupoInvestigacion: string;
  facultad: string;
  campus: string;
  areaOcde: string;
  estado: string;
  totalSemilleristas: number;
  totalActividadesCientificas: number;
}

// Item genérico para filtros (unidades, campus, áreas OCDE)
export interface FiltroItem {
  id: number;
  nombre: string;
  siglas: string;
}

// Respuesta paginada del backend
export interface PageResponse<T> {
  contenido: T[];
  paginaActual: number;
  tamano: number;
  totalElementos: number;
  totalPaginas: number;
  esUltimaPagina: boolean;
  esPrimeraPagina: boolean;
}

// Datos del formulario de inscripción (mapeados a InscripcionRequest del backend)
export interface InscripcionFormData {
  nombres: string;
  apellidos: string;
  cedula: string;
  correo: string;
  telefono: string;
  programa: string;
  semestre: string;
  motivacion: string;
  aceptaTerminos: boolean;
}

export type InscripcionFormErrors = Partial<Record<keyof InscripcionFormData, string>>;

// Filtros de búsqueda (usan IDs para enviar al backend)
export interface FilterValues {
  idUnidad: string;
  idArea: string;
  idCampus: string;
  q: string;
}
