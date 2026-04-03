interface HeaderProps {
  onScrollToFilters: () => void;
}

export default function Header({ onScrollToFilters }: HeaderProps) {
  return (
    <header className="udea-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="udea-logo mb-2">
              UdeA <span>SEMILLEROS</span>
            </h1>
            <div className="system-title">PORTAL DE SEMILLEROS DE INVESTIGACIÓN</div>
            <p className="text-white opacity-90 mb-2">Vicerrectoría de Investigación - SIGSI</p>
            <span className="sigsi-badge">EXPLORA E INSCRÍBETE</span>
          </div>
          <div className="col-md-4 mt-3 mt-md-0">
            <div className="d-flex flex-wrap justify-content-md-end gap-2 gap-md-3">
              <button className="btn btn-outline-light" onClick={onScrollToFilters}>
                <i className="bi bi-funnel me-1"></i>Filtrar
              </button>
              <a
                href="login.html"
                className="btn btn-light"
                style={{ color: 'var(--udea-verde-oscuro)' }}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>Acceso SIGSI
              </a>
              <a href="registrosemillero3.html" className="btn-crear-semillero">
                <i className="bi bi-plus-circle-fill"></i>Crear Semillero
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
