
// Eenvoudige hash-router, robuust voor GitHub Pages
const el = id => document.getElementById(id);

const routes = {
  '#/home': () => Home(),
  '#/skills': () => Skills(),
  '#/tools': () => Tools(),
  '#/profile': () => Profile(),
};

function render(content) {
  el('app').innerHTML = content;
}

function Home() {
  return `
    <section class="card">
      <h2>Welkom, Frank 👋</h2>
      <p>Je PWA staat goed ingesteld voor GitHub Pages. Gebruik de navigatie om te testen.</p>
      <button class="btn" onclick="location.hash='#/skills'">Ga naar Skills</button>
    </section>
  `;
}

function Skills() {
  const items = Array.from({length: 30}).map((_, i) => `
    <div class='card'>
      <h3>Skill ${i+1}</h3>
      <p>Praktijkopdracht, tips en mini-coach.</p>
      <button class='btn'>Start</button>
    </div>
  `).join('');
  return `<section><h2>Skills</h2><div class='grid'>${items}</div></section>`;
}

function Tools() {
  const tools = ['Focus Timer','Checklist','Note pad','Reflectie','Coach prompts'];
  return `<section><h2>Tools</h2>${tools.map(t=>`<div class='card'><strong>${t}</strong><p>Tool uitleg en acties.</p></div>`).join('')}</section>`;
}

function Profile() {
  return `
    <section class='card'>
      <h2>Profiel</h2>
      <p class='small'>Je voortgang kan later via Supabase worden gesynchroniseerd.</p>
    </section>
  `;
}

function router() {
  const hash = location.hash || '#/home';
  const route = routes[hash] || Home;
  render(route());
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// PWA offline support: bij eerste load cache de kernbestanden
