import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/userApi';
import { getMyCharacters, createCharacter, deleteCharacter, updateCharacter } from '../services/characterApi';
import { getItemsByCharacter, createItem } from '../services/itemApi';
import { getSpellsByCharacter, createSpell } from '../services/spellApi';
import { getPublicItems } from '../services/publicItemApi';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Formulaire création personnage
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [race, setRace] = useState('');
  const [description, setDescription] = useState('');
  const [charError, setCharError] = useState(null);
  const [charSuccess, setCharSuccess] = useState(false);
  // Edition
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editRace, setEditRace] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editError, setEditError] = useState(null);
  // Gestion des items
  const [openItems, setOpenItems] = useState({}); // { [charId]: bool }
  const [items, setItems] = useState({}); // { [charId]: [items] }
  const [publicItems, setPublicItems] = useState([]);
  const [itemMode, setItemMode] = useState({}); // { [charId]: 'public' | 'create' }
  const [selectedPublicItem, setSelectedPublicItem] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemRarity, setItemRarity] = useState('common');
  const [itemIsPublic, setItemIsPublic] = useState(true);
  const [itemError, setItemError] = useState(null);
  const [itemSuccess, setItemSuccess] = useState(false);
  const [itemLoading, setItemLoading] = useState({}); // { [charId]: bool }
  // Gestion des spells
  const [openSpells, setOpenSpells] = useState({}); // { [charId]: bool }
  const [spells, setSpells] = useState({}); // { [charId]: [spells] }
  const [spellName, setSpellName] = useState('');
  const [spellMana, setSpellMana] = useState(10);
  const [spellEffect, setSpellEffect] = useState('');
  const [spellError, setSpellError] = useState(null);
  const [spellSuccess, setSpellSuccess] = useState(false);
  const [spellLoading, setSpellLoading] = useState({}); // { [charId]: bool }

  useEffect(() => {
    let ignore = false;
    // Récupérer l'id utilisateur depuis le token
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => {
        if (!ignore) {
          setError('Non authentifié');
          setLoading(false);
        }
      }, 0);
      return () => { ignore = true; };
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      getCurrentUser(userId)
        .then(u => { if (!ignore) setUser(u); })
        .catch(err => { if (!ignore) setError(err.message); });
      getMyCharacters()
        .then(chars => { if (!ignore) setCharacters(chars); })
        .catch(() => { if (!ignore) setCharacters([]); })
        .finally(() => { if (!ignore) setLoading(false); });
      getPublicItems()
        .then(items => setPublicItems(items))
        .catch(() => setPublicItems([]));
    } catch {
      setTimeout(() => {
        if (!ignore) {
          setError('Token invalide');
          setLoading(false);
        }
      }, 0);
    }
    return () => { ignore = true; };
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCharError(null);
    setCharSuccess(false);
    try {
      await createCharacter({ name, className, race, description });
      setCharSuccess(true);
      setName(''); setClassName(''); setRace(''); setDescription('');
      // Rafraîchir la liste
      const chars = await getMyCharacters();
      setCharacters(chars);
    } catch (err) {
      setCharError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce personnage ?')) return;
    try {
      await deleteCharacter(id);
      setCharacters(chars => chars.filter(c => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (char) => {
    setEditId(char.id);
    setEditName(char.name);
    setEditClass(char.class);
    setEditRace(char.race || '');
    setEditDescription(char.description || '');
    setEditError(null);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateCharacter(editId, { name: editName, class: editClass, race: editRace, description: editDescription });
      setEditId(null);
      // Rafraîchir la liste
      const chars = await getMyCharacters();
      setCharacters(chars);
    } catch (err) {
      setEditError(err.message);
    }
  };

  const handleToggleItems = async (charId) => {
    setOpenItems(prev => ({ ...prev, [charId]: !prev[charId] }));
    if (!items[charId]) {
      setItemLoading(l => ({ ...l, [charId]: true }));
      try {
        const its = await getItemsByCharacter(charId);
        setItems(i => ({ ...i, [charId]: its }));
      } catch (err) {
        setItems(i => ({ ...i, [charId]: [] }));
      } finally {
        setItemLoading(l => ({ ...l, [charId]: false }));
      }
    }
  };

  const handleAddItem = async (e, charId) => {
    e.preventDefault();
    setItemError(null);
    setItemSuccess(false);
    try {
      if (itemMode[charId] === 'public') {
        if (!selectedPublicItem) throw new Error('Sélectionnez un item public');
        await createItem({ character_id: charId, item_id: selectedPublicItem });
      } else {
        await createItem({ character_id: charId, name: itemName, rarity: itemRarity, is_public: itemIsPublic });
      }
      setItemSuccess(true);
      setItemName('');
      setItemRarity('common');
      setSelectedPublicItem('');
      setItemIsPublic(true);
      // Rafraîchir la liste d'items
      const its = await getItemsByCharacter(charId);
      setItems(i => ({ ...i, [charId]: its }));
    } catch (err) {
      setItemError(err.message);
    }
  };

  const handleToggleSpells = async (charId) => {
    setOpenSpells(prev => ({ ...prev, [charId]: !prev[charId] }));
    if (!spells[charId]) {
      setSpellLoading(l => ({ ...l, [charId]: true }));
      try {
        const sps = await getSpellsByCharacter(charId);
        setSpells(i => ({ ...i, [charId]: sps }));
      } catch (err) {
        setSpells(i => ({ ...i, [charId]: [] }));
      } finally {
        setSpellLoading(l => ({ ...l, [charId]: false }));
      }
    }
  };

  const handleAddSpell = async (e, charId) => {
    e.preventDefault();
    setSpellError(null);
    setSpellSuccess(false);
    try {
      await createSpell({ character_id: charId, name: spellName, mana_cost: spellMana, effect: spellEffect });
      setSpellSuccess(true);
      setSpellName('');
      setSpellMana(10);
      setSpellEffect('');
      // Rafraîchir la liste de spells
      const sps = await getSpellsByCharacter(charId);
      setSpells(i => ({ ...i, [charId]: sps }));
    } catch (err) {
      setSpellError(err.message);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!user) return <div>Aucun utilisateur connecté.</div>;

  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center">
      <div className="rpg-card-medieval p-8 mt-8 w-full max-w-2xl">
        <h2 className="rpg-title-medieval mb-4 text-2xl">Profil utilisateur</h2>
        <p><b>Nom d'utilisateur :</b> {user.username}</p>
        <h3 className="rpg-title-medieval mt-8 mb-2 text-xl">Mes personnages</h3>
        <ul className="mb-6 w-full">
          {characters.length === 0 && <li>Aucun personnage.</li>}
          {characters.map(char => (
            <li key={char.id} className="mb-2 border-b border-gold py-2 flex flex-col">
              {editId === char.id ? (
                <form className="flex flex-col gap-2" onSubmit={handleEdit}>
                  <input className="rpg-input" value={editName} onChange={e => setEditName(e.target.value)} required />
                  <select className="rpg-input" value={editClass} onChange={e => setEditClass(e.target.value)} required>
                    <option value="">Classe</option>
                    <option>Guerrier</option>
                    <option>Magicien</option>
                    <option>Voleur</option>
                    <option>Prêtre</option>
                  </select>
                  <select className="rpg-input" value={editRace} onChange={e => setEditRace(e.target.value)} required>
                    <option value="">Race</option>
                    <option>Humain</option>
                    <option>Elfe</option>
                    <option>Nain</option>
                    <option>Orc</option>
                  </select>
                  <textarea className="rpg-input" rows={2} value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                  <div className="flex gap-2 mt-2">
                    <button className="rpg-btn-medieval" type="submit">Enregistrer</button>
                    <button className="rpg-btn-medieval" type="button" onClick={() => setEditId(null)}>Annuler</button>
                  </div>
                  {editError && <div className="text-gold mt-2">{editError}</div>}
                </form>
              ) : (
                <>
                  <span className="font-fantasy text-lg">{char.name} ({char.class})</span>
                  <span className="text-parchment text-sm">{char.race} {char.description && `- ${char.description}`}</span>
                  <div className="flex gap-2 mt-2">
                    <button className="rpg-btn-medieval" onClick={() => startEdit(char)}>Modifier</button>
                    <button className="rpg-btn-medieval" onClick={() => handleDelete(char.id)}>Supprimer</button>
                    <button className="rpg-btn-medieval" onClick={() => handleToggleItems(char.id)}>
                      {openItems[char.id] ? 'Masquer les items' : 'Voir/ajouter des items'}
                    </button>
                    <button className="rpg-btn-medieval" onClick={() => handleToggleSpells(char.id)}>
                      {openSpells[char.id] ? 'Masquer les sorts' : 'Voir/ajouter des sorts'}
                    </button>
                  </div>
                  {openItems[char.id] && (
                    <div className="mt-2 p-2 bg-parchment rounded-lg border border-gold">
                      <b>Items :</b>
                      {itemLoading[char.id] ? (
                        <div>Chargement...</div>
                      ) : (
                        <ul>
                          {(items[char.id]?.length === 0) && <li>Aucun item.</li>}
                          {items[char.id]?.map(it => (
                            <li key={it.id} className="text-sm flex items-center gap-2">
                              {it.name} <span className="text-gold">[{it.rarity}]</span>
                              <button className="rpg-btn-medieval bg-red-700 text-white px-2 py-1 rounded" onClick={async () => {
                                if (window.confirm('Supprimer cet item ?')) {
                                  try {
                                    await import('../services/itemApi').then(api => api.deleteItem(it.id));
                                    // Rafraîchir la liste d'items
                                    const its = await getItemsByCharacter(char.id);
                                    setItems(i => ({ ...i, [char.id]: its }));
                                  } catch (err) {
                                    setItemError(err.message);
                                  }
                                }
                              }}>Supprimer</button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <form className="flex flex-col gap-2 mt-2" onSubmit={e => handleAddItem(e, char.id)}>
                        <div className="flex gap-2 mb-2">
                          <button type="button" className={`rpg-btn-medieval ${itemMode[char.id]==='public'?'bg-gold':''}`} onClick={()=>setItemMode(m=>({...m,[char.id]:'public'}))}>Choisir item existant</button>
                          <button type="button" className={`rpg-btn-medieval ${itemMode[char.id]==='create'?'bg-gold':''}`} onClick={()=>setItemMode(m=>({...m,[char.id]:'create'}))}>Créer un nouvel item</button>
                        </div>
                        {itemMode[char.id] === 'public' && (
                          publicItems.length === 0 ? (
                            <div className="text-gold">Aucun item public disponible</div>
                          ) : (
                            <select className="rpg-input" value={selectedPublicItem} onChange={e => setSelectedPublicItem(e.target.value)} required>
                              <option value="">Choisir un item existant</option>
                              {publicItems.map(it => (
                                <option key={it.id} value={it.id}>{it.name} [{it.rarity}]</option>
                              ))}
                            </select>
                          )
                        )}
                        {itemMode[char.id] === 'create' && (
                          <>
                            <input className="rpg-input" type="text" placeholder="Nom de l'item" value={itemName} onChange={e => setItemName(e.target.value)} required />
                            <select className="rpg-input" value={itemRarity} onChange={e => setItemRarity(e.target.value)}>
                              <option value="common">Commun</option>
                              <option value="rare">Rare</option>
                              <option value="epic">Épique</option>
                              <option value="legendary">Légendaire</option>
                            </select>
                            <label className="flex items-center gap-2">
                              <input type="checkbox" checked={itemIsPublic} onChange={e => setItemIsPublic(e.target.checked)} />
                              Rendre l'item public (disponible pour tous)
                            </label>
                          </>
                        )}
                        <button className="rpg-btn-medieval" type="submit"
                          disabled={
                            (itemMode[char.id]==='public' && (!selectedPublicItem || publicItems.length===0)) ||
                            (itemMode[char.id]==='create' && !itemName.trim())
                          }
                        >
                          Ajouter l'item
                        </button>
                        {itemError && <div className="text-gold mt-2">{itemError}</div>}
                        {itemSuccess && <div className="text-gold mt-2">Item ajouté !</div>}
                      </form>
                    </div>
                  )}
                  {openSpells[char.id] && (
                    <div className="mt-2 p-2 bg-parchment rounded-lg border border-gold">
                      <b>Sorts :</b>
                      {spellLoading[char.id] ? (
                        <div>Chargement...</div>
                      ) : (
                        <ul>
                          {(spells[char.id]?.length === 0) && <li>Aucun sort.</li>}
                          {spells[char.id]?.map(sp => (
                            <li key={sp.id} className="text-sm">{sp.name} <span className="text-gold">(Coût : {sp.mana_cost})</span> {sp.effect && <span>- {sp.effect}</span>}</li>
                          ))}
                        </ul>
                      )}
                      <form className="flex flex-col gap-2 mt-2" onSubmit={e => handleAddSpell(e, char.id)}>
                        <input className="rpg-input" type="text" placeholder="Nom du sort" value={spellName} onChange={e => setSpellName(e.target.value)} required />
                        <input className="rpg-input" type="number" min="0" placeholder="Coût en mana" value={spellMana} onChange={e => setSpellMana(Number(e.target.value))} required />
                        <input className="rpg-input" type="text" placeholder="Effet (optionnel)" value={spellEffect} onChange={e => setSpellEffect(e.target.value)} />
                        <button className="rpg-btn-medieval" type="submit">Ajouter le sort</button>
                        {spellError && <div className="text-gold mt-2">{spellError}</div>}
                        {spellSuccess && <div className="text-gold mt-2">Sort ajouté !</div>}
                      </form>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        <h3 className="rpg-title-medieval mb-2 text-xl">Créer un personnage</h3>
        <form className="flex flex-col gap-4" onSubmit={handleCreate}>
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
          {charError && <div className="text-gold mt-2">{charError}</div>}
          {charSuccess && <div className="text-gold mt-2">Personnage créé !</div>}
        </form>
      </div>
    </div>
  );
}
