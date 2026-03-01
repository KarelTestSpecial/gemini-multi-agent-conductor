---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting tasks between a "Lead Architect" and multiple "Execution Agents".
---

# Multi-Agent Conductor (v1.8 - Multi-Agent Orchestration)

This skill defines the protocol for a "Lead Architect" to coordinate multiple specialized "Execution Agents" across separate terminal sessions.

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role and unique identity:
1. **Role Check:** Check 'conductor/agent_role.json' or ask the user.
2. **Identity Assignment (Execution Agents ONLY):** 
   - Ask the user for a unique ID (e.g., 'Agent-1', 'Debugger', 'Optimizer').
   - This ID will be used for all logs and messages.
3. **Mirroring Setup:** 
   - Guide the user to start the session with: `script -f conductor/terminal_live_[AGENT_ID].log`.
   - All tool outputs must be visible in this specific log.
4. **Sync Engine Deployment:** Copy 'scripts/sync.js' from the skill-map to 'conductor/sync.js'.

## 📡 Monitoring & Multi-Sync
- **Lead Architect:** Monitoort alle actieve `conductor/terminal_live_*.log` bestanden.
- **Execution Agents:** Log heartbeats via `node conductor/sync.js ping [AGENT_ID]`.

## Roles
### 1. 🛡️ Lead Architect: Global Strategy, Safety & Multi-Agent Coordination.
### 2. ⚙️ Execution Agent [ID]: Task-specific implementation and live reporting.

## Safety Guardrails
- **Agent Isolation:** Each agent works on its assigned sub-task to avoid merge conflicts.
- **Log Integrity:** All handovers are documented in 'conductor/execution_log.md' with the Agent ID.
