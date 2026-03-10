const API_URL = import.meta.env.VITE_BACKEND_URL;

// Service pour gérer les items côté frontend

export async function getItemsByCharacter(characterId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/items/character/${characterId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des items');
  return await res.json();
}

export async function createItem({ character_id, item_id, name, rarity, is_public }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  let body = { character_id };
  if (item_id) {
    body.item_id = item_id;
  } else {
    body.name = name;
    body.rarity = rarity;
    body.is_public = is_public;
  }
  const res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Erreur lors de la création de l'item");
  return await res.json();
}

export async function deleteItem(itemId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/items/${itemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'item");
  return await res.json();
}
