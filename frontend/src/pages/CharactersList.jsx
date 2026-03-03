import { useEffect, useState } from 'react';
import { getItemsByCharacter } from '../services/itemApi';
import { getSpellsByCharacter } from '../services/spellApi';

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState({}); // { [charId]: [items] }
  const [spells, setSpells] = useState({}); // { [charId]: [spells] }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => {
        setError('Non authentifié');
        setLoading(false);
      }, 0);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      fetch(`http://localhost:3000/users/${userId}/characters`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(async chars => {
          setCharacters(chars);
          // Charger les items et spells pour chaque personnage
          const itemsObj = {};
          const spellsObj = {};
          for (const char of chars) {
            try {
              itemsObj[char.id] = await getItemsByCharacter(char.id);
            } catch {
              itemsObj[char.id] = [];
            }
            try {
              spellsObj[char.id] = await getSpellsByCharacter(char.id);
            } catch {
              spellsObj[char.id] = [];
            }
          }
          setItems(itemsObj);
          setSpells(spellsObj);
        })
        .catch(() => setError('Erreur lors du chargement des personnages'))
        .finally(() => setLoading(false));
    } catch {
      setTimeout(() => {
        setError('Token invalide');
        setLoading(false);
      }, 0);
    }
  }, []);

  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center">
      <div className="rpg-card-medieval p-8 mt-8 w-full max-w-2xl">
        <h2 className="rpg-title-medieval mb-4 text-2xl">Mes héros</h2>
        {loading && <div>Chargement...</div>}
        {error && <div className="text-gold">{error}</div>}
        <ul className="w-full">
          {characters.length === 0 && !loading && <li>Aucun personnage trouvé.</li>}
          {characters.map(char => (
            <li key={char.id} className="mb-4 border-b border-gold py-2 flex flex-col">
              <span className="font-fantasy text-lg">{char.name} ({char.class})</span>
              <span className="text-parchment text-sm">Niveau {char.level} - {char.race || ''} {char.description && `- ${char.description}`}</span>
              <div className="mt-2">
                <b>Items équipés :</b>
                <ul>
                  {(items[char.id]?.length === 0) && <li>Aucun item.</li>}
                  {items[char.id]?.map(it => (
                    <li key={it.id} className="text-sm">{it.name} <span className="text-gold">[{it.rarity}]</span></li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <b>Sorts :</b>
                <ul>
                  {(spells[char.id]?.length === 0) && <li>Aucun sort.</li>}
                  {spells[char.id]?.map(sp => (
                    <li key={sp.id} className="text-sm">{sp.name} <span className="text-gold">(Coût : {sp.mana_cost})</span> {sp.effect && <span>- {sp.effect}</span>}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
