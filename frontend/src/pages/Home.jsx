import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const handleCreateClick = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/characters/create');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rpg-card-medieval w-full max-w-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center border-4 border-gold mx-auto">
        {/* Suppression de l'image d'épée */}
        <h1 className="rpg-title-medieval mb-4 text-4xl font-fantasy text-center">Mini RPG</h1>
        <p className="mb-6 text-center text-lg text-parchment">
          <span style={{fontStyle:'italic'}}>Entrez dans un monde d’aventure, de magie et de légendes…</span><br/>
          Créez votre héros, choisissez sa destinée, et écrivez votre propre histoire !
        </p>
      </div>
      <div style={{height:'40px'}}></div>
      <div className="flex gap-4 mt-8">
        <button className="rpg-btn-medieval" onClick={handleCreateClick}>Créer un personnage</button>
        <Link to="/characters" className="rpg-btn-medieval">Voir les héros</Link>
      </div>
    </div>
  );
}
