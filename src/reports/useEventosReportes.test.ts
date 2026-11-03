import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { escucharEventosReportes } from '../api/reportesApi';
import { REINTENTO_MS, useEventosReportes } from './useEventosReportes';

vi.mock('../api/reportesApi', () => ({ escucharEventosReportes: vi.fn() }));
beforeEach(() => { vi.useFakeTimers(); vi.resetAllMocks(); });
afterEach(() => vi.useRealTimers());

it('reintenta la conexión tras un error y vuelve a conectarse', async () => {
  vi.mocked(escucharEventosReportes).mockRejectedValueOnce(new Error('offline'))
    .mockImplementationOnce((_token, onEvento) => { onEvento({ evento: 'conectado', datos: '{}' }); return new Promise(() => {}); });
  const { result } = renderHook(() => useEventosReportes('tok', true, () => {}));
  await act(async () => { await Promise.resolve(); });
  expect(result.current).toBe('error');
  await act(async () => { vi.advanceTimersByTime(REINTENTO_MS); });
  expect(escucharEventosReportes).toHaveBeenCalledTimes(2);
  expect(result.current).toBe('conectado');
});

it('se reconecta cuando el servidor cierra el flujo y se detiene al desmontar', async () => {
  vi.mocked(escucharEventosReportes).mockResolvedValueOnce(undefined).mockReturnValue(new Promise(() => {}));
  const { unmount } = renderHook(() => useEventosReportes('tok', true, () => {}));
  await act(async () => { await Promise.resolve(); vi.advanceTimersByTime(1_000); });
  expect(escucharEventosReportes).toHaveBeenCalledTimes(2);
  const signal = vi.mocked(escucharEventosReportes).mock.calls[1][2];
  unmount();
  expect(signal.aborted).toBe(true);
});

it('no se conecta si está inactivo o no hay token', () => {
  const { result } = renderHook(() => useEventosReportes(undefined, true, () => {}));
  expect(result.current).toBe('inactivo');
  expect(escucharEventosReportes).not.toHaveBeenCalled();
});

it('detecta un flujo sin latidos, aborta y reintenta sin duplicar conexiones', async () => {
  vi.mocked(escucharEventosReportes).mockImplementation((_token, emitir) => {
    emitir({ evento: 'conectado', datos: '{"intervaloMs":60000}' }); return new Promise(() => {});
  });
  const { result, unmount } = renderHook(() => useEventosReportes('tok', true, () => {}));
  const signal = vi.mocked(escucharEventosReportes).mock.calls[0][2];
  act(() => vi.advanceTimersByTime(150_000));
  expect(result.current).toBe('error');
  expect(signal.aborted).toBe(true);
  act(() => vi.advanceTimersByTime(REINTENTO_MS));
  expect(escucharEventosReportes).toHaveBeenCalledTimes(2);
  expect(result.current).toBe('conectado');
  unmount();
});
it('renueva la vigilancia al recibir un latido y propaga errores enviados por el servidor', () => {
  let latido = () => {};
  let emitir: (evento: { evento: string; datos: string }) => void = () => {};
  vi.mocked(escucharEventosReportes).mockImplementation((_token, callback, _signal, actividad) => {
    latido = actividad!; emitir = callback; callback({ evento: 'conectado', datos: '{}' }); return new Promise(() => {});
  });
  const { result } = renderHook(() => useEventosReportes('tok', true, () => {}));
  act(() => { vi.advanceTimersByTime(100_000); latido(); vi.advanceTimersByTime(100_000); });
  expect(result.current).toBe('conectado');
  act(() => emitir({ evento: 'error', datos: '{}' }));
  expect(result.current).toBe('error');
});
