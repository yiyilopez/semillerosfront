import type { SemilleroResumen } from '../types';
import SemilleroCard from './SemilleroCard';

interface SemilleroListProps {
  semilleros: SemilleroResumen[];
  loading: boolean;
  onInscribirse: (id: number, nombre: string) => void;
  onVerDetalles: (id: number) => void;
}

export default function SemilleroList({
  semilleros,
  loading,
  onInscribirse,
  onVerDetalles,
}: SemilleroListProps) {
  if (loading) {
    return (
      <div className="col-12 text-center py-5">
        <div className="spinner-border" style={{ color: 'var(--udea-verde-principal)' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3" style={{ color: 'var(--udea-gris-oscuro)' }}>
          Cargando semilleros...
        </p>
      </div>
    );
  }

  if (semilleros.length === 0) {
    return (
      <div className="col-12">
        <div className="filter-card text-center py-5">
          <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--udea-gris)' }}></i>
          <h4 className="mt-3">No se encontraron semilleros</h4>
          <p className="text-muted">Intenta con otros criterios de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {semilleros.map((semillero) => (
        <div key={semillero.id} className="col-12 col-md-6 col-lg-4">
          <SemilleroCard
            semillero={semillero}
            onInscribirse={onInscribirse}
            onVerDetalles={onVerDetalles}
          />
        </div>
      ))}
    </>
  );
}
