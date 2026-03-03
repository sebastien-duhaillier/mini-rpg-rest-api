import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userApi';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await registerUser(username, password, email);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center">
      <div className="rpg-card-medieval p-8 mt-8">
        <h2 className="rpg-title-medieval mb-4 text-2xl">Créer un compte</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="rpg-input" type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} required />
          <input className="rpg-input" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
          <input className="rpg-input" type="email" placeholder="Email (optionnel)" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="rpg-btn-medieval" type="submit">S'inscrire</button>
          {error && <div className="text-gold mt-2">{error}</div>}
          {success && <div className="text-gold mt-2">Compte créé ! Redirection...</div>}
        </form>
      </div>
    </div>
  );
}
