---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting a task between a "Lead Architect" and "Execution Agent".
---

# Multi-Agent Conductor (v1.7 - User Guided Mirroring)

This skill defines the protocol for a "Lead Architect" session to supervise and guide an "Execution Agent" session through complex tasks using Conductor tracks.

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role and guide the user:
1. **Role Check:** Check 'conductor/agent_role.json' or ask the user.
2. **Mirroring Guidance (Execution Agent ONLY):** 
   - The Execution Agent MUST display the content of 'references/mirror_setup.md' to the user.
   - Ask the user: "Is this session running inside 'script -f conductor/terminal_live.log'?"
3. **Discovery (Lead Architect ONLY):**
   - Perform the Session Discovery (v1.4) to link with the Execution Agent.
4. **Sync Engine Deployment:** Copy 'scripts/sync.js' from the skill-map to 'conductor/sync.js'.

## 📡 Monitoring & Sync
- **Lead Architect:** Periodically 'tail -f conductor/terminal_live.log' for raw activity.
- **Execution Agent:** Log heartbeats via 'node conductor/sync.js ping'.

## Roles
### 1. 🛡️ Lead Architect: Strategy, Validation & Real-Time Observation.
### 2. ⚙️ Execution Agent: Implementation & Guided Mirroring.

## Safety Guardrails
- **Log Integrity:** No inter-agent communication without user-confirmed writes to 'execution_log.md'.
