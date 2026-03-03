// Service pour récupérer les items publics
export async function getPublicItems() {
  const res = await fetch('http://localhost:3000/items/public');
  if (!res.ok) throw new Error('Erreur lors du chargement des items publics');
  return await res.json();
}
