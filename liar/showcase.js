import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.6.0/src/van.min.js";

const {
  a,
  article,
  button,
  code,
  details,
  div,
  fieldset,
  form,
  header,
  h1,
  h2,
  h3,
  hr,
  input,
  label,
  legend,
  li,
  option,
  p,
  progress,
  section,
  select,
  span,
  summary,
  table,
  tbody,
  td,
  textarea,
  th,
  thead,
  tr,
  ul,
} = van.tags;

const componentNames = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Autocomplete",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Calendar",
  "Card",
  "Checkbox",
  "Checkbox Group",
  "Collapsible",
  "Combobox",
  "Command",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Empty",
  "Field",
  "Fieldset",
  "Form",
  "Frame",
  "Group",
  "Input",
  "Input Group",
  "Kbd",
  "Label",
  "Menu",
  "Meter",
  "Number Field",
  "OTP Field",
  "Pagination",
  "Popover",
  "Preview Card",
  "Progress",
  "Radio Group",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Skeleton",
  "Slider",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toast",
  "Toggle",
  "Toggle Group",
  "Toolbar",
  "Tooltip",
  "Code Line",
  "Repo Card",
  "Commit Graph",
  "File Tree",
  "Carousel",
  "Infinite Slider",
  "Text Scramble",
  "Text Shimmer",
  "Animated Number",
  "Sliding Number",
];

const state = {
  accordionOpen: van.state(true),
  alertDialogOpen: van.state(false),
  collapsibleOpen: van.state(true),
  dialogOpen: van.state(false),
  drawerOpen: van.state(false),
  popoverOpen: van.state(false),
  sheetOpen: van.state(false),
  switchOn: van.state(true),
  toggleOn: van.state(false),
  selectedRadio: van.state("alpha"),
  progressValue: van.state(62),
  meterValue: van.state(74),
  pageNumber: van.state(2),
  numberValue: van.state(12),
  otpValue: van.state(["A", "7", "", "", "", ""]),
  animatedNumber: van.state(1280),
  animatedDisplay: van.state(1280),
  slidingNumber: van.state("042"),
  carouselIndex: van.state(0),
  scrambleText: van.state("GENERATING THE INTERFACE..."),
  toasts: van.state([{ id: 1, text: "UI showcase initialized." }]),
  expandedTreePaths: van.state(["src", "src/components"]),
};

const carouselSlides = [
  ["Slide 1", "Paged view using stock framed controls."],
  ["Slide 2", "No React runtime, only Van.js."],
  ["Slide 3", "CS16 colors and border language."],
];

const repoCardData = {
  owner: "jal-co",
  repo: "ui",
  description:
    "A curated set of high-quality UI primitives for modern app shells. CS16-flavored.",
  language: "TypeScript",
  languageColor: "#3178c6",
  stars: 1248,
  forks: 84,
  watchers: 42,
  license: "MIT",
  visibility: "Public",
  updated: "2d ago",
  topics: ["ui", "components", "design-system", "accessibility", "van-js"],
};

const codeLineData = {
  lang: "ts",
  file: "button.ts",
  snippet: 'import { Button } from "@/components/ui/button"',
};

const commitGraphData = [
  {
    hash: "c80f097a2b",
    message: "Clarify attestation showcase modules",
    author: "agent",
    date: "2d ago",
    parents: ["48752e5"],
    refs: [{ name: "main", type: "branch" }, { name: "HEAD", type: "head" }],
  },
  {
    hash: "48752e5f17",
    message: "Add motion-inspired Van.js demos",
    author: "agent",
    date: "2d ago",
    parents: ["225a905"],
    refs: [{ name: "feature/motion", type: "branch" }],
  },
  {
    hash: "225a9052c0",
    message: "Rebuild showcase from cs16 baseline",
    author: "agent",
    date: "3d ago",
    parents: [],
    refs: [{ name: "v0.2.0", type: "tag" }],
  },
  {
    hash: "a05b63fbe1",
    message: "Add collapsible desktop sidebar and foldable rail",
    author: "agent",
    date: "5d ago",
    parents: ["225a905"],
    refs: [],
  },
];

const fileTreeData = [
  {
    name: "src",
    children: [
      {
        name: "components",
        children: [
          { name: "accordion.ts", size: "2.4 KB" },
          { name: "dialog.ts", size: "3.1 KB" },
          { name: "file-tree.ts", size: "1.7 KB", active: true },
          { name: "tooltip.ts", size: "0.9 KB" },
        ],
      },
      {
        name: "lib",
        children: [
          { name: "tokens.ts", size: "0.6 KB" },
          { name: "utils.ts", size: "1.2 KB" },
        ],
      },
      { name: "index.ts", size: "0.3 KB" },
    ],
  },
  { name: "package.json", size: "1.2 KB" },
  { name: "README.md", size: "3.8 KB" },
  { name: ".gitignore", size: "0.2 KB" },
];

const ICON_SVGS = {
  chevron:
    '<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M3 2 L3 8 L7 5 Z" fill="currentColor"/></svg>',
  folder:
    '<svg viewBox="0 0 16 14" aria-hidden="true" focusable="false"><path d="M1 2 h5 l2 2 h7 v9 h-14 z" fill="currentColor"/></svg>',
  "folder-open":
    '<svg viewBox="0 0 16 14" aria-hidden="true" focusable="false"><path d="M1 2 h5 l2 2 h7 v2 h-11 l-3 7 h-1 z M15 6 l-2 7 h-12 l2 -7 z" fill="currentColor"/></svg>',
  file:
    '<svg viewBox="0 0 12 14" aria-hidden="true" focusable="false"><path d="M1 1 h7 l3 3 v9 h-10 z M8 1 v3 h3" fill="currentColor"/></svg>',
  copy:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 1 h8 v2 h-6 v8 h-2 z M5 3 h8 v10 h-8 z" fill="currentColor"/></svg>',
  check:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M2 7 l3 3 l7 -7 l-1 -1 l-6 6 l-2 -2 z" fill="currentColor"/></svg>',
  star:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M7 1 l1.7 4 l4.3 0.3 l-3.3 2.8 l1 4.4 l-3.7 -2.3 l-3.7 2.3 l1 -4.4 l-3.3 -2.8 l4.3 -0.3 z" fill="currentColor"/></svg>',
  fork:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 1 h2 v3 h-2 z M9 1 h2 v3 h-2 z M3 10 h2 v3 h-2 z M4 4 v2 c0 1.5 6 1.5 6 3 M4 6 v4 M10 4 v2" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
  eye:
    '<svg viewBox="0 0 16 14" aria-hidden="true" focusable="false"><path d="M1 7 c3 -5 11 -5 14 0 c-3 5 -11 5 -14 0 z M8 4 a3 3 0 1 0 0.01 0 z" fill="currentColor"/></svg>',
  repo:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M2 1 h10 v11 h-9 a1 1 0 0 1 -1 -1 z M4 3 h6 v5 h-6 z M3 11 h9 v2 h-9 z" fill="currentColor"/></svg>',
  branch:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 1 h2 v3 h-2 z M9 1 h2 v3 h-2 z M3 10 h2 v3 h-2 z M4 4 v6 M10 4 c0 3 -6 2 -6 3" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
  tag:
    '<svg viewBox="0 0 16 14" aria-hidden="true" focusable="false"><path d="M1 7 l6 -6 h8 v8 l-6 6 z M12 4 h1.5 v1.5 h-1.5 z" fill="currentColor"/></svg>',
  dot:
    '<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><circle cx="5" cy="5" r="4" fill="currentColor"/></svg>',
  commit:
    '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M0 6 h3 v2 h-3 z M11 6 h3 v2 h-3 z" fill="currentColor"/></svg>',
};

function icon(name, extraClass = "") {
  const el = document.createElement("span");
  el.className = `liar-icon liar-icon--${name}${extraClass ? " " + extraClass : ""}`;
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = ICON_SVGS[name] || "";
  return el;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function fileExtension(name) {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match ? match[1].toLowerCase() : "";
}

function countTreeNodes(nodes) {
  let folders = 0;
  let files = 0;
  const walk = (list) => {
    for (const node of list) {
      if (Array.isArray(node.children)) {
        folders += 1;
        walk(node.children);
      } else {
        files += 1;
      }
    }
  };
  walk(nodes);
  return { folders, files };
}

const scrambleAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function animateNumberTo(target) {
  const start = state.animatedDisplay.val;
  const steps = 18;
  let frame = 0;
  const tick = () => {
    frame += 1;
    const progressRatio = Math.min(frame / steps, 1);
    state.animatedDisplay.val = Math.round(start + (target - start) * progressRatio);
    if (progressRatio < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function scrambleTo(target) {
  let frame = 0;
  const total = 16;
  const run = () => {
    frame += 1;
    const reveal = Math.floor((frame / total) * target.length);
    const text = target
      .split("")
      .map((char, index) => {
        if (index < reveal) return char;
        return scrambleAlphabet[(frame + index) % scrambleAlphabet.length];
      })
      .join("");
    state.scrambleText.val = text;
    if (frame < total) requestAnimationFrame(run);
    else state.scrambleText.val = target;
  };
  requestAnimationFrame(run);
}

function renderLine(name, description, body) {
  return article(
    { class: "liar-line", id: `component-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
    fieldset(
      { class: "cs-fieldset liar-card" },
      legend(null, name),
      div(
        { class: "liar-card__body" },
        p({ class: "liar-card__meta" }, description),
        body
      )
    )
  );
}

function renderAccordion() {
  return renderLine(
    "Accordion",
    "Expandable disclosure row.",
    div(
      { class: "liar-stack" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            state.accordionOpen.val = !state.accordionOpen.val;
          },
        },
        () => (state.accordionOpen.val ? "Hide details" : "Show details")
      ),
      () =>
        state.accordionOpen.val
          ? div({ class: "liar-panel" }, "Single accordion panel body.")
          : null
    )
  );
}

function renderAlert() {
  return renderLine(
    "Alert",
    "Inline system notice.",
    div({ class: "liar-panel" }, strongLine("System Notice"), p(null, "Attestation channel is active."))
  );
}

function strongLine(text) {
  return div({ class: "liar-strong" }, text);
}

function renderAlertDialog() {
  return renderLine(
    "Alert Dialog",
    "Blocking confirmation surface.",
    div(
      { class: "liar-stack" },
      button(
        { class: "cs-btn", type: "button", onclick: () => (state.alertDialogOpen.val = !state.alertDialogOpen.val) },
        () => (state.alertDialogOpen.val ? "Close alert dialog" : "Open alert dialog")
      ),
      () =>
        state.alertDialogOpen.val
          ? div(
              { class: "liar-panel" },
              strongLine("Delete transmission log?"),
              p(null, "This action cannot be undone."),
              div(
                { class: "liar-row" },
                button({ class: "cs-btn", type: "button", onclick: () => (state.alertDialogOpen.val = false) }, "Cancel"),
                button({ class: "cs-btn", type: "button", onclick: () => (state.alertDialogOpen.val = false) }, "Delete")
              )
            )
          : null
    )
  );
}

function renderAutocomplete() {
  return renderLine(
    "Autocomplete",
    "Text field with a compact suggestion tray.",
    div(
      { class: "liar-stack" },
      input({ class: "cs-input", type: "text", value: "alpha-node" }),
      ul(
        { class: "liar-list" },
        li(null, "alpha-node"),
        li(null, "attest-chain"),
        li(null, "command-shell")
      )
    )
  );
}

function renderAvatar() {
  return renderLine(
    "Avatar",
    "Framed initials tile.",
    div(
      { class: "liar-row" },
      div({ class: "liar-avatar" }, "CS"),
      div({ class: "liar-stack" }, strongLine("Counter System"), span(null, "Online"))
    )
  );
}

function renderBadge() {
  return renderLine(
    "Badge",
    "Small status marker.",
    div(
      { class: "liar-row" },
      span({ class: "liar-chip" }, "Primary"),
      span({ class: "liar-chip" }, "Draft"),
      span({ class: "liar-chip liar-chip--accent" }, "Alert")
    )
  );
}

function renderBreadcrumb() {
  return renderLine(
    "Breadcrumb",
    "Linear location path.",
    div({ class: "liar-row liar-breadcrumb" }, span(null, "docs"), span(null, ">"), span(null, "components"), span(null, ">"), span(null, "tooltip"))
  );
}

function renderButton() {
  return renderLine(
    "Button",
    "Primary interaction surface using stock cs-btn.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button" }, "Primary"),
      button({ class: "cs-btn", type: "button", disabled: true }, "Disabled"),
      button({ class: "cs-btn close", type: "button" })
    )
  );
}

function renderCalendar() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return renderLine(
    "Calendar",
    "Compact month grid.",
    div(
      { class: "liar-stack" },
      strongLine("Oct 2026"),
      div({ class: "liar-calendar" }, ...days.map((day) => span(null, day))),
      div({ class: "liar-calendar" }, ...Array.from({ length: 14 }, (_, index) => button({ class: "cs-btn liar-calendar__cell", type: "button" }, index < 2 ? "" : `${index - 1}`)))
    )
  );
}

function renderCard() {
  return renderLine(
    "Card",
    "Inset information panel.",
    div({ class: "liar-panel" }, strongLine("Operational Summary"), p(null, "Card content framed with CS16 borders."))
  );
}

function renderCheckbox() {
  return renderLine(
    "Checkbox",
    "Single boolean choice.",
    label(
      { class: "cs-checkbox" },
      input({ type: "checkbox", checked: true }),
      span({ class: "cs-checkbox__label" }, "Enable transport")
    )
  );
}

function renderCheckboxGroup() {
  return renderLine(
    "Checkbox Group",
    "Multiple stacked choices.",
    div(
      { class: "liar-stack" },
      ...["Logs", "Metrics", "Alerts"].map((item, index) =>
        label(
          { class: "cs-checkbox" },
          input({ type: "checkbox", checked: index < 2 }),
          span({ class: "cs-checkbox__label" }, item)
        )
      )
    )
  );
}

function renderCollapsible() {
  return renderLine(
    "Collapsible",
    "Simple disclosure using details/summary.",
    details(
      { open: true, class: "liar-details" },
      summary(null, "Show details"),
      div({ class: "liar-panel" }, "Collapsible content.")
    )
  );
}

function renderCombobox() {
  return renderLine(
    "Combobox",
    "Text-entry picker backed by a compact list.",
    div(
      { class: "liar-stack" },
      input({ class: "cs-input", type: "text", value: "alpha" }),
      ul({ class: "liar-list" }, li(null, "alpha"), li(null, "beta"), li(null, "gamma"))
    )
  );
}

function renderCommand() {
  return renderLine(
    "Command",
    "Quick command list with highlighted row.",
    div(
      { class: "liar-stack" },
      input({ class: "cs-input", type: "text", placeholder: "Type a command..." }),
      ul({ class: "liar-list" }, li({ class: "is-active" }, "Init enclave"), li(null, "Refresh token"), li(null, "Verify quote"))
    )
  );
}

function renderDatePicker() {
  return renderLine(
    "Date Picker",
    "Date field using text input and compact helper row.",
    div(
      { class: "liar-stack" },
      input({ class: "cs-input", type: "text", value: "2026-04-18" }),
      div({ class: "liar-calendar" }, ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => span(null, day)))
    )
  );
}

function renderDialog() {
  return renderLine(
    "Dialog",
    "Stock modal shell example.",
    div(
      { class: "liar-stack" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.dialogOpen.val = !state.dialogOpen.val) }, () => (state.dialogOpen.val ? "Hide dialog" : "Show dialog")),
      () => (state.dialogOpen.val ? div({ class: "liar-panel" }, strongLine("Showcase Dialog"), p(null, "Dialog content preview.")) : null)
    )
  );
}

function renderDrawer() {
  return renderLine(
    "Drawer",
    "Edge-aligned panel preview.",
    div(
      { class: "liar-stack" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.drawerOpen.val = !state.drawerOpen.val) }, () => (state.drawerOpen.val ? "Hide drawer" : "Show drawer")),
      () => (state.drawerOpen.val ? div({ class: "liar-panel" }, p(null, "Drawer content.")) : null)
    )
  );
}

function renderEmpty() {
  return renderLine("Empty", "Structured empty state.", div({ class: "liar-empty" }, "No records found."));
}

function renderField() {
  return renderLine(
    "Field",
    "Label + input + helper text.",
    div(
      { class: "liar-stack" },
      label({ class: "cs-input__label", for: "field-demo" }, "Entity"),
      input({ id: "field-demo", class: "cs-input", type: "text", value: "Operator" }),
      p({ class: "liar-card__meta" }, "Helper text.")
    )
  );
}

function renderFieldset() {
  return renderLine(
    "Fieldset",
    "Grouped controls under legend.",
    fieldset(
      { class: "cs-fieldset" },
      legend(null, "Transport"),
      div(
        null,
        label({ class: "cs-checkbox" }, input({ type: "checkbox", checked: true }), span({ class: "cs-checkbox__label" }, "Secure channel"))
      )
    )
  );
}

function renderForm() {
  return renderLine(
    "Form",
    "Conventional command form.",
    form(
      { class: "liar-stack" },
      input({ class: "cs-input", type: "text", placeholder: "Name" }),
      textarea({ class: "cs-input liar-textarea", placeholder: "Notes" }),
      button({ class: "cs-btn", type: "button" }, "Submit")
    )
  );
}

function renderFrame() {
  return renderLine("Frame", "Inset framed support block.", div({ class: "liar-frame" }, "Framed content."));
}

function renderGroup() {
  return renderLine(
    "Group",
    "Horizontal action group.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button" }, "Alpha"),
      button({ class: "cs-btn", type: "button" }, "Beta"),
      button({ class: "cs-btn", type: "button" }, "Gamma")
    )
  );
}

function renderInput() {
  return renderLine("Input", "Stock text input.", input({ class: "cs-input", type: "text", placeholder: "Type here..." }));
}

function renderInputGroup() {
  return renderLine(
    "Input Group",
    "Prefixed and suffixed field.",
    div(
      { class: "liar-input-group" },
      span({ class: "liar-chip" }, "$"),
      input({ class: "cs-input", type: "text", value: "128" }),
      span({ class: "liar-chip" }, "USD")
    )
  );
}

function renderKbd() {
  return renderLine("Kbd", "Keyboard hint token.", span({ class: "liar-chip" }, "CTRL + K"));
}

function renderLabel() {
  return renderLine(
    "Label",
    "Standalone field label.",
    div({ class: "liar-stack" }, label({ class: "cs-input__label", for: "label-demo-liar" }, "Preview"), input({ id: "label-demo-liar", class: "cs-input", type: "text", value: "Preview" }))
  );
}

function renderMenu() {
  return renderLine("Menu", "Action menu list.", ul({ class: "liar-list" }, li(null, "Open"), li(null, "Duplicate"), li(null, "Archive")));
}

function renderMeter() {
  return renderLine(
    "Meter",
    "Read-only level indicator.",
    div({ class: "liar-stack" }, p({ class: "liar-card__meta" }, () => `Usage ${state.meterValue.val}%`), div({ class: "cs-progress-bar" }, div({ class: "bars", style: () => `width:${state.meterValue.val}%` })))
  );
}

function renderNumberField() {
  return renderLine(
    "Number Field",
    "Numeric field with step buttons.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.numberValue.val -= 1) }, "-"),
      input({ class: "cs-input", type: "text", value: () => `${state.numberValue.val}` }),
      button({ class: "cs-btn", type: "button", onclick: () => (state.numberValue.val += 1) }, "+")
    )
  );
}

function renderOtpField() {
  return renderLine(
    "OTP Field",
    "Segmented code entry.",
    div(
      { class: "liar-row" },
      ...state.otpValue.val.map((value) => input({ class: "cs-input liar-otp", type: "text", value }))
    )
  );
}

function renderPagination() {
  return renderLine(
    "Pagination",
    "Directional page controls.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.pageNumber.val = Math.max(1, state.pageNumber.val - 1)) }, "Prev"),
      span({ class: "liar-chip" }, () => `Page ${state.pageNumber.val}`),
      button({ class: "cs-btn", type: "button", onclick: () => (state.pageNumber.val += 1) }, "Next")
    )
  );
}

function renderPopover() {
  return renderLine(
    "Popover",
    "Anchored utility panel.",
    div(
      { class: "liar-stack" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.popoverOpen.val = !state.popoverOpen.val) }, () => (state.popoverOpen.val ? "Hide popover" : "Show popover")),
      () => (state.popoverOpen.val ? div({ class: "liar-panel" }, "Popover preview content.") : null)
    )
  );
}

function renderPreviewCard() {
  return renderLine(
    "Preview Card",
    "Hover/focus preview style card.",
    div({ class: "liar-panel" }, strongLine("Entity #7"), p(null, "Preview metadata."))
  );
}

function renderProgress() {
  return renderLine(
    "Progress",
    "Stock progress bar.",
    div(
      { class: "liar-stack" },
      p({ class: "liar-card__meta" }, () => `Progress ${state.progressValue.val}%`),
      div({ class: "cs-progress-bar" }, div({ class: "bars", style: () => `width:${state.progressValue.val}%` }))
    )
  );
}

function renderRadioGroup() {
  const items = ["alpha", "beta", "gamma"];
  return renderLine(
    "Radio Group",
    "Exclusive choice list.",
    fieldset(
      { class: "cs-fieldset" },
      legend(null, "Selection"),
      div(
        null,
        ...items.map((value) =>
          div(
            { class: "liar-stack" },
            input({
              id: `radio-${value}`,
              type: "radio",
              name: "liar-radio",
              checked: () => state.selectedRadio.val === value,
              onchange: () => (state.selectedRadio.val = value),
            }),
            label({ for: `radio-${value}` }, value.toUpperCase())
          )
        )
      )
    )
  );
}

function renderScrollArea() {
  return renderLine(
    "Scroll Area",
    "Constrained panel using native cs16 scrollbars.",
    div(
      { class: "liar-scroll" },
      ...Array.from({ length: 12 }, (_, index) => p(null, `Scrollable row ${index + 1}`))
    )
  );
}

function renderSelect() {
  return renderLine(
    "Select",
    "Stock cs-select field.",
    select(
      { class: "cs-select" },
      option({ value: "alpha" }, "Alpha"),
      option({ value: "beta" }, "Beta"),
      option({ value: "gamma" }, "Gamma")
    )
  );
}

function renderSeparator() {
  return renderLine("Separator", "Divider line.", hr({ class: "cs-hr" }));
}

function renderSheet() {
  return renderLine(
    "Sheet",
    "Edge-mounted panel preview.",
    div(
      { class: "liar-stack" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.sheetOpen.val = !state.sheetOpen.val) }, () => (state.sheetOpen.val ? "Hide sheet" : "Show sheet")),
      () => (state.sheetOpen.val ? div({ class: "liar-panel" }, "Sheet content.") : null)
    )
  );
}

function renderSkeleton() {
  return renderLine(
    "Skeleton",
    "Loading placeholders.",
    div({ class: "liar-stack" }, div({ class: "liar-skeleton liar-skeleton--line" }), div({ class: "liar-skeleton liar-skeleton--line short" }), div({ class: "liar-skeleton liar-skeleton--block" }))
  );
}

function renderSlider() {
  return renderLine(
    "Slider",
    "Stock cs-slider range.",
    div(
      { class: "cs-slider" },
      label({ for: "liar-slider" }, "Slider"),
      input({ id: "liar-slider", type: "range", min: "0", max: "100", value: "42" }),
      div({ class: "ruler" }),
      div({ class: "value" }, span(null, "0"), span(null, "42"), span(null, "100"))
    )
  );
}

function renderSpinner() {
  return renderLine("Spinner", "Busy indicator.", div({ class: "liar-spinner" }, "LOADING..."));
}

function renderSwitch() {
  return renderLine(
    "Switch",
    "Binary mode toggle.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button", onclick: () => (state.switchOn.val = !state.switchOn.val) }, () => (state.switchOn.val ? "ON" : "OFF")),
      span({ class: "liar-card__meta" }, () => `State: ${state.switchOn.val ? "enabled" : "disabled"}`)
    )
  );
}

function renderTable() {
  return renderLine(
    "Table",
    "Tabular data with hard borders.",
    table(
      { class: "liar-table" },
      thead(null, tr(null, th(null, "Field"), th(null, "Status"), th(null, "State"))),
      tbody(
        null,
        tr(null, td(null, "MRTD"), td(null, "valid"), td(null, "green")),
        tr(null, td(null, "PCR0"), td(null, "valid"), td(null, "green")),
        tr(null, td(null, "TCB"), td(null, "stale"), td(null, "amber"))
      )
    )
  );
}

function renderTabs() {
  return renderLine(
    "Tabs",
    "Mutually exclusive panels using stock cs-tabs.",
    div(
      { class: "cs-tabs liar-tabs" },
      input({ class: "radiotab", type: "radio", name: "liar-tabs", id: "liar-tab-a", checked: true }),
      label({ class: "label", for: "liar-tab-a" }, "Alpha"),
      div({ class: "panel" }, "Primary panel content."),
      input({ class: "radiotab", type: "radio", name: "liar-tabs", id: "liar-tab-b" }),
      label({ class: "label", for: "liar-tab-b" }, "Beta"),
      div({ class: "panel" }, "Secondary panel content.")
    )
  );
}

function renderTextarea() {
  return renderLine("Textarea", "Multiline input.", textarea({ class: "cs-input liar-textarea", placeholder: "Write details..." }));
}

function renderToast() {
  return renderLine(
    "Toast",
    "Transient notice stack.",
    div(
      { class: "liar-stack" },
      button({ class: "cs-btn", type: "button", onclick: () => addToast("Toast", "A new notification entered the queue.") }, "Add Toast"),
      div({ class: "liar-toast-stack" }, ...state.toasts.val.map((toast) => div({ class: "liar-panel" }, p(null, toast.text))))
    )
  );
}

function renderToggle() {
  return renderLine(
    "Toggle",
    "Single pressed state control.",
    button({ class: "cs-btn", type: "button", onclick: () => (state.toggleOn.val = !state.toggleOn.val) }, () => (state.toggleOn.val ? "Pressed" : "Unpressed"))
  );
}

function renderToggleGroup() {
  return renderLine(
    "Toggle Group",
    "Shared multi-toggle toolbar.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button" }, "BOLD"),
      button({ class: "cs-btn", type: "button" }, "ITALIC"),
      button({ class: "cs-btn", type: "button" }, "CODE")
    )
  );
}

function renderToolbar() {
  return renderLine(
    "Toolbar",
    "Tool row grouping small actions.",
    div(
      { class: "liar-row" },
      button({ class: "cs-btn", type: "button" }, "Cut"),
      button({ class: "cs-btn", type: "button" }, "Copy"),
      button({ class: "cs-btn", type: "button" }, "Paste"),
      hr({ class: "cs-hr liar-toolbar-divider" }),
      button({ class: "cs-btn", type: "button" }, "Run")
    )
  );
}

function renderTooltip() {
  return renderLine(
    "Tooltip",
    "Inline hover hint using stock cs-tooltip.",
    div(
      { class: "cs-tooltip" },
      button({ class: "cs-btn", type: "button" }, "Hover me"),
      span({ class: "text" }, "Helpful hint")
    )
  );
}

function renderCodeLine() {
  const snippet = codeLineData.snippet;
  return renderLine(
    "Code Line",
    "Inline code snippet with language tag, filename, and copy action.",
    div(
      { class: "dev-code-line" },
      span({ class: "dev-code-line__lang" }, codeLineData.lang),
      code({ class: "dev-code-line__code" }, snippet),
      span({ class: "dev-code-line__file" }, codeLineData.file),
      button(
        {
          class: "dev-code-line__copy",
          type: "button",
          title: "Copy snippet",
          "aria-label": "Copy snippet",
          onclick: async (event) => {
            const trigger = event.currentTarget;
            try {
              await navigator.clipboard.writeText(snippet);
              trigger.classList.add("is-copied");
              setTimeout(() => trigger.classList.remove("is-copied"), 1200);
            } catch {
              trigger.classList.add("is-failed");
              setTimeout(() => trigger.classList.remove("is-failed"), 1200);
            }
          },
        },
        icon("copy", "dev-code-line__copy-icon"),
        icon("check", "dev-code-line__copy-check")
      )
    )
  );
}

function renderRepoCard() {
  const data = repoCardData;
  return renderLine(
    "Repo Card",
    "Repository summary with language, stars, forks, and topic tags.",
    div(
      { class: "dev-repo-card" },
      div(
        { class: "dev-repo-card__head" },
        icon("repo", "dev-repo-card__glyph"),
        a({ class: "dev-repo-card__owner", href: "#", tabindex: "-1" }, data.owner),
        span({ class: "dev-repo-card__sep" }, "/"),
        a({ class: "dev-repo-card__name", href: "#", tabindex: "-1" }, data.repo),
        span({ class: "dev-repo-card__visibility" }, data.visibility)
      ),
      p({ class: "dev-repo-card__desc" }, data.description),
      div(
        { class: "dev-repo-card__topics" },
        ...data.topics.map((topic) => span({ class: "dev-repo-card__topic" }, topic))
      ),
      div(
        { class: "dev-repo-card__stats" },
        span(
          { class: "dev-repo-card__stat" },
          span({
            class: "dev-repo-card__lang-dot",
            style: `background-color:${data.languageColor};`,
          }),
          data.language
        ),
        span(
          { class: "dev-repo-card__stat" },
          icon("star", "dev-repo-card__stat-icon"),
          formatNumber(data.stars)
        ),
        span(
          { class: "dev-repo-card__stat" },
          icon("fork", "dev-repo-card__stat-icon"),
          formatNumber(data.forks)
        ),
        span(
          { class: "dev-repo-card__stat" },
          icon("eye", "dev-repo-card__stat-icon"),
          formatNumber(data.watchers)
        ),
        span({ class: "dev-repo-card__stat" }, `${data.license} license`),
        span({ class: "dev-repo-card__stat dev-repo-card__stat--muted" }, `Updated ${data.updated}`)
      )
    )
  );
}

function renderCommitRef(ref) {
  const iconName = ref.type === "tag" ? "tag" : ref.type === "head" ? "commit" : "branch";
  return span(
    { class: `dev-commit-graph__ref dev-commit-graph__ref--${ref.type}` },
    icon(iconName, "dev-commit-graph__ref-icon"),
    ref.name
  );
}

function renderCommitGraph() {
  const total = commitGraphData.length;
  return renderLine(
    "Commit Graph",
    "Topological commit rail with branching and merge ancestry.",
    div(
      { class: "dev-commit-graph" },
      ...commitGraphData.map((commit, index) => {
        const isFirst = index === 0;
        const isLast = index === total - 1;
        const railClass = `dev-commit-graph__rail${isFirst ? " is-first" : ""}${isLast ? " is-last" : ""}`;
        return div(
          { class: `dev-commit-graph__row${isFirst ? " is-active" : ""}` },
          div(
            { class: railClass, "aria-hidden": "true" },
            div({ class: "dev-commit-graph__line" }),
            div({ class: "dev-commit-graph__dot" })
          ),
          div(
            { class: "dev-commit-graph__card" },
            div(
              { class: "dev-commit-graph__header" },
              code({ class: "dev-commit-graph__hash" }, commit.hash.slice(0, 7)),
              commit.refs.length
                ? div(
                    { class: "dev-commit-graph__refs" },
                    ...commit.refs.map((ref) => renderCommitRef(ref))
                  )
                : null
            ),
            p({ class: "dev-commit-graph__message" }, commit.message),
            p(
              { class: "dev-commit-graph__meta" },
              span({ class: "dev-commit-graph__author" }, commit.author),
              span({ class: "dev-commit-graph__meta-sep" }, "·"),
              span(null, `committed ${commit.date}`),
              commit.parents.length
                ? [
                    span({ class: "dev-commit-graph__meta-sep" }, "·"),
                    span(null, `parent ${commit.parents[0].slice(0, 7)}`),
                  ]
                : null
            )
          )
        );
      })
    )
  );
}

function renderFileTreeNode(node, parentPath = "") {
  const path = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isFolder = Array.isArray(node.children);
  const isExpanded = state.expandedTreePaths.val.includes(path);
  const ext = isFolder ? "" : fileExtension(node.name);

  const rowChildren = [
    isFolder
      ? icon("chevron", `dev-file-tree__chevron${isExpanded ? " is-open" : ""}`)
      : span({ class: "dev-file-tree__chevron dev-file-tree__chevron--spacer" }),
    isFolder
      ? icon(isExpanded ? "folder-open" : "folder", "dev-file-tree__icon dev-file-tree__icon--folder")
      : icon("file", `dev-file-tree__icon dev-file-tree__icon--file dev-file-tree__icon--ext-${ext || "plain"}`),
    span({ class: "dev-file-tree__name" }, node.name),
    node.size ? span({ class: "dev-file-tree__meta" }, node.size) : null,
  ];

  const row = isFolder
    ? button(
        {
          class: `dev-file-tree__row dev-file-tree__row--folder${isExpanded ? " is-open" : ""}`,
          type: "button",
          "aria-expanded": `${isExpanded}`,
          onclick: () => {
            state.expandedTreePaths.val = isExpanded
              ? state.expandedTreePaths.val.filter((value) => value !== path)
              : [...state.expandedTreePaths.val, path];
          },
        },
        ...rowChildren
      )
    : div(
        {
          class: `dev-file-tree__row dev-file-tree__row--file${node.active ? " is-active" : ""}`,
        },
        ...rowChildren
      );

  return li(
    { class: "dev-file-tree__item", role: "treeitem", "aria-expanded": isFolder ? `${isExpanded}` : undefined },
    row,
    isFolder && isExpanded
      ? ul(
          { class: "dev-file-tree__list dev-file-tree__list--nested", role: "group" },
          ...node.children.map((child) => renderFileTreeNode(child, path))
        )
      : null
  );
}

function renderFileTree() {
  const { folders, files } = countTreeNodes(fileTreeData);
  return renderLine(
    "File Tree",
    "Collapsible project tree with folders, files, and metadata.",
    div(
      { class: "dev-file-tree" },
      div(
        { class: "dev-file-tree__head" },
        span(
          { class: "dev-file-tree__summary" },
          span(null, `${folders} folders`),
          span({ class: "dev-file-tree__summary-sep" }, "·"),
          span(null, `${files} files`)
        ),
        div(
          { class: "dev-file-tree__actions" },
          button(
            {
              class: "cs-btn dev-file-tree__action",
              type: "button",
              onclick: () => {
                state.expandedTreePaths.val = ["src", "src/components", "src/lib"];
              },
            },
            "Expand"
          ),
          button(
            {
              class: "cs-btn dev-file-tree__action",
              type: "button",
              onclick: () => {
                state.expandedTreePaths.val = [];
              },
            },
            "Collapse"
          )
        )
      ),
      ul(
        { class: "dev-file-tree__list dev-file-tree__list--root", role: "tree" },
        ...fileTreeData.map((node) => renderFileTreeNode(node))
      )
    )
  );
}

function renderCarousel() {
  return renderLine(
    "Carousel",
    "Paged slider with navigation and indicators.",
    div(
      { class: "liar-stack" },
      div(
        { class: "liar-row" },
        button({ class: "cs-btn", type: "button", onclick: () => (state.carouselIndex.val = (state.carouselIndex.val - 1 + carouselSlides.length) % carouselSlides.length) }, "<"),
        div({ class: "liar-panel liar-carousel" }, strongLine(carouselSlides[state.carouselIndex.val][0]), p(null, carouselSlides[state.carouselIndex.val][1])),
        button({ class: "cs-btn", type: "button", onclick: () => (state.carouselIndex.val = (state.carouselIndex.val + 1) % carouselSlides.length) }, ">")
      ),
      div({ class: "liar-row" }, ...carouselSlides.map((_, index) => button({ class: "cs-btn", type: "button", onclick: () => (state.carouselIndex.val = index) }, `${index + 1}`)))
    )
  );
}

function renderInfiniteSlider() {
  const items = ["ATTESTATION", "SEALING", "QUOTE", "PCR0", "TCB", "GATED_KMS"];
  return renderLine(
    "Infinite Slider",
    "Continuous marquee-like content track.",
    div({ class: "liar-marquee" }, div({ class: "liar-marquee__track" }, ...items.concat(items).map((item) => span({ class: "liar-marquee__item" }, item))))
  );
}

function renderTextScramble() {
  return renderLine(
    "Text Scramble",
    "Randomized text reveal.",
    div(
      { class: "liar-stack" },
      div({ id: "liar-scramble-display", class: "liar-shuffle" }, () => state.scrambleText.val),
      button({ class: "cs-btn", type: "button", onclick: () => scrambleTo("GENERATING THE INTERFACE...") }, "Scramble")
    )
  );
}

function renderTextShimmer() {
  return renderLine("Text Shimmer", "Light sweep across static text.", div({ class: "liar-shimmer" }, "Generating code..."));
}

function renderAnimatedNumber() {
  return renderLine(
    "Animated Number",
    "Smoothly interpolated numeric readout.",
    div(
      { class: "liar-stack" },
      div({ class: "liar-shuffle" }, () => state.animatedDisplay.val.toLocaleString("en-US")),
      div({ class: "liar-row" }, ...[0, 1280, 4096].map((value) => button({ class: "cs-btn", type: "button", onclick: () => animateNumberTo(value) }, value.toLocaleString("en-US"))))
    )
  );
}

function renderSlidingNumber() {
  return renderLine(
    "Sliding Number",
    "Per-digit rolling display.",
    div(
      { class: "liar-stack" },
      div({ class: "liar-sliding-number" }, ...state.slidingNumber.val.split("").map((digit) => span({ class: "liar-sliding-number__digit" }, digit))),
      div({ class: "liar-row" }, ...["007", "128", "512"].map((value) => button({ class: "cs-btn", type: "button", onclick: () => (state.slidingNumber.val = value) }, value)))
    )
  );
}

const renderers = {
  Accordion: renderAccordion,
  Alert: renderAlert,
  "Alert Dialog": renderAlertDialog,
  Autocomplete: renderAutocomplete,
  Avatar: renderAvatar,
  Badge: renderBadge,
  Breadcrumb: renderBreadcrumb,
  Button: renderButton,
  Calendar: renderCalendar,
  Card: renderCard,
  Checkbox: renderCheckbox,
  "Checkbox Group": renderCheckboxGroup,
  Collapsible: renderCollapsible,
  Combobox: renderCombobox,
  Command: renderCommand,
  "Date Picker": renderDatePicker,
  Dialog: renderDialog,
  Drawer: renderDrawer,
  Empty: renderEmpty,
  Field: renderField,
  Fieldset: renderFieldset,
  Form: renderForm,
  Frame: renderFrame,
  Group: renderGroup,
  Input: renderInput,
  "Input Group": renderInputGroup,
  Kbd: renderKbd,
  Label: renderLabel,
  Menu: renderMenu,
  Meter: renderMeter,
  "Number Field": renderNumberField,
  "OTP Field": renderOtpField,
  Pagination: renderPagination,
  Popover: renderPopover,
  "Preview Card": renderPreviewCard,
  Progress: renderProgress,
  "Radio Group": renderRadioGroup,
  "Scroll Area": renderScrollArea,
  Select: renderSelect,
  Separator: renderSeparator,
  Sheet: renderSheet,
  Skeleton: renderSkeleton,
  Slider: renderSlider,
  Spinner: renderSpinner,
  Switch: renderSwitch,
  Table: renderTable,
  Tabs: renderTabs,
  Textarea: renderTextarea,
  Toast: renderToast,
  Toggle: renderToggle,
  "Toggle Group": renderToggleGroup,
  Toolbar: renderToolbar,
  Tooltip: renderTooltip,
  "Code Line": renderCodeLine,
  "Repo Card": renderRepoCard,
  "Commit Graph": renderCommitGraph,
  "File Tree": renderFileTree,
  Carousel: renderCarousel,
  "Infinite Slider": renderInfiniteSlider,
  "Text Scramble": renderTextScramble,
  "Text Shimmer": renderTextShimmer,
  "Animated Number": renderAnimatedNumber,
  "Sliding Number": renderSlidingNumber,
};

function renderAll() {
  return div(
    { class: "liar-shell" },
    header(
      { class: "liar-header" },
      p({ class: "liar-kicker" }, "liar // cs16.css // van.js"),
      h1(null, "COSS + JAL + MOTION SHOWCASE"),
      p(
        { class: "liar-subcopy" },
        "One component per line, all rebuilt against upstream cs16.css with Van.js only."
      )
    ),
    div(
      { class: "liar-list" },
      ...componentNames.map((name) => renderers[name]())
    )
  );
}

const app = document.getElementById("app");
if (app) {
  van.add(app, renderAll);
}
