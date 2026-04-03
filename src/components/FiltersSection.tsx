import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'bootstrap';
import type { FilterValues } from '../types';

interface FiltersSectionProps {
  onFilter: (filters: FilterValues) => void;
}

export default function FiltersSection({ onFilter }: FiltersSectionProps) {
  const [filters, setFilters] = useState<FilterValues>({
    unidad: '',
    area: '',
    campus: '',
    search: '',
  });

  // Initialize Bootstrap tooltips
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const tooltipEls = sectionRef.current.querySelectorAll('[data-bs-toggle="tooltip"]');
    const instances = Array.from(tooltipEls).map(
      (el) => new Tooltip(el)
    );
    return () => instances.forEach((t) => t.dispose());
  }, []);

  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div ref={sectionRef} id="filters-section">
      <div className="filter-card">
        <h2 className="filter-title">Consultar semilleros</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">
              Unidad Académica{' '}
              <i
                className="bi bi-question-circle-fill help-icon"
                data-bs-toggle="tooltip"
                title="Facultad, escuela o instituto al que pertenece el semillero. Ej: Facultad de Ciencias Económicas, Facultad de Ingeniería."
              ></i>
            </label>
            <select
              className="form-select"
              value={filters.unidad}
              onChange={(e) => handleChange('unidad', e.target.value)}
            >
              <option value="">Todas las unidades</option>
              <option value="Facultad de Ciencias Económicas">
                Facultad de Ciencias Económicas
              </option>
              <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
              <option value="Facultad de Ciencias Exactas">Facultad de Ciencias Exactas</option>
              <option value="Facultad de Ciencias Sociales">Facultad de Ciencias Sociales</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Área OCDE{' '}
              <i
                className="bi bi-question-circle-fill help-icon"
                data-bs-toggle="tooltip"
                title="Clasificación según la Organización para la Cooperación y el Desarrollo Económicos (OCDE). Agrupa las disciplinas científicas en grandes áreas del conocimiento."
              ></i>
            </label>
            <select
              className="form-select"
              value={filters.area}
              onChange={(e) => handleChange('area', e.target.value)}
            >
              <option value="">Todas las áreas</option>
              <option value="Ciencias sociales">Ciencias sociales</option>
              <option value="Ciencias naturales">Ciencias naturales</option>
              <option value="Ingeniería y tecnología">Ingeniería y tecnología</option>
              <option value="Ciencias médicas">Ciencias médicas</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Campus</label>
            <select
              className="form-select"
              value={filters.campus}
              onChange={(e) => handleChange('campus', e.target.value)}
            >
              <option value="">Medellín</option>
              <option value="">El Carmen de Viboral (Oriente)</option>
              <option value="">Urabá (Apartadó/Turbo)</option>
              <option value="">Caucasia (Bajo Cauca)</option>
              <option value="">Andes (Suroeste)</option>
              <option value="">Santa Fe de Antioquia (Occidente)</option>
              <option value="">Puerto Berrío (Magdalena Medio)</option>
              <option value="">Sonsón</option>
              <option value="">Amalfi</option>
              <option value="">Segovia</option>
              <option value="">Yarumal</option>
            </select>
          </div>

          <div className="col-md-8">
            <label className="form-label">Buscar por nombre o palabra clave</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: finanzas, investigación, tecnología..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onFilter(filters)}
            />
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-udea w-100" onClick={() => onFilter(filters)}>
              <i className="bi bi-search me-2"></i>Buscar Semilleros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
