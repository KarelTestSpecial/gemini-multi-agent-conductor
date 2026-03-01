---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting a task between a "Lead Architect" and "Execution Agent" to maintain state synchronization and follow structured roadmaps.
---

# Multi-Agent Conductor (v1.1 - Role Aware)

This skill defines the protocol for a "Lead Architect" session to supervise and guide an "Execution Agent" session through complex tasks using Conductor tracks.

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role immediately:
1. **Check Config:** Look for `conductor/agent_role.json`.
2. **Adopt Role:** 
   - If `{"role": "Lead Architect"}`, prefix all high-level responses with `🛡️ [Lead Architect]`.
   - If `{"role": "Execution Agent"}`, prefix all implementation responses with `⚙️ [Execution Agent]`.
3. **Ask User:** If the file is missing or ambiguous, the agent MUST ask: *"Am I the Lead Architect or the Execution Agent for this session?"*
4. **NO GUESSING:** An agent MUST NOT assume the Lead Architect role by default.

## Roles

### 1. 🛡️ Lead Architect (Strategist)
- **Responsibility:** High-level strategy, safety oversight, and state validation.
- **Workflow:**
    1. Define `spec.md` and `plan.md` in `conductor/tracks/`.
    2. Monitor the Execution Agent's logs and session history.
    3. Provide `[DIRECTIVE]` entries in `conductor/execution_log.md`.
    4. Validate each phase before the Execution Agent proceeds.

### 2. ⚙️ Execution Agent (Implementer)
- **Responsibility:** Surgical implementation of the Conductor plan.
- **Workflow:**
    1. Read `conductor/execution_log.md` and `plan.md` at the start of every session.
    2. Update `plan.md` checkmarks as tasks are completed.
    3. Log every significant tool-call to `conductor/execution_log.md`.
    4. **MANDATORY:** After EVERY successful file update or major phase, execute `node conductor/sync.js ping`.

## Coordination & Communication Protocol

### The Shared Log Channel (`conductor/execution_log.md`)
1. **Log Format:**
   - `[ACTION]`: Tool calls and their intent.
   - `[STATUS]`: Phase completion or blockages.
   - `[QUERY]`: Execution Agent asking for advice.
   - `[DIRECTIVE]`: Lead Architect providing specific instructions.

## Safety Guardrails
- **User Permission:** No message is sent between agents without the user confirming the `WriteFile` or `run_shell_command` that updates the log.
- **Role Lock:** Once a role is confirmed, it stays locked for the duration of the session.
