import "./styles.css";

// Retourne le HTML de la liste avec la recherche, le compteur et le tableau.
export default function getTemplate() {
  return `
    <div class="monster-add"></div>
    <section class="monster-archive deco-frame p-6 bg-[var(--murk)]/40">
      <div class="flex flex-wrap justify-between items-baseline gap-2 mb-5">
        <h2 class="display text-2xl">The archive</h2>
        <p class="text-[var(--silver)]">
          Creatures on file :
          <span id="monsterCount" class="display text-2xl text-[var(--gold)]">0</span>
        </p>
      </div>
      <input type="search" class="search field mb-5" aria-label="Search by name or type" placeholder="Search by name or type" />
      <p class="list-message mb-4" role="status"></p>
      <div class="overflow-x-auto">
        <table class="monsters-table w-full">
          <thead>
            <tr>
              <th class="text-left p-3"><a href="#" data-sort="name">Name</a></th>
              <th class="text-left p-3"><a href="#" data-sort="type">Type</a></th>
              <th class="text-left p-3"><a href="#" data-sort="dangerLevel">Danger</a></th>
              <th class="text-left p-3"><a href="#" data-sort="year">Year</a></th>
              <th class="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
  `;
}

