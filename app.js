
// Router met detailpagina en event delegation
const el = id => document.getElementById(id);

// Dummy dataset (kan later vervangen worden door jouw echte content)
const skills = Array.from({length: 30}).map((_, i) => ({
  id: i+1,
  title: `Skill ${i+1}`,
  intro: 'Praktijkopdracht, tips en mini-coach.',
  steps: [
    'Lees de opdracht',
    'Voer de actie uit in 10 minuten',
    'Noteer 1 inzicht',
    'Reflecteer met de coachvraag'
  ],
  coach: 'Wat zou je morgen 1% beter kunnen doen?'
}));

const routes = {
  '#/home': () => Home(),
  '#/skills': () => SkillsList(),
  '#/tools': () => Tools(),
  '#/profile': () => Profile(),
};

function render(html) { el('app').innerHTML = html; }

function Home() {
  return `
    <section class="card">
      <h2>Welkom, Frank 👋</h2>
      <p>Je PWA staat goed ingesteld voor GitHub Pages. Gebruik de navigatie om te testen.</p>
      <button class="btn" onclick="location.hash='#/skills'">Ga naar Skills</button>
    </section>
  `;
}

function SkillsList() {
  const cards = skills.map(s => `
    <div class='card'>
      <h3>${s.title}</h3>
      <p>${s.intro}</p>
      <button class='btn' data-skill-id='${s.id}'>Start</button>
    </div>
  `).join('');
  // Event delegation voor alle Start-knoppen
  setTimeout(() => {
    const container = el('app');
    container.onclick = (e) => {
      const btn = e.target.closest('[data-skill-id]');
      if (!btn) return;
      const id = Number(btn.getAttribute('data-skill-id'));
      location.hash = `#/skill/${id}`;
    };
  }, 0);
  return `<section><h2>Skills</h2><div class='grid'>${cards}</div></section>`;
}

function SkillDetail(id) {
  const s = skills.find(x => x.id === id);
  if (!s) return `<section class='card'><p>Onbekende skill.</p></section>`;
  const stepsHtml = s.steps.map((st, i) => `<li>${i+1}. ${st}</li>`).join('');
  return `
    <div class='breadcrumb'><askills← Terug naar Skills</a></div>
    <section class='card'>
      <h2>${s.title}</h2>
      <p>${s.intro}</p>
      <h3>Stappen</h3>
      <ol>${stepsHtml}</ol>
      <h3>Coachvraag</h3>
      <p class='small'>${s.coach}</p>
      <button class='btn' onclick="alert('Voortgang opgeslagen (demo)')">Markeer als afgerond</button>
    </section>
  `;
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

// Router die ook dynamische routes (#/skill/:id) ondersteunt
function router() {
  const hash = location.hash || '#/home';
  if (hash.startsWith('#/skill/')) {
    const id = Number(hash.split('/')[2]);
    render(SkillDetail(id));
    return;
  }
  const route = routes[hash] || Home;
  render(route());
}

window.addEventListener('hashchange', router);
window
