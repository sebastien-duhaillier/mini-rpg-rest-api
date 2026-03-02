import { Link } from 'react-router-dom';
import swordImg from '../assets/images/vecteezy_medieval-sword-icon_.jpg';

export default function Home() {
  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rpg-card-medieval w-full max-w-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center border-4 border-gold mx-auto">
        <img src={swordImg} alt="Épée médiévale" style={{width:90, marginBottom:24, filter:'drop-shadow(0 0 8px #eebc1d)'}} />
        <h1 className="rpg-title-medieval mb-4 text-4xl font-fantasy text-center">Mini RPG</h1>
        <p className="mb-6 text-center text-lg text-parchment">
          <span style={{fontStyle:'italic'}}>Entrez dans un monde d’aventure, de magie et de légendes…</span><br/>
          Créez votre héros, choisissez sa destinée, et écrivez votre propre histoire !
        </p>
      </div>
      <div style={{height:'40px'}}></div>
      <div className="flex gap-4 mt-8">
        <Link to="/characters/create" className="rpg-btn-medieval">Créer un personnage</Link>
        <Link to="/characters" className="rpg-btn-medieval">Voir les héros</Link>
      </div>
    </div>
  );
}
