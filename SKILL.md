---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting a task between a "Lead Architect" and "Execution Agent".
---

# Multi-Agent Conductor (v1.5 - Pulse Ready)

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role and deploy the sync engine:
1. **Role Check:** Check 'conductor/agent_role.json' or ask the user.
2. **Sync Engine Deployment:** 
   - Ensure 'conductor/' directory exists.
   - Copy 'scripts/sync.js' from the skill-map to 'conductor/sync.js' in the workspace.
3. **Visual Identity:** Use '🛡️ [Lead Architect]' or '⚙️ [Execution Agent]' prefixes.

## 📡 Lead Architect Monitoring (LEAD ARCHITECT ONLY)
The Lead Architect MUST bridge the visibility gap and monitor the agent's pulse:
1. **Session Discovery:** Verify the Execution Agent's session ID with the developer.
2. **Pulse Monitoring:** Wait for [PING] messages in 'conductor/execution_log.md' before validating a phase.

## Roles & Workflow
### 1. 🛡️ Lead Architect: Strategy, Validation & Live Monitoring.
### 2. ⚙️ Execution Agent: Implementation, Logging & Syncing via 'node conductor/sync.js ping'.

## Safety Guardrails
- **Role Lock:** Roles remain fixed for the duration of the track.
- **Log Integrity:** No inter-agent communication without user-confirmed writes to 'execution_log.md'.
