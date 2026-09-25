const appState = {
  players: [
    {
      name: 'Nico Varela',
      club: 'Union Nord',
      position: '6',
      league: 'Top Division',
      age: 23,
      fit: 92,
      roleFit: 95,
      tacticalFit: 90,
      development: 87,
      confidence: 81,
      radar: { pressure: 88, passing: 91, transition: 85, defense: 80, offBall: 84 },
      note: 'Schnell im ersten Kontakt, klarer Progressionswinkel, hohe Pressingresistenz.',
      radarFlag: 'Under-the-radar'
    },
    {
      name: 'Youssef Madi',
      club: 'Rheinstadt FC',
      position: 'RW',
      league: 'Second Division',
      age: 21,
      fit: 89,
      roleFit: 90,
      tacticalFit: 88,
      development: 94,
      confidence: 73,
      radar: { pressure: 79, passing: 82, transition: 93, defense: 68, offBall: 90 },
      note: 'Explosiv in Transition, gutes Timing im Rückenlauf, aber begrenzte Videoabdeckung.',
      radarFlag: 'High upside'
    },
    {
      name: 'Leon Hartmann',
      club: 'Nordstern',
      position: 'CB',
      league: 'Top Division',
      age: 28,
      fit: 84,
      roleFit: 86,
      tacticalFit: 92,
      development: 62,
      confidence: 89,
      radar: { pressure: 75, passing: 79, transition: 82, defense: 91, offBall: 77 },
      note: 'Absicherung und Linienkontrolle stark; eher kurzer Entwicklungshorizont.',
      radarFlag: 'System fit'
    },
    {
      name: 'Samir Okeke',
      club: 'Hansa Sol',
      position: '8',
      league: 'Third Division',
      age: 19,
      fit: 86,
      roleFit: 83,
      tacticalFit: 81,
      development: 96,
      confidence: 67,
      radar: { pressure: 72, passing: 83, transition: 89, defense: 76, offBall: 88 },
      note: 'Frühe Vertikalität und gutes Raumgefühl, aber noch schwankende Gegnerqualität.',
      radarFlag: 'Emerging'
    },
    {
      name: 'Diego Santos',
      club: 'Atalin',
      position: '9',
      league: 'Top Division',
      age: 25,
      fit: 81,
      roleFit: 78,
      tacticalFit: 84,
      development: 70,
      confidence: 85,
      radar: { pressure: 68, passing: 71, transition: 77, defense: 60, offBall: 75 },
      note: 'Zuverlässiger Strafraumspieler, aber weniger geeignet für viel rotierten Aufbau.',
      radarFlag: 'Target man'
    }
  ],
  filters: {
    position: 'all',
    league: 'all',
    minAge: 0,
    maxAge: 40,
    minFit: 0,
    underRadar: false
  },
  dna: {
    pressing: 74,
    buildUp: 80,
    lineHeight: 68,
    transition: 76,
    tempo: 72,
    budget: 58,
    agePreference: 64
  }
};

function initCommonNavigation() {
  const current = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === current) {
      link.classList.add('active');
    }
  });
}

function animateFadeIns() {
  document.querySelectorAll('[data-fade]').forEach((el, index) => {
    el.style.animationDelay = `${index * 60}ms`;
    el.classList.add('fade-in');
  });
}

function setText(selector, value) {
  const target = document.querySelector(selector);
  if (target) target.textContent = value;
}

function renderPlayersTable() {
  const tableBody = document.querySelector('[data-player-table]');
  if (!tableBody) return;

  const filtered = appState.players.filter((player) => {
    const positionMatch = appState.filters.position === 'all' || player.position === appState.filters.position;
    const leagueMatch = appState.filters.league === 'all' || player.league === appState.filters.league;
    const ageMatch = player.age >= appState.filters.minAge && player.age <= appState.filters.maxAge;
    const fitMatch = player.fit >= appState.filters.minFit;
    const radarMatch = !appState.filters.underRadar || player.fit <= 88 || player.confidence < 80;
    return positionMatch && leagueMatch && ageMatch && fitMatch && radarMatch;
  });

  tableBody.innerHTML = filtered.map((player) => `
    <tr data-player-row="${player.name}">
      <td>
        <div class="row-name">
          <div class="avatar">${player.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
          <div>
            <strong>${player.name}</strong>
            <div class="subtle">${player.club}</div>
          </div>
        </div>
      </td>
      <td>${player.position}</td>
      <td>${player.league}</td>
      <td>${player.age}</td>
      <td><span class="badge info">${player.fit}%</span></td>
      <td>${player.roleFit}%</td>
      <td>${player.tacticalFit}%</td>
      <td>${player.development}%</td>
      <td>${player.confidence}%</td>
      <td><span class="badge ${player.radarFlag === 'Under-the-radar' ? 'good' : player.radarFlag === 'High upside' ? 'info' : 'warn'}">${player.radarFlag}</span></td>
    </tr>
  `).join('');

  const listLabel = document.querySelector('[data-player-count]');
  if (listLabel) listLabel.textContent = `${filtered.length} Kandidaten`;

  const topCandidate = filtered[0] ?? appState.players[0];
  renderComparePanel(topCandidate);
}

function renderComparePanel(player) {
  const panel = document.querySelector('[data-compare-panel]');
  if (!panel || !player) return;

  panel.innerHTML = `
    <div class="summary-card">
      <div class="meta-label">Top Match</div>
      <h3 style="margin: 8px 0 4px; font-family: 'Space Grotesk', system-ui, sans-serif;">${player.name}</h3>
      <div class="body-muted">${player.club} · ${player.position} · ${player.league} · ${player.age} Jahre</div>
      <div style="display:grid; gap:10px; margin-top:14px;">
        <div class="progress-step"><span>Club-Fit</span><span class="strong-value">${player.fit}%</span></div>
        <div class="bar"><span style="width:${player.fit}%"></span></div>
        <div class="progress-step"><span>Rollen-Fit</span><span class="strong-value">${player.roleFit}%</span></div>
        <div class="bar"><span style="width:${player.roleFit}%"></span></div>
        <div class="progress-step"><span>Taktischer Fit</span><span class="strong-value">${player.tacticalFit}%</span></div>
        <div class="bar"><span style="width:${player.tacticalFit}%"></span></div>
      </div>
      <p class="body-muted" style="margin-bottom:0; margin-top:14px;">${player.note}</p>
    </div>
    <div class="summary-card">
      <div class="meta-label">Evidenz</div>
      <div class="list" style="margin-top:12px;">
        <div class="tree-item"><strong>Starke Sequenzen</strong><span class="body-muted">${player.radar.pressure}% Pressingresistenz · ${player.radar.passing}% progressive Passauswahl</span></div>
        <div class="tree-item"><strong>Risikofaktoren</strong><span class="body-muted">Datenqualität ${player.confidence}% · Gegnerstärke nur mittel dokumentiert</span></div>
        <div class="tree-item"><strong>Video-Hinweis</strong><span class="body-muted">Broadcast-View zeigt ${player.radar.offBall}% Off-Ball-Sichtbarkeit</span></div>
      </div>
    </div>
  `;
}

function bindPlayerFilters() {
  const controls = document.querySelectorAll('[data-filter]');
  if (!controls.length) return;

  controls.forEach((control) => {
    control.addEventListener('change', () => {
      const key = control.dataset.filter;
      if (key === 'underRadar') {
        appState.filters.underRadar = control.checked;
      } else if (key === 'minAge') {
        appState.filters.minAge = Number(control.value);
        setText('[data-min-age]', control.value);
      } else if (key === 'maxAge') {
        appState.filters.maxAge = Number(control.value);
        setText('[data-max-age]', control.value);
      } else if (key === 'minFit') {
        appState.filters.minFit = Number(control.value);
        setText('[data-min-fit]', `${control.value}%`);
      } else {
        appState.filters[key] = control.value;
      }
      renderPlayersTable();
    });
  });
}

function initPlayersPage() {
  renderPlayersTable();
  bindPlayerFilters();
}

function bindDnASliders() {
  const sliders = document.querySelectorAll('[data-dna]');
  if (!sliders.length) return;

  const updateSummary = () => {
    Object.keys(appState.dna).forEach((key) => {
      const input = document.querySelector(`[data-dna="${key}"]`);
      if (input) {
        appState.dna[key] = Number(input.value);
        const output = document.querySelector(`[data-out="${key}"]`);
        if (output) output.textContent = `${input.value}%`;
      }
    });

    const avg = Math.round((appState.dna.pressing + appState.dna.buildUp + appState.dna.lineHeight + appState.dna.transition + appState.dna.tempo) / 5);
    setText('[data-dna-score]', `${avg}%`);
    setText('[data-dna-note]', avg > 76 ? 'aggressiv, mutig und vertikal' : avg > 64 ? 'balanciert und flexibel' : 'kontrolliert und konservativ');
  };

  sliders.forEach((slider) => slider.addEventListener('input', updateSummary));
  updateSummary();
}

function initClubPage() {
  bindDnASliders();
}

function initVideoPage() {
  const zone = document.querySelector('[data-upload-zone]');
  const input = document.querySelector('[data-upload-input]');
  const clipList = document.querySelector('[data-clip-list]');
  const stageBars = document.querySelectorAll('[data-stage]');

  const populateClip = (name) => {
    if (!clipList) return;
    clipList.innerHTML = `
      <div class="timeline-item">
        <strong>${name}</strong>
        <span class="tagline">1080p broadcast · 25fps · 92 min · ${new Date().toLocaleDateString()}</span>
        <div class="pills" style="margin-top:6px;">
          <span class="chip info">Ball tracking</span>
          <span class="chip good">Player ID ready</span>
          <span class="chip warn">Broadcast occlusion</span>
        </div>
      </div>
    `;
  };

  if (input) {
    input.addEventListener('change', () => {
      if (input.files?.length) {
        populateClip(input.files[0].name);
        advanceStages();
      }
    });
  }

  if (zone) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.remove('dragover');
      });
    });
    zone.addEventListener('drop', (event) => {
      const file = event.dataTransfer?.files?.[0];
      if (file) {
        populateClip(file.name);
        advanceStages();
      }
    });
    zone.addEventListener('click', () => input?.click());
  }

  const advanceStages = () => {
    stageBars.forEach((bar, index) => {
      bar.classList.remove('active', 'done');
      if (index < 2) bar.classList.add('done');
      if (index === 2) bar.classList.add('active');
    });
  };

  advanceStages();
}

function initReportsPage() {
  const reportCards = document.querySelector('[data-report-cards]');
  if (reportCards) {
    const reports = [
      {
        title: 'Under-the-radar shortlist',
        meta: '8 Kandidaten · 3 priorisiert',
        status: 'good',
        body: 'Konfiguriert für aggressives Pressing, mittleren Alterskorridor und moderates Budget.'
      },
      {
        title: 'Defensive rebuild',
        meta: '5 Kandidaten · 2 mit Video',
        status: 'info',
        body: 'Fokus auf Linienkontrolle, Restverteidigung und Kopfballstärke im eigenen Block.'
      },
      {
        title: 'Future value targets',
        meta: '12 Kandidaten · 4 U-22',
        status: 'warn',
        body: 'Hohe Entwicklung, aber geringe Datenmengen gegen starke Gegner; manuelle Verifikation empfohlen.'
      }
    ];

    reportCards.innerHTML = reports.map((report) => `
      <div class="report-card">
        <div class="pills" style="justify-content:space-between;">
          <span class="chip ${report.status}">${report.meta}</span>
          <span class="kbd">PDF</span>
        </div>
        <h3 style="margin: 14px 0 8px; font-family:'Space Grotesk', system-ui, sans-serif;">${report.title}</h3>
        <p class="body-muted">${report.body}</p>
      </div>
    `).join('');
  }
}

function initDashboard() {
  const cards = document.querySelectorAll('[data-dash-card]');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 70}ms`;
    card.classList.add('fade-in');
  });
}

function initPlatformPage() {
  const stack = document.querySelector('[data-stack]');
  if (stack) {
    stack.innerHTML = `
      <div class="code-card">
        <div class="meta-label">Ingestion</div>
        <pre>Football APIs / Video Uploads / Tracking APIs
      ↓
Normalisierung + Entity Resolution
      ↓
PostgreSQL + Video Store + Feature Store</pre>
      </div>
      <div class="code-card">
        <div class="meta-label">AI-Layer</div>
        <pre>Claude Haiku für Reports und Assistenz
Regeln + Metriken für transparente Scores
CV-Service für Tracking und Off-Ball-Signale</pre>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCommonNavigation();
  animateFadeIns();

  const page = document.body.dataset.page;
  if (page === 'dashboard') initDashboard();
  if (page === 'players') initPlayersPage();
  if (page === 'club') initClubPage();
  if (page === 'video') initVideoPage();
  if (page === 'reports') initReportsPage();
  if (page === 'platform') initPlatformPage();
});
