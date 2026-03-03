import { useState } from 'react';
import { createCharacter } from '../services/characterApi';
import { useNavigate } from 'react-router-dom';

export default function CharacterCreate() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [race, setRace] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createCharacter({ name, className, race, description });
      setSuccess(true);
      setTimeout(() => navigate('/characters'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="rpg-card-medieval p-8 mt-8">
      <h2 className="rpg-title-medieval mb-4 text-2xl">Créer un personnage</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="rpg-input" type="text" placeholder="Nom du personnage" value={name} onChange={e => setName(e.target.value)} required />
        <select className="rpg-input" value={className} onChange={e => setClassName(e.target.value)} required>
          <option value="">Classe</option>
          <option>Guerrier</option>
          <option>Magicien</option>
          <option>Voleur</option>
          <option>Prêtre</option>
        </select>
        <select className="rpg-input" value={race} onChange={e => setRace(e.target.value)} required>
          <option value="">Race</option>
          <option>Humain</option>
          <option>Elfe</option>
          <option>Nain</option>
          <option>Orc</option>
        </select>
        <textarea className="rpg-input" placeholder="Description ou histoire" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        <button className="rpg-btn-medieval mt-4" type="submit">Créer</button>
        {error && <div className="text-gold mt-2">{error}</div>}
        {success && <div className="text-gold mt-2">Personnage créé ! Redirection...</div>}
      </form>
    </div>
  );
}
