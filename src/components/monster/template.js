import "./styles.css";

// Retourne le HTML d'une ligne de créature avec ses champs de modification et ses boutons.
export default function getTemplate() {
  // Les valeurs sont remplies dans Monster.render avec textContent et value.
  // Un nom contenant du HTML est ainsi affiché comme du texte.
  return `
    <tr class="monster-row">
      <td class="p-3 font-semibold">
        <span class="monster-name isEditing-hidden"></span>
        <input type="text" class="input-name isEditing-visible field" aria-label="Name" required />
      </td>
      <td class="p-3">
        <span class="monster-type isEditing-hidden"></span>
        <select class="input-type isEditing-visible field" aria-label="Type" required>
          <option>Giant reptile</option>
          <option>Alien</option>
          <option>Mutant</option>
          <option>Giant insect</option>
          <option>Robot</option>
          <option>Deep-sea creature</option>
        </select>
      </td>
      <td class="p-3 whitespace-nowrap">
        <span class="monster-danger isEditing-hidden"></span>
        <input type="number" min="1" max="5" step="1" class="input-danger isEditing-visible field" aria-label="Danger level" required />
      </td>
      <td class="p-3">
        <span class="monster-year isEditing-hidden"></span>
        <input type="number" min="1950" max="1969" step="1" class="input-year isEditing-visible field" aria-label="Release year" required />
      </td>
      <td class="p-3">
        <div class="flex justify-end gap-2">
          <button type="button" class="btn-check isEditing-visible btn btn-jade py-2 px-3" aria-label="Save">
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" class="btn-cancel isEditing-visible btn btn-gold py-2 px-3" aria-label="Cancel">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button type="button" class="btn-edit isEditing-hidden btn btn-gold py-2 px-3" aria-label="Edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="btn-delete isEditing-hidden btn btn-lipstick py-2 px-3" aria-label="Delete">
            <i class="fa-solid fa-skull"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

