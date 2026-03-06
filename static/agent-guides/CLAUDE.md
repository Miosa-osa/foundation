# MIOSA Foundation — Agent Instructions

This is the **MIOSA Foundation component library** — a design system with 103 demo sections across 16 groups. Every pattern is pure CSS with HTML structure demos in Svelte files.

## For AI Agents: How to Use This Library

### Quick Reference
- **Registry:** `src/routes/component-library/registry.json` — machine-readable index of all 103 sections
- **Sections:** `src/routes/component-library/sections/<category>/<Name>.svelte` — the actual pattern files, organized into 14 category subdirectories
- **Shell:** `src/routes/component-library/+page.svelte` — sidebar + section rendering
- **Tokens:** See `tokens` object in registry.json for required CSS custom properties

### When a User Says "I Need X"

1. **Read `registry.json`** → find matching sections via `moduleMap` keys or section `tags`
2. **Read the matching `.svelte` file(s)** → extract the CSS classes and HTML structure
3. **Apply the design tokens** first (the `tokens.defaults` object in registry.json)
4. **Copy the CSS** (scoped by prefix) and **adapt the HTML** to the target framework

### Module Mapping (Feature → Sections)

| User Says... | moduleMap Key | Sections to Read |
|---|---|---|
| "dashboard" | `dashboard` | DashboardWidgets.svelte |
| "tasks" / "kanban" | `tasks` | TaskBoard.svelte |
| "team" / "org chart" | `team` | TeamDirectory.svelte |
| "knowledge base" / "docs" / "wiki" | `knowledgeBase` | KnowledgeBase.svelte |
| "data tables" / "spreadsheet" | `dataTables` | DataTables.svelte |
| "CRM" / "clients" / "pipeline" | `crm` | ClientCRM.svelte |
| "calendar" / "schedule" | `calendar` | CalendarSchedule.svelte |
| "notifications" | `notifications` | NotificationCenter.svelte |
| "onboarding" / "setup wizard" | `onboarding` | OnboardingWizard.svelte, OnboardingFlows.svelte |
| "email" / "chat" / "messaging" / "video" | `communication` | CommunicationHub.svelte |
| "workspace" / "permissions" / "RBAC" | `workspace` | WorkspaceManager.svelte |
| "agent builder" / "AI agent" | `agents` | AgentBuilder.svelte, AiAgentCards.svelte |
| "node graph" / "flow editor" | `nodes` | NodeGraphEditor.svelte |
| "daily log" / "journal" / "mood" | `dailyLog` | DailyLog.svelte |
| "voice notes" / "audio" / "recording" | `voice` | VoiceNotes.svelte |
| "profile" / "account" / "settings" | `profile` | ProfileAccount.svelte |
| "app store" / "marketplace" | `appStore` | AppMarketplace.svelte, AppPublishForm.svelte |
| "AI chat" / "chatbot" | `aiChat` | AiChat.svelte + 9 AI sections |
| "dock" / "desktop" / "OS shell" | `desktopShell` | DesktopDock.svelte |
| "auth" / "login" / "signup" | `auth` | AuthPatterns.svelte |
| "billing" / "credits" / "pricing" | `billing` | UsageDashboard.svelte, BalanceCredits.svelte |
| "settings" | `settings` | SettingsPatterns.svelte |

### Apply Order (Narrow → Wide)

Always apply in this order — later tiers depend on earlier ones:

1. **Foundation** (required) — Colors, Typography, Icons, Spacing, Shadows
2. **Primitives** (required) — Buttons, Inputs, Selects, Form Controls, Badges, Avatars, etc.
3. **Patterns** (as needed) — Layouts, Glass Surfaces, Animations, Auth, Settings, etc.
4. **Modules** (pick by feature) — Dashboard, Tasks, CRM, Calendar, etc.
5. **AI** (if platform has AI) — Chat, Messages, Reasoning, Agent Cards, etc.
6. **Platform** (if SaaS) — API Store, Usage, Share/Referral, App Publish

### Design Tokens (MUST set these in target app)

```css
:root {
  --dt: #111;     /* primary text */
  --dt2: #555;    /* secondary text */
  --dt3: #888;    /* tertiary text */
  --dt4: #bbb;    /* quaternary text */
  --dbg: #fff;    /* background */
  --dbg2: #f5f5f5; /* surface */
  --dbg3: #eee;   /* elevated */
  --dbd: #e0e0e0; /* border */
  --dbd2: #f0f0f0; /* subtle border */
}
.dark {
  --dt: #fff;
  --dt2: #aaa;
  --dt3: #777;
  --dt4: #555;
  --dbg: #1a1a1a;
  --dbg2: #242424;
  --dbg3: #2e2e2e;
  --dbd: #333;
  --dbd2: #2a2a2a;
}
```

### CSS Prefix System

Every section uses a unique CSS prefix to avoid conflicts. When extracting CSS from a section, keep the prefix — it guarantees zero collisions:

| Prefix | Module | Prefix | Module |
|--------|--------|--------|--------|
| `dk-` | Desktop & Dock | `ch-` | Communication Hub |
| `dw-` | Dashboard Widgets | `wm-` | Workspace Manager |
| `tb-` | Task Board | `ab2-` | Agent Builder |
| `td-` | Team Directory | `ng-` | Node Graph Editor |
| `kb-` | Knowledge Base | `dl-` | Daily Log |
| `dt2-` | Data Tables | `vn-` | Voice Notes |
| `cr-` | Client CRM | `pa-` | Profile & Account |
| `cs-` | Calendar & Schedule | `am-` | App Marketplace |
| `nc-` | Notification Center | `ow-` | Onboarding Wizard |

### How to Extract Patterns from a Section File

Each `.svelte` file has this structure:
```
<script lang="ts">
  // $state variables for interactive demos
</script>

<section class="ds-section">
  <!-- Subsection 1 -->
  <div class="ds-card">
    <h3 class="ds-card__title">Subsection Name</h3>
    <!-- Demo HTML with prefixed CSS classes -->
  </div>

  <!-- Subsection 2... -->
</section>

<style>
  /* All CSS with prefix scoping */
  .prefix-component { ... }
  .prefix-component__element { ... }
  .prefix-component--modifier { ... }
</style>
```

**To extract a pattern:**
1. Find the `<div class="ds-card">` containing the pattern you need
2. Copy the HTML structure (remove `ds-card` wrapper — that's library chrome)
3. Copy the corresponding CSS from the `<style>` block (search by prefix)
4. Adapt to target framework (React JSX, Vue template, plain HTML, etc.)

### How to Add a New Section

See `src/routes/component-library/AGENT-GUIDE.md` for the full protocol.

Short version:
1. Choose the right category subdirectory and create `sections/<category>/YourSection.svelte` following the template structure
2. Pick a unique 2-3 char CSS prefix
3. Add import + sidebar item + sectionMap entry in `+page.svelte`
4. Add entry to `registry.json` sections array and moduleMap
5. Build with `npx vite build` to verify

---

## Tech Stack
- **Svelte 5** with runes (`$state`, `$derived`, `$effect`)
- **TypeScript** strict mode
- **CSS Custom Properties** for all theming
- **Pure CSS demos** — no runtime dependencies per section
- **Bits UI** for primitive components in `$lib/ui/`

## Project Structure
```
src/
├── routes/component-library/
│   ├── +page.svelte          # Shell (sidebar + section rendering)
│   ├── +page.ts              # SSR disabled
│   ├── styles.css            # Library chrome styles
│   ├── registry.json         # Machine-readable component index
│   ├── AGENT-GUIDE.md        # Instructions for adding new sections
│   └── sections/             # 103 section files, organized into 14 category subdirectories
│       ├── getting-started/  # 1 file: Overview
│       ├── foundation/       # 5 files: Colors, Typography, Icons, Spacing, Shadows
│       ├── actions/          # 2 files: Buttons, ToggleGroups
│       ├── inputs-forms/     # 11 files: Inputs, FormControls, Selects, Combobox, Sliders, TagInput, DatePicker, FileUpload, FileBrowser, Labels, Forms
│       ├── data-display/     # 14 files: Badges, Avatars, ProfileCards, Cards, Tables, DataTables, Dividers, MediaDisplay, Accordions, Collapsibles, DataDisplay, Timeline, Carousel, Keyboard
│       ├── navigation/       # 7 files: Navigation, TabsSection, Menus, ContextMenus, Pagination, Stepper, CommandPalette
│       ├── overlays/         # 6 files: Dialogs, Drawers, Tooltips, HoverCards, Alerts, Toasts
│       ├── feedback/         # 6 files: ProgressBars, Feedback, Messages, EmptyStates, ErrorStates, LoadingPatterns
│       ├── ai/               # 12 files: AiChat, MessageDisplay, ChatInputPatterns, ModelSelector, Reasoning, AiSuggestions, Attachments, AiSources, ToolCallCards, AiElements, AiAgentCards, AiGenerationForms
│       ├── surfaces-effects/ # 5 files: GlassSurfaces, Animations, FloatingElements, AnimatedBorders, SelectionCards
│       ├── patterns/         # 6 files: Layouts, AppCards, FilterChips, AuthPatterns, SearchPatterns, SettingsPatterns
│       ├── bos-modules/      # 28 files: DashboardWidgets, TaskBoard, TeamDirectory, KnowledgeBase, ClientCRM, CalendarSchedule, NotificationCenter, OnboardingWizard, CommunicationHub, WorkspaceManager, AgentBuilder, NodeGraphEditor, DailyLog, VoiceNotes, ProfileAccount, AppMarketplace, ContentOS, ContentOSGeneration, OsaAgent, SystemSettings, IntegrationHub, TerminalInterface, ProjectManager, HelpCenter, SocialComponents, OnboardingFlows, DesktopDock, and more
│       ├── platform/         # 10 files: ApiStoreBrowser, UsageDashboard, TaskProjectCards, ShareReferral, AppPublishForm, MeetingPeopleCards, ComputeUsage, UsageAnalytics, IntegrationCards, BalanceCredits
│       └── reference/        # 1 file: Modules
├── lib/
│   ├── ui/                   # 27 Svelte UI primitives
│   ├── components/chat/      # 25 chat components
│   └── components/ai-elements/ # 8 AI components
└── app.css                   # Global styles, pill buttons, glass
```
