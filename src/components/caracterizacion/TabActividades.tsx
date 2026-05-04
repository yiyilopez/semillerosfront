import { useState } from 'react';

interface Props {
  onSave: () => void;
  onPrev: () => void;
  saving: boolean;
}

type Resp = 'si' | 'no' | '';

export default function TabActividades({ onSave, onPrev, saving }: Props) {
  const [clubes, setclubes] = useState<Resp>('');
  const [seminarios, setSeminarios] = useState<Resp>('');
  const [salidas, setSalidas] = useState<Resp>('');
  const [talleres, setTalleres] = useState<Resp>('');
  const [conversatorios, setConversatorios] = useState<Resp>('');
  const [jornadas, setJornadas] = useState<Resp>('');
  const [redColsi, setRedColsi] = useState<Resp>('');
  const [ponNac, setPonNac] = useState<Resp>('');
  const [ponInt, setPonInt] = useState<Resp>('');

  function RadioRow({ label, value, onChange }: { label: string; value: Resp; onChange: (v: Resp) => void }) {
    return (
      <tr>
        <td className="small py-2 pe-4">{label}</td>
        <td className="text-center" style={{ width: 60 }}>
          <input type="radio" name={label} checked={value === 'si'} onChange={() => onChange('si')}
            style={{ accentColor: 'var(--udea-verde-principal)' }} />
        </td>
        <td className="text-center" style={{ width: 60 }}>
          <input type="radio" name={label} checked={value === 'no'} onChange={() => onChange('no')}
            style={{ accentColor: 'var(--udea-verde-principal)' }} />
        </td>
      </tr>
    );
  }

  const tableHead = (
    <thead>
      <tr>
        <th className="small fw-semibold py-2" style={{ color: 'var(--udea-verde-oscuro)', background: 'var(--udea-gris-claro)' }}>Actividad</th>
        <th className="text-center small fw-semibold" style={{ background: 'var(--udea-gris-claro)', width: 60 }}>Sí</th>
        <th className="text-center small fw-semibold" style={{ background: 'var(--udea-gris-claro)', width: 60 }}>No</th>
      </tr>
    </thead>
  );

  return (
    <div>
      <div className="p-2 rounded mb-3 fw-semibold text-white small" style={{ background: 'linear-gradient(135deg, var(--udea-verde-principal), var(--udea-verde-oscuro))' }}>
        🔬 Actividades de Investigación
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <p className="small fw-semibold mb-2" style={{ color: 'var(--udea-verde-oscuro)' }}>Actividades formativas</p>
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.85rem' }}>
              {tableHead}
              <tbody>
                <RadioRow label="Clubes de Revista" value={clubes} onChange={setclubes} />
                <RadioRow label="Seminarios" value={seminarios} onChange={setSeminarios} />
                <RadioRow label="Salidas de campo" value={salidas} onChange={setSalidas} />
                <RadioRow label="Talleres" value={talleres} onChange={setTalleres} />
                <RadioRow label="Conversatorios" value={conversatorios} onChange={setConversatorios} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <p className="small fw-semibold mb-2" style={{ color: 'var(--udea-verde-oscuro)' }}>Socialización y difusión</p>
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.85rem' }}>
              {tableHead}
              <tbody>
                <RadioRow label="Jornadas Universitarias" value={jornadas} onChange={setJornadas} />
                <RadioRow label="Eventos RedCOLSI" value={redColsi} onChange={setRedColsi} />
                <RadioRow label="Ponencias Nacionales" value={ponNac} onChange={setPonNac} />
                <RadioRow label="Ponencias Internacionales" value={ponInt} onChange={setPonInt} />
              </tbody>
            </table>
          </div>
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
