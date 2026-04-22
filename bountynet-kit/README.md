# BountyNet CS16 Redesign — drop-in kit

A complete visual redesign of the BountyNet web client (`maceip/BountyNet`
at `clients/web`) against a new CS16-flavored component kit. Every one of
the 15 user-facing routes was rewritten to compose named, reusable
primitives instead of inline Tailwind soup.

Everything lives at the same relative path it occupies in the BountyNet
repo. To drop it in:

```bash
# from BountyNet repo root
git checkout -b cs16-redesign

# option 1 — apply the prebuilt patch
git apply --index /path/to/bountynet-kit/cs16-redesign.patch

# option 2 — rsync the tree in place (destructive)
rsync -a --delete \
  /path/to/bountynet-kit/clients/web/src/ \
  clients/web/src/

cd clients/web && npm install && npm run build
# both build:client and build:server pass clean.
```

## What lives where

### Kit (new)
`clients/web/src/components/cs16/`

| file | purpose |
| --- | --- |
| `tokens.css` | CS16 structural language (beveled borders, legend-framed panels, aurora status tones) layered on BountyNet's frost palette. Defines `--bn-*` CSS variables and all `.bn-*` utility classes. |
| `icons.jsx` | 26-icon pixel-friendly SVG set, all using `currentColor`. |
| `primitives.jsx` | `Panel`, `Button`, `Field`, `Input`, `Textarea`, `Select`, `Chip`/`Badge`, `Kbd`, `StatusDot`, `Separator`, `EmptyState`, `Skeleton`, `KeyValueList`, `Toolbar`. |
| `shell.jsx` | `AppShell`, `AppHeader` (brand + top nav + ⌘K + persona chip), `CommandPalette` (keyboard nav + sessionStorage recents), `StatusRail` (voice level meter + transcript insertion). |
| `developer.jsx` | `Terminal`, `CodeLine`, `RepoCard`, `CommitGraph`, `FileTree`. |
| `data.jsx` | `AnimatedNumber`, `Sparkline`, `Gauge`, `InfiniteSlider`, `PopoverCommandSelect`, `StatsGrid`, `DataTable`, `Tabs`. |
| `landing.jsx` | `MarketingHero`, `LiveMarketplaceActivity`, `PersonaCard`/`PersonaGrid`, `Section`. |
| `index.js` | Barrel export; imports `tokens.css` as a side effect. |

### Shell + cross-cutting
- `clients/web/src/index.css` — imports the kit tokens and switches body typography.
- `clients/web/src/layouts/page-layout.jsx` — thin wrapper around `AppShell`; preserves `voiceInbox` wiring; adds an icon to each nav item.
- `clients/web/src/hooks/usePollingJson.js` — gains a `refresh()` function so error-state retries actually re-poll.
- `clients/web/src/components/smui/index.jsx` — bridge. Re-exports `CommandPalette` / `StatusRail` / `openCommandPalette` / `closeCommandPalette` from the new kit so any unmigrated import still hits the redesigned chrome. Old duplicate definitions removed.

### Pages (all 15 rewritten)

| page | creative move |
| --- | --- |
| `landing/LandingLite.jsx` | `MarketingHero` + `LiveMarketplaceActivity` + `PersonaGrid`. Keeps every MCP tool-form manifest. |
| `marketplace/Marketplace.jsx` | Tabbed trading floor (Jobs / Repos / Deals / Supply) with persistent active-job context rail and a live stats band. |
| `inventory/Inventory.jsx` | Persona tabs (As Bob / As Alice / Fleet) over `Gauge` + `DataTable`. |
| `marketplace/Reputation.jsx` | Top-3 podium cards with `Gauge` + `Sparkline`, rest as `DataTable`. Agents/Operators tabs. |
| `marketplace/Settlement.jsx` | `StatsGrid` tiles for paid/pending/disputed/frozen; `DataTable` with inline Pay/Refund. |
| `marketplace/Disputes.jsx` | Split layout: job-picker + dispute list on the left, ruling `PopoverCommandSelect` on the right. |
| `onboarding/BobOnboarding.jsx` | Horizontal stepper (GitHub → Repo → Policy) with `KeyValueList` review. |
| `onboarding/AliceOnboarding.jsx` | Stepper (Operator → Agent → Review). |
| `settings/BobSettings.jsx` | Form Panel + live policy-preview `KeyValueList`. |
| `settings/AliceSettings.jsx` | Form Panel + live policy-preview. |
| `diagnostics/WebMcpDiagnostics.jsx` | Top status strip, alphabet-grouped registered tools with per-tool probe button. |
| `admin/MarketAdmin.jsx` | Health-dot toolbar + 3-col Topology/Drift/Runbook + incidents `DataTable` + settlement freeze with live curl `CodeLine`. |
| `admin/SimulatorConfig.jsx` | Persona filter + clickable `CodeLine` commands with explainer. |
| `agent-track/AgentTrack.jsx` | Pulse Panel + 3-col streams + `Textarea` chat composer (Sparkline pulse replaces old `CommitGraph seed=` visual). |
| `not-found/NotFoundLite.jsx` | `Panel` with suggested routes + ⌘K hint. |

## What is preserved verbatim

- Every API endpoint + body shape (`/api/bountynet/market/*`, `/api/bountynet/ops/*`, `/api/bountynet/dashboard`, `/api/bountynet/feed`, `/api/bountynet/webmcp/journeys`, etc.).
- `usePollingJson` intervals: 12s dashboard/jobs, 20s agents, 12s feed.
- `localStorage` keys: `bn.settings.bob`, `bn.settings.alice`, agent-track store, voice inbox.
- MCP load-bearing `id="mcp-*"` attributes: `mcp-bob-save`, `mcp-alice-register`, all the landing-link IDs.
- All `toolname=` / `tooldescription=` / `toolautosubmit` form manifests on `LandingLite`.
- `VITE_GITHUB_APP_INSTALL_URL` env fallback.
- Agent Track event listeners (`bn:agent-track-updated`, `bn:voice-inbox-updated`, `smui:status-rail-transcript`) and `pushVoiceTranscript` source strings.

## Verified

- `npm run build:client` — clean (107 modules transformed).
- `npm run build:server` — clean SSR bundle.
- `npm run test` — no test files exist in the repo.
- `npm run lint` — started at 480 issues → down to 14 (10 errors, 4 warnings). Remaining are non-blocking React 19 Compiler strictness complaints (setState-in-effect × 6, jsx-a11y nits × 2 in `StatusRail`, react-refresh × 3 in `icons.jsx`, 1 exhaustive-deps). None are runtime bugs; if your CI runs `--max-warnings 0` we can clean them up in a follow-up.

## Not verified

- No browser screenshots — this sandbox has no rendering capability.
- No interaction tests — vitest has nothing to run.

## Patch

`cs16-redesign.patch` at the root of this directory is a git-compatible binary patch covering the same 27 files. Apply from the BountyNet repo root with `git apply --index`.
