import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import type { Semillero } from '../types';

interface DetailsModalProps {
  semillero: Semillero | null;
  isOpen: boolean;
  onClose: () => void;
  onInscribirse: (semillero: Semillero) => void;
}

export default function DetailsModal({
  semillero,
  isOpen,
  onClose,
  onInscribirse,
}: DetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Modal | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    instanceRef.current = new Modal(modalRef.current, { backdrop: true });
    modalRef.current.addEventListener('hidden.bs.modal', onClose);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!instanceRef.current) return;
    if (isOpen) {
      instanceRef.current.show();
    } else {
      instanceRef.current.hide();
    }
  }, [isOpen]);

  if (!semillero) return null;

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content modal-udea">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-info-circle me-2"></i>
              {semillero.nombre}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label">Facultad:</span>
                  <span className="info-value">{semillero.facultad}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Departamento:</span>
                  <span className="info-value">{semillero.departamento}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Campus:</span>
                  <span className="info-value">{semillero.sedeSeccional}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Año creación:</span>
                  <span className="info-value">{semillero.añoCreacion}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Área OCDE:</span>
                  <span className="info-value">{semillero.areaOCDE}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Sub-área OCDE:</span>
                  <span className="info-value">{semillero.subareaOCDE}</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label">Vinculado RedSIN:</span>
                  <span className="info-value">{semillero.vinculadoRedSIN}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Código grupo:</span>
                  <span className="info-value">{semillero.codigoGrupo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Grupo investigación:</span>
                  <span className="info-value">{semillero.relacionGrupo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Centro investigación:</span>
                  <span className="info-value">{semillero.centroInvestigacion}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">ODS principal:</span>
                  <span className="info-value">{semillero.odsPrincipal}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Coordinador semillero:</span>
                  <span className="info-value">{semillero.coordinadorEmail}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h6>Misión</h6>
              <p className="text-muted">{semillero.mision}</p>

              <h6 className="mt-3">Visión</h6>
              <p className="text-muted">{semillero.vision}</p>

              <h6 className="mt-3">Objetivo principal</h6>
              <p className="text-muted">{semillero.objetivo}</p>

              <h6 className="mt-3">Líneas de investigación</h6>
              <p className="text-muted">{semillero.lineasInvestigacion}</p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-udea"
              onClick={() => {
                onClose();
                onInscribirse(semillero);
              }}
            >
              <i className="bi bi-pencil-square me-2"></i>Inscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
