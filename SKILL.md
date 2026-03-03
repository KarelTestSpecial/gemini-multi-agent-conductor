---
name: multi-agent-conductor
description: v2.4 (Fleet-Aware) - Strikte governance met automatische sessie-radar en vlootbeheer voor multi-agent systemen.
---
# Multi-Agent Conductor (v2.4 - Fleet-Aware)

Dit protocol dwingt een strikte overlegcyclus af tussen de Lead Architect en Execution Agents om fouten te voorkomen en autonomie te maximaliseren via een gecentraliseerd vlootoverzicht.

## 🚀 Initialisatie Protocol (MANDATORY)
Bij activatie MOET elke sessie zijn status en omgeving vastleggen:
1. **Identify Session:** Haal de eigen Session ID op uit de omgeving.
2. **Radar Scan (Architect ONLY):** Scan '.gemini/tmp/[pwd]/chats/' op actieve sessies en lijst ze op in 'execution_log.md'.
3. **Role Selection:** Ben je de Lead Architect of een Execution Agent?
4. **Identity (Agents):** Maak 'conductor/agents/[SESSION_ID].json' aan met metadata (focus, status).
5. **Pulse Sensing Setup:** Kopieer 'scripts/pulse.js' naar 'conductor/pulse.js'.

## 🤝 De Governance Loop (Agents ONLY)
Execution Agents volgen verplicht deze stappen voor elke actie:
1. **Step A (Wait):** Draai 'node conductor/pulse.js agent [AgentID]' in de VOORGROND. Wacht op '[DIRECTIVE]' of '[APPROVED]'.
2. **Step B (Propose):** Schrijf na een '[DIRECTIVE]' EERST een '[PROPOSAL]' in 'execution_log.md'.
3. **Step C (Hold):** Herstart Pulse en wacht op '[APPROVED]' van de Lead Architect.
4. **Step D (Execute):** Voer de actie uit na expliciete goedkeuring.
5. **Step E (Finalize):** Stuur een '[PING]' en ga terug naar Step A.

## 📡 Monitoring & Sensing (Architect ONLY)
De Lead Architect monitort de vloot en stuurt aan via:
- **Directives:** 'node conductor/pulse.js architect [AgentID] [Message]'
- **Logboek:** Alle acties worden gelogd in 'conductor/execution_log.md' met tijdstempel en AgentID.
