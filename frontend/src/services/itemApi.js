// Service pour gérer les items côté frontend

export async function getItemsByCharacter(characterId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`http://localhost:3000/items/character/${characterId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des items');
  return await res.json();
}

export async function createItem({ character_id, name, rarity }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ character_id, name, rarity })
  });
  if (!res.ok) throw new Error('Erreur lors de la création de l\'item');
  return await res.json();
}
