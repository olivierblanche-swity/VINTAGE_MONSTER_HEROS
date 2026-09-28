import "./style.css";
import MonstersList from "./components/monstersList/MonstersList";

//le composant principal reçoit le sélecteur et l'API.
window.monstersList = new MonstersList({
  el: "#app",
  apiURL: "https://6aba68335b549d818d62618b.mockapi.io/",
});

// affichage monsterList
window.monstersList.render();
window.monstersList.loadMonsters();

