import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userApi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('tokenChange'));
      navigate('/user');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="rpg-bg-medieval min-h-screen flex flex-col items-center justify-center">
      <div className="rpg-card-medieval p-8 mt-8">
        <h2 className="rpg-title-medieval mb-4 text-2xl">Connexion</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="rpg-input" type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} required />
          <input className="rpg-input" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="rpg-btn-medieval" type="submit">Se connecter</button>
          {error && <div className="text-gold mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
