import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/userApi';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    setDeleting(id);
    try {
      await deleteUser(id);
      setUsers(users => users.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="rpg-bg-medieval min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="rpg-card-medieval w-full max-w-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center border-4 border-gold mx-auto mt-8">
        <h2 className="rpg-title-medieval mb-4 text-2xl">Liste des utilisateurs</h2>
        <ul className="w-full text-center">
          {users.map(user => (
            <li key={user.id} className="mb-2 text-parchment text-lg font-fantasy border-b border-gold py-2 last:border-none flex justify-between items-center">
              <span>{user.username}</span>
              <button
                className="rpg-btn-medieval ml-4"
                style={{ fontSize: '0.85em', padding: '0.4em 0.8em', ...(user.username === 'superadmin' ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }}
                disabled={deleting === user.id || user.username === 'superadmin'}
                title={user.username === 'superadmin' ? 'Impossible de supprimer le superadmin' : ''}
                onClick={() => handleDelete(user.id)}
              >
                {user.username === 'superadmin' ? 'Protégé' : (deleting === user.id ? 'Suppression...' : 'Supprimer')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
