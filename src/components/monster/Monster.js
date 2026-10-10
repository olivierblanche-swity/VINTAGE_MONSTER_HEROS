import getTemplate from "./template";
import DB from "../../DB";

export default class Monster {
  // Enregistre les données de la créature et les fonctions qui préviennent la liste de ses changements.
  // recois de new Monster depuis MonstersList 
  constructor(data, onUpdate, onDelete) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = Number(data.dangerLevel);
    this.year = Number(data.year);
    this.domElt = null;
    // callback pour le update et le delete
    this.onUpdate = onUpdate;
    this.onDelete = onDelete;
  }

  // Crée et remplit la ligne du tableau pour cette créature, puis retourne son élément HTML.
  render() {
    const template = document.createElement("template");
    template.innerHTML = getTemplate();
    this.domElt = template.content.firstElementChild;
    this.domElt.dataset.id = this.id;
    this.domElt.querySelector(".monster-name").textContent = this.name;
    this.domElt.querySelector(".monster-type").textContent = this.type;
    const danger = this.domElt.querySelector(".monster-danger");
    // Bonus : une tête de mort par niveau.
    danger.textContent = "☠️".repeat(this.dangerLevel);
    // info bulle indique le niveau en nombre et non en tete de mort au survol 
    danger.title = "Danger level " + this.dangerLevel;
    this.domElt.querySelector(".monster-year").textContent = this.year;
    this.resetInputs();
    this.initEvents();
    return this.domElt;
  }

  // Remet les données actuelles de la créature dans les champs de modification.
  // si annulation des changements on garde les anciennes valeurs tant que pas enregistree avec update
  resetInputs() {
    this.domElt.querySelector(".input-name").value = this.name;
    this.domElt.querySelector(".input-type").value = this.type;
    this.domElt.querySelector(".input-danger").value = this.dangerLevel;
    this.domElt.querySelector(".input-year").value = this.year;
  }

  // Annule la saisie en cours et quitte le mode modification.
  cancelEdit() {
    this.resetInputs();
    this.domElt.classList.remove("isEditing");
  }

  // Enregistre les modifications dans l'API et actualise la créature affichée.
  async update() {
    const nameInput = this.domElt.querySelector(".input-name");
    // pour reverifier les limites du html du dangerLevel
    const dangerInput = this.domElt.querySelector(".input-danger");
    if (!dangerInput.reportValidity()) return;
    const data = {
      id: this.id,
      name: nameInput.value.trim(),
      type: this.domElt.querySelector(".input-type").value,
      dangerLevel: Number(this.domElt.querySelector(".input-danger").value),
      year: Number(this.domElt.querySelector(".input-year").value),
    };

    // On attend l'API avant de modifier l'objet et l'affichage.
    const monster = await DB.updateOne(data);
    this.name = monster.name;
    this.type = monster.type;
    this.dangerLevel = Number(monster.dangerLevel);
    this.year = Number(monster.year);
    this.onUpdate();
  }

  // Active les boutons de modification et de suppression ainsi que les touches Entrée et Échap.
  initEvents() {
    // quand on clique sur le crayon pour editer
    this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
      this.domElt.classList.add("isEditing");
      this.domElt.querySelector(".input-name").focus();
    });
    // quand on clique sur le v pour enregistrer
    this.domElt.querySelector(".btn-check").addEventListener("click", () => this.update());
    
    // quand on clique sur le x pour annuler
    this.domElt.querySelector(".btn-cancel").addEventListener("click", () => this.cancelEdit());
    this.domElt.addEventListener("keydown", (e) => {
      // si on presse enter 
      if (!this.domElt.classList.contains("isEditing")) return;
      if (e.key === "Enter" && e.target.matches("input, select")) {
        e.preventDefault();
        this.update();
      }
      // si on presse escape
      if (e.key === "Escape") this.cancelEdit();
    });
    this.domElt.querySelector(".btn-delete").addEventListener("click", () => this.onDelete(this.id));
  }
}
// si pas de callback  pour delete :
// this.domElt.querySelector(".btn-delete").addEventListener("click", () => { window.monstersList.deleteOneById(this.id);
// });