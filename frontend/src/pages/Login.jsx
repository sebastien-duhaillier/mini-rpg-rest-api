export default function Login() {
  return (
    <div className="rpg-card-medieval p-8 mt-8">
      <h2 className="rpg-title-medieval mb-4 text-2xl">Connexion</h2>
      <form className="flex flex-col gap-4">
        <input className="rpg-input" type="text" placeholder="Nom d'utilisateur" required />
        <input className="rpg-input" type="password" placeholder="Mot de passe" required />
        <button className="rpg-btn-medieval" type="submit">Se connecter</button>
      </form>
    </div>
  );
}
