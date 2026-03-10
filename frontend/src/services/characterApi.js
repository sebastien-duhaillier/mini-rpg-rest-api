const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function createCharacter({ name, className, race, description }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/characters`, {
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
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/characters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des personnages');
  return await res.json();
}

export async function deleteCharacter(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/characters/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression du personnage');
  return await res.json();
}

export async function updateCharacter(id, data) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(`${API_URL}/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour du personnage');
  return await res.json();
}
