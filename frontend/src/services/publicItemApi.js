const API_URL = import.meta.env.VITE_BACKEND_URL;

// Service pour récupérer les items publics
export async function getPublicItems() {
  const res = await fetch(`${API_URL}/items/public`);
  if (!res.ok) throw new Error('Erreur lors du chargement des items publics');
  return await res.json();
}
