import { useState } from 'react';
import type { LoginResponse } from './types';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CaracterizacionPage from './pages/CaracterizacionPage';

type View = 'home' | 'login' | 'caracterizacion';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [auth, setAuth] = useState<LoginResponse | null>(null);

  function handleLoginSuccess(response: LoginResponse) {
    setAuth(response);
    setView('caracterizacion');
  }

  function handleLogout() {
    setAuth(null);
    setView('home');
  }

  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView('home')} />;
  }

  if (view === 'caracterizacion' && auth) {
    return (
      <CaracterizacionPage
        token={auth.token}
        correoCoordinador={auth.correo}
        onLogout={handleLogout}
      />
    );
  }

  return <HomePage onAccesoSigsi={() => setView('login')} />;
}
