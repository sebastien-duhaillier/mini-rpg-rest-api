export async function createCharacter({ name, className, race, description }) {
  const API_URL = 'http://localhost:3000/characters';
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, className, race, description })
  });
  if (!res.ok) throw new Error('Erreur lors de la création du personnage');
  return await res.json();
}

export async function getMyCharacters() {
  const API_URL = 'http://localhost:3000/characters';
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des personnages');
  return await res.json();
}

export async function deleteCharacter(id) {
  const API_URL = `http://localhost:3000/characters/${id}`;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression du personnage');
  return await res.json();
}

export async function updateCharacter(id, data) {
  const API_URL = `http://localhost:3000/characters/${id}`;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur lors de la modification du personnage');
  return await res.json();
}
