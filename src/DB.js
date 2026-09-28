// Cette classe regroupe les appels à MockAPI, comme dans la todolist.
export default class DB {
  // Enregistre l'adresse de l'API utilisée pour les requêtes.
  static setApiURL(data) {
    this.apiURL = data;
  }

  // Récupère toutes les créatures depuis l'API.
  static async findALL() {
    const response = await fetch(this.apiURL + "monsters");
    return response.json();
  }

  // Envoie une nouvelle créature à l'API et retourne la créature créée.
  static async create(data) {
    const response = await fetch(this.apiURL + "monsters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        dangerLevel: data.dangerLevel,
        year: data.year,
      }),
    });
    return response.json();
  }

  // Modifie une créature dans l'API et retourne ses données mises à jour.
  static async updateOne(data) {
    const response = await fetch(this.apiURL + "monsters/" + data.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        dangerLevel: data.dangerLevel,
        year: data.year,
      }),
    });
    return response.json();
  }

  // Supprime dans l'API la créature correspondant à l'identifiant reçu.
  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "monsters/" + id, {
      method: "DELETE",
    });
  }
}

