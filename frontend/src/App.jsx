import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CharactersList from './pages/CharactersList.jsx';
import CharacterCreate from './pages/CharacterCreate.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import UsersList from './pages/UsersList.jsx';
import UserProfile from './pages/UserProfile.jsx';
import './style.css';

function AppNav({ isLogged, setIsLogged, userRole }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('tokenChange'));
    setIsLogged(false);
    navigate('/');
  };
  return (
    <nav className="flex gap-8 justify-center py-4 w-full bg-parchment border-b-2 border-gold font-fantasy text-lg">
      <Link to="/" className="rpg-btn-medieval rpg-btn-nav">Accueil</Link>
      {!isLogged && <Link to="/login" className="rpg-btn-medieval rpg-btn-nav">Connexion</Link>}
      {!isLogged && <Link to="/register" className="rpg-btn-medieval rpg-btn-nav">Inscription</Link>}
      {isLogged && <Link to="/characters" className="rpg-btn-medieval rpg-btn-nav">Mes héros</Link>}
      {isLogged && userRole === 'admin' && <Link to="/users" className="rpg-btn-medieval rpg-btn-nav">Utilisateurs</Link>}
      {isLogged && <Link to="/user" className="rpg-btn-medieval rpg-btn-nav">Mon profil</Link>}
      {isLogged && <button className="rpg-btn-medieval rpg-btn-nav" onClick={handleLogout}>Déconnexion</button>}
    </nav>
  );
}

export default function App() {
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const syncLogin = () => {
      const token = localStorage.getItem('token');
      setIsLogged(!!token);
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || null);
        } catch {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };
    window.addEventListener('storage', syncLogin);
    window.addEventListener('tokenChange', syncLogin);
    syncLogin();
    return () => {
      window.removeEventListener('storage', syncLogin);
      window.removeEventListener('tokenChange', syncLogin);
    };
  }, []);
  return (
    <BrowserRouter>
      <AppNav isLogged={isLogged} setIsLogged={setIsLogged} userRole={userRole} />
      <main className="flex flex-col items-center justify-center min-h-[80vh] w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/create" element={<CharacterCreate />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </main>
      <footer className="mt-8 text-gold text-xs text-center font-fantasy w-full bg-parchment py-2 border-t-2 border-gold">Mini RPG &copy; 2026 - Parchemin & Dragons</footer>
    </BrowserRouter>
  );
}
