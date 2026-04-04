import type {
  FiltroItem,
  FilterValues,
  InscripcionFormData,
  PageResponse,
  SemilleroDetalle,
  SemilleroResumen,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

// El backend envuelve todas las respuestas en ApiResponse<T> { exitoso, mensaje, datos, ... }
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.mensaje ?? `Error ${res.status}`);
  }
  const json = await res.json();
  return json.datos ?? json;
}

export async function getSemilleros(
  filters: FilterValues,
  pagina = 0,
  tamano = 15
): Promise<PageResponse<SemilleroResumen>> {
  const params = new URLSearchParams({
    pagina: String(pagina),
    tamano: String(tamano),
  });
  if (filters.idUnidad) params.set('idUnidad', filters.idUnidad);
  if (filters.idCampus) params.set('idCampus', filters.idCampus);
  if (filters.idArea) params.set('idArea', filters.idArea);
  if (filters.q) params.set('q', filters.q);
  return apiFetch<PageResponse<SemilleroResumen>>(`/api/v1/semilleros?${params}`);
}

export async function getSemilleroById(id: number): Promise<SemilleroDetalle> {
  return apiFetch<SemilleroDetalle>(`/api/v1/semilleros/${id}`);
}

export async function submitInscripcion(
  idSemillero: number,
  formData: InscripcionFormData
): Promise<void> {
  await apiFetch('/api/v1/inscripciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idSemillero, ...formData }),
  });
}

export async function getUnidades(): Promise<FiltroItem[]> {
  return apiFetch<FiltroItem[]>('/api/v1/filtros/unidades-academicas');
}

export async function getCampus(): Promise<FiltroItem[]> {
  return apiFetch<FiltroItem[]>('/api/v1/filtros/campus');
}

export async function getAreasOcde(): Promise<FiltroItem[]> {
  return apiFetch<FiltroItem[]>('/api/v1/filtros/areas-ocde');
}
