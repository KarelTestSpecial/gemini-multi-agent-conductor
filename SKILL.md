---
name: multi-agent-conductor
description: v2.5 (Fleet-Surveillance) - Strikte governance met vlootbeheer en /watch chat-log inspectie voor diepe surveillance.
---
# Multi-Agent Conductor (v2.5 - Fleet-Surveillance)

Dit protocol dwingt een strikte overlegcyclus af tussen de Lead Architect en Execution Agents om fouten te voorkomen en autonomie te maximaliseren via een gecentraliseerd vlootoverzicht en diepe inspectie van chat-logs.

## 🚀 Initialisatie Protocol (MANDATORY - SEQUENTIAL)

De opstartfase volgt een strikte hiërarchie. De Lead Architect MOET de omgeving prepareren voordat Agents mogen aansluiten.

### Fase 1: Architect Setup (MANDATORY START)
1. **Identify Session:** Haal de eigen Session ID op uit de omgeving.
2. **Fleet Foundation:** Maak de mappenstructuur `conductor/agents/` aan.
3. **Registry:** Maak `conductor/execution_log.md` aan met de initiële Fleet Overview tabel.
4. **Identity:** Maak `conductor/agents/[ARCHITECT_ID].json` aan met de rol 'Lead Architect'.
5. **Pulse Sensing Setup:** Kopieer `scripts/pulse.js` naar `conductor/pulse.js`.

### Fase 2: Agent Discovery (Lead Architect Orchestration)
De identificatie van nieuwe vlootleden is de verantwoordelijkheid van de Lead Architect.
1. **Radar Scan (Architect ONLY):** De Architect scant de `.gemini/tmp/[pwd]/chats/` directory op recent gewijzigde sessie-bestanden.
2. **Identification & Verification:** De Architect voert een `/watch [DetectedID]` uit op de gevonden sessies om de rol van de agent (Execution Agent) en de focus te verifiëren.
3. **Registration:** De Architect registreert de agent officieel in `conductor/execution_log.md` en maakt het bijbehorende `conductor/agents/[AGENT_ID].json` bestand aan.
4. **Activation Directive:** De Architect stuurt de eerste `[DIRECTIVE]` naar de nieuw geregistreerde agent via `pulse.js`.

## 📡 Monitoring & Sensing (Architect ONLY)
De Lead Architect monitort de vloot en stuurt aan via:
- **Directives (Direct-Write Protocol):** Schrijf instructies ALTIJD direct in `conductor/execution_log.md` met de prefix `[DIRECTIVE] Agent ([AgentID])`. Dit voorkomt blokkades door hangende shell-commando's.
- **Pulse Sync:** Gebruik `node conductor/pulse.js architect [AgentID]` als luisteraar, maar vertrouw op de fysieke bestandswijziging voor de verzending.

## 🤝 De Governance Loop (Agents ONLY)
Execution Agents volgen verplicht deze stappen:
1. **Step A (Wait):** Draai `node conductor/pulse.js agent [AgentID]`. Wacht op `[DIRECTIVE]` in het logboek.
2. **Step B (Propose - Direct-Write):** Schrijf na een directive ALTIJD direct een `[PROPOSAL]` in `conductor/execution_log.md`.
3. **Step C (Hold):** Wacht op `[APPROVED]` in het logboek via Pulse.
4. **Step D (Execute):** Voer de actie uit na expliciete goedkeuring.
5. **Step E (Finalize):** Schrijf een `[PING]` direct in het logboek en ga terug naar Step A.
