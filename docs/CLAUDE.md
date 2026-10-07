# ASSOCADS — Project Context (auto-loaded)

Official web portal + API for the **Association for AI and Data Science (ASSOCADS)**, governed by a registered non-profit Trust.

## AI_COWORKER is ACTIVE
This project runs under the multi-agent workflow in [AI_COWORKER/](AI_COWORKER/).
- Operating rules: [AI_COWORKER/Master_prompt.md](AI_COWORKER/Master_prompt.md) and [AI_COWORKER/Global_system_rules.md](AI_COWORKER/Global_system_rules.md)
- Role switching: "Act as @PM / @GUARD / @ARCH / @DESIGN / @FE / @BE / @SEC / @ETHICS / @QA / @OPS / @DATA / @DEBUGGER / @REPAIR". When a role is invoked, read its persona file in `AI_COWORKER/` (e.g. `Backend_engineer.md`, `Elite_debugger.md`, `Error_corrector.md`) before acting.
- Hard gates before any deploy: @SEC → @ETHICS → @QA must all pass. Max 3 iterations, then escalate to the user.
- Build work follows GSD: SPEC → PLAN → EXECUTE → VERIFY → COMMIT (see [AI_COWORKER/GSD/](AI_COWORKER/GSD/), state in `AI_COWORKER/GSD/.gsd/`).

## Source of truth
- **[AI_COWORKER/shared_memory/final_project_context.md](AI_COWORKER/shared_memory/final_project_context.md)** — OMNIPRESENT spec for all build work. Only update it after the user explicitly says YES (ask: "Should I add these new details to the final_project_context.md?").
- Agent outputs live in `AI_COWORKER/shared_memory/<area>/` (prd, architecture, design, frontend, backend, security, compliance, tests, deployment, logs). Never delete; append or version.
- Pipeline activity log: [AI_COWORKER/shared_memory/logs/PIPELINE_LOG.md](AI_COWORKER/shared_memory/logs/PIPELINE_LOG.md) (append-only).
- Founding documents (root): `THE AIMS AND OBJECTS OF THE TRUST.docx`, `Proposed Roadmap for ASSOCADS.pptx`, `Structural Architecture.pdf`.

## Codebase
| Path | What | Run |
|---|---|---|
| `assocads_api_service/` | Express (ES modules), JSON file store in `database_store/` | `npm run dev` → http://127.0.0.1:5000 (`GET /api/health`) |
| `assocads_web_portal/` | Vite + React 19, source in `ui_source/`, `/api` proxied to :5000 | `npm run dev` → http://127.0.0.1:5173 |

## Constraints
- Max folder depth ≤ 4 (currently 3); no overlapping folder names between frontend and backend.
- Theme (v3): light black & white only — pale white `#F6F4EF` background, ink `#2E242C` for text, buttons and dark panels; VC Henrietta headings + Anthropic Serif body (font files in `assocads_web_portal/public_assets/fonts/`, no italics); near-square corners. No accent colours in the UI, but photos stay in full colour. No em dashes in any visible text. Every home-page section is preceded by a numbered SectionDivider. Motion must stay minimal and professional.
- Always confirm tech-stack changes with the user before architecting or building.

## Current status (2026-10-07, after re-audit v2)
**Current focus (user, 2026-10-07): landing page + content only, fully mocked, no auth.** The portal was rebuilt by @DESIGN/@FE (v2): all copy in `assocads_web_portal/ui_source/content.ts`, sections in `ui_source/sections/`, motion helpers in `ui_source/motion.tsx` (Lenis smooth scroll + framer-motion reveals). Copy must stay plain and human — no buzzwords.

Backend: migrated to TypeScript; re-audit v2 found blocking issues (@SEC/@ETHICS BLOCKED, @QA FAIL). Deferred by the user while the site is mocked — fix before the backend is reconnected or anything is deployed with real data. Details in the v2 sections of `shared_memory/security/SECURITY_AUDIT.md`, `compliance/COMPLIANCE.md`, `tests/QA_REPORT.md`. Roadmap phase: Month 02.

Known drift: `final_project_context.md` still describes JS + Vanilla CSS; actual stack is TypeScript + Tailwind v4 + framer-motion. `public_assets/` doesn't exist.
