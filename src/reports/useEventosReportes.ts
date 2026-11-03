import { useEffect, useRef, useState } from 'react';
import { escucharEventosReportes } from '../api/reportesApi';

export type EstadoEventos = 'inactivo' | 'conectando' | 'conectado' | 'error';
export const REINTENTO_MS = 15_000;
const ESPERA_INICIAL_MS = 150_000;

// Detecta también conexiones abiertas sin latidos. Cada intento tiene su propio AbortController.
export function useEventosReportes(token: string | undefined, activo: boolean, onActualizado: () => void): EstadoEventos {
  const [estado, setEstado] = useState<Exclude<EstadoEventos, 'inactivo'>>('conectando');
  const callback = useRef(onActualizado);
  useEffect(() => { callback.current = onActualizado; });

  useEffect(() => {
    if (!activo || !token) return;
    let detenido = false;
    let intento: AbortController;
    let espera: number | undefined;
    let vigilancia: number | undefined;
    let limite = ESPERA_INICIAL_MS;
    const conectar = () => {
      intento = new AbortController();
      let terminado = false;
      const finalizar = (error: boolean) => {
        if (detenido || terminado) return;
        terminado = true;
        window.clearTimeout(vigilancia);
        intento.abort();
        setEstado(error ? 'error' : 'conectando');
        espera = window.setTimeout(conectar, error ? REINTENTO_MS : 1000);
      };
      const latido = () => {
        if (detenido || terminado) return;
        window.clearTimeout(vigilancia);
        vigilancia = window.setTimeout(() => finalizar(true), limite);
      };
      latido();
      escucharEventosReportes(token, evento => {
        if (detenido || terminado) return;
        if (evento.evento === 'conectado') {
          try {
            const ms = JSON.parse(evento.datos).intervaloMs;
            if (typeof ms === 'number' && Number.isFinite(ms) && ms > 0) limite = Math.min(ms * 2 + 30_000, 3_600_000);
          } catch { /* Se conserva el plazo predeterminado. */ }
          setEstado('conectado'); latido();
        }
        if (evento.evento === 'datos-actualizados') { setEstado('conectado'); callback.current(); }
        if (evento.evento === 'error') finalizar(true);
      }, intento.signal, latido).then(() => finalizar(false)).catch(() => finalizar(true));
    };
    conectar();
    return () => { detenido = true; intento.abort(); window.clearTimeout(espera); window.clearTimeout(vigilancia); };
  }, [token, activo]);

  return activo && token ? estado : 'inactivo';
}
