import getTemplate from "./template";

export default class MonsterAdd {
  // Repère le conteneur du formulaire et mémorise la fonction d'ajout d'une créature.
  // recois de new MonsterAdd depuis monstersList data (class html) et onAdd (data) => this.store(data) callback
  constructor(data, onAdd) {
    this.domElt = document.querySelector(data.el);
    // La liste fournit la fonction qui ajoute réellement la créature.
    this.onAdd = onAdd;
  }

  // Affiche le formulaire d'ajout et active ses événements depuis MonstersList
  render() {
    this.domElt.innerHTML = getTemplate();
    this.initEvents();
  }

  // Gère l'envoi du formulaire pour ajouter une créature, puis vider les champs.
  initEvents() {
    const form = this.domElt.querySelector("form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page.
      const nameInput = form.elements.namedItem("name");
      // callback onAdd
      await this.onAdd({
        name: nameInput.value.trim(),
        type: form.elements.namedItem("type").value,
        dangerLevel: Number(form.elements.namedItem("dangerLevel").value),
        year: Number(form.elements.namedItem("year").value),
      });
      form.reset(); // On vide seulement après un ajout réussi.
      nameInput.focus();
    });
  }
}

// si pas de callback enlever le onAdd partout (ici et dans monsterlist ) et utiliser ceci :
// await window.monstersList.store({
// name: nameInput.value.trim(),
// type: form.elements.namedItem("type").value,
// dangerLevel: Number(form.elements.namedItem("dangerLevel").value),
// year: Number(form.elements.namedItem("year").value),
// });