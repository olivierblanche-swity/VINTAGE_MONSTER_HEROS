import DB from "../../DB";
import Monster from "../monster/Monster";
import MonsterAdd from "../monsterAdd/MonsterAdd";
import getTemplate from "./template";

export default class MonstersList {
  // Prépare la liste des créatures, la recherche, le tri et l'adresse de l'API.
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    this.listDomElt = null;
    this.monsters = [];
    this.search = "";
    this.sortBy = "";
    this.sortDirection = 1;
    DB.setApiURL(data.apiURL);
  }

  // Charge les créatures depuis l'API et les affiche dans la liste.
  async loadMonsters() {
    const message = this.domElt.querySelector(".list-message");
    message.textContent = "Chargement des créatures...";
    const monsters = await DB.findALL();
    this.monsters = monsters.map((monster) => this.createMonster(monster));
    this.renderMonsters();
  }

  // Crée un objet Monster et lui transmet les fonctions de mise à jour et de suppression.
  createMonster(data) {
    
    return new Monster(
      // constructor de la class Monster recois 3 arguments
      // data recois :
      data,
      // onUpdate recois :
      () => this.renderMonsters(),
      // onDelete recois :
      (id) => this.deleteOneById(id),
    );
  }

  // Retourne le nombre total de créatures dans la liste.
  getItemsCount() {
    return this.monsters.length;
  }

  // Affiche le nombre total de créatures dans le compteur.
  renderItemsCount() {
    this.domElt.querySelector("#monsterCount").textContent = this.getItemsCount();
  }

  // Affiche la structure de la page, le formulaire et la liste, puis active les événements.
  render() {
    this.domElt.innerHTML = getTemplate();
    this.listDomElt = this.domElt.querySelector("tbody");
    this.monsterAdd = new MonsterAdd(
      // constructor class MonsterAdd recois 2 arguments 
      // data 
      { el: "#app .monster-add" },
      // onAdd
      (data) => this.store(data),
    );
    this.monsterAdd.render();
    this.renderMonsters();
    this.initEvents();
  }

  // Filtre et trie les créatures, puis actualise le tableau et le compteur.
  renderMonsters() {
    // filter crée un nouveau tableau : la recherche ne supprime aucune donnée.

  // barre de recherche 
    const search = this.search.toLowerCase().trim();
    const monsters = this.monsters.filter((monster) =>
      monster.name.toLowerCase().includes(search) ||
      monster.type.toLowerCase().includes(search),
    );

    // Bonus : tri des textes avec localeCompare, des nombres par soustraction.
    if (this.sortBy) {
      monsters.sort((a, b) => {
        if (this.sortBy === "name" || this.sortBy === "type") {
          return a[this.sortBy].localeCompare(b[this.sortBy]) * this.sortDirection;
        }
        return (a[this.sortBy] - b[this.sortBy]) * this.sortDirection;
      });
    }

    this.listDomElt.innerHTML = "";
    // On insère directement les éléments DOM pour conserver leurs événements.
    monsters.forEach((monster) => this.listDomElt.append(monster.render()));
    this.renderItemsCount(); // Le compteur indique le total, même après filtrage.
    this.domElt.querySelector(".list-message").textContent =
      monsters.length === 0 ? "Aucune créature à afficher." : "";
    this.domElt.querySelectorAll("[data-sort]").forEach((link) => {
      const selected = link.dataset.sort === this.sortBy;
      // c est ici qu il verifie si il y a deja une direction definie 1 asc -1 desc 0 rien
      link.parentElement.setAttribute("aria-sort",
        selected ? (this.sortDirection === 1 ? "ascending" : "descending") : "none");
      link.classList.toggle("sort-selected", selected);
    });
  }

  // Ajoute une créature dans l'API, puis dans la liste affichée.
  async store(data) {
    const monster = await DB.create(data);
    this.monsters.push(this.createMonster(monster));
    this.renderMonsters();
  }

  // Supprime une créature dans l'API et dans la liste, puis actualise l'affichage.
  // ici deleteOneById est une methode de MonstersList
  async deleteOneById(id) {
    //  API, tableau, puis DOM.
    // ici deleteOneById est une methode le DB 
    await DB.deleteOneById(id);
    this.monsters = this.monsters.filter((monster) => monster.id !== id);
    this.renderMonsters();
  }

  // Active la recherche et le tri au clic sur les titres des colonnes.
  initEvents() {

    // pour la recherche a partir de la barre de recherche
    this.domElt.querySelector(".search").addEventListener("input", (e) => {
      this.search = e.target.value;
      this.renderMonsters();
    });

    // tri via le clic sur le lien ( name type year dangerLevel )
    this.domElt.querySelectorAll("[data-sort]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const field = link.dataset.sort;
        this.sortDirection = this.sortBy === field ? -this.sortDirection : 1;
        this.sortBy = field;
        this.renderMonsters();
      });
    });
  }
}

