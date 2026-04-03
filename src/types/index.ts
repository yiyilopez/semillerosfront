export interface Semillero {
  id: number;
  nombre: string;
  vinculadoRedSIN: 'Sí' | 'No';
  añoCreacion: number;
  unidadAcademica: string;
  sedeSeccional: string;
  areaOCDE: string;
  subareaOCDE: string;
  odsPrincipal: string;
  codigoGrupo: number;
  relacionGrupo: string;
  centroInvestigacion: string;
  departamento: string;
  facultad: string;
  mision: string;
  vision: string;
  objetivo: string;
  coordinadorEmail: string;
  lineasInvestigacion: string;
}

export interface RegistrationFormData {
  nombreCompleto: string;
  cedula: string;
  correo: string;
  telefono: string;
  facultad: string;
  programa: string;
  institucion: string;
  semestre: string;
  motivacion: string;
  experiencia: string;
  aceptoTerminos: boolean;
}

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormData, string>>;

export interface FilterValues {
  unidad: string;
  area: string;
  campus: string;
  search: string;
}
