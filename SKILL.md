# Multi-Agent Conductor (v2.1 - Foreground Autonomy)

Protocol voor de coördinatie van een "Lead Architect" en meerdere gespecialiseerde "Execution Agents" in afzonderlijke Gemini CLI sessies.

## 🚀 Initialisatie Protocol (MANDATORY)
Bij activatie MOET de agent zijn sessie-specifieke identiteit vaststellen:
1. **Identify Session:** Haal de actuele Session ID op.
2. **Role Selection:** Lead Architect of Execution Agent?
3. **Identity (Agents):** Maak 'conductor/agents/[SESSION_ID].json' aan.
4. **Pulse Sensing Setup:** Kopieer `scripts/pulse.js` naar `conductor/pulse.js`.
5. **Autonomous Foreground Loop (Agents ONLY):** 
   - De Agent MOET de `conductor/pulse.js` in de **VOORGROND** draaien: 
     `node conductor/pulse.js agent [AgentID]`
   - Gebruik NOOIT `is_background: true` voor dit commando.
   - De beurt van de Agent MOET "hangen" op dit script tot een signaal komt.
   - Zodra er een Directive is, stopt het script (exit 0).
   - De Agent MOET dan direct de log lezen, de taak uitvoeren, pingen en de loop herstarten.

## 📡 Monitoring & Auto-Sensing
- **Lead Architect:** Schrijft `[DIRECTIVE] Agent (ID): ...` naar `conductor/execution_log.md`.
- **Execution Agents:** Pingen de log via `node conductor/sync.js ping [Boodschap]`.
- **Auto-Sensing:** De Lead Architect MOET elke beurt beginnen met `tail -n 5 conductor/execution_log.md` om nieuwe Pings te detecteren.
- **Live Sync (/watch):** Bij het commando `/watch` synchroniseert de Lead Architect met de live chat-log van de Agent in de Gemini tijdelijke directory.

## 🛡️ Leiderschap & Regels
- Er is maar ÉÉN Lead Architect sessie toegestaan.
- Directives zijn BINDEND en moeten zonder discussie worden uitgevoerd door Agents.
- Gebruik `/watch` voor diepe synchronisatie bij complexe refactorings.

## 🛠️ Hulpmiddelen
- `conductor/pulse.js`: Detecteert wijzigingen in de log en wekt de sessie.
- `conductor/sync.js`: Verantwoordelijk voor het wegschrijven van Pings en Directives.
