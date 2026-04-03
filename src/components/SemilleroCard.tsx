import type { Semillero } from '../types';

interface SemilleroCardProps {
  semillero: Semillero;
  onInscribirse: (semillero: Semillero) => void;
  onVerDetalles: (semillero: Semillero) => void;
}

export default function SemilleroCard({
  semillero,
  onInscribirse,
  onVerDetalles,
}: SemilleroCardProps) {
  return (
    <div className="semillero-card">
      <div className="semillero-header">
        <h3 className="semillero-title">{semillero.nombre}</h3>
        <div>
          <span className="semillero-badge badge-redsin">
            <i className="bi bi-link-45deg me-1"></i>
            {semillero.vinculadoRedSIN === 'Sí' ? 'RedSIN' : 'No RedSIN'}
          </span>
          <span className="semillero-badge badge-area">
            <i className="bi bi-tags me-1"></i>
            {semillero.areaOCDE}
          </span>
        </div>
      </div>

      <div className="semillero-body">
        <div className="info-item">
          <span className="info-label">
            <i className="bi bi-building info-icon"></i>Facultad:
          </span>
          <span className="info-value">{semillero.facultad}</span>
        </div>
        <div className="info-item">
          <span className="info-label">
            <i className="bi bi-geo-alt info-icon"></i>Campus:
          </span>
          <span className="info-value">{semillero.sedeSeccional}</span>
        </div>
        <div className="info-item">
          <span className="info-label">
            <i className="bi bi-calendar-check info-icon"></i>Año creación:
          </span>
          <span className="info-value">{semillero.añoCreacion}</span>
        </div>
        <div className="info-item">
          <span className="info-label">
            <i className="bi bi-people info-icon"></i>Grupo investigación:
          </span>
          <span className="info-value">{semillero.relacionGrupo}</span>
        </div>

        <div className="d-grid mt-4">
          <button className="btn btn-udea" onClick={() => onInscribirse(semillero)}>
            <i className="bi bi-pencil-square me-2"></i>Inscribirse
          </button>
          <button
            className="btn btn-outline-secondary mt-2"
            onClick={() => onVerDetalles(semillero)}
          >
            <i className="bi bi-info-circle me-2"></i>Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}
