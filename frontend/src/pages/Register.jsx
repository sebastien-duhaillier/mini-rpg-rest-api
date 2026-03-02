export default function Register() {
  return (
    <div className="rpg-card">
      <h2 className="rpg-title">Créer un compte</h2>
      <form className="flex flex-col gap-4">
        <input className="rpg-input" type="text" placeholder="Nom d'utilisateur" required />
        <input className="rpg-input" type="password" placeholder="Mot de passe" required />
        <button className="rpg-btn" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
