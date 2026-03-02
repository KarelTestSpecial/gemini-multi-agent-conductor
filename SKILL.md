# Multi-Agent Conductor (v2.3 - Governance-First)

Dit protocol dwingt een strikte overlegcyclus af tussen de Lead Architect en Execution Agents om fouten te voorkomen en autonomie te maximaliseren.

## 🚀 Initialisatie Protocol (MANDATORY)
Bij activatie MOET elke sessie zijn rol en identiteit vastleggen:
1. **Identify Session:** Haal de Session ID op.
2. **Role Selection:** Ben je de Lead Architect of een Execution Agent?
3. **Identity (Agents):** Maak 'conductor/agents/[SESSION_ID].json' aan.
4. **Pulse Sensing Setup:** Kopieer `scripts/pulse.js` naar `conductor/pulse.js`.

## 🤝 De Governance Loop (Agents ONLY)
Execution Agents volgen verplicht deze stappen voor elke actie:
1. **Step A (Wait):** Draai `node conductor/pulse.js agent [AgentID]` in de **VOORGROND**. Wacht op `[DIRECTIVE]` of `[APPROVED]`.
2. **Step B (Propose):** Na een `[DIRECTIVE]`, schrijf EERST een `[PROPOSAL]` in de `execution_log.md` met het actieplan en beoogde wijzigingen.
3. **Step C (Hold):** Herstart de Pulse in de voorgrond en wacht op `[APPROVED]` van de Lead Architect.
4. **Step D (Execute):** Pas na expliciete goedkeuring worden tools gebruikt voor de uitvoering.
5. **Step E (Finalize):** Na voltooiing, stuur een `[PING]` en ga terug naar **Step A**.

## 📡 Monitoring & Sensing
- **Lead Architect:** Beoordeelt Proposals en antwoordt met `[APPROVED] Agent (ID)`.
- **Auto-Sensing:** De Lead Architect MOET elke beurt beginnen met `tail -n 5 conductor/execution_log.md` of `node conductor/pulse.js lead` draaien in de voorgrond.
- **Live Sync (/watch):** Gebruik `/watch` om de actuele chat-logs van de Agent in de Gemini tmp directory te synchroniseren.

## 🛡️ Leadership Rules
- Directives zijn BINDEND voor Agents.
- Agents wijzigen NOOIT protocol-scripts (`pulse.js`, `sync.js`) zonder `[PROPOSAL]` en `[APPROVED]`.
- ÉÉN Lead Architect per project.
