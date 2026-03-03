export async function getUsers() {
  const API_URL = 'http://localhost:3000/users';
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des utilisateurs');
  return await res.json();
}

export async function loginUser(username, password) {
  const API_URL = 'http://localhost:3000/auth/login';
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Identifiants invalides');
  return await res.json(); // doit contenir le token et/ou user
}

export async function getCurrentUser(userId) {
  const API_URL = `http://localhost:3000/users/${userId}`;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Impossible de récupérer le profil');
  return await res.json();
}

export async function registerUser(username, password, email) {
  const API_URL = 'http://localhost:3000/auth/register';
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  });
  if (!res.ok) throw new Error('Erreur lors de la création du compte');
  return await res.json();
}

export async function deleteUser(userId) {
  const API_URL = `http://localhost:3000/users/${userId}`;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Non authentifié');
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression de l\'utilisateur');
  return await res.json();
}
