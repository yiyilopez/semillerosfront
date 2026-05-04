import { useState } from 'react';

interface Props {
  onSave: () => void;
  onPrev: () => void;
  saving: boolean;
}

export default function TabRelacionamiento({ onSave, onPrev, saving }: Props) {
  const [adscrito, setAdscrito] = useState('');
  const [grupo, setGrupo] = useState('');
  const [relacionGrupo, setRelacionGrupo] = useState('');
  const [centro, setCentro] = useState('');
  const [relacionCentro, setRelacionCentro] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [relacionDept, setRelacionDept] = useState('');
  const [facultad, setFacultad] = useState('');
  const [relacionFacultad, setRelacionFacultad] = useState('');

  return (
    <div>
      <div className="p-2 rounded mb-3 fw-semibold text-white small" style={{ background: 'linear-gradient(135deg, var(--udea-verde-principal), var(--udea-verde-oscuro))' }}>
        🤝 Relacionamiento
      </div>

      {/* Grupo de investigación */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>¿Adscrito a grupo de investigación?</label>
          <div className="p-2 rounded d-flex gap-3" style={{ background: 'var(--udea-gris-claro)' }}>
            {['si', 'no'].map(v => (
              <label key={v} className="d-flex align-items-center gap-1 small" style={{ cursor: 'pointer' }}>
                <input type="radio" name="adscrito" value={v} checked={adscrito === v}
                  onChange={() => setAdscrito(v)} style={{ accentColor: 'var(--udea-verde-principal)' }} />
                {v === 'si' ? 'Sí' : 'No'}
              </label>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Grupo de investigación</label>
          <input type="text" className="form-control form-control-sm" placeholder="Nombre o código del grupo"
            value={grupo} onChange={e => setGrupo(e.target.value)} disabled={adscrito !== 'si'} />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Relación con el grupo</label>
          <input type="text" className="form-control form-control-sm" placeholder="Ej. Reuniones mensuales"
            value={relacionGrupo} onChange={e => setRelacionGrupo(e.target.value)} disabled={adscrito !== 'si'} />
        </div>
      </div>

      {/* Centro de investigaciones */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Centro de investigaciones</label>
          <input type="text" className="form-control form-control-sm" placeholder="Nombre del centro"
            value={centro} onChange={e => setCentro(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Relación con el centro</label>
          <input type="text" className="form-control form-control-sm" placeholder="NE"
            value={relacionCentro} onChange={e => setRelacionCentro(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Departamento</label>
          <input type="text" className="form-control form-control-sm" placeholder="Ej. Antropología"
            value={departamento} onChange={e => setDepartamento(e.target.value)} />
        </div>
      </div>

      {/* Facultad */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Relación con el departamento</label>
          <input type="text" className="form-control form-control-sm" placeholder="NE"
            value={relacionDept} onChange={e => setRelacionDept(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Facultad</label>
          <input type="text" className="form-control form-control-sm" placeholder="Ej. Ingeniería"
            value={facultad} onChange={e => setFacultad(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold" style={{ color: 'var(--udea-verde-oscuro)' }}>Relación con la facultad</label>
          <input type="text" className="form-control form-control-sm" placeholder="NE"
            value={relacionFacultad} onChange={e => setRelacionFacultad(e.target.value)} />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4 pt-3" style={{ borderTop: '1px solid var(--udea-gris)' }}>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onPrev}>← Anterior</button>
        <button type="button" className="btn btn-sm fw-semibold px-4"
          style={{ background: 'linear-gradient(135deg, var(--udea-verde-principal), var(--udea-verde-oscuro))', color: 'white' }}
          onClick={onSave} disabled={saving}>
          {saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
          Guardar y Continuar →
        </button>
      </div>
    </div>
  );
}
