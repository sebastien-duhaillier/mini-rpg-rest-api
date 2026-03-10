// Service pour gérer les spells côté frontend

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getSpellsByCharacter(characterId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/spells/character/${characterId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des sorts');
  return await res.json();
}

// Créer un sort (privé ou copie d’un sort public)
export async function createSpell({ character_id, name, mana_cost, effect, spell_id }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  let body = { character_id };
  if (spell_id) {
    body.spell_id = spell_id;
  } else {
    body.name = name;
    body.mana_cost = mana_cost;
    body.effect = effect;
  }
  const res = await fetch(`${API_URL}/spells`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Erreur lors de la création du sort');
  return await res.json();
}

export async function deleteSpell(spellId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/spells/${spellId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Erreur lors de la suppression du sort');
  }
  return await res.json();
}

// Service pour récupérer les sorts publics
export async function getPublicSpells() {
  const res = await fetch(`${API_URL}/spells/public`);
  if (!res.ok) throw new Error('Erreur lors du chargement des sorts publics');
  return await res.json();
}

// Créer un sort public global
export async function createPublicSpell({ name, mana_cost, effect }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/spells/public`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, mana_cost, effect })
  });
  if (!res.ok) throw new Error('Erreur lors de la création du sort public');
  return await res.json();
}
