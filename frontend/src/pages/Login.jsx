export default function Login() {
  return (
    <div className="rpg-card">
      <h2 className="rpg-title">Connexion</h2>
      <form className="flex flex-col gap-4">
        <input className="rpg-input" type="text" placeholder="Nom d'utilisateur" required />
        <input className="rpg-input" type="password" placeholder="Mot de passe" required />
        <button className="rpg-btn" type="submit">Se connecter</button>
      </form>
    </div>
  );
}
