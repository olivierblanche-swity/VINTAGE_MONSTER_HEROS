import getTemplate from "./template";
import DB from "../../DB";

export default class Monster {
  // Enregistre les données de la créature et les fonctions qui préviennent la liste de ses changements.
  constructor(data, onUpdate = () => {}, onDelete = () => {}) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = Number(data.dangerLevel);
    this.year = Number(data.year);
    this.domElt = null;
    this.onUpdate = onUpdate;
    this.onDelete = onDelete;
    this.isSaving = false;
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
    // Bonus : une tête de mort par niveau (si la valeur de l'API est valide).
    danger.textContent = Number.isInteger(this.dangerLevel) && this.dangerLevel >= 1 && this.dangerLevel <= 5
      ? "☠️".repeat(this.dangerLevel)
      : this.dangerLevel;
    danger.title = "Danger level " + this.dangerLevel;
    this.domElt.querySelector(".monster-year").textContent = this.year;
    this.resetInputs();
    this.initEvents();
    return this.domElt;
  }

  // Remet les données actuelles de la créature dans les champs de modification.
  resetInputs() {
    this.domElt.querySelector(".input-name").value = this.name;
    this.domElt.querySelector(".input-name").setCustomValidity("");
    this.domElt.querySelector(".input-type").value = this.type;
    this.domElt.querySelector(".input-danger").value = this.dangerLevel;
    this.domElt.querySelector(".input-year").value = this.year;
  }

  // Annule la saisie en cours et quitte le mode modification si aucun enregistrement n'est en cours.
  cancelEdit() {
    if (this.isSaving) return;
    this.resetInputs();
    this.domElt.classList.remove("isEditing");
  }

  // Vérifie les champs, enregistre les modifications dans l'API et actualise la créature affichée.
  async update() {
    if (this.isSaving) return;
    const nameInput = this.domElt.querySelector(".input-name");
    nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Veuillez saisir un nom.");

    // Les champs d'édition sont dans un tableau : on vérifie chacun à la main.
    const inputs = this.domElt.querySelectorAll("input, select");
    for (const input of inputs) {
      if (!input.reportValidity()) return;
    }

    const data = {
      id: this.id,
      name: nameInput.value.trim(),
      type: this.domElt.querySelector(".input-type").value,
      dangerLevel: Number(this.domElt.querySelector(".input-danger").value),
      year: Number(this.domElt.querySelector(".input-year").value),
    };

    this.isSaving = true;
    this.domElt.querySelectorAll("button, input, select").forEach((element) => {
      element.disabled = true;
    });
    // On attend l'API avant de modifier l'objet et l'affichage.
    const monster = await DB.updateOne(data);
    this.name = monster.name;
    this.type = monster.type;
    this.dangerLevel = Number(monster.dangerLevel);
    this.year = Number(monster.year);
    this.onUpdate();
    this.isSaving = false;
    this.domElt.querySelectorAll("button, input, select").forEach((element) => {
      element.disabled = false;
    });
  }

  // Active les boutons de modification et de suppression ainsi que les touches Entrée et Échap.
  initEvents() {
    this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
      this.domElt.classList.add("isEditing");
      this.domElt.querySelector(".input-name").focus();
    });
    this.domElt.querySelector(".btn-check").addEventListener("click", () => this.update());
    this.domElt.querySelector(".btn-cancel").addEventListener("click", () => this.cancelEdit());
    this.domElt.querySelector(".input-name").addEventListener("input", (e) => {
      e.target.setCustomValidity("");
    });
    this.domElt.addEventListener("keydown", (e) => {
      if (!this.domElt.classList.contains("isEditing")) return;
      if (e.key === "Enter" && e.target.matches("input, select")) {
        e.preventDefault();
        this.update();
      }
      if (e.key === "Escape") this.cancelEdit();
    });
    this.domElt.querySelector(".btn-delete").addEventListener("click", async (e) => {
      const button = e.currentTarget;
      button.disabled = true;
      await this.onDelete(this.id);
      button.disabled = false;
    });
  }
}

