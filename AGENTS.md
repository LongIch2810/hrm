# Repository Guidelines

Use this file as the entry point for HRM work. Read the linked source document for the part being changed.

## Project Structure & Module Organization

Distinguish approved design from files already implemented in the repository.

- HRM is a Vietnamese, single-tenant web system for the employee lifecycle. Read [PRD](docs/PRD.md) and its [detail index](docs/prd/index.md) before product work.
- `docs/prd/` contains functional requirements, business rules, use cases, workflows, and supporting details. Read the relevant module documents before implementing behavior.
- `docs/architecture/` contains the approved system design. Start with its [index](docs/architecture/index.md), then read [overview](docs/architecture/overview.md), [layers](docs/architecture/layers.md), and [folder structure](docs/architecture/folder-structure.md) as needed.
- `docs/rules/` contains engineering rules. Use its [index](docs/rules/index.md) for task-specific rules; `docs/DATABASE.md` is currently empty.
- `frontend/` currently contains only `DESIGN.md`; `backend/` is empty. No application source, tests, manifests, lockfiles, or build configuration exist yet.
- `plans/` and `tasks/` contain `active/` and `completed/` directories. `history/error/` records prior documentation mistakes and fixes.
- Follow [Folder Structure](docs/architecture/folder-structure.md) for approved future file locations. Its application tree describes planned files, not existing ones.

## Build, Test, and Development Commands

Check whether a command exists before attempting to run it.

- The approved stack is React, TypeScript, HeroUI, Tailwind CSS, and Vite on the frontend; NestJS, TypeORM, and PostgreSQL on the backend. Docker Compose is planned for local services.
- Read [Tech Stack](docs/architecture/tech-stack.md) for approved versions, ports, environment variables, and planned commands. Do not treat those commands as configured yet.
- Inspect the workspace with `Get-ChildItem -Force` and documentation with `Get-ChildItem docs -Recurse -File` in PowerShell.
- When adding an app, include its manifest, lockfile, scripts, and setup instructions. Keep frontend and backend manifests separate as specified in Tech Stack.

## Product and Architecture Sources

Use the approved document for each decision and verify its confirmation status.

- Read [PRD](docs/PRD.md) for scope, roles, acceptance criteria, and product decisions. Use module documents under `docs/prd/` for detailed behavior.
- Read [Auth](docs/architecture/auth.md) before authentication or authorization work. Read [REST API Rules](docs/rules/rest-api.md) before API contract work.
- Read [Frontend React](docs/architecture/layers/frontend-react.md) and [Backend NestJS](docs/architecture/layers/backend-nestjs.md) before changing their request or error flows.
- Read [UI Rules](docs/rules/ui.md) before interface work. `frontend/DESIGN.md` analyzes ElevenLabs; do not treat its visual choices as approved HRM requirements.
- Read relevant entries in `history/error/` when editing the corresponding architecture documents.
- Keep confirmed decisions aligned across affected documents. Apply the TBD rule below to details that remain undefined.

## Coding Style & Naming Conventions

Follow existing documentation style and the linked naming rules.

- Use descriptive Markdown headings, short paragraphs, labeled code fences, and lowercase hyphenated filenames for new documentation.
- Use two spaces for nested lists and preserve surrounding formatting. Follow [Naming](docs/rules/naming.md) for code, API, database, and Git names.
- Follow [Clean Code](docs/rules/clean-code.md) and [Coding Style](docs/rules/coding-style.md) before writing or changing application code.
- No formatter or linter is configured yet. Do not add tooling solely for documentation changes.

## Testing Guidelines

Use [Testing Rules](docs/rules/testing.md) before writing tests and before reporting task completion.

- No test runner or test scripts exist yet. Do not report planned test commands as executed.
- For documentation changes, review Markdown, check links and referenced paths, and compare command examples with existing tooling.
- When adding behavior, include focused tests required by Testing Rules and document how to run them.

## Commit & Pull Request Guidelines

Apply repository Git rules before changing Git history or opening a pull request.

Before branch, commit, push, merge, tag, or release operations, read [Git Rules](docs/rules/git.md). Use [Naming](docs/rules/naming.md#4-git) for branch, commit, and tag formats.

Pull requests should describe the change, its purpose, and validation performed. Link related issues when available; include screenshots for visible interface changes.

## Agent-Specific Instructions

Read the rule that governs the files and behavior being changed.

- Trước khi viết hoặc sửa giao diện, đọc docs/rules/ui.md.
- Trước khi viết hoặc sửa test, và trước khi báo hoàn thành một tác vụ, đọc docs/rules/testing.md.
- Trước khi đặt tên file, hàm, biến, bảng, endpoint, đọc docs/rules/naming.md.
- Trước khi viết hoặc sửa code, đọc docs/rules/clean-code.md.
- Trước khi viết hoặc sửa code, đọc docs/rules/coding-style.md.
- Trước khi viết code xác thực, xử lý dữ liệu nhạy cảm, nhận input từ ngoài hoặc cấu hình môi trường, đọc docs/rules/security.md.
- Trước khi viết migration, entity TypeORM, index hoặc truy vấn database, đọc docs/rules/database.md.

Prefer codebase-memory-mcp for code discovery. Index an unindexed project first, then use `search_graph`, `trace_path`, `get_code_snippet`, and `query_graph`. Use filesystem searches for documentation, configuration, string literals, or insufficient graph results.

## Rule: Undefined Requirements & Decisions (TBD)

**Principle:** AI coding agents MUST NOT make decisions on behalf of the user (Product Owner).

1. Any requirement, business rule, functionality, policy, configuration, constraint, or decision that the user has not clearly defined MUST be marked exactly `TBD (To Be Determined)`.
2. Agents MUST NOT speculate, invent default values, or turn assumptions into official requirements.
3. For Markdown documents, agents MUST preserve all undefined headings and sections, include `**Status:** TBD (To Be Determined)`, briefly describe the missing information, and list questions requiring user confirmation. Agents MUST NOT delete or skip a section because information is missing.
4. During planning and development, agents MUST NOT decide unconfirmed requirements or implement business behavior that depends on a TBD decision. When a TBD directly affects implementation, agents MUST clearly explain the issue and obtain user confirmation before continuing the dependent work. Independent work unaffected by the TBD may continue.
5. Any proposed option MUST be explicitly labeled `Proposal — Pending Approval`. A proposal MUST NOT be treated as an official decision until the user approves it.
6. When the user confirms a decision, agents MUST update the corresponding TBD content, record the confirmed decision, and check and synchronize related documents. Agents MUST NOT change confirmed decisions without user approval.
7. This rule applies throughout the project, including PRDs and requirements documents, Functional Specifications, Business Rules, Architecture and Technical Design, Database and API Specifications, Implementation Plans, Tasks, and Acceptance Criteria.

**Priority:** Compliance with this rule is mandatory for all AI coding agents working on this project.

## Documentation Rules for Agents

Apply these writing rules to all agent-facing documentation: `AGENTS.md`, `PRD.md`, and `docs/*.md`.

- Use short bullets with one idea each. Limit each bullet to one or two sentences, approximately 25 words.
- Preserve conditions, constraints, specific values, and exceptions. Remove only unnecessary wording.
- Avoid long prose, introductory filler, and digressions.
- Link to existing content instead of repeating it across files.
- Use active, imperative wording: "Use X", "Do not do Y", and "When A, do B".
- Prefer tables or code blocks for structured data, including APIs, fields, enums, and commands.
- Start each major section with one purpose statement, then provide bullets.
- Use one consistent term for each concept throughout the documentation.
- Follow these rules whenever adding or editing content in an existing file.
