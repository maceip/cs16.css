/**
 * cs16 Kit — visual showcase
 * One page that renders every component with every variant, side by side.
 * Route: /kit
 * Useful for comparing against shadcn, Radix, Carbon, Material, etc.
 */

import { useMemo, useState } from 'react';
import { PageLayout } from '../../layouts/page-layout.jsx';
import {
  AnimatedNumber,
  Badge,
  Button,
  Chip,
  CodeLine,
  CommitGraph,
  DataTable,
  EmptyState,
  Field,
  FileTree,
  Gauge,
  Icon,
  InfiniteSlider,
  Input,
  Kbd,
  KeyValueList,
  LiveMarketplaceActivity,
  MarketingHero,
  Panel,
  PersonaCard,
  PersonaGrid,
  PopoverCommandSelect,
  RepoCard,
  Section,
  Select,
  Separator,
  Skeleton,
  Sparkline,
  StatsGrid,
  StatusDot,
  Tabs,
  Terminal,
  Textarea,
  Toolbar,
  iconNames,
} from '../../components/cs16/index.js';

const TONES = ['accent', 'green', 'yellow', 'orange', 'red', 'purple', 'ghost'];
const DOT_TONES = ['accent', 'green', 'yellow', 'orange', 'red', 'purple'];
const BUTTON_VARIANTS = ['default', 'primary', 'danger', 'ghost'];
const BUTTON_SIZES = [undefined, 'sm', 'icon'];

const DEMO_REPO = {
  owner: 'bountynet',
  repo: 'agent-core',
  description:
    'Runtime for specialist agents competing in the BountyNet marketplace. Cross-pod, lane-aware, budget-gated.',
  language: 'TypeScript',
  stars: 1248,
  forks: 84,
  watchers: 42,
  visibility: 'Public',
  license: 'MIT',
  updated: '2d ago',
  topics: ['agents', 'marketplace', 'attestation', 'github-app'],
};

const DEMO_COMMITS = [
  {
    hash: 'c80f097a2b',
    message: 'Clarify attestation showcase modules',
    author: 'mac',
    date: '2d ago',
    parents: ['48752e5'],
    refs: [
      { name: 'main', type: 'branch' },
      { name: 'HEAD', type: 'head' },
    ],
  },
  {
    hash: '48752e5f17',
    message: 'Add motion-inspired Van.js demos',
    author: 'agent',
    date: '3d ago',
    parents: ['225a905'],
    refs: [{ name: 'feature/motion', type: 'branch' }],
  },
  {
    hash: '225a9052c0',
    message: 'Rebuild showcase from cs16 baseline',
    author: 'agent',
    date: '4d ago',
    parents: [],
    refs: [{ name: 'v0.2.0', type: 'tag' }],
  },
];

const DEMO_TREE = [
  {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [
          { name: 'panel.jsx', size: '2.4 KB' },
          { name: 'button.jsx', size: '1.8 KB', active: true },
          { name: 'tooltip.jsx', size: '0.9 KB' },
        ],
      },
      {
        name: 'lib',
        children: [
          { name: 'tokens.ts', size: '0.6 KB' },
          { name: 'utils.ts', size: '1.2 KB' },
        ],
      },
      { name: 'index.ts', size: '0.3 KB' },
    ],
  },
  { name: 'package.json', size: '1.2 KB' },
  { name: 'README.md', size: '3.8 KB' },
];

const DEMO_ACTIVITIES = [
  { id: 'a1', title: 'Offer awarded', detail: 'alice-ci · $280 · acme/backend', tone: 'accent', updatedAt: '14s ago' },
  { id: 'a2', title: 'Settlement paid', detail: 'stl-82a1 · $180 · marketplace', tone: 'green', updatedAt: '1m ago' },
  { id: 'a3', title: 'Dispute opened', detail: 'stl-9c42 · quality', tone: 'red', updatedAt: '3m ago' },
  { id: 'a4', title: 'Bounty posted', detail: 'ci_repair · acme/web', tone: 'yellow', updatedAt: '6m ago' },
  { id: 'a5', title: 'Agent registered', detail: 'rust-sec-1 · alice-co', tone: 'purple', updatedAt: '12m ago' },
];

const DEMO_ROWS = [
  { id: 1, name: 'alice-ci', pod: 'typescript', lane: 'ci-repair', status: 'active', score: 94 },
  { id: 2, name: 'rust-sec-1', pod: 'rust', lane: 'security', status: 'active', score: 88 },
  { id: 3, name: 'gha-porter', pod: 'github_actions', lane: 'porting', status: 'paused', score: 72 },
  { id: 4, name: 'ts-audit', pod: 'typescript', lane: 'audit', status: 'active', score: 81 },
];

const Showcase = () => {
  const [tab, setTab] = useState('foundations');
  const [popoverValue, setPopoverValue] = useState('ci_repair');
  const [gaugeValue, setGaugeValue] = useState(62);
  const [counter, setCounter] = useState(1280);
  const [textareaValue, setTextareaValue] = useState('Multiline input.');

  const popoverOptions = useMemo(
    () => [
      { label: 'CI repair', value: 'ci_repair', icon: 'bolt', hint: 'default' },
      { label: 'Dependency update', value: 'dep_update', icon: 'repo' },
      { label: 'Security update', value: 'security', icon: 'shield' },
      { label: 'Porting', value: 'porting', icon: 'cpu' },
    ],
    [],
  );

  return (
    <PageLayout fallback={<div className="bn-empty">Loading kit…</div>}>
      <div style={{ display: 'grid', gap: 24 }}>
        <Panel
          eyebrow="cs16 kit"
          title="Visual component showcase"
          meta={
            <StatusDot
              tone="green"
              pulse
              label={`${iconNames.length} icons · 27 components`}
            />
          }
          actions={
            <>
              <Kbd>⌘K</Kbd>
              <Button size="sm" icon="arrow" as="a" href="#primitives">
                Jump to primitives
              </Button>
            </>
          }
        >
          <p className="bn-body">
            Every primitive, composite, and motion component from the cs16 kit
            in one view — including every variant and tone — for side-by-side
            comparison against other libraries.
          </p>
        </Panel>

        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'foundations', label: 'Foundations', icon: 'dot' },
            { id: 'primitives', label: 'Primitives', icon: 'bolt' },
            { id: 'controls', label: 'Controls', icon: 'cpu' },
            { id: 'data', label: 'Data', icon: 'graph' },
            { id: 'surfaces', label: 'Surfaces', icon: 'repo' },
            { id: 'motion', label: 'Motion', icon: 'mic' },
            { id: 'composites', label: 'Composites', icon: 'globe' },
          ]}
        >
          {(current) => (
            <>
              {current === 'foundations' && <Foundations />}
              {current === 'primitives' && (
                <Primitives
                  popoverValue={popoverValue}
                  setPopoverValue={setPopoverValue}
                  popoverOptions={popoverOptions}
                />
              )}
              {current === 'controls' && (
                <Controls
                  popoverValue={popoverValue}
                  setPopoverValue={setPopoverValue}
                  popoverOptions={popoverOptions}
                  textareaValue={textareaValue}
                  setTextareaValue={setTextareaValue}
                />
              )}
              {current === 'data' && (
                <Data
                  gaugeValue={gaugeValue}
                  setGaugeValue={setGaugeValue}
                  counter={counter}
                  setCounter={setCounter}
                />
              )}
              {current === 'surfaces' && <Surfaces />}
              {current === 'motion' && <Motion />}
              {current === 'composites' && <Composites />}
            </>
          )}
        </Tabs>
      </div>
    </PageLayout>
  );
};

/* ------------------------------ Foundations ------------------------------ */
const Foundations = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel eyebrow="palette" title="Color tokens">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 8,
        }}
      >
        {[
          ['bg', '--bn-bg'],
          ['surface', '--bn-surface'],
          ['surface-1', '--bn-surface-1'],
          ['surface-2', '--bn-surface-2'],
          ['surface-3', '--bn-surface-3'],
          ['inset', '--bn-inset'],
          ['text', '--bn-text'],
          ['text-2', '--bn-text-2'],
          ['text-3', '--bn-text-3'],
          ['accent', '--bn-accent'],
          ['green', '--bn-green'],
          ['yellow', '--bn-yellow'],
          ['orange', '--bn-orange'],
          ['red', '--bn-red'],
          ['purple', '--bn-purple'],
        ].map(([name, token]) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr',
              gap: 8,
              alignItems: 'center',
              padding: 6,
              border: '1px solid var(--bn-border)',
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                background: `var(${token})`,
                border: '1px solid var(--bn-border-dark)',
              }}
            />
            <div style={{ display: 'grid', gap: 1, minWidth: 0 }}>
              <span className="bn-body" style={{ color: 'var(--bn-text)' }}>
                {name}
              </span>
              <span
                className="bn-meta"
                style={{ color: 'var(--bn-text-3)', fontSize: 10 }}
              >
                {token}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>

    <Panel eyebrow="typography" title="Type scale" bodyClassName="bn-stack">
      <span className="bn-eyebrow">eyebrow · 11px · mono</span>
      <span className="bn-meta">meta / caption · 12px · mono</span>
      <span className="bn-body">body · 13px · mono</span>
      <h3 className="bn-subhead">subhead · 18px · display</h3>
      <h2 className="bn-panel__title">panel title · 11px · mono-upper</h2>
      <h1 className="bn-headline">headline · 38px · display</h1>
    </Panel>

    <Panel eyebrow="icons" title={`All ${iconNames.length} icons`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 6,
        }}
      >
        {iconNames.map((name) => (
          <div
            key={name}
            style={{
              display: 'grid',
              gap: 6,
              justifyItems: 'center',
              padding: 12,
              border: '1px solid var(--bn-border-dark)',
              background: 'var(--bn-surface-1)',
            }}
          >
            <Icon name={name} size={22} style={{ color: 'var(--bn-text)' }} />
            <span
              className="bn-meta"
              style={{ color: 'var(--bn-text-2)', fontSize: 10 }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

/* ------------------------------ Primitives ------------------------------ */
const Primitives = ({ popoverValue, setPopoverValue, popoverOptions }) => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel id="primitives" eyebrow="button" title="Button variants">
      <div style={{ display: 'grid', gap: 10 }}>
        <div className="bn-row" style={{ gap: 8 }}>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
        <div className="bn-row" style={{ gap: 8 }}>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} icon="bolt">
              {variant} + icon
            </Button>
          ))}
        </div>
        <div className="bn-row" style={{ gap: 8 }}>
          {BUTTON_SIZES.map((size) => (
            <Button key={size || 'md'} size={size} icon="bolt">
              {size || 'md'}
            </Button>
          ))}
          <Button disabled>disabled</Button>
        </div>
      </div>
    </Panel>

    <Panel eyebrow="chips" title="Chip / Badge tones">
      <div className="bn-row" style={{ gap: 6, flexWrap: 'wrap' }}>
        {TONES.map((tone) => (
          <Chip key={tone} tone={tone} icon="dot">
            {tone}
          </Chip>
        ))}
      </div>
      <Separator />
      <div className="bn-row" style={{ gap: 6, flexWrap: 'wrap' }}>
        {TONES.map((tone) => (
          <Badge key={tone} tone={tone}>
            Badge · {tone}
          </Badge>
        ))}
      </div>
    </Panel>

    <Panel eyebrow="status" title="Status dots">
      <div className="bn-row" style={{ gap: 16, flexWrap: 'wrap' }}>
        {DOT_TONES.map((tone) => (
          <StatusDot key={tone} tone={tone} label={tone} />
        ))}
        <StatusDot tone="green" pulse label="pulse" />
      </div>
    </Panel>

    <Panel eyebrow="kbd" title="Kbd + separator">
      <div className="bn-row" style={{ gap: 6 }}>
        <Kbd>⌘K</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <span className="bn-meta">— keyboard hint tokens</span>
      </div>
      <Separator />
      <span className="bn-meta">A separator (cs-hr) sits above this line.</span>
    </Panel>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      <Panel eyebrow="empty" title="Empty state">
        <EmptyState
          icon="graph"
          title="No records."
          description="Nothing matches the current filter."
          action={<Button size="sm" icon="plus">Create</Button>}
        />
      </Panel>
      <Panel eyebrow="skeleton" title="Loading skeletons" bodyClassName="bn-stack">
        <Skeleton height={14} width="60%" />
        <Skeleton height={14} width="85%" />
        <Skeleton height={14} width="40%" />
        <Skeleton height={72} />
      </Panel>
      <Panel eyebrow="popover" title="PopoverCommandSelect">
        <PopoverCommandSelect
          id="kit-popover"
          label="Job class"
          value={popoverValue}
          onChange={setPopoverValue}
          options={popoverOptions}
        />
        <span className="bn-meta">value = {popoverValue}</span>
      </Panel>
    </div>
  </div>
);

/* ------------------------------ Controls ------------------------------ */
const Controls = ({
  popoverValue,
  setPopoverValue,
  popoverOptions,
  textareaValue,
  setTextareaValue,
}) => (
  <div
    style={{
      display: 'grid',
      gap: 16,
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    }}
  >
    <Panel eyebrow="field + input" title="Text input" bodyClassName="bn-stack">
      <Field label="Label" help="Helper text goes under the control.">
        <Input placeholder="placeholder…" defaultValue="Operator" />
      </Field>
      <Field label="With error" error="slug must be lowercase.">
        <Input defaultValue="ALICE" />
      </Field>
      <Field label="Required" required>
        <Input placeholder="slug" />
      </Field>
    </Panel>

    <Panel eyebrow="textarea" title="Multiline input">
      <Textarea
        value={textareaValue}
        onChange={(event) => setTextareaValue(event.target.value)}
      />
    </Panel>

    <Panel eyebrow="select" title="Native select">
      <Field label="Risk level">
        <Select defaultValue="medium">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </Field>
    </Panel>

    <Panel eyebrow="popover select" title="Command select">
      <PopoverCommandSelect
        id="kit-popover-controls"
        label="Job class"
        value={popoverValue}
        onChange={setPopoverValue}
        options={popoverOptions}
      />
    </Panel>

    <Panel eyebrow="toolbar" title="Toolbar">
      <Toolbar>
        <Button size="sm" icon="plus">New</Button>
        <Button size="sm" variant="ghost" icon="copy">Copy</Button>
        <Button size="sm" variant="ghost" icon="arrow">Export</Button>
        <span style={{ marginLeft: 'auto' }}>
          <Chip tone="accent">4 items</Chip>
        </span>
      </Toolbar>
    </Panel>
  </div>
);

/* ------------------------------ Data ------------------------------ */
const Data = ({ gaugeValue, setGaugeValue, counter, setCounter }) => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel eyebrow="animated number" title="AnimatedNumber">
      <div className="bn-row" style={{ gap: 24, alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: 'var(--bn-font-mono)',
            fontSize: 42,
            color: 'var(--bn-text)',
          }}
        >
          <AnimatedNumber value={counter} />
        </span>
        <div className="bn-row" style={{ gap: 6 }}>
          {[0, 128, 1280, 4096, 99999].map((v) => (
            <Button key={v} size="sm" onClick={() => setCounter(v)}>
              {v.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>
    </Panel>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      <Panel eyebrow="gauge" title="Gauge">
        <Gauge value={gaugeValue} max={100} label="throughput" unit="req/s" />
        <div className="bn-row" style={{ gap: 6, marginTop: 10 }}>
          {[0, 25, 50, 75, 100].map((v) => (
            <Button key={v} size="sm" onClick={() => setGaugeValue(v)}>
              {v}%
            </Button>
          ))}
        </div>
      </Panel>

      <Panel eyebrow="sparkline" title="Sparkline">
        <div style={{ display: 'grid', gap: 12 }}>
          <Sparkline values={[2, 4, 3, 7, 5, 8, 6, 12, 10, 14, 11, 16]} />
          <Sparkline
            values={[10, 9, 11, 8, 12, 6, 9, 5, 7, 3, 5, 2]}
            stroke="var(--bn-red)"
            fill="hsl(355 55% 66% / 0.15)"
          />
          <Sparkline
            values={[4, 5, 4, 6, 5, 6, 5, 7, 6, 7, 6, 8]}
            stroke="var(--bn-green)"
            fill="hsl(92 32% 65% / 0.15)"
          />
        </div>
      </Panel>

      <Panel eyebrow="stats" title="StatsGrid">
        <StatsGrid
          tiles={[
            { key: 'a', label: 'open jobs', value: 48, hint: '12 new today', delta: 12 },
            { key: 'b', label: 'offers', value: 134, hint: 'across 22 jobs' },
            { key: 'c', label: 'settlements', value: 91, unit: 'paid', delta: -3 },
            { key: 'd', label: 'dispute rate', value: 4, unit: '%' },
          ]}
        />
      </Panel>
    </div>

    <Panel eyebrow="data table" title="DataTable">
      <DataTable
        columns={[
          { key: 'name', label: 'Agent' },
          { key: 'pod', label: 'Pod', render: (row) => <Chip tone="accent">{row.pod}</Chip> },
          { key: 'lane', label: 'Lane' },
          {
            key: 'status',
            label: 'Status',
            render: (row) => (
              <Chip tone={row.status === 'active' ? 'green' : 'yellow'}>
                {row.status}
              </Chip>
            ),
          },
          {
            key: 'score',
            label: 'Score',
            align: 'right',
            render: (row) => <AnimatedNumber value={row.score} />,
          },
        ]}
        rows={DEMO_ROWS}
      />
    </Panel>

    <Panel eyebrow="key/value" title="KeyValueList">
      <KeyValueList
        columns={3}
        items={[
          { key: 'owner', value: 'bountynet' },
          { key: 'language', value: 'TypeScript' },
          { key: 'license', value: 'MIT' },
          { key: 'version', value: 'v0.4.0' },
          { key: 'built', value: '2m ago' },
          { key: 'commits', value: '1,284' },
        ]}
      />
    </Panel>
  </div>
);

/* ------------------------------ Surfaces ------------------------------ */
const Surfaces = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel
      eyebrow="repo card"
      title="RepoCard"
      meta={<Chip tone="accent">GitHub-style</Chip>}
    >
      <RepoCard {...DEMO_REPO} />
    </Panel>

    <Panel eyebrow="commit graph" title="CommitGraph">
      <CommitGraph commits={DEMO_COMMITS} activeHash="c80f097a2b" />
    </Panel>

    <Panel eyebrow="file tree" title="FileTree">
      <FileTree nodes={DEMO_TREE} defaultExpanded={['src', 'src/components']} />
    </Panel>

    <Panel eyebrow="code line" title="CodeLine">
      <div style={{ display: 'grid', gap: 8 }}>
        <CodeLine lang="ts" file="button.ts">
          {'import { Button } from "@/components/cs16"'}
        </CodeLine>
        <CodeLine lang="sh" file="install">
          {'npm install && npm run build'}
        </CodeLine>
        <CodeLine lang="json" file="package.json">
          {'{ "name": "bountynet-web", "type": "module" }'}
        </CodeLine>
      </div>
    </Panel>

    <Panel eyebrow="terminal" title="Terminal">
      <Terminal
        title="seed fleet response"
        content={{
          ok: true,
          operators: 3,
          agents: 9,
          seeded_at: '2026-04-18T14:22:08Z',
        }}
      />
    </Panel>

    <Panel eyebrow="panel" title="Panel with footer" footer={<span className="bn-meta">footer slot</span>}>
      <p className="bn-body">
        Panels accept eyebrow, title, meta, actions, and footer slots. This one
        has a footer.
      </p>
    </Panel>
  </div>
);

/* ------------------------------ Motion ------------------------------ */
const Motion = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel eyebrow="infinite slider" title="InfiniteSlider">
      <InfiniteSlider items={DEMO_ACTIVITIES} speed={28} />
    </Panel>
    <Panel eyebrow="marquee — slow" title="InfiniteSlider (slow)">
      <InfiniteSlider items={DEMO_ACTIVITIES} speed={60} />
    </Panel>
    <Panel eyebrow="animated numbers" title="Numeric animation grid">
      <StatsGrid
        tiles={[
          { key: 'n1', label: 'session volume', value: 1284 },
          { key: 'n2', label: 'job throughput', value: 47, delta: 8 },
          { key: 'n3', label: 'tokens', value: 2_482_190 },
          { key: 'n4', label: 'TPS', value: 162, unit: 'req/s' },
        ]}
      />
    </Panel>
  </div>
);

/* ------------------------------ Composites ------------------------------ */
const Composites = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <Panel eyebrow="marketing hero" title="MarketingHero">
      <MarketingHero
        kicker="cs16 kit"
        title="Dense, terminal-grade UI for dev tools."
        body="Beveled panels, aurora status tones, monospace type. Composes cleanly with the rest of the kit."
        personas={[
          { tone: 'accent', label: 'Bob', hint: 'owner' },
          { tone: 'green', label: 'Alice', hint: 'operator' },
        ]}
        ctas={[
          { label: 'Open marketplace', to: '/marketplace', icon: 'bolt', variant: 'primary' },
          { label: 'Diagnostics', to: '/diagnostics/webmcp', icon: 'terminal', variant: 'ghost' },
        ]}
      />
    </Panel>

    <Panel eyebrow="live feed" title="LiveMarketplaceActivity — live">
      <LiveMarketplaceActivity
        activities={DEMO_ACTIVITIES}
        live
        source="gateway"
        updatedAt="just now"
        intervalMs={12000}
      />
    </Panel>

    <Panel eyebrow="live feed — states" title="LiveMarketplaceActivity — states">
      <div style={{ display: 'grid', gap: 12 }}>
        <LiveMarketplaceActivity activities={[]} live={false} loading />
        <LiveMarketplaceActivity activities={[]} live={false} />
        <LiveMarketplaceActivity
          activities={[]}
          live={false}
          error="feed gateway unreachable"
          onRetry={() => {}}
        />
      </div>
    </Panel>

    <Panel eyebrow="persona cards" title="PersonaCard / PersonaGrid">
      <PersonaGrid
        personas={[
          {
            tone: 'accent',
            icon: 'shield',
            kicker: 'for bob',
            title: 'Repo owners.',
            bullets: ['Connect GitHub.', 'Set spend policy.', 'Get vetted work.'],
            cta: { label: 'Bob settings', to: '/settings/bob' },
          },
          {
            tone: 'green',
            icon: 'cpu',
            kicker: 'for alice',
            title: 'Agent operators.',
            bullets: ['Register agents.', 'Build reputation.', 'Compete.'],
            cta: { label: 'Alice settings', to: '/settings/alice' },
          },
          {
            tone: 'yellow',
            icon: 'graph',
            kicker: 'inventory',
            title: 'See work.',
            body: 'Track sessions and jobs across the market.',
            cta: { label: 'Open inventory', to: '/inventory' },
          },
        ]}
      />
    </Panel>

    <Panel eyebrow="persona card — solo" title="Single PersonaCard">
      <PersonaCard
        tone="purple"
        icon="cpu"
        kicker="infra"
        title="Orchestration and ops."
        body="Unified control plane for topology, drift, and incidents."
        cta={{ label: 'Open control plane', to: '/ops/control-plane' }}
      />
    </Panel>

    <Panel eyebrow="section" title="Section wrapper">
      <Section
        eyebrow="inner"
        title="Section composes other components"
        actions={<Button size="sm" icon="arrow">See all</Button>}
      >
        <p className="bn-body">
          Use <code>&lt;Section&gt;</code> to give inline groups consistent
          rhythm on pages that don't need a full Panel.
        </p>
      </Section>
    </Panel>
  </div>
);

export default Showcase;
