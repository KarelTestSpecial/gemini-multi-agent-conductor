---
name: multi-agent
description: v9.0 (ATOMIC-SIGNAL) - Ultra-reliable binary signal orchestration with polling loops.
---
# Multi-Agent Skill (v9.0 ATOMIC-SIGNAL)

Dit protocol is de gouden standaard voor autonome samenwerking tussen AI-agents op Chromebook-systemen. Het elimineert race-conditions door gebruik te maken van binaire signal-files en een polling-loop.

## 🚀 De v9.0 ATOMIC-SIGNAL Loop

De communicatie verloopt via het logboek (`conductor/execution_log.md`) en wordt aangestuurd door fysieke signaal-bestanden in de `conductor/` map.

### 🏗️ Rol: Lead Architect (De Aanjager)
1. **[PLAN]**: Bepaal de volgende stap en schrijf deze als `[DIRECTIVE]` in het logboek.
2. **[SIGNAL]**: Maak het signaal-bestand aan: `touch conductor/AGENT.GO`.
3. **[SENSE]**: Start de sensing loop: `node scripts/pulse.js architect [AgentID]`.
4. **[REPEAT]**: Zodra de pulse stopt, analyseer je de reactie en begin je opnieuw bij stap 1.

### 🤖 Rol: Execution Agent (De Ontvanger)
1. **[SENSE]**: Start direct de sensing loop: `node scripts/pulse.js agent [AgentID]`.
2. **[ACT]**: Zodra de pulse stopt (signaal herkend), voer je de `[DIRECTIVE]` uit.
3. **[ACK]**: Schrijf je resultaten (`[PING]`) in het logboek.
4. **[SIGNAL]**: Geef de beurt terug: `touch conductor/ARCHITECT.GO`.
5. **[REPEAT]**: Ga direct terug naar stap 1.

## 📡 IRONCLAD Commando's
- **Sensing Loop**: `node scripts/pulse.js [architect|agent] [ID]`
- **Signal Files**: `conductor/AGENT.GO` en `conductor/ARCHITECT.GO`
- **Signal Syntax**: `[TYPE] Agent (ID) #nonce` (bijv. `[DIRECTIVE] Agent (A1) #1`)

## 🛡️ Failsafe Regels
- **Atomic Signals**: Gebruik uitsluitend de aanwezigheid van `.GO` bestanden voor beurtwisseling.
- **Polling Reliability**: De v9.0 pulse gebruikt een polling-loop (500ms) voor 100% betrouwbaarheid op elk bestandssysteem.
- **Isolatie**: Werk bij voorkeur in een schone directory buiten de skill-bronmap.
