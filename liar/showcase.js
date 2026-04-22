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
  description: "Repository summary card with language, stars, forks, and topic tags.",
  language: "TypeScript",
  stars: "1248",
  forks: "84",
  updated: "updated 2d ago",
  topics: ["ui", "components", "design-system", "accessibility"],
};

const commitGraphData = [
  {
    hash: "c80f097",
    message: "Clarify attestation showcase modules",
    author: "agent",
    date: "2026-04-17",
    parents: ["48752e5"],
    refs: ["main"],
  },
  {
    hash: "48752e5",
    message: "Add motion-inspired Van.js demos",
    author: "agent",
    date: "2026-04-17",
    parents: ["225a905"],
    refs: ["feature"],
  },
  {
    hash: "225a905",
    message: "Rebuild showcase from cs16 baseline",
    author: "agent",
    date: "2026-04-17",
    parents: [],
    refs: ["reset"],
  },
];

const fileTreeData = [
  ["src", ["components", "lib", "index.ts"]],
  ["components", ["accordion.ts", "dialog.ts", "tooltip.ts"]],
  ["package.json", []],
  ["README.md", []],
];

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
  return renderLine(
    "Code Line",
    "Compact single-line snippet with inline copy action.",
    div(
      { class: "liar-panel liar-code-line" },
      code(null, 'import { Button } from "@/components/ui/button"'),
      button({ class: "cs-btn", type: "button" }, "Copy")
    )
  );
}

function renderRepoCard() {
  return renderLine(
    "Repo Card",
    "Repository summary card with language, stars, forks, and topic tags.",
    div(
      { class: "liar-panel liar-repo" },
      strongLine(`${repoCardData.owner}/${repoCardData.repo}`),
      p(null, repoCardData.description),
      p({ class: "liar-card__meta" }, `${repoCardData.language} • ★ ${repoCardData.stars} • Forks ${repoCardData.forks} • ${repoCardData.updated}`),
      div({ class: "liar-row" }, ...repoCardData.topics.map((topic) => span({ class: "liar-chip" }, topic)))
    )
  );
}

function renderCommitGraph() {
  return renderLine(
    "Commit Graph",
    "Topological commit rail with branching and merge ancestry.",
    div(
      { class: "liar-stack liar-commit-graph" },
      ...commitGraphData.map((commit) =>
        div(
          { class: "liar-commit-row" },
          div({ class: "liar-commit-rail" }, span({ class: "liar-commit-dot" }, "●"), span({ class: "liar-commit-line" }, "|")),
          div(
            { class: "liar-panel liar-commit-card" },
            strongLine(commit.message),
            p({ class: "liar-card__meta" }, `${commit.author} • ${commit.date}`),
            p({ class: "liar-card__meta" }, `Parents: ${commit.parents.join(", ") || "root"}`),
            div({ class: "liar-row" }, ...commit.refs.map((refValue) => span({ class: "liar-chip" }, refValue)))
          )
        )
      )
    )
  );
}

function renderFileTreeNode(node, parentPath = "") {
  const [name, children] = node;
  const path = parentPath ? `${parentPath}/${name}` : name;
  const isFolder = Array.isArray(children) && children.length > 0;
  const isExpanded = state.expandedTreePaths.val.includes(path);

  if (!isFolder) {
    return li(
      { class: "liar-file-tree__item" },
      div(
        { class: "liar-file-tree__row" },
        span({ class: "liar-file-tree__leaf" }, "•"),
        span({ class: "liar-file-tree__icon is-file" }, "[F]"),
        span(null, name)
      )
    );
  }

  return li(
    { class: "liar-file-tree__item" },
    div(
      { class: "liar-file-tree__row" },
      button(
        {
          class: "cs-btn liar-file-tree__toggle",
          type: "button",
          onclick: () => {
            const next = isExpanded
              ? state.expandedTreePaths.val.filter((value) => value !== path)
              : [...state.expandedTreePaths.val, path];
            state.expandedTreePaths.val = next;
          },
        },
        isExpanded ? "-" : "+"
      ),
      span({ class: "liar-file-tree__icon is-folder" }, "[D]"),
      span(null, name)
    ),
    isExpanded
      ? ul(
          { class: "liar-file-tree__list" },
          ...children.map((child) =>
            Array.isArray(child) && child.length === 2
              ? renderFileTreeNode(child, path)
              : li(
                  { class: "liar-file-tree__item" },
                  div(
                    { class: "liar-file-tree__row" },
                    span({ class: "liar-file-tree__leaf" }, "•"),
                    span({ class: "liar-file-tree__icon is-file" }, "[F]"),
                    span(null, child)
                  )
                )
          )
        )
      : null
  );
}

function renderFileTree() {
  return renderLine(
    "File Tree",
    "Collapsible project tree with file and folder hierarchy.",
    div(
      { class: "liar-stack" },
      div(
        { class: "liar-row" },
        button(
          {
            class: "cs-btn",
            type: "button",
            onclick: () => {
              state.expandedTreePaths.val = ["src", "src/components"];
            },
          },
          "Expand"
        ),
        button(
          {
            class: "cs-btn",
            type: "button",
            onclick: () => {
              state.expandedTreePaths.val = [];
            },
          },
          "Collapse"
        )
      ),
      ul({ class: "liar-file-tree" }, ...fileTreeData.map((node) => renderFileTreeNode(node)))
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
