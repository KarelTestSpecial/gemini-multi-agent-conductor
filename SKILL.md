---
name: multi-agent-conductor
description: Multi-agent coordination for Gemini CLI using Conductor tracks. Use when splitting a task between a "Lead Architect" and "Execution Agent".
---

# Multi-Agent Conductor (v1.3 - Interactive Observability)

This skill defines the protocol for a "Lead Architect" session to supervise and guide an "Execution Agent" session through complex tasks using Conductor tracks.

## 🚀 Initialization Protocol (MANDATORY)
Upon activation, the agent MUST determine its role immediately:
1. **Check Config:** Look for 'conductor/agent_role.json'.
2. **Adopt Role:** 
   - If '{"role": "Lead Architect"}', prefix all high-level responses with '🛡️ [Lead Architect]'.
   - If '{"role": "Execution Agent"}', prefix all implementation responses with '⚙️ [Execution Agent]'.
3. **Ask User:** If the file is missing or ambiguous, the agent MUST ask: "Am I the Lead Architect or the Execution Agent for this session?"

## 📡 Lead Architect Monitoring (LEAD ARCHITECT ONLY)
The Lead Architect MUST bridge the visibility gap by identifying and monitoring the Execution Agent's live session:
1. **Session Discovery:** The Lead Architect MUST list recent session logs in '~/.gemini/tmp/'.
2. **Interactive Verification:** The Lead Architect MUST read snippets from the most likely sessions and ask the developer:
   - "I found activity in session [ID]. Is this the conversation you see in the second terminal?"
   - "Does this match the timestamp [Time] and activity [Task] of your other session?"
3. **Pulse Check:** Once the session is verified, the Lead Architect MUST periodically perform a 'Session Tap' on 'tool-outputs/' to ensure the Execution Agent is on track.

## Roles

### 1. 🛡️ Lead Architect (Strategist)
- **Responsibility:** High-level strategy, safety oversight, and state validation.
- **Workflow:**
    1. Define 'spec.md' and 'plan.md' in 'conductor/tracks/'.
    2. Monitor the Execution Agent's live session logs (Discovery + Tap).
    3. Provide '[DIRECTIVE]' entries in 'conductor/execution_log.md'.
    4. Validate each phase before the Execution Agent proceeds.

### 2. ⚙️ Execution Agent (Implementer)
- **Responsibility:** Surgical implementation of the Conductor plan.
- **Workflow:**
    1. Read 'conductor/execution_log.md' and 'plan.md' at the start of every session.
    2. Update 'plan.md' checkmarks as tasks are completed.
    3. Log every significant tool-call to 'conductor/execution_log.md'.
    4. **MANDATORY:** After EVERY successful file update or major phase, execute 'node conductor/sync.js ping'.

## Coordination & Communication Protocol
- **Shared Log:** All high-level handovers happen via 'conductor/execution_log.md'.
- **Inter-Agent Messages:** Use '[ACTION]', '[STATUS]', '[QUERY]', and '[DIRECTIVE]'.

## Safety Guardrails
- **Role Lock:** Roles remain fixed for the duration of the track.
- **User Permission:** No inter-agent communication without user-confirmed writes to 'execution_log.md'.
