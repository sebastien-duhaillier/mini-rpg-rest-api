export default function CharacterCreate() {
  return (
    <div className="rpg-card">
      <h2 className="rpg-title">Créer un personnage</h2>
      <form className="flex flex-col gap-4">
        <input className="rpg-input" type="text" placeholder="Nom du personnage" required />
        <select className="rpg-input" required>
          <option value="">Classe</option>
          <option>Guerrier</option>
          <option>Magicien</option>
          <option>Voleur</option>
          <option>Prêtre</option>
        </select>
        <select className="rpg-input" required>
          <option value="">Race</option>
          <option>Humain</option>
          <option>Elfe</option>
          <option>Nain</option>
          <option>Orc</option>
        </select>
        <textarea className="rpg-input" placeholder="Description ou histoire" rows={3} />
        <button className="rpg-btn mt-4" type="submit">Créer</button>
      </form>
    </div>
  );
}
