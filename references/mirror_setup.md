# 📡 Real-Time Mirror Setup

Om de Lead Architect live mee te laten kijken, moet de Execution Agent sessie worden opgestart in een 'script' omgeving.

### 🚀 Stappenplan voor de Execution Agent terminal:
1. **Beëindig** de huidige sessie: `exit`
2. **Start** de live recording: `script -f conductor/terminal_live.log`
3. **Herstart** Gemini CLI: `gemini-cli`
4. **Activeer** de skill: `activate_skill multi-agent-conductor`

Vanaf dat moment kan de Lead Architect via `tail -f conductor/terminal_live.log` real-time meekijken.
