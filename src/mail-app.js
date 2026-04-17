import van from "vanjs-core";

const {
  a,
  article,
  button,
  code,
  div,
  fieldset,
  h1,
  h2,
  h3,
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
  table,
  tbody,
  td,
  textarea,
  th,
  thead,
  tr,
  ul,
} = van.tags;

const cossGroups = [
  {
    id: "disclosure",
    title: "Disclosure / Overlay",
    components: [
      "accordion",
      "alert-dialog",
      "alert",
      "collapsible",
      "dialog",
      "drawer",
      "popover",
      "preview-card",
      "sheet",
      "toast",
      "tooltip",
    ],
  },
  {
    id: "forms",
    title: "Form / Field",
    components: [
      "autocomplete",
      "checkbox-group",
      "checkbox",
      "combobox",
      "field",
      "fieldset",
      "form",
      "input-group",
      "input",
      "number-field",
      "otp-field",
      "radio-group",
      "select",
      "slider",
      "switch",
      "textarea",
      "toggle-group",
      "toggle",
    ],
  },
  {
    id: "navigation",
    title: "Navigation / Layout",
    components: [
      "avatar",
      "badge",
      "breadcrumb",
      "button",
      "card",
      "empty",
      "frame",
      "group",
      "kbd",
      "label",
      "menu",
      "pagination",
      "scroll-area",
      "separator",
      "sidebar",
      "skeleton",
      "spinner",
      "tabs",
      "toolbar",
    ],
  },
  {
    id: "data",
    title: "Data / Feedback",
    components: ["calendar", "command", "meter", "progress", "table"],
  },
];

const componentDescriptions = {
  accordion: "Expandable disclosure rows built from cs-tabs and bordered panels.",
  "alert-dialog": "Blocking confirmation dialog with primary and destructive actions.",
  alert: "Inline system notice with elevated emphasis.",
  autocomplete: "Text field paired with a filtered suggestion tray.",
  avatar: "Compact identity tile using framed initials.",
  badge: "Small status marker using the accent layer.",
  breadcrumb: "Linear location path with separated steps.",
  button: "Primary interaction surface using stock cs-btn.",
  calendar: "Month grid with selectable day cells.",
  card: "Framed information block using cs-fieldset structure.",
  "checkbox-group": "Stacked option list of multiple checkbox controls.",
  checkbox: "Single boolean choice using cs-checkbox.",
  collapsible: "Simple disclosure panel with show / hide content.",
  combobox: "Text-entry picker backed by a select-like result list.",
  command: "Quick command palette list with highlighted rows.",
  dialog: "Standard modal mounted from the page showcase.",
  drawer: "Edge-aligned panel using the sheet/dialog pattern.",
  empty: "Structured empty-state panel with a recoverable action.",
  field: "Label + control + helper text composition.",
  fieldset: "Grouped controls with legend framing.",
  form: "Conventional command form assembled from upstream primitives.",
  frame: "Inset framed content block for supporting material.",
  group: "Horizontal action group sharing a common boundary.",
  "input-group": "Prefixed / suffixed input treatment.",
  input: "Text entry using stock cs-input.",
  kbd: "Keyboard hint token in an inset frame.",
  label: "Standalone field label treatment.",
  menu: "Action menu panel with selectable rows.",
  meter: "Read-only level indicator.",
  "number-field": "Numeric text field with step buttons.",
  "otp-field": "Segmented one-time code entry.",
  pagination: "Page navigation row with directional controls.",
  popover: "Anchored utility panel using native popover.",
  "preview-card": "Hover / focus preview surface using tooltip-style anchoring.",
  progress: "Progress feedback using stock cs-progress-bar.",
  "radio-group": "Exclusive choice list under a legend.",
  "scroll-area": "Constrained panel showing native cs16 scrollbars.",
  select: "Dropdown field using stock cs-select.",
  separator: "Divider line using cs-hr.",
  sheet: "Sliding dialog variant for edge-mounted tasks.",
  sidebar: "Collapsible navigation rail matching the cs16 side treatment.",
  skeleton: "Loading placeholder blocks with restrained contrast.",
  slider: "Range input using the upstream cs-slider.",
  spinner: "Busy indicator using lightweight text animation.",
  switch: "Binary mode toggle composed from button states.",
  table: "Tabular data using hard borders and compact density.",
  tabs: "Mutually exclusive panels using stock cs-tabs.",
  textarea: "Multiline input using cs-input framing.",
  toast: "Transient notice stack in the viewport corner.",
  "toggle-group": "Shared multi-toggle toolbar.",
  toggle: "Single pressed state control.",
  toolbar: "Tool row grouping small actions.",
  tooltip: "Inline hover hint using stock cs-tooltip.",
};

const pageState = {
  accordionOpen: van.state("item-1"),
  collapsibleOpen: van.state(true),
  alertDialogOpen: van.state(false),
  dialogOpen: van.state(false),
  drawerOpen: van.state(false),
  sheetOpen: van.state(false),
  popoverOpen: van.state(false),
  previewVisible: van.state(false),
  tooltipVisible: van.state(false),
  selectedRadio: van.state("alpha"),
  selectedToggles: van.state(["bold"]),
  togglePressed: van.state(false),
  switchOn: van.state(true),
  progressValue: van.state(64),
  meterValue: van.state(72),
  numberValue: van.state(12),
  numberFieldInput: van.state("12"),
  otpValue: van.state(["A", "7", "", "", "", ""]),
  inputValue: van.state(""),
  textareaValue: van.state(""),
  autocompleteValue: van.state(""),
  comboboxValue: van.state("alpha"),
  selectedSelect: van.state("alpha"),
  pageNumber: van.state(2),
  toasts: van.state([
    { id: "toast-1", title: "System", text: "UI showcase initialized." },
  ]),
  sidebarCollapsed: van.state(false),
};

const autocompleteOptions = [
  "alpha-node",
  "attest-chain",
  "command-shell",
  "delta-stack",
  "gamma-seal",
];

const commandEntries = [
  "Init enclave",
  "Refresh token",
  "Rotate key",
  "Verify quote",
  "Open transport",
];

function addToast(titleText, textValue) {
  pageState.toasts.val = [
    ...pageState.toasts.val,
    { id: `toast-${Date.now()}`, title: titleText, text: textValue },
  ].slice(-3);
}

function dismissToast(id) {
  pageState.toasts.val = pageState.toasts.val.filter((toast) => toast.id !== id);
}

function renderAccordionCard() {
  const items = [
    {
      id: "item-1",
      title: "Accessible disclosure",
      body: "This accordion uses button state, visible borders, and compact cs16 spacing.",
    },
    {
      id: "item-2",
      title: "Single open item",
      body: "Only one panel is expanded at a time to mirror the canonical disclosure pattern.",
    },
  ];

  return article(
    { class: "showcase-card", id: "component-accordion" },
    h3(null, "accordion"),
    p({ class: "showcase-card__copy" }, componentDescriptions.accordion),
    div(
      { class: "showcase-disclosure" },
      items.map((item) =>
        div(
          { class: "showcase-disclosure__item" },
          button(
            {
              class: "cs-btn showcase-disclosure__trigger",
              type: "button",
              onclick: () => {
                pageState.accordionOpen.val =
                  pageState.accordionOpen.val === item.id ? "" : item.id;
              },
            },
            span(null, item.title),
            span(null, () => (pageState.accordionOpen.val === item.id ? "-" : "+"))
          ),
          () =>
            pageState.accordionOpen.val === item.id
              ? div({ class: "showcase-disclosure__panel" }, item.body)
              : null
        )
      )
    )
  );
}

function renderAlertDialogCard() {
  return article(
    { class: "showcase-card", id: "component-alert-dialog" },
    h3(null, "alert-dialog"),
    p({ class: "showcase-card__copy" }, componentDescriptions["alert-dialog"]),
    button(
      {
        class: "cs-btn",
        type: "button",
        onclick: () => {
          pageState.alertDialogOpen.val = true;
        },
      },
      "Trigger Alert Dialog"
    ),
    () =>
      pageState.alertDialogOpen.val
        ? div(
            { class: "showcase-inline-dialog" },
            div(
              { class: "showcase-inline-dialog__panel" },
              h3(null, "Delete transmission log?"),
              p(null, "This action cannot be undone."),
              div(
                { class: "showcase-inline-dialog__actions" },
                button(
                  {
                    class: "cs-btn",
                    type: "button",
                    onclick: () => {
                      pageState.alertDialogOpen.val = false;
                    },
                  },
                  "Cancel"
                ),
                button(
                  {
                    class: "cs-btn",
                    type: "button",
                    onclick: () => {
                      pageState.alertDialogOpen.val = false;
                      addToast("Alert", "Transmission log deleted.");
                    },
                  },
                  "Delete"
                )
              )
            )
          )
        : null
  );
}

function renderAlertCard() {
  return article(
    { class: "showcase-card", id: "component-alert" },
    h3(null, "alert"),
    p({ class: "showcase-card__copy" }, componentDescriptions.alert),
    div(
      { class: "showcase-alert" },
      strong(null, "System Notice"),
      p(null, "Attestation channel is active and awaiting the next request.")
    )
  );
}

function renderAutocompleteCard() {
  return article(
    { class: "showcase-card", id: "component-autocomplete" },
    h3(null, "autocomplete"),
    p({ class: "showcase-card__copy" }, componentDescriptions.autocomplete),
    div(
      { class: "showcase-stack" },
      input({
        class: "cs-input",
        type: "text",
        value: () => pageState.autocompleteValue.val,
        oninput: (event) => {
          pageState.autocompleteValue.val = event.target.value;
        },
        placeholder: "Search nodes...",
      }),
      () =>
        pageState.autocompleteValue.val
          ? ul(
              { class: "showcase-listbox" },
              autocompleteOptions
                .filter((optionValue) =>
                  optionValue.includes(pageState.autocompleteValue.val.toLowerCase())
                )
                .slice(0, 4)
                .map((optionValue) =>
                  li(
                    {
                      class: "showcase-listbox__item",
                      onclick: () => {
                        pageState.autocompleteValue.val = optionValue;
                      },
                    },
                    optionValue
                  )
                )
            )
          : null
    )
  );
}

function renderAvatarCard() {
  return article(
    { class: "showcase-card", id: "component-avatar" },
    h3(null, "avatar"),
    p({ class: "showcase-card__copy" }, componentDescriptions.avatar),
    div(
      { class: "showcase-avatar" },
      span({ class: "showcase-avatar__initials" }, "CS"),
      div(
        { class: "showcase-stack" },
        strong(null, "Counter System"),
        span(null, "Online")
      )
    )
  );
}

function renderBadgeCard() {
  return article(
    { class: "showcase-card", id: "component-badge" },
    h3(null, "badge"),
    p({ class: "showcase-card__copy" }, componentDescriptions.badge),
    div(
      { class: "showcase-inline" },
      span({ class: "showcase-badge" }, "Primary"),
      span({ class: "showcase-badge showcase-badge--muted" }, "Draft"),
      span({ class: "showcase-badge showcase-badge--danger" }, "Alert")
    )
  );
}

function renderBreadcrumbCard() {
  const crumbs = ["docs", "components", "tooltip"];
  return article(
    { class: "showcase-card", id: "component-breadcrumb" },
    h3(null, "breadcrumb"),
    p({ class: "showcase-card__copy" }, componentDescriptions.breadcrumb),
    div(
      { class: "showcase-breadcrumb" },
      crumbs.map((crumb, index) =>
        span(
          { class: "showcase-breadcrumb__item" },
          crumb,
          index < crumbs.length - 1 ? span({ class: "showcase-breadcrumb__sep" }, ">") : null
        )
      )
    )
  );
}

function renderButtonCard() {
  return article(
    { class: "showcase-card", id: "component-button" },
    h3(null, "button"),
    p({ class: "showcase-card__copy" }, componentDescriptions.button),
    div(
      { class: "showcase-inline" },
      button({ class: "cs-btn", type: "button" }, "Primary"),
      button({ class: "cs-btn", type: "button", disabled: true }, "Disabled"),
      button({ class: "cs-btn close", type: "button", "aria-label": "Close" })
    )
  );
}

function renderCalendarCard() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const values = ["", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return article(
    { class: "showcase-card", id: "component-calendar" },
    h3(null, "calendar"),
    p({ class: "showcase-card__copy" }, componentDescriptions.calendar),
    div(
      { class: "showcase-calendar" },
      div({ class: "showcase-calendar__title" }, "Oct 2026"),
      div(
        { class: "showcase-calendar__weekdays" },
        days.map((day) => span(null, day))
      ),
      div(
        { class: "showcase-calendar__grid" },
        values.map((day) =>
          button(
            {
              class: `showcase-calendar__cell ${day === 9 ? "is-active" : ""}`,
              type: "button",
            },
            day ? `${day}` : ""
          )
        )
      )
    )
  );
}

function renderCardCard() {
  return article(
    { class: "showcase-card", id: "component-card" },
    h3(null, "card"),
    p({ class: "showcase-card__copy" }, componentDescriptions.card),
    fieldset(
      { class: "cs-fieldset" },
      legend(null, "Mission Brief"),
      div(
        { class: "showcase-stack" },
        p(null, "Use fieldset framing for cards to stay inside the cs16 surface language."),
        button({ class: "cs-btn", type: "button" }, "Acknowledge")
      )
    )
  );
}

function renderCheckboxGroupCard() {
  const options = ["MRTD", "PCR0", "Quote Chain"];
  return article(
    { class: "showcase-card", id: "component-checkbox-group" },
    h3(null, "checkbox-group"),
    p({ class: "showcase-card__copy" }, componentDescriptions["checkbox-group"]),
    div(
      { class: "showcase-stack" },
      options.map((optionLabel) =>
        label(
          { class: "cs-checkbox" },
          input({ type: "checkbox", checked: optionLabel !== "Quote Chain" }),
          span({ class: "cs-checkbox__label" }, optionLabel)
        )
      )
    )
  );
}

function renderCheckboxCard() {
  return article(
    { class: "showcase-card", id: "component-checkbox" },
    h3(null, "checkbox"),
    p({ class: "showcase-card__copy" }, componentDescriptions.checkbox),
    label(
      { class: "cs-checkbox" },
      input({ type: "checkbox", checked: true }),
      span({ class: "cs-checkbox__label" }, "Enable attestation")
    )
  );
}

function renderCollapsibleCard() {
  return article(
    { class: "showcase-card", id: "component-collapsible" },
    h3(null, "collapsible"),
    p({ class: "showcase-card__copy" }, componentDescriptions.collapsible),
    div(
      { class: "showcase-stack" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.collapsibleOpen.val = !pageState.collapsibleOpen.val;
          },
        },
        () => (pageState.collapsibleOpen.val ? "Hide Details" : "Show Details")
      ),
      () =>
        pageState.collapsibleOpen.val
          ? div(
              { class: "showcase-panel" },
              "Collapsed content keeps the same framed cs16 treatment."
            )
          : null
    )
  );
}

function renderComboboxCard() {
  return article(
    { class: "showcase-card", id: "component-combobox" },
    h3(null, "combobox"),
    p({ class: "showcase-card__copy" }, componentDescriptions.combobox),
    div(
      { class: "showcase-stack" },
      select(
        {
          class: "cs-select",
          onchange: (event) => {
            pageState.comboboxValue.val = event.target.value;
          },
        },
        option({ value: "alpha", selected: true }, "Alpha"),
        option({ value: "beta" }, "Beta"),
        option({ value: "gamma" }, "Gamma")
      ),
      div({ class: "showcase-meta" }, () => `Selected: ${pageState.comboboxValue.val}`)
    )
  );
}

function renderCommandCard() {
  return article(
    { class: "showcase-card", id: "component-command" },
    h3(null, "command"),
    p({ class: "showcase-card__copy" }, componentDescriptions.command),
    div(
      { class: "showcase-command" },
      input({ class: "cs-input", type: "text", placeholder: "Type a command..." }),
      ul(
        { class: "showcase-command__list" },
        commandEntries.map((entry, index) =>
          li(
            {
              class: `showcase-command__item ${index === 0 ? "is-active" : ""}`,
            },
            entry
          )
        )
      )
    )
  );
}

function renderDialogCard() {
  return article(
    { class: "showcase-card", id: "component-dialog" },
    h3(null, "dialog"),
    p({ class: "showcase-card__copy" }, componentDescriptions.dialog),
    button(
      {
        class: "cs-btn",
        type: "button",
        onclick: () => {
          pageState.dialogOpen.val = !pageState.dialogOpen.val;
        },
      },
      () => (pageState.dialogOpen.val ? "Hide Inline Dialog" : "Show Inline Dialog")
    ),
    () =>
      pageState.dialogOpen.val
        ? div(
            { class: "showcase-inline-dialog" },
            div(
              { class: "showcase-inline-dialog__panel" },
              h3(null, "Inline Dialog"),
              p(null, "The dedicated modal dialog can also be previewed from the overlays section."),
              button(
                {
                  class: "cs-btn",
                  type: "button",
                  onclick: () => {
                    pageState.dialogOpen.val = false;
                  },
                },
                "Close"
              )
            )
          )
        : null
  );
}

function renderDrawerCard() {
  return article(
    { class: "showcase-card", id: "component-drawer" },
    h3(null, "drawer"),
    p({ class: "showcase-card__copy" }, componentDescriptions.drawer),
    button(
      {
        class: "cs-btn",
        type: "button",
        onclick: () => {
          pageState.drawerOpen.val = !pageState.drawerOpen.val;
        },
      },
      () => (pageState.drawerOpen.val ? "Hide Drawer" : "Show Drawer")
    ),
    () =>
      pageState.drawerOpen.val
        ? div(
            { class: "showcase-drawer" },
            h3(null, "Right Drawer"),
            p(null, "This models a drawer using the same cs16 edge and button language."),
            button(
              {
                class: "cs-btn",
                type: "button",
                onclick: () => {
                  pageState.drawerOpen.val = false;
                },
              },
              "Close"
            )
          )
        : null
  );
}

function renderEmptyCard() {
  return article(
    { class: "showcase-card", id: "component-empty" },
    h3(null, "empty"),
    p({ class: "showcase-card__copy" }, componentDescriptions.empty),
    div(
      { class: "showcase-empty" },
      strong(null, "No records found"),
      p(null, "Create a new item or change the current filter."),
      button({ class: "cs-btn", type: "button" }, "Create Item")
    )
  );
}

function renderFieldCard() {
  return article(
    { class: "showcase-card", id: "component-field" },
    h3(null, "field"),
    p({ class: "showcase-card__copy" }, componentDescriptions.field),
    div(
      { class: "showcase-stack" },
      label({ class: "cs-input__label", for: "field-demo" }, "Attestation URL"),
      input({
        id: "field-demo",
        class: "cs-input",
        type: "text",
        placeholder: "https://attest.example",
      }),
      span({ class: "showcase-meta" }, "Helper text: use HTTPS endpoints only.")
    )
  );
}

function renderFieldsetCard() {
  return article(
    { class: "showcase-card", id: "component-fieldset" },
    h3(null, "fieldset"),
    p({ class: "showcase-card__copy" }, componentDescriptions.fieldset),
    fieldset(
      { class: "cs-fieldset" },
      legend(null, "Options"),
      div(
        { class: "showcase-stack" },
        label(
          { class: "cs-checkbox" },
          input({ type: "checkbox", checked: true }),
          span({ class: "cs-checkbox__label" }, "Persist session")
        ),
        label(
          { class: "cs-checkbox" },
          input({ type: "checkbox" }),
          span({ class: "cs-checkbox__label" }, "Enable logging")
        )
      )
    )
  );
}

function renderFormCard() {
  return article(
    { class: "showcase-card", id: "component-form" },
    h3(null, "form"),
    p({ class: "showcase-card__copy" }, componentDescriptions.form),
    form(
      {
        class: "showcase-stack",
        onsubmit: (event) => {
          event.preventDefault();
          addToast("Form", "Form submitted.");
        },
      },
      label({ class: "cs-input__label", for: "form-name" }, "Name"),
      input({ id: "form-name", class: "cs-input", type: "text" }),
      button({ class: "cs-btn", type: "submit" }, "Submit")
    )
  );
}

function renderFrameCard() {
  return article(
    { class: "showcase-card", id: "component-frame" },
    h3(null, "frame"),
    p({ class: "showcase-card__copy" }, componentDescriptions.frame),
    div(
      { class: "showcase-frame" },
      p(null, "Framed surfaces hold secondary content with the same hard edges and muted backdrop.")
    )
  );
}

function renderGroupCard() {
  return article(
    { class: "showcase-card", id: "component-group" },
    h3(null, "group"),
    p({ class: "showcase-card__copy" }, componentDescriptions.group),
    div(
      { class: "showcase-group" },
      button({ class: "cs-btn", type: "button" }, "Prev"),
      button({ class: "cs-btn", type: "button" }, "Center"),
      button({ class: "cs-btn", type: "button" }, "Next")
    )
  );
}

function renderInputGroupCard() {
  return article(
    { class: "showcase-card", id: "component-input-group" },
    h3(null, "input-group"),
    p({ class: "showcase-card__copy" }, componentDescriptions["input-group"]),
    div(
      { class: "showcase-input-group" },
      span({ class: "showcase-input-group__addon" }, "https://"),
      input({ class: "cs-input", type: "text", value: "endpoint.local" }),
      span({ class: "showcase-input-group__addon" }, ":443")
    )
  );
}

function renderInputCard() {
  return article(
    { class: "showcase-card", id: "component-input" },
    h3(null, "input"),
    p({ class: "showcase-card__copy" }, componentDescriptions.input),
    input({
      class: "cs-input",
      type: "text",
      value: () => pageState.inputValue.val,
      oninput: (event) => {
        pageState.inputValue.val = event.target.value;
      },
      placeholder: "Enter value...",
    })
  );
}

function renderKbdCard() {
  return article(
    { class: "showcase-card", id: "component-kbd" },
    h3(null, "kbd"),
    p({ class: "showcase-card__copy" }, componentDescriptions.kbd),
    div(
      { class: "showcase-inline" },
      span({ class: "showcase-kbd" }, "Ctrl"),
      span({ class: "showcase-kbd" }, "K")
    )
  );
}

function renderLabelCard() {
  return article(
    { class: "showcase-card", id: "component-label" },
    h3(null, "label"),
    p({ class: "showcase-card__copy" }, componentDescriptions.label),
    div(
      { class: "showcase-stack" },
      label({ class: "cs-input__label", for: "label-demo" }, "Standalone label"),
      input({ id: "label-demo", class: "cs-input", type: "text", value: "Preview" })
    )
  );
}

function renderMenuCard() {
  const actions = ["Copy ID", "Duplicate", "Archive", "Delete"];
  return article(
    { class: "showcase-card", id: "component-menu" },
    h3(null, "menu"),
    p({ class: "showcase-card__copy" }, componentDescriptions.menu),
    div(
      { class: "showcase-menu" },
      actions.map((action, index) =>
        button(
          {
            class: `showcase-menu__item ${index === 0 ? "is-active" : ""}`,
            type: "button",
          },
          action
        )
      )
    )
  );
}

function renderMeterCard() {
  return article(
    { class: "showcase-card", id: "component-meter" },
    h3(null, "meter"),
    p({ class: "showcase-card__copy" }, componentDescriptions.meter),
    div(
      { class: "showcase-stack" },
      div({ class: "showcase-meta" }, () => `Usage ${pageState.meterValue.val}%`),
      div(
        { class: "cs-progress-bar" },
        div({ class: "bars", style: () => `width:${pageState.meterValue.val}%` })
      )
    )
  );
}

function renderNumberFieldCard() {
  return article(
    { class: "showcase-card", id: "component-number-field" },
    h3(null, "number-field"),
    p({ class: "showcase-card__copy" }, componentDescriptions["number-field"]),
    div(
      { class: "showcase-input-group" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.numberValue.val -= 1;
            pageState.numberFieldInput.val = `${pageState.numberValue.val}`;
          },
        },
        "-"
      ),
      input({
        class: "cs-input",
        type: "number",
        value: () => pageState.numberFieldInput.val,
        oninput: (event) => {
          pageState.numberFieldInput.val = event.target.value;
          pageState.numberValue.val = Number(event.target.value || 0);
        },
      }),
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.numberValue.val += 1;
            pageState.numberFieldInput.val = `${pageState.numberValue.val}`;
          },
        },
        "+"
      )
    )
  );
}

function renderOtpFieldCard() {
  return article(
    { class: "showcase-card", id: "component-otp-field" },
    h3(null, "otp-field"),
    p({ class: "showcase-card__copy" }, componentDescriptions["otp-field"]),
    div(
      { class: "showcase-otp" },
      pageState.otpValue.val.map((value, index) =>
        input({
          class: "cs-input showcase-otp__cell",
          type: "text",
          maxlength: "1",
          value,
          oninput: (event) => {
            const next = [...pageState.otpValue.val];
            next[index] = event.target.value.slice(0, 1).toUpperCase();
            pageState.otpValue.val = next;
          },
        })
      )
    )
  );
}

function renderPaginationCard() {
  return article(
    { class: "showcase-card", id: "component-pagination" },
    h3(null, "pagination"),
    p({ class: "showcase-card__copy" }, componentDescriptions.pagination),
    div(
      { class: "showcase-inline" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.pageNumber.val = Math.max(1, pageState.pageNumber.val - 1);
          },
        },
        "Prev"
      ),
      span({ class: "showcase-meta" }, () => `Page ${pageState.pageNumber.val}`),
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.pageNumber.val += 1;
          },
        },
        "Next"
      )
    )
  );
}

function renderPopoverCard() {
  return article(
    { class: "showcase-card", id: "component-popover" },
    h3(null, "popover"),
    p({ class: "showcase-card__copy" }, componentDescriptions.popover),
    div(
      { class: "showcase-stack" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            pageState.popoverOpen.val = !pageState.popoverOpen.val;
          },
        },
        "Toggle Popover"
      ),
      () =>
        pageState.popoverOpen.val
          ? div(
              { class: "showcase-popover" },
              p(null, "Popover content uses the same framed box language."),
              button(
                {
                  class: "cs-btn",
                  type: "button",
                  onclick: () => {
                    pageState.popoverOpen.val = false;
                  },
                },
                "Close"
              )
            )
          : null
    )
  );
}

function renderPreviewCardCard() {
  return article(
    { class: "showcase-card", id: "component-preview-card" },
    h3(null, "preview-card"),
    p({ class: "showcase-card__copy" }, componentDescriptions["preview-card"]),
    div(
      { class: "showcase-stack" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onmouseenter: () => {
            pageState.previewVisible.val = true;
          },
          onmouseleave: () => {
            pageState.previewVisible.val = false;
          },
          onfocus: () => {
            pageState.previewVisible.val = true;
          },
          onblur: () => {
            pageState.previewVisible.val = false;
          },
        },
        "Preview Entity"
      ),
      () =>
        pageState.previewVisible.val
          ? div(
              { class: "showcase-preview" },
              strong(null, "Entity #7"),
              p(null, "Attested service endpoint ready.")
            )
          : null
    )
  );
}

function renderProgressCard() {
  return article(
    { class: "showcase-card", id: "component-progress" },
    h3(null, "progress"),
    p({ class: "showcase-card__copy" }, componentDescriptions.progress),
    div(
      { class: "showcase-stack" },
      div({ class: "showcase-meta" }, () => `Progress ${pageState.progressValue.val}%`),
      div(
        { class: "cs-progress-bar" },
        div({ class: "bars", style: () => `width:${pageState.progressValue.val}%` })
      ),
      input({
        class: "cs-input",
        type: "range",
        min: "0",
        max: "100",
        value: () => `${pageState.progressValue.val}`,
        oninput: (event) => {
          pageState.progressValue.val = Number(event.target.value);
        },
      })
    )
  );
}

function renderRadioGroupCard() {
  const options = [
    ["alpha", "Alpha"],
    ["beta", "Beta"],
    ["gamma", "Gamma"],
  ];
  return article(
    { class: "showcase-card", id: "component-radio-group" },
    h3(null, "radio-group"),
    p({ class: "showcase-card__copy" }, componentDescriptions["radio-group"]),
    fieldset(
      { class: "cs-fieldset" },
      legend(null, "Options"),
      div(
        { class: "showcase-stack" },
        options.map(([value, textValue]) =>
          div(
            null,
            input({
              id: `radio-${value}`,
              type: "radio",
              name: "radio-group-demo",
              checked: () => pageState.selectedRadio.val === value,
              onchange: () => {
                pageState.selectedRadio.val = value;
              },
            }),
            label({ for: `radio-${value}` }, textValue)
          )
        )
      )
    )
  );
}

function renderScrollAreaCard() {
  return article(
    { class: "showcase-card", id: "component-scroll-area" },
    h3(null, "scroll-area"),
    p({ class: "showcase-card__copy" }, componentDescriptions["scroll-area"]),
    div(
      { class: "showcase-scroll" },
      Array.from({ length: 10 }, (_, index) => p(null, `Scrollable line ${index + 1}`))
    )
  );
}

function renderSelectCard() {
  return article(
    { class: "showcase-card", id: "component-select" },
    h3(null, "select"),
    p({ class: "showcase-card__copy" }, componentDescriptions.select),
    div(
      { class: "showcase-stack" },
      select(
        {
          class: "cs-select",
          onchange: (event) => {
            pageState.selectedSelect.val = event.target.value;
          },
        },
        option({ value: "alpha", selected: true }, "Alpha"),
        option({ value: "beta" }, "Beta"),
        option({ value: "gamma" }, "Gamma")
      ),
      div({ class: "showcase-meta" }, () => `Selected: ${pageState.selectedSelect.val}`)
    )
  );
}

function renderSeparatorCard() {
  return article(
    { class: "showcase-card", id: "component-separator" },
    h3(null, "separator"),
    p({ class: "showcase-card__copy" }, componentDescriptions.separator),
    div(
      { class: "showcase-stack" },
      p(null, "Above separator"),
      hr({ class: "cs-hr" }),
      p(null, "Below separator")
    )
  );
}

function renderSheetCard() {
  return article(
    { class: "showcase-card", id: "component-sheet" },
    h3(null, "sheet"),
    p({ class: "showcase-card__copy" }, componentDescriptions.sheet),
    button(
      {
        class: "cs-btn",
        type: "button",
        onclick: () => {
          pageState.sheetOpen.val = !pageState.sheetOpen.val;
        },
      },
      () => (pageState.sheetOpen.val ? "Hide Sheet" : "Show Sheet")
    ),
    () =>
      pageState.sheetOpen.val
        ? div(
            { class: "showcase-sheet" },
            strong(null, "Edge Panel"),
            p(null, "Sheets share the dialog shell but hug an edge."),
            button(
              {
                class: "cs-btn",
                type: "button",
                onclick: () => {
                  pageState.sheetOpen.val = false;
                },
              },
              "Close"
            )
          )
        : null
  );
}

function renderSidebarCard() {
  const items = ["Inbox", "Drafts", "Archive", "Trash"];
  return article(
    { class: "showcase-card", id: "component-sidebar" },
    h3(null, "sidebar"),
    p({ class: "showcase-card__copy" }, componentDescriptions.sidebar),
    div(
      {
        class: `showcase-sidebar ${pageState.sidebarCollapsed.val ? "is-collapsed" : ""}`,
      },
      button(
        {
          class: "cs-btn showcase-sidebar__toggle",
          type: "button",
          onclick: () => {
            pageState.sidebarCollapsed.val = !pageState.sidebarCollapsed.val;
          },
        },
        () => (pageState.sidebarCollapsed.val ? ">>" : "<<")
      ),
      div(
        { class: "showcase-sidebar__nav" },
        items.map((item, index) =>
          button(
            {
              class: `cs-btn showcase-sidebar__item ${index === 0 ? "is-active" : ""}`,
              type: "button",
            },
            pageState.sidebarCollapsed.val ? item.slice(0, 2) : item
          )
        )
      )
    )
  );
}

function renderSkeletonCard() {
  return article(
    { class: "showcase-card", id: "component-skeleton" },
    h3(null, "skeleton"),
    p({ class: "showcase-card__copy" }, componentDescriptions.skeleton),
    div(
      { class: "showcase-stack" },
      div({ class: "showcase-skeleton showcase-skeleton--line" }),
      div({ class: "showcase-skeleton showcase-skeleton--line short" }),
      div({ class: "showcase-skeleton showcase-skeleton--block" })
    )
  );
}

function renderSliderCard() {
  return article(
    { class: "showcase-card", id: "component-slider" },
    h3(null, "slider"),
    p({ class: "showcase-card__copy" }, componentDescriptions.slider),
    div(
      { class: "cs-slider" },
      label({ for: "slider-demo" }, "Slider"),
      input({ id: "slider-demo", type: "range", min: "0", max: "100", value: "42" }),
      div({ class: "ruler" }),
      div(
        { class: "value" },
        span(null, "0"),
        span(null, "42"),
        span(null, "100")
      )
    )
  );
}

function renderSpinnerCard() {
  return article(
    { class: "showcase-card", id: "component-spinner" },
    h3(null, "spinner"),
    p({ class: "showcase-card__copy" }, componentDescriptions.spinner),
    div({ class: "showcase-spinner" }, "LOADING...")
  );
}

function renderSwitchCard() {
  return article(
    { class: "showcase-card", id: "component-switch" },
    h3(null, "switch"),
    p({ class: "showcase-card__copy" }, componentDescriptions.switch),
    div(
      { class: "showcase-inline" },
      button(
        {
          class: `cs-btn ${pageState.switchOn.val ? "showcase-switch is-on" : "showcase-switch"}`,
          type: "button",
          onclick: () => {
            pageState.switchOn.val = !pageState.switchOn.val;
          },
        },
        () => (pageState.switchOn.val ? "ON" : "OFF")
      ),
      span({ class: "showcase-meta" }, () => `State: ${pageState.switchOn.val ? "enabled" : "disabled"}`)
    )
  );
}

function renderTableCard() {
  const rows = [
    ["MRTD", "valid", "green"],
    ["PCR0", "valid", "green"],
    ["TCB", "stale", "amber"],
  ];
  return article(
    { class: "showcase-card showcase-card--wide", id: "component-table" },
    h3(null, "table"),
    p({ class: "showcase-card__copy" }, componentDescriptions.table),
    table(
      { class: "showcase-table" },
      thead(
        null,
        tr(null, th(null, "Field"), th(null, "Status"), th(null, "State"))
      ),
      tbody(
        null,
        rows.map((row) =>
          tr(
            null,
            td(null, row[0]),
            td(null, row[1]),
            td(null, row[2])
          )
        )
      )
    )
  );
}

function renderTabsCard() {
  return article(
    { class: "showcase-card showcase-card--wide", id: "component-tabs" },
    h3(null, "tabs"),
    p({ class: "showcase-card__copy" }, componentDescriptions.tabs),
    div(
      { class: "cs-tabs showcase-tabs" },
      input({ class: "radiotab", type: "radio", name: "tabs-demo", id: "tabs-a", checked: true }),
      label({ class: "label", for: "tabs-a" }, "Alpha"),
      div({ class: "panel" }, "Primary tab panel content."),
      input({ class: "radiotab", type: "radio", name: "tabs-demo", id: "tabs-b" }),
      label({ class: "label", for: "tabs-b" }, "Beta"),
      div({ class: "panel" }, "Secondary tab panel content."),
      input({ class: "radiotab", type: "radio", name: "tabs-demo", id: "tabs-c" }),
      label({ class: "label", for: "tabs-c" }, "Gamma"),
      div({ class: "panel" }, "Tertiary tab panel content.")
    )
  );
}

function renderTextareaCard() {
  return article(
    { class: "showcase-card", id: "component-textarea" },
    h3(null, "textarea"),
    p({ class: "showcase-card__copy" }, componentDescriptions.textarea),
    textarea({
      class: "cs-input showcase-textarea",
      value: () => pageState.textareaValue.val,
      oninput: (event) => {
        pageState.textareaValue.val = event.target.value;
      },
      placeholder: "Write details...",
    })
  );
}

function renderToastCard() {
  return article(
    { class: "showcase-card", id: "component-toast" },
    h3(null, "toast"),
    p({ class: "showcase-card__copy" }, componentDescriptions.toast),
    div(
      { class: "showcase-stack" },
      button(
        {
          class: "cs-btn",
          type: "button",
          onclick: () => {
            addToast("Toast", "A new notification entered the queue.");
          },
        },
        "Add Toast"
      ),
      div(
        { class: "showcase-toast-stack" },
        () =>
          pageState.toasts.val.map((toast) =>
            div(
              { class: "showcase-toast" },
              strong(null, toast.title),
              p(null, toast.text),
              button(
                {
                  class: "cs-btn",
                  type: "button",
                  onclick: () => dismissToast(toast.id),
                },
                "Dismiss"
              )
            )
          )
      )
    )
  );
}

function renderToggleGroupCard() {
  const options = ["bold", "italic", "code"];
  return article(
    { class: "showcase-card", id: "component-toggle-group" },
    h3(null, "toggle-group"),
    p({ class: "showcase-card__copy" }, componentDescriptions["toggle-group"]),
    div(
      { class: "showcase-group" },
      options.map((optionValue) =>
        button(
          {
            class: `cs-btn ${
              pageState.selectedToggles.val.includes(optionValue) ? "showcase-toggle is-on" : "showcase-toggle"
            }`,
            type: "button",
            onclick: () => {
              const next = pageState.selectedToggles.val.includes(optionValue)
                ? pageState.selectedToggles.val.filter((value) => value !== optionValue)
                : [...pageState.selectedToggles.val, optionValue];
              pageState.selectedToggles.val = next;
            },
          },
          optionValue.toUpperCase()
        )
      )
    )
  );
}

function renderToggleCard() {
  return article(
    { class: "showcase-card", id: "component-toggle" },
    h3(null, "toggle"),
    p({ class: "showcase-card__copy" }, componentDescriptions.toggle),
    button(
      {
        class: `cs-btn ${pageState.togglePressed.val ? "showcase-toggle is-on" : "showcase-toggle"}`,
        type: "button",
        onclick: () => {
          pageState.togglePressed.val = !pageState.togglePressed.val;
        },
      },
      () => (pageState.togglePressed.val ? "Pressed" : "Unpressed")
    )
  );
}

function renderToolbarCard() {
  return article(
    { class: "showcase-card showcase-card--wide", id: "component-toolbar" },
    h3(null, "toolbar"),
    p({ class: "showcase-card__copy" }, componentDescriptions.toolbar),
    div(
      { class: "showcase-toolbar" },
      button({ class: "cs-btn", type: "button" }, "Cut"),
      button({ class: "cs-btn", type: "button" }, "Copy"),
      button({ class: "cs-btn", type: "button" }, "Paste"),
      hr({ class: "cs-hr showcase-toolbar__divider" }),
      button({ class: "cs-btn", type: "button" }, "Run")
    )
  );
}

function renderTooltipCard() {
  return article(
    { class: "showcase-card", id: "component-tooltip" },
    h3(null, "tooltip"),
    p({ class: "showcase-card__copy" }, componentDescriptions.tooltip),
    div(
      { class: "showcase-inline" },
      div(
        {
          class: "cs-tooltip",
          onmouseenter: () => {
            pageState.tooltipVisible.val = true;
          },
          onmouseleave: () => {
            pageState.tooltipVisible.val = false;
          },
        },
        button({ class: "cs-btn", type: "button" }, "Hover me"),
        span({ class: "text", style: () => `visibility:${pageState.tooltipVisible.val ? "visible" : "hidden"}` }, "Helpful hint")
      )
    )
  );
}

const renderers = {
  accordion: renderAccordionCard,
  "alert-dialog": renderAlertDialogCard,
  alert: renderAlertCard,
  autocomplete: renderAutocompleteCard,
  avatar: renderAvatarCard,
  badge: renderBadgeCard,
  breadcrumb: renderBreadcrumbCard,
  button: renderButtonCard,
  calendar: renderCalendarCard,
  card: renderCardCard,
  "checkbox-group": renderCheckboxGroupCard,
  checkbox: renderCheckboxCard,
  collapsible: renderCollapsibleCard,
  combobox: renderComboboxCard,
  command: renderCommandCard,
  dialog: renderDialogCard,
  drawer: renderDrawerCard,
  empty: renderEmptyCard,
  field: renderFieldCard,
  fieldset: renderFieldsetCard,
  form: renderFormCard,
  frame: renderFrameCard,
  group: renderGroupCard,
  "input-group": renderInputGroupCard,
  input: renderInputCard,
  kbd: renderKbdCard,
  label: renderLabelCard,
  menu: renderMenuCard,
  meter: renderMeterCard,
  "number-field": renderNumberFieldCard,
  "otp-field": renderOtpFieldCard,
  pagination: renderPaginationCard,
  popover: renderPopoverCard,
  "preview-card": renderPreviewCardCard,
  progress: renderProgressCard,
  "radio-group": renderRadioGroupCard,
  "scroll-area": renderScrollAreaCard,
  select: renderSelectCard,
  separator: renderSeparatorCard,
  sheet: renderSheetCard,
  sidebar: renderSidebarCard,
  skeleton: renderSkeletonCard,
  slider: renderSliderCard,
  spinner: renderSpinnerCard,
  switch: renderSwitchCard,
  table: renderTableCard,
  tabs: renderTabsCard,
  textarea: renderTextareaCard,
  toast: renderToastCard,
  "toggle-group": renderToggleGroupCard,
  toggle: renderToggleCard,
  toolbar: renderToolbarCard,
  tooltip: renderTooltipCard,
};

function renderGroup(group) {
  return section(
    { class: "gallery-section", id: group.id },
    div(
      { class: "gallery-section__heading" },
      p({ class: "gallery-section__kicker" }, "COSS Mapping"),
      h2(null, group.title),
      p(
        { class: "gallery-section__copy" },
        "Each example below is rebuilt as a Van.js composition over stock cs16.css primitives."
      )
    ),
    div(
      { class: "gallery-grid" },
      group.components.map((componentName) => {
        const renderer = renderers[componentName];
        return renderer ? renderer() : null;
      })
    )
  );
}

function mountGallery() {
  const app = document.getElementById("app");
  if (!app) return;

  van.add(
    app,
    div(
      { class: "gallery-page" },
      header(
        { class: "gallery-hero", id: "top" },
        div(
          { class: "gallery-hero__copy" },
          p({ class: "gallery-hero__kicker" }, "cs16.css // Van.js"),
          h1(null, "COSS Component Gallery"),
          p(
            { class: "gallery-hero__text" },
            "A strict, no-React showcase that maps the COSS UI component set onto the base cs16.css design language."
          )
        ),
        nav(
          { class: "gallery-nav" },
          cossGroups.map((group) =>
            a({ class: "cs-btn", href: `#${group.id}` }, group.title)
          )
        )
      ),
      section(
        { class: "gallery-index" },
        h2(null, "Component Inventory"),
        div(
          { class: "gallery-index__grid" },
          cossGroups.map((group) =>
            fieldset(
              { class: "cs-fieldset" },
              legend(null, group.title),
              ul(
                { class: "gallery-index__list" },
                group.components.map((componentName) => li(null, componentName))
              )
            )
          )
        )
      ),
      ...cossGroups.map(renderGroup),
      footer(
        { class: "gallery-footer" },
        p(null, "Strictly composed with Van.js and upstream cs16.css primitives.")
      )
    )
  );
}

document.addEventListener("DOMContentLoaded", mountGallery);
