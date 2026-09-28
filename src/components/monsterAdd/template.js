

// Retourne le HTML du formulaire permettant d'ajouter une créature.
export default function getTemplate() {
  return `
    <aside class="deco-frame p-6 bg-[var(--murk)]/60 self-start">
      <h2 class="display text-2xl mb-5">File a new creature</h2>
      <form>
        <label class="block mb-4 text-[var(--silver)]">
          Name
          <input name="name" type="text" class="field" placeholder="The Crawling Mass" required />
        </label>
        <label class="block mb-4 text-[var(--silver)]">
          Type
          <select name="type" class="field" required>
            <option>Giant reptile</option>
            <option>Alien</option>
            <option>Mutant</option>
            <option>Giant insect</option>
            <option>Robot</option>
            <option>Deep-sea creature</option>
          </select>
        </label>
        <label class="block mb-4 text-[var(--silver)]">
          Danger level (1 to 5)
          <input name="dangerLevel" type="number" min="1" max="5" step="1" class="field" placeholder="3" required />
        </label>
        <label class="block mb-6 text-[var(--silver)]">
          Release year
          <input name="year" type="number" min="1950" max="1969" step="1" class="field" placeholder="1957" required />
        </label>
        <button type="submit" class="btn btn-lipstick w-full py-3 px-4 text-lg">Add to the archive</button>
      </form>
    </aside>
  `;
}


