// SkillSprint Pro — volwassen PWA met micro-skills & tools (localStorage)
(function(){
  // Categories voor werkvaardigheden
  const CATS = ['AI Prompting','E-mail & Schrijven','Meetings','Beslissen & Probleemoplossing','Data & Onderzoek','Focus & Productiviteit'];

  // 30 micro-skills (elk 2–3 stappen)
  const SKILLS = [
    // AI Prompting (6)
    {id:'ai_prompt_structure',cat:'AI Prompting',title:'Prompt structuur: Rol + Doel + Context + Output',minutes:2,steps:[
      {type:'explainer',text:'Gebruik ROL (wie spreek je aan), DOEL (wat wil je bereiken), CONTEXT (voor wie/waarom), OUTPUTVORM (lijst/stappen).'},
      {type:'input',label:'Schrijf een prompt met alle elementen',placeholder:'Bijv: Je bent projectleider... Maak een lijst met 5 risico’s ...',score:'prompt'}]},
    {id:'ai_prompt_iterate',cat:'AI Prompting',title:'Iteratief verbeteren (3 ronden)',minutes:2,steps:[
      {type:'explainer',text:'Vraag: 1) Eerste versie → 2) Kritiek vragen → 3) Verbeterde versie met criteria.'},
      {type:'input',label:'Schrijf een 1e prompt, voeg daarna criteria toe',placeholder:'Bijv: Geef een plan... voeg criteria: tijd, budget, impact',score:'prompt'}]},
    {id:'ai_prompt_constraints',cat:'AI Prompting',title:'Constraints: tijd, budget, toon',minutes:2,steps:[
      {type:'explainer',text:'Beperkingen helpen AI betere keuzes te maken: tijd (30m), budget (€500), toon (professioneel).'},
      {type:'input',label:'Voeg 2 beperkingen toe',placeholder:'Bijv: Max 200 woorden, vriendelijke tone of voice',score:'prompt'}]},
    {id:'ai_prompt_examples',cat:'AI Prompting',title:'Voorbeelden & anti-voorbeelden',minutes:2,steps:[
      {type:'explainer',text:'Vraag om 1 voorbeeld *en* 1 anti-voorbeeld zodat AI grenzen begrijpt.'},
      {type:'input',label:'Schrijf prompt met voorbeeld en anti-voorbeeld',placeholder:'Bijv: Toon 1 goede en 1 slechte variant',score:'prompt'}]},
    {id:'ai_prompt_summary',cat:'AI Prompting',title:'Samenvatten voor publiek (kind/manager/technisch)',minutes:2,steps:[
      {type:'explainer',text:'Laat AI samenvatten voor een specifiek publiek; dat dwingt concreetheid.'},
      {type:'input',label:'Schrijf een samenvattingsprompt met target publiek',placeholder:'Bijv: Vat samen voor een manager in 5 bullets',score:'prompt'}]},
    {id:'ai_prompt_reflection',cat:'AI Prompting',title:'Reflectie: wat mis je nog?',minutes:2,steps:[
      {type:'explainer',text:'Laat AI 3 kritische vragen stellen over je probleem; beantwoord ze en verbeter.'},
      {type:'input',label:'Schrijf prompt die om kritische vragen vraagt',placeholder:'Bijv: Stel 3 kritische vragen voordat je een plan maakt',score:'prompt'}]},

    // E-mail & Schrijven (5)
    {id:'mail_subject',cat:'E-mail & Schrijven',title:'Subject-lines die werken',minutes:2,steps:[
      {type:'explainer',text:'Kort (≤8 woorden), duidelijk doel, relevante context. Vermijd “FYI” zonder inhoud.'},
      {type:'input',label:'Schrijf 3 onderwerpregels voor één mail',placeholder:'Bijv: Concept planning Q1 — akkoord nodig voor vrijdag',score:'email'}]},
    {id:'mail_structure',cat:'E-mail & Schrijven',title:'Structuur: context → vraag → actie → deadline',minutes:2,steps:[
      {type:'explainer',text:'Begin met 1 zin context, 1 vraag, 1 duidelijke actie, 1 deadline.'},
      {type:'input',label:'Plak je mail of schrijf een korte',placeholder:'Bijv: Context + Vraag + Actie + Deadline',score:'email'}]},
    {id:'mail_tone',cat:'E-mail & Schrijven',title:'Toon: professioneel & vriendelijk',minutes:2,steps:[
      {type:'explainer',text:'Gebruik “kun je” i.p.v. “je moet”; toon empathie en duidelijkheid.'},
      {type:'input',label:'Herschrijf een strenge mail naar vriendelijk-professioneel',placeholder:'Plak tekst...',score:'email'}]},
    {id:'write_clarity',cat:'E-mail & Schrijven',title:'Schrijf helder: 20–25 woorden per zin',minutes:2,steps:[
      {type:'explainer',text:'Korte zinnen, actieve werkwoorden, concrete voorbeelden.'},
      {type:'input',label:'Herschrijf een alinea naar plain language',placeholder:'Plak alinea...',score:'plain'}]},
    {id:'write_bullets',cat:'E-mail & Schrijven',title:'Maak bullets (3–5) i.p.v. lange tekst',minutes:2,steps:[
      {type:'explainer',text:'Bullets versnellen lezen en beslissen.'},
      {type:'input',label:'Zet een lange zin om naar bullets',placeholder:'Plak tekst...',score:'plain'}]},

    // Meetings (4)
    {id:'meet_agenda',cat:'Meetings',title:'Agenda met doelen & tijdslots',minutes:2,steps:[
      {type:'explainer',text:'Noteer elk agendapunt met werkwoord + tijd + gewenste uitkomst.'},
      {type:'input',label:'Maak een mini-agenda (3 punten)',placeholder:'1) Beslis over X (10m)...',score:'agenda'}]},
    {id:'meet_outcomes',cat:'Meetings',title:'Uitkomsten & follow-up',minutes:2,steps:[
      {type:'explainer',text:'Formuleer per punt: beslissing/actie/owner/deadline.'},
      {type:'input',label:'Schrijf 3 follow-up items',placeholder:'Actie, eigenaar, deadline',score:'agenda'}]},
    {id:'meet_notes',cat:'Meetings',title:'Kernnotities in 5 bullets',minutes:2,steps:[
      {type:'explainer',text:'Schrijf alleen beslissingen, actiepunten, blockers.'},
      {type:'input',label:'Maak 5 bullets van je notities',placeholder:'• ...',score:'plain'}]},
    {id:'meet_brief',cat:'Meetings',title:'Voorbereiding: briefing in 4 zinnen',minutes:2,steps:[
      {type:'explainer',text:'Wat/waarom/wie/wanneer. Klaar.'},
      {type:'input',label:'Schrijf 4 zinnen briefing',placeholder:'Wat, waarom, wie, wanneer',score:'plain'}]},

    // Beslissen & Probleemoplossing (5)
    {id:'dec_procon',cat:'Beslissen & Probleemoplossing',title:'Pro’s & con’s met criteriascore',minutes:2,steps:[
      {type:'explainer',text:'Kies 3 criteria (kosten, impact, risico). Scoor elk 1–5.'},
      {type:'input',label:'Schrijf pro’s & con’s + 3 criteria',placeholder:'Pro:..., Con:..., Criterium:...',score:'decision'}]},
    {id:'dec_pitch',cat:'Beslissen & Probleemoplossing',title:'1‑minuut pitch van je keuze',minutes:2,steps:[
      {type:'explainer',text:'Verdediging: probleem → optie → reden → risico → besluit.'},
      {type:'input',label:'Schrijf jouw pitch',placeholder:'In 5 korte zinnen',score:'plain'}]},
    {id:'dec_assumptions',cat:'Beslissen & Probleemoplossing',title:'Assumpties & checks',minutes:2,steps:[
      {type:'explainer',text:'Schrijf 3 aannames en hoe je ze test.'},
      {type:'input',label:'Noem 3 aannames + test',placeholder:'Aannames:..., Test:...',score:'plain'}]},
    {id:'dec_risks',cat:'Beslissen & Probleemoplossing',title:'Risicologboek (top 3)',minutes:2,steps:[
      {type:'explainer',text:'Formuleer risico + mitigatie + eigenaar.'},
      {type:'input',label:'Schrijf 3 risico’s + mitigatie',placeholder:'Risico:..., Mitigatie:...',score:'plain'}]},
    {id:'dec_matrix',cat:'Beslissen & Probleemoplossing',title:'Beslismatrix (2 opties)',minutes:2,steps:[
      {type:'explainer',text:'Scoor opties op criteria en kies hoogste totaal.'},
      {type:'input',label:'Maak matrix met 2 opties',placeholder:'Optie A/B + score per criterium',score:'decision'}]},

    // Data & Onderzoek (5)
    {id:'data_query',cat:'Data & Onderzoek',title:'Heldere vraag aan data',minutes:2,steps:[
      {type:'explainer',text:'Definieer variabelen, periode, doelgroep; stel 1 duidelijke vraag.'},
      {type:'input',label:'Formuleer je data-vraag',placeholder:'Bijv: Hoe veranderde X per maand...',score:'plain'}]},
    {id:'data_metric',cat:'Data & Onderzoek',title:'Maak een metric definitie',minutes:2,steps:[
      {type:'explainer',text:'Definieer naam, formule, bron, frequentie.'},
      {type:'input',label:'Schrijf jouw metric',placeholder:'Naam, formule, bron, frequentie',score:'plain'}]},
    {id:'data_read',cat:'Data & Onderzoek',title:'Lees een tabel: 3 inzichten',minutes:2,steps:[
      {type:'explainer',text:'Lees trends, outliers, vergelijkingen.'},
      {type:'input',label:'Schrijf 3 inzichten',placeholder:'Inzicht 1/2/3',score:'plain'}]},
    {id:'data_hypothesis',cat:'Data & Onderzoek',title:'Hypothese & test',minutes:2,steps:[
      {type:'explainer',text:'Schrijf hypothese en hoe je die test (A/B, correlatie).'},
      {type:'input',label:'Formuleer hypothese + test',placeholder:'Als..., dan..., test:...',score:'plain'}]},
    {id:'data_chart',cat:'Data & Onderzoek',title:'Kies juiste grafiek',minutes:2,steps:[
      {type:'explainer',text:'Vergelijking → bar; trend → line; deel van geheel → pie/donut; distributie → histogram.'},
      {type:'input',label:'Kies grafiek voor jouw case',placeholder:'Case + grafiekkeuze',score:'plain'}]},

    // Focus & Productiviteit (5)
    {id:'focus_pomodoro',cat:'Focus & Productiviteit',title:'Pomodoro 25/5 routine',minutes:2,steps:[
      {type:'explainer',text:'Plan 3 blokken van 25m met 5m pauze, en een mini-beloning.'},
      {type:'input',label:'Maak jouw 3 blokken',placeholder:'Taak + tijd + beloning',score:'plain'}]},
    {id:'focus_triage',cat:'Focus & Productiviteit',title:'Prioriteiten: nu / later / nooit',minutes:2,steps:[
      {type:'explainer',text:'Triage taken in 3 buckets; zeg hardop “nooit” tegen ruis.'},
      {type:'input',label:'Verdeel 9 taken in 3 buckets',placeholder:'Nu:..., Later:..., Nooit:...',score:'plain'}]},
    {id:'focus_templates',cat:'Focus & Productiviteit',title:'Snel templates gebruiken',minutes:2,steps:[
      {type:'explainer',text:'Herbruikbare sjablonen voor mail, agenda, besluit schelen minuten.'},
      {type:'input',label:'Maak 1 eigen template',placeholder:'Bijv: Follow-up mail',score:'plain'}]},
    {id:'focus_blockers',cat:'Focus & Productiviteit',title:'Blockers & vraag om hulp',minutes:2,steps:[
      {type:'explainer',text:'Schrijf blokker + wie kan helpen + 1e stap.'},
      {type:'input',label:'Formuleer hulpvraag',placeholder:'Blokker, persoon, 1e stap',score:'plain'}]},
    {id:'focus_endofday',cat:'Focus & Productiviteit',title:'Einde‑dag: 3 highlights & morgen 1e taak',minutes:2,steps:[
      {type:'explainer',text:'Schrijf 3 dingen die je afrondde en 1e taak voor morgen.'},
      {type:'input',label:'3 highlights + 1e taak',placeholder:'• • • + morgen: ...',score:'plain'}]}
  ];

  // State & storage
  const state = { user:null, xp:0, badges:[], progress:{} };
  const BADGES = [
    {id:'starter',name:'Starter',xp:80},
    {id:'inbox',name:'Mail Meester',xp:180},
    {id:'prompt',name:'Prompt Pro',xp:300},
    {id:'meeting',name:'Meeting Ninja',xp:420},
    {id:'data',name:'Data Detective',xp:560},
    {id:'master',name:'Skill Master',xp:800}
  ];

  const el = s=>document.querySelector(s);
  const save = ()=> localStorage.setItem('skillsprint_pro', JSON.stringify(state));
  const load = ()=> { try{ Object.assign(state, JSON.parse(localStorage.getItem('skillsprint_pro')||'{}')); }catch(e){} };
  function setUser(name){ state.user={name:name||'Professional', avatar:'🧠'}; save(); }

  // Scoring engines (heuristiek, offline)
  function scorePrompt(t){
    t=(t||'').trim();
    const hasRole = /(je bent|as a|rol|role)/i.test(t);
    const hasGoal = /(doel|goal|wil|beoog|plan)/i.test(t);
    const hasContext = /(voor |publiek|manager|klant|kind|niveau|toon)/i.test(t);
    const hasOutput = /(lijst|stappenplan|bullets|tabel|samenvatting)/i.test(t);
    const hasConstraints = /(max|min|binnen|budget|tijd|deadline|woorden)/i.test(t);
    const lengthOK = t.length>=40;
    const features = [hasRole,hasGoal,hasContext,hasOutput,hasConstraints,lengthOK].filter(Boolean).length;
    let score='Goed'; if(features>=4) score='Beter'; if(features>=5) score='Geniaal';
    const tips=[];
    if(!hasRole) tips.push('Voeg een ROL toe (bijv. “Je bent projectleider…”).');
    if(!hasGoal) tips.push('Zet een duidelijk DOEL.');
    if(!hasContext) tips.push('Geef CONTEXT (voor wie, welke toon).');
    if(!hasOutput) tips.push('Vraag een OUTPUTVORM (bullets/stappen).');
    if(!hasConstraints) tips.push('Voeg 1 beperking toe (max woorden/tijd/budget).');
    if(!lengthOK) tips.push('Maak je prompt iets langer en specifieker.');
    const improved = `Je bent [rol]. Doel: [doel]. Context: [publiek/toon]. Geef een ${hasOutput?'stappenplan':'lijst'} met 5 bullets en 1 voorbeeld. Beperk tot 180 woorden.`;
    return {score,tips,improved};
  }

  function scoreEmail(t){
    t=(t||'').trim();
    const hasContext = /(zoals besproken|naar aanleiding|context|samenvatting)/i.test(t) || t.split('\n').length>2;
    const hasAsk = /(graag|kun je|wil je|verzoek|actie)/i.test(t);
    const hasDeadline = /(voor|vóór|deadline|vrijdag|datum)/i.test(t);
    const hasBullets = /(\n-|\n\*|\n\d+\)/.test(t);
    const lengthOK = t.split(' ').length<=180;
    let features=[hasContext,hasAsk,hasDeadline,hasBullets,lengthOK].filter(Boolean).length;
    let score='Goed'; if(features>=3) score='Beter'; if(features>=4) score='Geniaal';
    const tips=[];
    if(!hasContext) tips.push('Begin met 1 zin context.');
    if(!hasAsk) tips.push('Formuleer 1 duidelijke vraag/actie.');
    if(!hasDeadline) tips.push('Voeg een deadline toe.');
    if(!hasBullets) tips.push('Gebruik bullets voor leesbaarheid.');
    if(!lengthOK) tips.push('Kort je mail in (<180 woorden).');
    const improved = `Context: [1 zin].\n- Actie: [wat]\n- Owner: [wie]\n- Deadline: [datum]\nBedankt en laat weten als iets ontbreekt.`;
    return {score,tips,improved};
  }

  function scoreAgenda(t){
    t=(t||'').trim();
    const items = t.split('\n').filter(x=>x.trim());
    const verbs = /(beslis|review|plan|update|brainstorm|kies|bepaal|verdeel)/i;
    const hasVerbs = items.every(x=>verbs.test(x));
    const hasOutcome = /(uitkomst|doel|beslissing|resultaat)/i.test(t);
    const hasTime = /(\d+m|\d+ min|\d+:\d+)/i.test(t);
    const features=[hasVerbs,hasOutcome,hasTime,items.length>=3].filter(Boolean).length;
    let score='Goed'; if(features>=3) score='Beter'; if(features>=4) score='Geniaal';
    const tips=[];
    if(!hasVerbs) tips.push('Begin elk punt met een werkwoord (Beslis/Review/Plan).');
    if(!hasOutcome) tips.push('Voeg gewenste uitkomst per punt toe.');
    if(!hasTime) tips.push('Geef tijdsblokken (bijv. 10m).');
    if(items.length<3) tips.push('Maak tenminste 3 agendapunten.');
    const improved = `1) Beslis over [onderwerp] (10m) — uitkomst: beslissing\n2) Review [X] (8m) — uitkomst: akkoord/niet\n3) Plan taken (7m) — uitkomst: owners + deadlines`;
    return {score,tips,improved};
  }

  function scorePlain(t){
    t=(t||'').trim();
    const words = t.split(/\s+/).length;
    const avgSentence = t.split(/[.!?]/).map(s=>s.trim().split(/\s+/).length).filter(n=>n>0);
    const avgLen = avgSentence.reduce((a,b)=>a+b,0)/(avgSentence.length||1);
    const hasBullets = /(\n-|\n\*|\n\d+\)/.test(t);
    let score='Goed';
    if(avgLen<=22 && words>=25) score='Beter';
    if(avgLen<=20 && hasBullets) score='Geniaal';
    const tips=[];
    if(avgLen>22) tips.push('Maak kortere zinnen (≤20 woorden).');
    if(!hasBullets) tips.push('Gebruik bullets voor structuur.');
    if(words<25) tips.push('Voeg 1–2 concrete voorbeelden toe.');
    const improved = `Schrijf in korte zinnen. Gebruik bullets:\n- Doel\n- Actie\n- Deadline\nVoeg 1 voorbeeld toe.`;
    return {score,tips,improved};
  }

  function scoreDecision(t){
    t=(t||'').trim();
    const hasPros = /pro|voordeel/iu.test(t);
    const hasCons = /con|nadeel/iu.test(t);
    const hasCriteria = /criterium|score|weging|impact|kosten|risico/iu.test(t);
    const hasChoice = /keuze|we kiezen|advies/iu.test(t);
    let score='Goed';
    const features=[hasPros,hasCons,hasCriteria,hasChoice].filter(Boolean).length;
    if(features>=3) score='Beter'; if(features>=4) score='Geniaal';
    const tips=[];
    if(!hasPros) tips.push('Noem minstens 2 voordelen.');
    if(!hasCons) tips.push('Noem minstens 2 nadelen.');
    if(!hasCriteria) tips.push('Voeg criteria met scores toe (kosten/impact/risico).');
    if(!hasChoice) tips.push('Formuleer een duidelijke keuze/advies.');
    const improved = `Pro: ... / Con: ...\nCriteria (1–5): kosten:_, impact:_, risico:_\nKeuze: [A of B] + reden.`;
    return {score,tips,improved};
  }

  function scoreByType(type, text){
    if(type==='prompt') return scorePrompt(text);
    if(type==='email') return scoreEmail(text);
    if(type==='agenda') return scoreAgenda(text);
    if(type==='decision') return scoreDecision(text);
    return scorePlain(text);
  }

  function addXP(n){ state.xp=(state.xp||0)+n; BADGES.forEach(b=>{ if(state.xp>=b.xp && !state.badges.includes(b.name)) state.badges.push(b.name); }); save(); }
  function markProgress(id,payload){ state.progress[id]=Object.assign({status:'in_progress', attempts:0, score:0}, state.progress[id]||{}, payload); save(); }

  // Router
  function route(){
    const path = (location.hash||'#/').replace('#','');
    const base = path.split('?')[0];
    if(base==='/skills') renderSkills();
    else if(base.startsWith('/skill/')) renderSkill(base.split('/')[2]);
    else if(base==='/tools') renderTools();
    else if(base==='/rewards') renderRewards();
    else if(base==='/profile') renderProfile();
    else renderHome();
    document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
    if(base.startsWith('/skill/')||base==='/skills') el('#nav-skills').classList.add('active');
    else if(base==='/tools') el('#nav-tools').classList.add('active');
    else if(base==='/rewards') el('#nav-rewards').classList.add('active');
    else if(base==='/profile') el('#nav-profile').classList.add('active');
    else el('#nav-home').classList.add('active');
  }

  // Pages
  function renderHome(){
    const last = Object.keys(state.progress||{}).filter(id=>state.progress[id]?.status==='completed').pop();
    const suggestion = SKILLS[Math.floor(Math.random()*SKILLS.length)];
    el('#app').innerHTML = `
      <section class='card'>
        <h2>Welkom ${state.user?.name||'Professional'} 👋</h2>
        <p class='hint'>Word elke dag in <strong>2 minuten</strong> beter — met directe AI‑coaching (offline heuristiek).</p>
        <div class='grid cols-3'>
          <div>
            <label>XP</label>
            <div class='progress'><span style='width:${Math.min(100,(state.xp||0)/8)}%'></span></div>
            <p class='hint'>${state.xp||0} XP • Badges: ${(state.badges||[]).join(', ')||'—'}</p>
          </div>
          <div>
            <label>Laatst voltooid</label>
            <p>${last?SKILLS.find(x=>x.id===last)?.title:'—'}</p>
          </div>
          <div>
            <label>Dagelijkse suggestie</label>
            <p>${suggestion.title} <span class='badge'>${suggestion.cat}</span></p>
            <button class='btn' onclick="location.hash='#/skill/${suggestion.id}'">Start (2 min)</button>
          </div>
        </div>
        <div style='margin-top:12px'>
          <button class='btn' onclick="location.hash='#/skills'">Bekijk alle skills</button>
          <button class='btn secondary' onclick="location.hash='#/tools'">Open tools</button>
        </div>
      </section>`;
  }

  function renderSkills(){
    const filters = CATS.map(c=>`<button class='badge' onclick="window.__filter('${c}')">${c}</button>`).join(' ');
    const list = SKILLS.map(s=>{
      const prog = state.progress[s.id];
      const status = prog?.status==='completed'?'✅ voltooid':'▶️ klaar om te starten';
      return `<div class='card'>
        <h3>${s.title}</h3>
        <p><span class='badge'>${s.cat}</span> <span class='badge'>~${s.minutes} min</span></p>
        <p class='hint'>${status}</p>
        <button class='btn' onclick="location.hash='#/skill/${s.id}'">Start</button>
      </div>`;
    }).join('');
    el('#app').innerHTML = `<section class='card'><h2>Skills</h2><p>${filters}</p></section><section>${list}</section>`;
  }

  window.__filter = function(cat){
    const filtered = SKILLS.filter(s=>s.cat===cat);
    const list = filtered.map(s=>`<div class='card'><h3>${s.title}</h3><p><span class='badge'>${s.cat}</span> <span class='badge'>~${s.minutes} min</span></p><button class='btn' onclick="location.hash='#/skill/${s.id}'">Start</button></div>`).join('');
    el('#app').innerHTML = `<section><h2>${cat}</h2>${list}</section>`;
  };

  function renderSkill(id){
    const s = SKILLS.find(x=>x.id===id);
    if(!s){ el('#app').innerHTML = `<section class='card'>Skill niet gevonden.</section>`; return; }
    el('#app').innerHTML = `<section class='card'>
      <h2>${s.title}</h2>
      ${s.steps.map((st,idx)=>renderStep(s, st, idx)).join('')}
    </section>`;
  }

  function renderStep(skill, step, idx){
    if(step.type==='explainer'){
      return `<div class='card'><h3>Uitleg (45s)</h3><p>${step.text}</p></div>`;
    }
    if(step.type==='input'){
      const typeAttr = step.score||'plain';
      return `<div class='card'>
        <h3>Oefening</h3>
        <label>${step.label}</label>
        <textarea id='inp-${skill.id}-${idx}' class='input' rows='4' placeholder='${step.placeholder||''}'></textarea>
        <div style='margin-top:8px'>
          <button class='btn' onclick="window.__coach('${skill.id}', ${idx}, '${typeAttr}')">Coach feedback</button>
        </div>
        <div id='res-${skill.id}-${idx}'></div>
      </div>`;
    }
    return '';
  }

  window.__coach = function(skillId, idx, type){
    const val = (document.getElementById(`inp-${skillId}-${idx}`)||{}).value||'';
    const {score,tips,improved} = scoreByType(type, val);
    markProgress(skillId,{status:'in_progress', attempts:(state.progress[skillId]?.attempts||0)+1, score: score==='Geniaal'?3:score==='Beter'?2:1});
    const box = document.getElementById(`res-${skillId}-${idx}`);
    box.innerHTML = `<div class='card'>
      <p><strong>Score:</strong> ${score}</p>
      <p><strong>Tips:</strong> ${tips.map(t=>`<span class='badge'>${t}</span>`).join(' ')||'—'}</p>
      <p><strong>Verbeterde versie:</strong><br>${improved}</p>
      <button class='btn success' onclick="window.__complete('${skillId}')">Markeer als voltooid (+40 XP)</button>
    </div>`;
    save();
  };

  window.__complete = function(skillId){
    markProgress(skillId,{status:'completed'});
    addXP(40);
    alert('Top! Skill voltooid. +40 XP');
    location.hash = '#/rewards';
  };

  // Tools page: directe hulp (geen XP, wel nuttig)
  function renderTools(){
    el('#app').innerHTML = `
      <section class='card'>
        <h2>Tools</h2>
        <p class='hint'>Snelle hulp voor dagelijks werk: mail, prompt, agenda, samenvatting, beslissing.</p>
      </section>
      ${toolCard('Email Fixer','Plak een ruwe mail, krijg een nette versie','mail')}
      ${toolCard('Prompt Generator','Maak een krachtige prompt van jouw vraag','prompt')}
      ${toolCard('Agenda Builder','Maak een korte meetingagenda','agenda')}
      ${toolCard('Summary Maker','Maak bullets van een lange tekst','plain')}
      ${toolCard('Decision Helper','Pro/Con + criteria + advies','decision')}
    `;
  }

  function toolCard(title,desc,type){
    const id = 'tool_'+title.replace(/\s+/g,'_');
    return `<section class='card'>
      <h3>${title}</h3>
      <p class='hint'>${desc}</p>
      <textarea id='${id}' class='input' rows='5' placeholder='Plak of schrijf hier...'></textarea>
      <div style='margin-top:8px'>
        <button class='btn' onclick="window.__tool('${id}','${type}')">Genereer</button>
      </div>
      <div id='res_${id}'></div>
    </section>`;
  }

  window.__tool = function(id,type){
    const val = (document.getElementById(id)||{}).value||'';
    const {improved,tips} = scoreByType(type,val);
    el(`#res_${id}`).innerHTML = `<div class='card'><p><strong>Resultaat</strong></p><pre style='white-space:pre-wrap'>${improved}</pre><p class='hint'>${(tips||[]).join(' • ')}</p></div>`;
  };

  function renderRewards(){
    el('#app').innerHTML = `
      <section class='card'>
        <h2>Beloningen</h2>
        <label>XP</label>
        <div class='progress'><span style='width:${Math.min(100,(state.xp||0)/8)}%'></span></div>
        <p class='hint'>${state.xp||0} XP</p>
        <h3>Badges</h3>
        <div>${BADGES.map(b=>`<span class='badge'>${b.name} ${state.xp>=b.xp?'✅':''}</span>`).join(' ')}</div>
      </section>`;
  }

  function renderProfile(){
    el('#app').innerHTML = `
      <section class='card'>
        <h2>Profiel</h2>
        <label>Naam</label>
        <input id='name' class='input' value='${state.user?.name||''}' placeholder='Jouw naam'>
        <div style='margin-top:8px'><button class='btn' onclick='window.__saveName()'>Opslaan</button></div>
        <h3 style='margin-top:16px'>Voortgang</h3>
        <div>${Object.keys(state.progress||{}).map(id=>{
          const p = state.progress[id];
          const title = SKILLS.find(x=>x.id===id)?.title||id;
          return `<div class='card'><strong>${title}</strong><br>Status: ${p.status} • Pogingen: ${p.attempts||0}</div>`;
        }).join('')||'Nog geen voortgang'}</div>
        <div style='margin-top:16px' class='grid cols-2'>
          <button class='btn secondary' onclick='window.__export()'>Export voortgang</button>
          <button class='btn warn' onclick='window.__import()'>Import (.json)</button>
        </div>
      </section>`;
  }

  window.__saveName = function(){ const v=(document.getElementById('name')||{}).value||'Professional'; setUser(v); alert('Naam opgeslagen.'); };
  window.__export = function(){ const data = JSON.stringify(state,null,2); const blob = new Blob([data],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='skillsprint_pro_progress.json'; a.click(); };
  window.__import = function(){ const inp=document.createElement('input'); inp.type='file'; inp.accept='.json'; inp.onchange=()=>{ const f=inp.files[0]; const r=new FileReader(); r.onload=()=>{ try{ const obj=JSON.parse(r.result); Object.assign(state,obj); save(); alert('Geïmporteerd!'); route(); }catch(e){ alert('Import mislukt.'); } }; r.readAsText(f); }; inp.click(); };

  // init
  load(); if(!state.user) setUser('Professional');
  window.addEventListener('hashchange', route); route();
})();
