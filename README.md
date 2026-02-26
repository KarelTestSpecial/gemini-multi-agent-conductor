# 🤖 Gemini CLI: Multi-Agent Conductor Skill

Transform your Gemini CLI into a **Multi-Agent Orchestration Framework**. 

This skill introduces the "Lead Architect vs. Execution Agent" pattern, allowing you to split complex tasks across multiple terminal sessions using the Conductor MCP and a lightweight Inter-Process Communication (IPC) webhook.

## 🌟 The Problem
When running the Gemini CLI on resource-constrained hardware (like Chromebooks, Raspberry Pi's, or cheap VPS instances), asking the agent to perform broad repository searches or massive refactors can lead to CPU throttling, overheating, or context-window exhaustion. Furthermore, you lose your interactive chat while the agent is busy.

## 🚀 The Solution
Run **two** Gemini CLI sessions in parallel:
1. **The Lead Architect:** Your primary session. It plans, monitors, and oversees the work without doing the heavy lifting.
2. **The Execution Agent:** A secondary session running in the background, dedicated to surgically executing the plan.

This skill binds them together using:
- **A Shared State File:** `conductor/execution_log.md`
- **A Node.js Webhook:** `sync.js` (IPC via local ports so the Lead Architect knows exactly when the Execution Agent finishes a task).

---

## 📦 Installation

1. Install the skill:
```bash
gemini skills install multi-agent-conductor.skill --scope workspace
```
2. Reload your skills in all active sessions:
```bash
/skills reload
```
3. Copy the webhook script to your workspace:
```bash
mkdir -p conductor && cp assets/sync.js conductor/sync.js
```

---

## 🛠️ Usage Protocol

### 1. Setup the Track (Lead Architect)
In your primary terminal, ask Gemini to create a plan:
> "Create a Conductor track for a massive path-migration. I will be the Lead Architect. Prepare the spec."

### 2. Start the Listener
Tell the Lead Architect to wait for the other agent:
> "Start the webhook listener to monitor the Execution Agent."
*(The Lead Architect will run `node conductor/sync.js wait` and pause)*

### 3. Deploy the Execution Agent
Open a second terminal, start `gemini`, and paste the handover prompt:
> "I am the Execution Agent for this workspace. Resume the migration track from `conductor/tracks.md`. Log all progress to `conductor/execution_log.md`. **MANDATORY:** After every successful file update, execute `node conductor/sync.js ping` to notify the Lead Architect."

### 4. Watch the Magic Happen
The Execution Agent will do the heavy file manipulation. Every time it completes a batch, it triggers the webhook. The Lead Architect immediately wakes up, reads the log, and reports back to you with the status and strategic advice.

---

## 🧠 Why this is powerful
- **Zero Overhead IPC:** No need for complex message brokers. We use a 20-line Node.js HTTP server.
- **Human-in-the-loop Security:** The Execution Agent still asks you for permission (`Action Required`) before writing files, but the Lead Architect guides its decisions.
- **Context Preservation:** The Lead Architect doesn't clutter its context window with thousands of lines of `grep` output; it only reads the summarized `execution_log.md`.

## 📄 License
MIT License
