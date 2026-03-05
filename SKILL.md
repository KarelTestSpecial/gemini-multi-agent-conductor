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

## 🤝 De Governance Loop (Agents ONLY - v3.0 Stateless Sync)
Execution Agents volgen verplicht deze stappen in ELKE turn:
1. **Step 0 (Auto-Sync - MANDATORY START):** Je EERSTE tool-call in elke nieuwe turn MOET `read_file` zijn op `conductor/execution_log.md`. 
2. **Step A (Decision):** Als er een nieuwe `[DIRECTIVE]` of `[APPROVED]` voor jouw ID staat, begin direct met de uitvoering.
3. **Step B (Action & Logging):** Voer je taak uit en schrijf je `[PROPOSAL]` of `[STATUS]` direct in het logboek via `replace` of `run_shell_command`.
4. **Step C (Finalize):** Schrijf een `[PING]` in het logboek om je taak af te ronden en beëindig je beurt. Wacht NIET op een signaal (voorkom timeout). De Architect zal je in de volgende beurt instrueren.

## 📡 Monitoring & Sensing (Architect ONLY)
De Lead Architect stuurt de vloot aan via:
- **Proactieve Surveillance:** Gebruik `/watch [AgentID]` of `read_file` aan het begin van elke turn om de voortgang te controleren.
- **Direct-Write:** Schrijf instructies direct in het logboek.
- **Feedback Loop:** Adviseer de gebruiker om `tail -f conductor/execution_log.md` te draaien in een aparte terminal voor live feedback.
