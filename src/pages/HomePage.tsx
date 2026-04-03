import { useEffect, useRef, useState } from 'react';
import type { Semillero, FilterValues } from '../types';
import { getSemilleros, filterSemilleros } from '../api/semillerosApi';
import Header from '../components/Header';
import FiltersSection from '../components/FiltersSection';
import SemilleroList from '../components/SemilleroList';
import DetailsModal from '../components/DetailsModal';
import RegistrationModal from '../components/RegistrationModal';
import Footer from '../components/Footer';

export default function HomePage() {
  const [semilleros, setSemilleros] = useState<Semillero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [detailsSemillero, setDetailsSemillero] = useState<Semillero | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [registrationSemillero, setRegistrationSemillero] = useState<Semillero | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const filtersSectionRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    getSemilleros()
      .then(setSemilleros)
      .catch(() => setError('No se pudo cargar la lista de semilleros.'))
      .finally(() => setLoading(false));
  }, []);

  // Filter handler
  async function handleFilter(filters: FilterValues) {
    setLoading(true);
    setError(null);
    try {
      const results = await filterSemilleros(filters);
      setSemilleros(results);
    } catch {
      setError('Error al aplicar los filtros.');
    } finally {
      setLoading(false);
    }
  }

  // Modal handlers
  function handleVerDetalles(semillero: Semillero) {
    setDetailsSemillero(semillero);
    setShowDetails(true);
  }

  function handleInscribirse(semillero: Semillero) {
    setRegistrationSemillero(semillero);
    setShowRegistration(true);
  }

  function scrollToFilters() {
    filtersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header onScrollToFilters={scrollToFilters} />

      <main className="container py-4">
        {/* Intro + stats */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="filter-card">
              <h2 className="filter-title">Portal de Semilleros de Investigación</h2>
              <p className="mb-3">
                Bienvenido al portal de semilleros de investigación de la Universidad de Antioquia.
                Aquí podrás explorar todos los semilleros activos, conocer sus objetivos, áreas de
                investigación y realizar tu inscripción para participar en ellos.
              </p>
              <div className="row">
                <div className="col-md-4 col-6">
                  <div className="stats-card">
                    <div className="stat-number">318</div>
                    <div className="stat-label">Semilleros Activos</div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="stats-card">
                    <div className="stat-number">5350</div>
                    <div className="stat-label">Semilleristas</div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="stats-card">
                    <div className="stat-number">100</div>
                    <div className="stat-label">Actividades científicas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4" ref={filtersSectionRef}>
          <div className="col-12">
            <FiltersSection onFilter={handleFilter} />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {/* Semillero list */}
        <div className="row">
          <SemilleroList
            semilleros={semilleros}
            loading={loading}
            onInscribirse={handleInscribirse}
            onVerDetalles={handleVerDetalles}
          />
        </div>
      </main>

      <Footer />

      <DetailsModal
        semillero={detailsSemillero}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onInscribirse={handleInscribirse}
      />

      <RegistrationModal
        semillero={registrationSemillero}
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </>
  );
}
