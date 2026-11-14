# Codex Setup

1. Open the website repository in Codex.
2. Keep this framework's AGENTS.md at the website repository root.
3. Copy .agents/skills/ into the website repository.
4. Add project-specific context under docs/project/.
5. Start with templates/project-kickoff.md.

First prompt:
"Read AGENTS.md and relevant skills. Inspect this repository without modifying files. Report architecture, scripts, routes, CMS setup, SEO baseline, risks, and a phased plan. Do not commit, push, or deploy."

Use a separate branch for substantial work. Review diffs and run checks after milestones. Ask before destructive changes, URL changes, secret changes, or production deployment.
