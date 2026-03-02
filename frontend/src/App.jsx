import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CharactersList from './pages/CharactersList.jsx';
import CharacterCreate from './pages/CharacterCreate.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import UsersList from './pages/UsersList.jsx';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 justify-center py-4 w-full bg-parchment border-b-2 border-gold font-fantasy text-lg">
        <Link to="/" className="rpg-btn-medieval">Accueil</Link>
        <Link to="/login" className="rpg-btn-medieval">Connexion</Link>
        <Link to="/register" className="rpg-btn-medieval">Inscription</Link>
        <Link to="/characters" className="rpg-btn-medieval">Personnages</Link>
        <Link to="/users" className="rpg-btn-medieval">Utilisateurs</Link>
      </nav>
      <main className="flex flex-col items-center justify-center min-h-[80vh] w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/create" element={<CharacterCreate />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </main>
      <footer className="mt-8 text-gold text-xs text-center font-fantasy w-full bg-parchment py-2 border-t-2 border-gold">Mini RPG &copy; 2026 - Parchemin & Dragons</footer>
    </BrowserRouter>
  );
}
