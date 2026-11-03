// Solo decide la navegación; el backend autoriza cada operación.
export type UserRole = 'ADMIN' | 'COORDINADOR' | 'SEMILLERISTA';
export function tokenClaims(token: string): { rol?: unknown; exp?: unknown } | null {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')));
  } catch { return null; }
}
export function tokenRole(token: string): UserRole | null {
  const rol = tokenClaims(token)?.rol;
  return rol === 'ADMIN' || rol === 'COORDINADOR' || rol === 'SEMILLERISTA' ? rol : null;
}
export function isAdminToken(token: string): boolean { return tokenRole(token) === 'ADMIN'; }
export function tokenExpired(token: string): boolean {
  const exp = tokenClaims(token)?.exp;
  return typeof exp === 'number' && exp * 1000 <= Date.now();
}
