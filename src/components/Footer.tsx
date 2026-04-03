export default function Footer() {
  return (
    <footer className="udea-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-2">© 2026 Universidad de Antioquia - Vicerrectoría de Investigación</p>
            <p className="text-muted small">Portal de Semilleros de Investigación - SIGSI</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end flex-wrap gap-3">
              <a
                href="https://www.udea.edu.co"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                <i className="bi bi-globe me-1" style={{ color: 'var(--udea-verde-principal)' }}></i>
                Portal Institucional
              </a>
              <a href="#" className="text-decoration-none">
                <i
                  className="bi bi-shield-check me-1"
                  style={{ color: 'var(--udea-verde-principal)' }}
                ></i>
                Políticas de seguridad
              </a>
              <a href="#" className="text-decoration-none">
                <i
                  className="bi bi-wrench me-1"
                  style={{ color: 'var(--udea-verde-principal)' }}
                ></i>
                Soporte técnico
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
