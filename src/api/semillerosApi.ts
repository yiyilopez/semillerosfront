import type { Semillero, FilterValues, RegistrationFormData } from '../types';
import { semillerosData } from '../data/mockData';

// Simulates network delay
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSemilleros(): Promise<Semillero[]> {
  await delay();
  return semillerosData;
}

export async function filterSemilleros(filters: FilterValues): Promise<Semillero[]> {
  await delay(200);
  const { unidad, area, search } = filters;

  return semillerosData.filter((s) => {
    if (unidad && s.unidadAcademica !== unidad) return false;
    if (area && s.areaOCDE !== area) return false;
    if (search) {
      const haystack = [s.nombre, s.objetivo, s.mision, s.departamento, s.facultad, s.relacionGrupo]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });
}

export async function submitRegistration(
  semillero: Semillero,
  formData: RegistrationFormData
): Promise<void> {
  await delay(600);
  // When a real backend exists, replace the body below with a fetch/axios call.
  console.log('=== SOLICITUD ENVIADA AL COORDINADOR DEL SEMILLERO ===');
  console.log('Destinatario:', semillero.coordinadorEmail);
  console.log('Asunto: Nueva solicitud de inscripción -', semillero.nombre);
  console.log('Datos del estudiante:', {
    nombre: formData.nombreCompleto,
    cedula: formData.cedula,
    correo: formData.correo,
    telefono: formData.telefono,
    facultad: formData.facultad,
    programa: formData.programa,
    institucion: formData.institucion,
    semestre: formData.semestre,
    motivacion: formData.motivacion,
    experiencia: formData.experiencia || 'No especificada',
  });
  console.log('======================================');
}
