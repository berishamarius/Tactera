# K-Eye Football Intelligence

## Kurzbeschreibung
K-Eye Football Intelligence ist eine daten- und videobasierte Scouting-Intelligence-Plattform für Fußballvereine. Die Plattform bewertet Spieler nicht nur nach klassischen Statistiken, sondern nach Spielverhalten, taktischem Profil, Club-DNA, Kaderbedarf, Video-Signalen und Kontextdaten.

## Kernidee
Ein Verein beschreibt seine Spielidee, Rolle-Erwartungen, Budget, Transferfenster und Kaderbedarf. Das System übersetzt diese Eingaben in eine Club-DNA und Rollenprofile und gleicht sie mit verfügbaren Spielern ab.

Ziel ist nicht der statistisch beste Spieler, sondern der Spieler mit dem besten Fit für den konkreten Verein, die konkrete Liga und die konkrete Spielidee.

## Positionierung
Nicht: eine klassische Scouting-Bank oder eine reine Spielerdatenbank.

Sondern: ein vollständiges operatives System, das
- vereinsinterne Spielideen abbildet,
- Spieler daten- und video-basiert analysiert,
- Kandidaten mit dem eigenen Anforderungsmodell vergleicht,
- Unsicherheiten transparent macht,
- und Scouts mit begründeten Shortlists unterstützt.

## Problem
- Scouts müssen viele Spieler und Spiele manuell sichten.
- Klassische Statistiken bilden taktisches und Off-Ball-Verhalten nur begrenzt ab.
- Spieler aus weniger beachteten Ligen bleiben oft unter dem Radar.
- Ein hoher Statistikwert bedeutet nicht automatisch einen guten Fit für einen bestimmten Spielstil.
- Kleinere Vereine haben häufig weniger Scouting-Ressourcen.

## Produktlösung
- Club-DNA erstellen
- Anforderungsprofil für Positionen und Rollen definieren
- Spieler aus Datenquellen durchsuchen
- Spieler später auch per Video analysieren
- Spieler relativ zu Position, Liga, Alter und Spielniveau vergleichen
- Club-Fit statt nur allgemeines Spieler-Rating berechnen
- Shortlists mit Begründung, Risiken und Unsicherheiten erzeugen
- Spieler mit internen Referenzprofilen und historischen Club-Treffern vergleichen
- Scouts bei der Entscheidung unterstützen, nicht ersetzen

## Zielbild der Plattform
Die Oberfläche soll sich wie ein modernes Analyse-Cockpit anfühlen:
- globale Suche über Spieler, Teams, Ligen und Rollen
- filterbare Kandidatenlisten
- Player-Profile mit Radar, Trend, Video- und Ereignisansicht
- Club-DNA-Editor mit taktischen Reglern und Textfeldern
- Match-Engine mit erklärbarer Fit-Verteilung
- Evidence-Panel mit Datenherkunft, Konfidenz und Unsicherheiten
- Shortlist-Workspace für Scouts und sportliche Leitung
- Monitoring für Saisonverlauf, Form und Entwicklung

## Club-DNA
Mögliche Bestandteile:
- Formation
- Ballbesitz
- Pressing
- Defensivlinie
- Transition
- Aufbau
- Positionsrollen
- Kaderbedarf
- Budget
- gewünschtes Alter
- Transfermärkte
- interne Referenzspieler
- gewünschte Rollenprofile je Position

## Referenzmuster aus ähnlichen Scouting-Tools
Die Plattform sollte sich an den Stärken moderner Scouting-Anwendungen orientieren, aber inhaltlich weitergehen:
- schnelle Player-Suche mit vielen Filtern
- visuelle Spielerprofile statt Tabellen-lastiger Listen
- Video- und Event-Ansicht nebeneinander
- klare Vergleichslogik zwischen Spielern
- exportierbare Reports und Shortlists
- nachvollziehbare Datenherkunft
- Team-, Liga- und Rollenvergleich
- einfache Zusammenarbeit zwischen Scout, Analyst und Entscheider

## Player-DNA
### On-Ball
Pässe, progressive Aktionen, Dribblings, Schüsse, Ballverluste.

### Off-Ball
Laufwege, Positionierung, Raumöffnung, Anbieten, Pressingbewegungen.

### Defensiv
Zweikämpfe, Tackles, Raumkontrolle, Rückwärtsbewegung.

### Transition
Verhalten nach Ballgewinn und Ballverlust.

### Taktik
Rollen- und Positionsdisziplin.

### Entwicklung
Alter, Einsatzentwicklung und Leistungsentwicklung.

### Kontext
Liga, Teamstärke, Spielzeit und Gegnerniveau.

## Under-the-Radar Engine
Ein eigener Analysebereich identifiziert Spieler, die in klassischen Scoutinglisten wenig auffallen, aber besonders passend zum gewünschten Profil sind.

Relevante Faktoren können sein:
- geringe öffentliche Aufmerksamkeit
- junge Altersstruktur
- positive Entwicklung
- taktische Besonderheiten
- hoher Club-Fit

Wichtig: kein pauschaler Talent-Score, sondern nachvollziehbare Gründe und Konfidenzwerte.

## Videoanalyse
Langfristiger Workflow:
1. Spielvideo hochladen oder über eine lizenzierte Quelle beziehen.
2. Spieler und Ball erkennen.
3. Spieler über Sequenzen hinweg tracken.
4. Spielfeldpositionen und Bewegungen ableiten.
5. Aktionen und Bewegungsmuster extrahieren.
6. Taktische Muster analysieren.
7. Ergebnisse in die Player-DNA integrieren.

Broadcast-Video hat Grenzen. Verdeckte Spieler, Kamerawinkel, fehlende Trackingdaten und unterschiedliche Videoqualität müssen als Unsicherheiten berücksichtigt werden.

Für den MVP sollte Video zuerst als Upload- und Annotationsebene gedacht werden, nicht als vollautomatische Tracking-KI. Die Plattform muss Videos speichern, transkodieren, indizieren und später mit Tracking- oder CV-Signalen anreichern können.

## Datenquellen / APIs
- Sportmonks Football API: Spieler-, Team-, Liga- und Statistikdaten; für ein MVP prüfen.
- SkillCorner: Tracking- und Game-Intelligence-Daten; später prüfen.
- Optional später: Opta, Sportradar oder Wyscout, falls Lizenz und Budget es zulassen.
- Video-Storage: S3-kompatibler Speicher, z. B. AWS S3, Cloudflare R2 oder Supabase Storage.
- Video-Transcoding: ffmpeg oder ein Managed-Service für Upload, Konvertierung und Thumbnails.
- Authentifizierung: RBAC mit rollenbasierten Zugriffen für Club, Scout, Analyst und Admin.
- Suche/Ähnlichkeit: PostgreSQL plus pgvector für interne Referenzvergleiche und semantische Suche.
- Eigene Computer Vision: Videoanalyse und eigene Merkmale; langfristig.

## KI-Stack
Die KI soll als Analyse- und Assistenzschicht arbeiten, nicht als Blackbox-Entscheider.

Empfohlene Aufteilung:
- günstige Claude-Variante wie Claude Haiku für Zusammenfassungen, Scout-Reports, Begründungstexte und Assistenz-Workflows
- deterministische Regeln und Metriken für Kern-Scoring, Konfidenz und Vergleichslogik
- später optional ein stärkeres Modell für komplexe Multi-Step-Analysen oder Sonderfälle

So bleibt das System kosteneffizient, erklärbar und skalierbar.

## Technische Architektur
Football APIs / Video Uploads / Tracking APIs → Ingestion → Normalisierung → Datenbank / Video Store / Feature Store → Player DNA → Club DNA → Matching Engine → Shortlist → Scout Report → K-Eye Dashboard

Mögliche Komponenten:
- API Gateway
- PostgreSQL / Supabase
- separate Speicherung für Videos
- Background Jobs
- separater ML-/CV-Service
- RLS und rollenbasierte Zugriffe
- Logging und Datenherkunft
- Feature Store für wiederverwendbare Metriken
- Event- und Annotations-Layer für Video- und Spielereignisse
- Audit-Log für nachvollziehbare Scouting-Entscheidungen

## Matching Engine
Der Score soll aus transparenten Komponenten bestehen statt aus einer Blackbox:
- Rollen-Fit
- Taktischer Fit
- Kader-Fit
- Budget-Fit
- Entwicklungspotenzial
- Daten-Konfidenz
- Video-Konfidenz
- Referenz-Fit gegen interne Zielspieler

Jede Komponente muss nachvollziehbar erklärbar sein.

Der Vergleich soll immer gegen das eigene System laufen: Welche Spieler passen am besten zu genau diesem Club, genau dieser Rolle und genau diesem Budget?

## Beispielausgabe
**Kandidat B – hoher Club-Fit**

Warum:
- starke Pressingresistenz
- progressive Passauswahl
- passende Vorwärtsverteidigung
- gute Bewegungen im gewünschten System

Risiken:
- geringe Datenmenge gegen stärkere Gegner
- bestimmte physische Werte nicht verifiziert

Systemausgabe: auf die Scout-Shortlist setzen und manuell weiterprüfen.

## MVP
Nicht sofort Video-KI und riesige Datenmengen bauen.

1. Eine lizenzierte Fußball-Datenquelle integrieren.
2. Spieler-, Team- und Liga-Daten normalisieren.
3. Club-DNA-Eingabe entwickeln.
4. Positionsprofile erstellen.
5. Player-Fit-Matching entwickeln.
6. Shortlist und nachvollziehbare Begründungen anzeigen.
7. Video-Upload, Speicherung und einfache Annotation ergänzen.
8. Mit Scouts und Vereinen testen.

## Phase 2
- Trackingdaten integrieren
- Videoanalyse ergänzen
- Off-Ball-Metriken entwickeln
- automatische taktische Muster erkennen
- Under-the-Radar Engine verbessern
- weitere Ligen und Datenquellen integrieren

## Moderne UI / Farbgebung
Die Oberfläche soll hochwertig, ruhig und datenorientiert wirken.

Visuelle Richtung:
- dunkler, tiefblauer oder graphitfarbener Grundton
- helle Karten mit klaren Kontrasten für Datentiefe
- Akzentfarben in Electric Cyan, Lime oder Amber für Bewertung, Warnung und Fit
- keine generischen SaaS-Pastells und keine klassische Tabellenwüste
- feine Linien, Heatmap-Elemente und klare Zustandsfarben für Konfidenz und Risiko

Designprinzipien:
- ein Fokus auf Lesbarkeit bei hoher Informationsdichte
- große, ruhige Typografie für Gesamt-Fit und kleine, präzise Typografie für Evidenz
- kompakte Vergleichsansichten statt überladener Dashboards
- klare Hierarchie zwischen Score, Erklärung, Video und Datenquelle

## Scout-Workflow
1. Club-DNA anlegen oder importieren.
2. Position und Rolle definieren.
3. Daten- und Videofilter setzen.
4. Kandidatenliste erzeugen.
5. Fit, Risiko und Konfidenz prüfen.
6. Video und Ereignisse im Detail ansehen.
7. Shortlist speichern und exportieren.
8. Spieler während der Saison monitoren.

## Geschäftsmodell
Mögliche Struktur:
- Scout-/Einzelzugang
- Club-Abonnement
- mehrere Nutzer pro Club
- Enterprise-Verträge
- API-Zugang
- zusätzliche Daten- und Analysepakete

Preise erst nach Marktvalidierung festlegen.

## USP / Positionierung
Nicht: „Eine KI, die Fußballspieler bewertet.“

Sondern: „Eine Scouting-Intelligence-Plattform, die die Spielidee eines Vereins versteht und passende Spieler anhand von Daten, Spielverhalten und Video identifiziert.“

## Wichtige Risiken
- Lizenzrechte an Spieler-, Video- und Trackingdaten
- Datenschutz und Nutzungsrechte
- unterschiedliche Datenqualität zwischen Ligen
- Fehler bei Computer Vision
- Blackbox-Scoring vermeiden
- keine übertriebenen Leistungs- oder Transferprognosen
- Scout bleibt für die finale Bewertung verantwortlich

## Spätere Produktvision
Club-DNA → Spielerprofil → globale Suche → Under-the-Radar-Erkennung → Videoanalyse → Fit-Erklärung → Shortlist → Scout-Report → Monitoring während der Saison
