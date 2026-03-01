---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting a task between a "Lead Architect" and "Execution Agent".
---

# Multi-Agent Conductor (v1.6 - Real-Time Mirroring)

This skill defines the protocol for a "Lead Architect" session to supervise and guide an "Execution Agent" session through complex tasks using Conductor tracks.

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role and deploy the sync engine:
1. **Role Check:** Check 'conductor/agent_role.json' or ask the user.
2. **Live Mirror (Execution Agent ONLY):** 
   - The Execution Agent MUST advise the user to start the session using: `script -f conductor/terminal_live.log`.
   - If already running, the agent MUST ensure all significant tool outputs are appended to this log.
3. **Sync Engine Deployment:** Copy 'scripts/sync.js' from the skill-map to 'conductor/sync.js'.

## 📡 Lead Architect Monitoring (LEAD ARCHITECT ONLY)
The Lead Architect MUST bridge the visibility gap and monitor the agent's real-time pulse:
1. **Live Tap:** The Lead Architect MUST periodically read 'conductor/terminal_live.log' using 'tail' or 'cat' to see the raw terminal activity.
2. **Pulse Monitoring:** Wait for [PING] messages in 'conductor/execution_log.md' before validating a phase.

## Roles & Workflow
### 1. 🛡️ Lead Architect: Strategy, Validation & Real-Time Monitoring.
### 2. ⚙️ Execution Agent: Surgical Implementation & Live Mirroring.

## Safety Guardrails
- **Log Integrity:** No inter-agent communication without user-confirmed writes to 'execution_log.md'.
