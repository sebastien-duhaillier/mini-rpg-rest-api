export async function getUsers() {
  const API_URL = 'http://localhost:3000/users'; // à adapter selon ton backend
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors du chargement des utilisateurs');
  return await res.json();
}
