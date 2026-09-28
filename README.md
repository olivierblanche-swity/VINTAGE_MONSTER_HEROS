# Monster Archive — Vintage Monster Heros

Application de gestion d'un bestiaire de créatures de films de série B des années 1950 à 1969. Ce projet de cours utilise JavaScript avec des classes et des modules, sur le modèle de la todolist. Les données sont enregistrées dans une API REST MockAPI.

## Technologies

- HTML et CSS pour la structure et la présentation.
- JavaScript sans framework pour les composants et les interactions.
- Vite pour le serveur de développement et la compilation.
- MockAPI pour le stockage des créatures, avec `fetch` et `async/await`.
- Tailwind CSS, Font Awesome et Google Fonts chargés en ligne dans `index.html`.

## Installation et lancement

Installer Node.js et npm. La version de Vite du projet nécessite Node.js 20.19+ dans la branche 20, ou Node.js 22.12 ou supérieur.

Dans un terminal ouvert à la racine du projet :

```bash
npm install
npm run dev
```

Ouvrir ensuite l'adresse indiquée dans le terminal. Une connexion Internet est nécessaire pour accéder à MockAPI et aux ressources visuelles externes.

Pour générer la version de production dans le dossier `dist`, puis la consulter localement :

```bash
npm run build
npm run preview
```

## Fonctionnalités et utilisation

- Afficher les créatures récupérées depuis l'API au chargement.
- Ajouter une créature avec le formulaire « File a new creature ».
- Modifier une ligne avec le bouton crayon, puis enregistrer avec la coche.
- Annuler une modification avec la croix ou la touche Échap. La touche Entrée dans un champ enregistre la modification.
- Supprimer une créature avec le bouton tête de mort de la colonne « Actions ».
- Rechercher par nom ou par type, sans tenir compte des majuscules.
- Trier par nom, type, danger ou année en cliquant sur un titre de colonne. Un nouveau clic sur la même colonne inverse le sens du tri.
- Afficher le nombre total de créatures, même lorsqu'une recherche filtre le tableau.
- Représenter le niveau de danger par des têtes de mort : un niveau de 3 affiche ☠️☠️☠️.

Les ajouts, modifications et suppressions sont envoyés à MockAPI. Les données enregistrées sont récupérées au prochain chargement de la page.

## Données d'une créature

| Propriété | Description | Valeur attendue |
| --- | --- | --- |
| `id` | Identifiant généré par MockAPI | Chaîne, par exemple `"1"` |
| `name` | Nom de la créature | Texte non vide |
| `type` | Catégorie de la créature | Une valeur de la liste du formulaire |
| `dangerLevel` | Niveau de danger | Nombre entier de 1 à 5 |
| `year` | Année de sortie | Nombre entier de 1950 à 1969 |

Les types proposés sont : `Giant reptile`, `Alien`, `Mutant`, `Giant insect`, `Robot` et `Deep-sea creature`.

### Modifier les limites des champs

Les attributs HTML `min`, `max` et `step` définissent les limites dans les deux formulaires :

- [Formulaire d'ajout](src/components/monsterAdd/template.js).
- [Formulaire de modification](src/components/monster/template.js).

L'affichage des têtes de mort se trouve dans la méthode `render()` de [Monster.js](src/components/monster/Monster.js). La méthode `.repeat(this.dangerLevel)` répète directement le symbole selon le niveau de danger.

## Organisation du code

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Page principale et chargement des ressources externes |
| `src/main.js` | Création de la liste, affichage initial et chargement des données |
| `src/DB.js` | Requêtes vers MockAPI |
| `src/components/monstersList/MonstersList.js` | Gestion de la liste, du compteur, de la recherche et du tri |
| `src/components/monster/Monster.js` | Affichage, modification et demande de suppression d'une créature |
| `src/components/monsterAdd/MonsterAdd.js` | Lecture du formulaire et transmission des données à la liste |
| `src/components/*/template.js` | Structure HTML de chaque composant |
| `src/style.css` | Styles généraux de l'application |
| `src/components/monstersList/styles.css` | Styles associés à la liste |
| `documents/` | Consignes et gabarits HTML du cours |

Les composants d'interface utilisent `render()` pour leur affichage et `initEvents()` pour leurs interactions. Les fonctions `onAdd`, `onUpdate` et `onDelete`, transmises entre composants, permettent de prévenir la liste lorsqu'une action est effectuée.

## Configuration de l'API

L'adresse de base est définie dans la propriété `apiURL` de [src/main.js](src/main.js). Pour utiliser un autre projet MockAPI, remplacer cette adresse en conservant le `/` final et créer une ressource `monsters` avec les propriétés décrites ci-dessus.

La classe `DB` utilise les routes suivantes, relatives à cette adresse :

| Méthode JavaScript | Requête HTTP | Action |
| --- | --- | --- |
| `findALL()` | `GET /monsters` | Récupérer toutes les créatures |
| `create(data)` | `POST /monsters` | Ajouter une créature |
| `updateOne(data)` | `PUT /monsters/:id` | Modifier une créature |
| `deleteOneById(id)` | `DELETE /monsters/:id` | Supprimer une créature |



