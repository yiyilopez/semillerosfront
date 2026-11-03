import '../styles/admin.css';

// No se consulta el alcance ADMIN/COORDINADOR: el backend todavía no ofrece datos anonimizados.
export default function SemilleristaPage({ reportes, correo, onReports, onBack, onLogout }: {
  reportes: boolean; correo: string; onReports: () => void; onBack: () => void; onLogout: () => void;
}) {
  return <div className="admin-dashboard">
    <header className="udea-header"><div className="container d-flex justify-content-between flex-wrap gap-3">
      <div><div className="udea-logo">UdeA <span>SIGSI</span></div><span className="sigsi-badge">SEMILLERISTA</span></div>
      <div className="d-flex align-items-center gap-2 flex-wrap"><span>{correo}</span>
        <button className="btn btn-outline-light" onClick={reportes ? onBack : onReports}>{reportes ? '← Volver al panel' : 'Reportes'}</button>
        <button className="btn btn-outline-light" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </div></header>
    <main className="container admin-main"><section className="admin-card">
      <h1>{reportes ? 'Estadísticas generales' : 'Panel del semillerista'}</h1>
      <p role="status">Las estadísticas para semilleristas aún no están disponibles. Aquí podrás consultar información general y anonimizada cuando se habilite este acceso.</p>
    </section></main>
  </div>;
}
