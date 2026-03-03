// Service pour gérer les spells côté frontend

export async function getSpellsByCharacter(characterId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`http://localhost:3000/spells/character/${characterId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des sorts');
  return await res.json();
}

export async function createSpell({ character_id, name, mana_cost, effect }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch('http://localhost:3000/spells', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ character_id, name, mana_cost, effect })
  });
  if (!res.ok) throw new Error('Erreur lors de la création du sort');
  return await res.json();
}
