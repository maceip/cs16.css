import van from "vanjs-core";
import Mousetrap from "mousetrap";
import Split from "split.js";
import DOMPurify from "dompurify";

const {
  a,
  article,
  aside,
  button,
  div,
  fieldset,
  h2,
  input,
  label,
  legend,
  li,
  menu,
  option,
  p,
  section,
  select,
  span,
  svg,
  text,
  textarea,
  ul,
  path,
} = van.tags;

const now = Date.now();

const folderDefinitions = [
  { id: "inbox", name: "Inbox", type: "system", status: "var(--accent)" },
  { id: "priority", name: "Priority", type: "system", status: "var(--secondary-accent)" },
  { id: "sent", name: "Sent", type: "system", status: "var(--border-light)" },
  { id: "drafts", name: "Drafts", type: "system", status: "var(--secondary-text)" },
  { id: "archives", name: "Archives", type: "system", status: "var(--text-3)" },
  { id: "trash", name: "Trash", type: "system", status: "var(--border-dark)" },
  { id: "ops", name: "Ops", type: "tag", status: "var(--accent)" },
  { id: "supply", name: "Supply", type: "tag", status: "var(--secondary-accent)" },
  { id: "intel", name: "Intel", type: "tag", status: "var(--border-light)" },
];

function createMessage({
  id,
  folderId,
  from,
  email,
  subject,
  preview,
  body,
  minutesAgo,
  priority = false,
  attachments = 0,
  plain = "",
  headers = "",
}) {
  return {
    id,
    folderId,
    from,
    email,
    to: "cmd@cs16.css",
    subject,
    preview,
    body,
    plain,
    headers,
    timestamp: new Date(now - minutesAgo * 60000),
    priority,
    attachments,
    isRead: van.state(folderId === "sent" || folderId === "archives"),
    isFlipped: van.state(false),
  };
}

const seedMessages = [
  createMessage({
    id: "m1",
    folderId: "inbox",
    from: "Quartermaster Vega",
    email: "vega@blackmesa.mil",
    subject: "Attachment cache refreshed for foldable rollout",
    preview: "Bar widths tuned for compact screens and dual-pane hinges.",
    body: `
      <p>Operator,</p>
      <p>The attachment relay was recalibrated for compact screens, foldables, and full desktop width. The progress rail now mirrors the old precaching bar: short, bright, and noisy on purpose.</p>
      <p>Verify the compose console on hinge widths before release.</p>
    `,
    plain: "The attachment relay was recalibrated for compact screens, foldables, and full desktop width.",
    headers: "X-Priority: routine\nX-Relay-Node: CACHE-07\nX-Theme: cs16",
    minutesAgo: 11,
    attachments: 2,
  }),
  createMessage({
    id: "m2",
    folderId: "priority",
    from: "Cmdr. Ortiz",
    email: "ortiz@command.local",
    subject: "Priority influx at 1900 hours",
    preview: "HUD pulse requested whenever a green-flag dispatch lands in queue.",
    body: `
      <p>Maintain maximum contrast.</p>
      <p>When a priority email lands, the interface should react like incoming fire: border pulse, bright phosphor count, and a short feed entry in the lower-left corner.</p>
      <p>Do not soften it.</p>
    `,
    plain: "When a priority email lands, the interface should react like incoming fire.",
    headers: "X-Priority: immediate\nX-Alert-Class: PRTY_INFLUX\nX-HUD: enabled",
    minutesAgo: 3,
    priority: true,
  }),
  createMessage({
    id: "m3",
    folderId: "inbox",
    from: "Lt. Nakamura",
    email: "nakamura@ops.grid",
    subject: "Swipe and flip gestures approved",
    preview: "The ledger can stay dense as long as hover, reveal, and delete remain crisp.",
    body: `
      <p>Keep the rows compact.</p>
      <p>Swiping should expose destructive actions; flipping should reveal metadata without leaving the list. Utility first.</p>
    `,
    plain: "Swiping should expose destructive actions; flipping should reveal metadata without leaving the list.",
    headers: "X-Priority: tactical\nX-Interaction: swipe,flip",
    minutesAgo: 29,
    attachments: 1,
  }),
  createMessage({
    id: "m4",
    folderId: "ops",
    from: "Recon Delta",
    email: "delta@ops.grid",
    subject: "Reader tabs for HTML / text / headers",
    preview: "The reading pane should feel like a dossier, not a blog post.",
    body: `
      <p>The reader is approved as a three-tab dossier.</p>
      <p>Use the legend for sender and timestamp so the message body feels contained, filed, and mission-ready.</p>
    `,
    plain: "Use the legend for sender and timestamp so the message body feels contained, filed, and mission-ready.",
    headers: "X-Priority: medium\nX-Dossier-Look: approved",
    minutesAgo: 53,
  }),
  createMessage({
    id: "m5",
    folderId: "supply",
    from: "Supply Chain Relay",
    email: "supply@relay.zone",
    subject: "Dock inventory icons for command tray",
    preview: "Hover scaling and phosphor tooltips remain consistent with the main shell.",
    body: `
      <p>The bottom dock should read like a loadout bar.</p>
      <p>Close neighbors may scale slightly, but the active icon gets the full jump.</p>
    `,
    plain: "The bottom dock should read like a loadout bar.",
    headers: "X-Priority: routine\nX-Dock: enabled",
    minutesAgo: 112,
  }),
  createMessage({
    id: "m6",
    folderId: "sent",
    from: "You",
    email: "cmd@cs16.css",
    subject: "Prototype status for modern primitives",
    preview: "Animated numbers, spotlight, tilt, and morph popovers all landed in the brief.",
    body: `
      <p>Status is green.</p>
      <p>The modern primitives can coexist with the 1.6 shell as long as motion is sharp, bounded, and optional under reduced-motion preferences.</p>
    `,
    plain: "The modern primitives can coexist with the 1.6 shell.",
    headers: "X-Priority: sent\nX-Status: green",
    minutesAgo: 240,
  }),
  createMessage({
    id: "m7",
    folderId: "drafts",
    from: "You",
    email: "cmd@cs16.css",
    subject: "Compose dialog copy draft",
    preview: "Need final wording for the command console footer actions.",
    body: `
      <p>Send stays primary.</p>
      <p>Discard should visually align with the close button treatment without becoming invisible.</p>
    `,
    plain: "Send stays primary. Discard should visually align with the close button treatment.",
    headers: "X-Priority: draft\nX-Next-Step: finalize copy",
    minutesAgo: 380,
  }),
  createMessage({
    id: "m8",
    folderId: "intel",
    from: "Signals Unit",
    email: "signals@intel.cluster",
    subject: "Scroll progress visible during dossier review",
    preview: "Long-form reading sessions need the same tactical readout as map loading.",
    body: `
      <p>Scrolling is part of the interaction model.</p>
      <p>Add a top-edge bar that reports reading progress without introducing modern softness.</p>
    `,
    plain: "Add a top-edge bar that reports reading progress.",
    headers: "X-Priority: medium\nX-Tracking: scroll",
    minutesAgo: 92,
  }),
];

const appState = {
  folders: van.state(folderDefinitions),
  messages: van.state(seedMessages),
  selectedFolder: van.state("inbox"),
  selectedMessageId: van.state("m1"),
  searchQuery: van.state(""),
  readerTab: van.state("html"),
  mobilePane: van.state("ledger"),
  sidebarMode: van.state("expanded"),
  transmissionProgress: van.state(0),
  transmissionLabel: van.state("TRANSMITTING PAYLOAD"),
  hudCount: van.state(1),
  hudLogs: van.state([
    "[SYS] Priority channel armed.",
    "[SYS] Foldable layout calibration complete.",
    "[SYS] Inbox ledger hover offset tuned.",
  ]),
  metrics: {
    unread: van.state(0),
    priority: van.state(0),
    attachments: van.state(0),
  },
  sliderDigits: {
    a: van.state(1),
    b: van.state(6),
    c: van.state(3),
  },
};

let splitInstance = null;
let transmissionTimer = null;
let hudTimer = null;
let motionRaf = 0;
let metricsInterval = null;

function updateMetrics() {
  const messages = appState.messages.val;
  appState.metrics.unread.val = messages.filter(
    (message) => !message.isRead.val && message.folderId !== "sent"
  ).length;
  appState.metrics.priority.val = messages.filter(
    (message) => message.priority && !message.isRead.val
  ).length;
  appState.metrics.attachments.val = messages.reduce(
    (sum, message) => sum + message.attachments,
    0
  );
  appState.hudCount.val = appState.metrics.priority.val;
}

function folderUnreadCount(folderId) {
  return appState.messages.val.filter(
    (message) => message.folderId === folderId && !message.isRead.val
  ).length;
}

function folderMessageCount(folderId) {
  return appState.messages.val.filter((message) => message.folderId === folderId).length;
}

function getVisibleMessages() {
  const folderId = appState.selectedFolder.val;
  const search = appState.searchQuery.val.trim().toLowerCase();
  return appState.messages.val
    .filter((message) => message.folderId === folderId)
    .filter((message) => {
      if (!search) return true;
      return [message.from, message.subject, message.preview, message.plain]
        .join(" ")
        .toLowerCase()
        .includes(search);
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function getSelectedMessage() {
  return appState.messages.val.find(
    (message) => message.id === appState.selectedMessageId.val
  );
}

function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "NOW";
  if (minutes < 60) return `${minutes}M`;
  if (hours < 24) return `${hours}H`;
  if (days < 7) return `${days}D`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}

function formatFullDate(date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ensureSelectedMessage() {
  const visible = getVisibleMessages();
  if (!visible.length) {
    appState.selectedMessageId.val = null;
    return;
  }

  const current = visible.find((message) => message.id === appState.selectedMessageId.val);
  if (!current) {
    appState.selectedMessageId.val = visible[0].id;
  }
}

function setActiveFolder(folderId) {
  appState.selectedFolder.val = folderId;
  ensureSelectedMessage();
  if (window.matchMedia("(max-width: 820px)").matches) {
    setMobilePane("ledger");
  }
}

function setMobilePane(pane) {
  appState.mobilePane.val = pane;
  document.body.dataset.mobilePane = pane;
}

function getViewportMode() {
  if (window.matchMedia("(max-width: 479px)").matches) return "mobile";
  if (
    window.matchMedia(
      "(min-width: 600px) and (max-width: 900px) and (orientation: portrait)"
    ).matches
  ) {
    return "foldable";
  }
  return "standard";
}

function applySidebarMode(mode) {
  appState.sidebarMode.val = mode;
  document.body.dataset.sidebarMode = mode;
}

function syncSidebarMode() {
  const viewportMode = getViewportMode();

  if (viewportMode === "foldable") {
    applySidebarMode("rail");
    return;
  }

  if (viewportMode === "mobile") {
    applySidebarMode("expanded");
    return;
  }

  if (appState.sidebarMode.val === "rail") {
    applySidebarMode("expanded");
    return;
  }

  document.body.dataset.sidebarMode = appState.sidebarMode.val;
}

function toggleSidebarMode() {
  if (getViewportMode() !== "standard") return;
  applySidebarMode(appState.sidebarMode.val === "collapsed" ? "expanded" : "collapsed");
  initSplitLayout();
}

function selectMessage(messageId) {
  const message = appState.messages.val.find((entry) => entry.id === messageId);
  if (!message) return;
  appState.selectedMessageId.val = messageId;
  message.isRead.val = true;
  appState.readerTab.val = "html";
  updateMetrics();

  if (window.matchMedia("(max-width: 820px)").matches) {
    setMobilePane("reader");
  }
}

function deleteMessage(messageId) {
  appState.messages.val = appState.messages.val.filter((message) => message.id !== messageId);
  if (appState.selectedMessageId.val === messageId) {
    appState.selectedMessageId.val = null;
  }
  ensureSelectedMessage();
  updateMetrics();
}

function archiveMessage(messageId) {
  const nextMessages = appState.messages.val.map((message) => {
    if (message.id !== messageId) return message;
    return { ...message, folderId: "archives" };
  });
  appState.messages.val = nextMessages;
  ensureSelectedMessage();
  updateMetrics();
}

function toggleFlip(message) {
  message.isFlipped.val = !message.isFlipped.val;
}

function queueHudLog(text, alert = false) {
  appState.hudLogs.val = [`[SYS] ${text}`, ...appState.hudLogs.val].slice(0, 4);
  const overlay = document.getElementById("hud-overlay");
  if (!overlay) return;
  if (alert) {
    overlay.classList.add("is-alert");
    clearTimeout(hudTimer);
    hudTimer = window.setTimeout(() => overlay.classList.remove("is-alert"), 1800);
  }
}

function openComposeDialog() {
  const dialog = document.getElementById("compose-dialog");
  if (!dialog?.showModal) return;
  setDialogOrigin(dialog, document.getElementById("new-message-btn"));
  dialog.showModal();
}

function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog?.open) dialog.close();
}

function setDialogOrigin(dialog, trigger) {
  if (!dialog || !trigger) return;
  const rect = trigger.getBoundingClientRect();
  dialog.style.setProperty("--dialog-origin-x", `${rect.left + rect.width / 2}px`);
  dialog.style.setProperty("--dialog-origin-y", `${rect.top + rect.height / 2}px`);
}

function showTransmission(labelText) {
  const progressShell = document.getElementById("transmission-progress");
  const progressBar = document.getElementById("progress-bars");
  if (!progressShell || !progressBar) return;

  clearInterval(transmissionTimer);
  appState.transmissionLabel.val = labelText;
  appState.transmissionProgress.val = 0;
  progressShell.hidden = false;
  progressBar.style.width = "0%";

  transmissionTimer = window.setInterval(() => {
    const next = Math.min(100, appState.transmissionProgress.val + Math.ceil(Math.random() * 18));
    appState.transmissionProgress.val = next;
    progressBar.style.width = `${next}%`;
    if (next >= 100) {
      clearInterval(transmissionTimer);
      queueHudLog("Payload transmitted.", true);
      window.setTimeout(() => {
        progressShell.hidden = true;
      }, 700);
    }
  }, 120);
}

function sendComposeMessage() {
  const to = document.getElementById("compose-to")?.value.trim();
  const subject = document.getElementById("compose-subject")?.value.trim();
  const rawBody = document.getElementById("compose-body")?.value.trim();

  if (!to || !subject) {
    queueHudLog("Compose fields incomplete.", true);
    return;
  }

  const sanitizedBody = DOMPurify.sanitize(
    `<p>${(rawBody || "No message body entered.")
      .split(/\n{2,}/)
      .map((chunk) => chunk.replace(/\n/g, "<br />"))
      .join("</p><p>")}</p>`
  );

  const message = createMessage({
    id: `sent-${Date.now()}`,
    folderId: "sent",
    from: "You",
    email: "cmd@cs16.css",
    subject,
    preview: rawBody || "No message body entered.",
    body: sanitizedBody,
    plain: rawBody || "No message body entered.",
    headers: `X-Priority: sent\nX-Recipient: ${to}\nX-Origin: compose-console`,
    minutesAgo: 0,
  });

  appState.messages.val = [message, ...appState.messages.val];
  updateMetrics();
  closeDialog("compose-dialog");

  document.getElementById("compose-to").value = "";
  document.getElementById("compose-subject").value = "";
  document.getElementById("compose-body").value = "";

  setActiveFolder("sent");
  appState.selectedMessageId.val = message.id;
  showTransmission("TRANSMITTING PAYLOAD");
}

function insertTemplate(value) {
  const composeBody = document.getElementById("compose-body");
  if (!composeBody) return;
  composeBody.value = composeBody.value ? `${composeBody.value}\n\n${value}` : value;
}

function applyQuickAction(action) {
  if (action === "priority") {
    setActiveFolder("priority");
    queueHudLog("Priority channel focused.", true);
  }
  if (action === "compose") {
    openComposeDialog();
  }
  if (action === "reader") {
    setMobilePane("reader");
    document.getElementById("reading-pane")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function navigateMessages(step) {
  const visible = getVisibleMessages();
  if (!visible.length) return;
  const currentIndex = visible.findIndex(
    (message) => message.id === appState.selectedMessageId.val
  );
  const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = Math.max(0, Math.min(visible.length - 1, fallbackIndex + step));
  selectMessage(visible[nextIndex].id);
}

function FolderSidebar() {
  const groups = () => ({
    system: appState.folders.val.filter((folder) => folder.type === "system"),
    tag: appState.folders.val.filter((folder) => folder.type === "tag"),
  });

  const renderFolder = (folder) =>
    button(
      {
        type: "button",
        class: () =>
          `cs-btn cs-sidebar__item ${
            appState.selectedFolder.val === folder.id ? "is-active" : ""
          }`,
        style: `--status: ${folder.status};`,
        onclick: () => setActiveFolder(folder.id),
      },
      span(
        { class: "cs-sidebar__lead" },
        span({ class: "cs-sidebar__status", "aria-hidden": "true" }),
        span({ class: "cs-sidebar__name" }, folder.name)
      ),
      span({ class: "cs-sidebar__count" }, () => folderMessageCount(folder.id))
    );

  return div(
    { class: "cs-sidebar" },
    div(
      { class: "cs-sidebar__group" },
      span({ class: "cs-sidebar__label" }, "SYSTEM"),
      () => groups().system.map(renderFolder)
    ),
    div(
      { class: "sidebar-separator" },
      (() => {
        const hrEl = document.createElement("hr");
        hrEl.className = "cs-hr";
        return hrEl;
      })()
    ),
    div(
      { class: "cs-sidebar__group" },
      span({ class: "cs-sidebar__label" }, "CUSTOM TAGS"),
      () => groups().tag.map(renderFolder)
    )
  );
}

function SidebarToggleButton() {
  return button(
    {
      type: "button",
      class: "cs-btn sidebar-toggle-btn",
      onclick: toggleSidebarMode,
      title: () =>
        appState.sidebarMode.val === "collapsed" ? "Expand sidebar" : "Collapse sidebar",
    },
    () => (appState.sidebarMode.val === "collapsed" ? ">>" : "<<")
  );
}

function MessageRow(message) {
  return div(
    {
      class: () =>
        `cs-inbox-row ${message.isRead.val ? "" : "is-unread"} ${
          appState.selectedMessageId.val === message.id ? "is-selected" : ""
        } ${message.isFlipped.val ? "is-flipped" : ""}`,
      tabindex: "0",
      onkeydown: (event) => {
        if (event.key === "Enter") selectMessage(message.id);
        if (event.key.toLowerCase() === "f") toggleFlip(message);
        if (event.key === "Delete" || event.key === "Backspace") deleteMessage(message.id);
      },
      onpointerdown: (event) => initSwipe(event, message.id),
    },
    div(
      { class: "cs-inbox-row__rail" },
      button(
        {
          type: "button",
          class: "cs-btn",
          onclick: (event) => {
            event.stopPropagation();
            archiveMessage(message.id);
          },
        },
        "Archive"
      ),
      button(
        {
          type: "button",
          class: "cs-btn",
          onclick: (event) => {
            event.stopPropagation();
            deleteMessage(message.id);
          },
        },
        "Delete"
      )
    ),
    div(
      { class: "cs-inbox-row__card" },
      div(
        { class: "cs-inbox-row__cube" },
        div(
          {
            class: "cs-inbox-row__face cs-inbox-row__face--front",
            onclick: () => selectMessage(message.id),
          },
          div(
            { class: "cs-inbox-row__surface" },
            label(
              { class: "cs-checkbox", onclick: (event) => event.stopPropagation() },
              input({
                type: "checkbox",
                checked: () => appState.selectedMessageId.val === message.id,
                onchange: () => selectMessage(message.id),
              }),
              span({ class: "cs-checkbox__label" }, "")
            ),
            div(
              { class: "cs-inbox-row__content" },
              div(
                { class: "cs-inbox-row__header" },
                span({ class: "cs-inbox-row__sender" }, message.from),
                message.priority
                  ? span({ class: "cs-inbox-row__chip is-priority" }, "PRIORITY")
                  : null,
                message.attachments
                  ? span(
                      { class: "cs-inbox-row__chip" },
                      `${message.attachments} ATTACH`
                    )
                  : null
              ),
              div({ class: "cs-inbox-row__subject" }, message.subject),
              div({ class: "cs-inbox-row__preview" }, message.preview)
            ),
            button(
              {
                type: "button",
                class: "cs-btn cs-inbox-row__flip",
                onclick: (event) => {
                  event.stopPropagation();
                  toggleFlip(message);
                },
              },
              () => (message.isFlipped.val ? "Front" : "Flip")
            ),
            span({ class: "cs-inbox-row__stamp" }, formatRelativeTime(message.timestamp))
          )
        ),
        div(
          { class: "cs-inbox-row__face cs-inbox-row__face--back" },
          div(
            { class: "flip-back-copy" },
            p(null, `FROM: ${message.email}`),
            p(null, `TO: ${message.to}`),
            p(null, `HEADERS: ${message.headers.split("\n")[0]}`)
          ),
          div(
            { class: "cs-inbox-row__back-actions" },
            button(
              {
                type: "button",
                class: "cs-btn",
                onclick: () => selectMessage(message.id),
              },
              "Open"
            ),
            button(
              {
                type: "button",
                class: "cs-btn",
                onclick: () => toggleFlip(message),
              },
              "Close"
            )
          )
        )
      )
    )
  );
}

function InboxLedger() {
  return div(
    { class: "cs-inbox" },
    () => {
      const visibleMessages = getVisibleMessages();
      if (!visibleMessages.length) {
        return div(
          { class: "empty-state" },
          p(null, "No dispatches in this folder."),
          p(null, "Use Quick Actions or compose a fresh message.")
        );
      }
      return visibleMessages.map(MessageRow);
    }
  );
}

function ReaderTabs() {
  const selected = () => getSelectedMessage();
  return div(
    { class: "reader-shell" },
    () => {
      const message = selected();
      if (!message) {
        return div(
          { class: "no-selection" },
          p(null, "Select a message to open the dossier.")
        );
      }

      return fieldset(
        { class: "cs-fieldset cs-dossier" },
        legend(null, `${message.from} // ${formatFullDate(message.timestamp)}`),
        div(
          { class: "cs-dossier__meta" },
          div(
            { class: "cs-dossier__row" },
            span({ class: "cs-dossier__label" }, "Sender"),
            span({ class: "cs-dossier__value" }, `${message.from} <${message.email}>`)
          ),
          div(
            { class: "cs-dossier__row" },
            span({ class: "cs-dossier__label" }, "Subject"),
            span({ class: "cs-dossier__value" }, message.subject)
          ),
          div(
            { class: "cs-dossier__row" },
            span({ class: "cs-dossier__label" }, "Priority"),
            span(
              { class: "cs-dossier__value" },
              message.priority ? "Immediate" : "Routine"
            )
          ),
          div(
            { class: "cs-dossier__row" },
            span({ class: "cs-dossier__label" }, "Attachments"),
            span({ class: "cs-dossier__value" }, `${message.attachments}`)
          )
        ),
        div(
          { class: "cs-tabs reader-tabs" },
          input({
            class: "radiotab",
            type: "radio",
            id: "reader-tab-html",
            name: "reader-tabs",
            checked: () => appState.readerTab.val === "html",
            onchange: () => {
              appState.readerTab.val = "html";
            },
          }),
          label({ class: "label", for: "reader-tab-html" }, "HTML"),
          div(
            { class: "panel" },
            div({
              class: "reader-panel-copy",
              innerHTML: DOMPurify.sanitize(message.body),
            })
          ),
          input({
            class: "radiotab",
            type: "radio",
            id: "reader-tab-plain",
            name: "reader-tabs",
            checked: () => appState.readerTab.val === "plain",
            onchange: () => {
              appState.readerTab.val = "plain";
            },
          }),
          label({ class: "label", for: "reader-tab-plain" }, "Plain Text"),
          div({ class: "panel reader-panel-copy" }, message.plain || message.preview),
          input({
            class: "radiotab",
            type: "radio",
            id: "reader-tab-headers",
            name: "reader-tabs",
            checked: () => appState.readerTab.val === "headers",
            onchange: () => {
              appState.readerTab.val = "headers";
            },
          }),
          label({ class: "label", for: "reader-tab-headers" }, "Headers"),
          div({ class: "panel reader-panel-copy reader-panel-copy--mono" }, message.headers)
        ),
        div(
          { class: "reading-pane-actions" },
          button(
            {
              type: "button",
              class: "cs-btn",
              onclick: () => {
                document.getElementById("compose-to").value = message.email;
                document.getElementById("compose-subject").value = `RE: ${message.subject}`;
                openComposeDialog();
              },
            },
            "Reply"
          ),
          button(
            {
              type: "button",
              class: "cs-btn",
              onclick: () => archiveMessage(message.id),
            },
            "Archive"
          ),
          button(
            {
              type: "button",
              class: "cs-btn",
              onclick: () => deleteMessage(message.id),
            },
            "Delete"
          )
        )
      );
    }
  );
}

function AnimatedStat(labelText, valueState) {
  return div(
    { class: "cs-animated-number" },
    span({ class: "cs-animated-number__label" }, labelText),
    span({ class: "cs-animated-number__value" }, () => `${valueState.val}`)
  );
}

function SlidingNumber() {
  const digits = [appState.sliderDigits.a, appState.sliderDigits.b, appState.sliderDigits.c];
  return div(
    { class: "cs-sliding-number" },
    ...digits.map((digitState) =>
      div(
        { class: "cs-sliding-number__slot" },
        div(
          {
            class: "cs-sliding-number__track",
            style: () => `--digit:${digitState.val};`,
          },
          ...Array.from({ length: 10 }, (_, digit) => span(null, `${digit}`))
        )
      )
    )
  );
}

function HeaderStats() {
  return div(
    { class: "header-stats" },
    AnimatedStat("Unread", appState.metrics.unread),
    AnimatedStat("Priority", appState.metrics.priority),
    div(
      { class: "header-stats__sliding" },
      span({ class: "header-stats__label" }, "Queue Depth"),
      SlidingNumber()
    )
  );
}

function MobileSwitcher() {
  const panes = [
    { id: "sidebar", label: "Folders" },
    { id: "ledger", label: "Ledger" },
    { id: "reader", label: "Reader" },
  ];

  return div(
    { class: "mobile-switcher" },
    panes.map((pane) =>
      button(
        {
          type: "button",
          class: () =>
            `cs-btn mobile-switcher__btn ${
              appState.mobilePane.val === pane.id ? "is-active" : ""
            }`,
          onclick: () => setMobilePane(pane.id),
        },
        pane.label
      )
    )
  );
}

function Dock() {
  const items = [
    { label: "Inbox", action: () => setActiveFolder("inbox") },
    { label: "Priority", action: () => setActiveFolder("priority") },
    { label: "Compose", action: () => openComposeDialog() },
    { label: "Reader", action: () => setMobilePane("reader") },
  ];

  return div(
    { class: "cs-dock" },
    items.map((item) =>
      button(
        {
          type: "button",
          class: "cs-btn cs-dock__item",
          onclick: item.action,
        },
        span({ class: "cs-dock__tooltip" }, item.label),
        item.label.slice(0, 2)
      )
    )
  );
}

function ModernComponentsPanel() {
  return section(
    { class: "modern-panel" },
    div(
      { class: "pane-heading" },
      p({ class: "pane-kicker" }, "Modern Primitives"),
      h2(null, "Extended CS16 Component Suite")
    ),
    div(
      { class: "modern-grid" },
      fieldset(
        { class: "cs-fieldset modern-card" },
        legend(null, "Animated / Sliding Numbers"),
        div(
          { class: "modern-card__stack" },
          div(
            { class: "metric-grid" },
            AnimatedStat("Unread", appState.metrics.unread),
            AnimatedStat("Priority", appState.metrics.priority)
          ),
          div(
            { class: "header-stats__sliding" },
            span({ class: "header-stats__label" }, "Queue Depth"),
            SlidingNumber()
          )
        ),
        p(
          { class: "modern-card__copy" },
          "Numeric modules keep the same inset box language as the library's stock controls."
        )
      ),
      fieldset(
        { class: "cs-fieldset modern-card" },
        legend(null, "Image Comparison"),
        div(
          { class: "cs-image-compare", id: "image-compare", style: "--split: 58%;" },
          div({ class: "cs-image-compare__pane cs-image-compare__pane--base" }),
          div({ class: "cs-image-compare__pane cs-image-compare__pane--overlay" }),
          div({ class: "cs-image-compare__divider" }),
          input({
            class: "cs-slider__native",
            id: "image-compare-range",
            type: "range",
            min: "0",
            max: "100",
            value: "58",
          })
        )
      ),
      fieldset(
        { class: "cs-fieldset modern-card" },
        legend(null, "Dock / Spinning Text"),
        Dock(),
        div(
          { class: "cs-spinning-text" },
          svg({ viewBox: "0 0 120 120", "aria-hidden": "true" },
            path({ id: "spin-path", d: "M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0", fill: "none" }),
            text(null,
              van.tags.textPath({ href: "#spin-path", startOffset: "0%" }, "CS16 GRID // TACTICAL UI // ")
            )
          )
        )
      ),
      fieldset(
        { class: "cs-fieldset modern-card" },
        legend(null, "Popover / Transmission"),
        div(
          { class: "modern-card__stack" },
          button({
            type: "button",
            class: "cs-btn",
            popovertarget: "quick-actions-popover",
          }, "Open Popover"),
          div(
            { class: "cs-transmission is-indeterminate" },
            div(
              { class: "cs-transmission__head" },
              span(null, "Attachment scan"),
              span(null, "live")
            ),
            div(
              { class: "cs-progress-bar" },
              div({ class: "bars" })
            )
          )
        )
      ),
      fieldset(
        { class: "cs-fieldset modern-card" },
        legend(null, "Spotlight / Tilt / Magnetic"),
        div(
          { class: "modern-card__stack cs-spotlight", id: "spotlight-card" },
          div(
            { class: "tilt-panel cs-tilt", id: "tilt-card" },
            div(
              { class: "tilt-panel__top" },
              p({ class: "tilt-panel__stamp" }, "POINTER TEST"),
              p({ class: "modern-card__copy" }, "Lightweight pointer tracking inside a stock boxed panel.")
            ),
            button({ class: "cs-btn cs-magnetic", type: "button" }, "Track")
          )
        )
      )
    )
  );
}

function mountApp() {
  const folderNav = document.getElementById("folder-nav");
  const messageList = document.getElementById("message-list");
  const readingPane = document.getElementById("reading-pane");
  const headerStats = document.getElementById("header-stats");
  const mobileSwitcher = document.getElementById("mobile-switcher");
  const dockRoot = document.getElementById("command-dock");
  const showcaseRoot = document.getElementById("modern-showcase");
  const sidebarToggle = document.getElementById("sidebar-toggle");

  if (folderNav) {
    folderNav.innerHTML = "";
    van.add(folderNav, FolderSidebar);
  }

  if (messageList) {
    messageList.innerHTML = "";
    van.add(messageList, InboxLedger);
  }

  if (readingPane) {
    readingPane.innerHTML = "";
    van.add(readingPane, ReaderTabs);
  }

  if (headerStats) {
    headerStats.innerHTML = "";
    van.add(headerStats, HeaderStats);
  }

  if (mobileSwitcher) {
    mobileSwitcher.innerHTML = "";
    van.add(mobileSwitcher, MobileSwitcher);
  }

  if (sidebarToggle) {
    sidebarToggle.innerHTML = "";
    van.add(sidebarToggle, SidebarToggleButton);
  }

  if (dockRoot) {
    dockRoot.innerHTML = "";
    van.add(dockRoot, Dock);
  }

  if (showcaseRoot) {
    showcaseRoot.innerHTML = "";
    van.add(showcaseRoot, ModernComponentsPanel);
  }

  van.derive(() => {
    const folder = appState.folders.val.find(
      (entry) => entry.id === appState.selectedFolder.val
    );
    const title = document.getElementById("current-folder-title");
    const count = document.getElementById("message-count");
    if (title) title.textContent = folder?.name ?? "Mailbox";
    if (count) count.textContent = `${getVisibleMessages().length} dispatches`;
  });

  van.derive(() => {
    const feed = document.getElementById("hud-feed");
    const counter = document.getElementById("hud-counter");
    if (feed) {
      feed.innerHTML = "";
      appState.hudLogs.val.forEach((line) => {
        const item = document.createElement("p");
        item.textContent = line;
        feed.appendChild(item);
      });
    }
    if (counter) {
      counter.innerHTML = "";
      const box = document.createElement("div");
      box.className = "hud-counter-box";
      box.innerHTML = `<span class="hud-counter-box__value">${appState.hudCount.val}</span><span class="hud-counter-box__label">PRTY_INFLUX</span>`;
      counter.appendChild(box);
    }
  });

  van.derive(() => {
    const stat = document.getElementById("transmission-stat");
    const label = document.getElementById("transmission-label");
    if (stat) stat.textContent = `${appState.transmissionProgress.val}%`;
    if (label) label.textContent = appState.transmissionLabel.val;
  });
}

function initSplitLayout() {
  if (splitInstance) {
    splitInstance.destroy();
    splitInstance = null;
  }

  if (window.innerWidth < 1100) return;
  if (appState.sidebarMode.val === "collapsed" || appState.sidebarMode.val === "rail") return;

  const sidebar = document.getElementById("sidebar-pane");
  const ledger = document.getElementById("ledger-pane");
  const reader = document.getElementById("reader-pane-shell");
  if (!sidebar || !ledger || !reader) return;

  splitInstance = Split([sidebar, ledger, reader], {
    sizes: [20, 42, 38],
    minSize: [190, 320, 320],
    gutterSize: 6,
    direction: "horizontal",
  });
}

function updateScrollProgress() {
  const scrollable = document.scrollingElement || document.documentElement;
  const max = scrollable.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (scrollable.scrollTop / max) * 100 : 0;
  document.getElementById("scroll-progress-bar")?.style.setProperty("width", `${percent}%`);
}

function initSearch() {
  const search = document.getElementById("search-input");
  search?.addEventListener("input", (event) => {
    appState.searchQuery.val = event.target.value;
    ensureSelectedMessage();
  });
}

function initDialogs() {
  document.querySelectorAll("[data-close-dialog]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => closeDialog(buttonEl.dataset.closeDialog));
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) dialog.close();
    });
  });
}

function initControls() {
  document.getElementById("new-message-btn")?.addEventListener("click", openComposeDialog);
  document.getElementById("compose-send")?.addEventListener("click", sendComposeMessage);

  document.querySelectorAll("[data-template]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => insertTemplate(buttonEl.dataset.template));
  });

  document.querySelectorAll("[data-quick-action]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => applyQuickAction(buttonEl.dataset.quickAction));
  });

  document.getElementById("app-mode-trigger")?.addEventListener("click", () => {
    const menu = document.getElementById("app-mode-popover");
    if (!menu) return;
    if (typeof menu.showPopover === "function") {
      if (menu.matches(":popover-open")) {
        menu.hidePopover();
      } else {
        menu.showPopover();
      }
    }
  });
}

function initKeyboardShortcuts() {
  Mousetrap.bind("g i", () => setActiveFolder("inbox"));
  Mousetrap.bind("g p", () => setActiveFolder("priority"));
  Mousetrap.bind("g s", () => setActiveFolder("sent"));
  Mousetrap.bind("c", () => openComposeDialog());
  Mousetrap.bind("/", () => document.getElementById("search-input")?.focus());
  Mousetrap.bind("j", () => navigateMessages(1));
  Mousetrap.bind("k", () => navigateMessages(-1));
  Mousetrap.bind("e", () => {
    if (appState.selectedMessageId.val) archiveMessage(appState.selectedMessageId.val);
  });
}

function initSwipe(pointerDownEvent, messageId) {
  if (pointerDownEvent.pointerType === "mouse" && window.innerWidth > 820) return;
  const row = pointerDownEvent.currentTarget;
  const card = row.querySelector(".cs-inbox-row__card");
  if (!card) return;

  let startX = pointerDownEvent.clientX;
  let current = 0;
  card.setPointerCapture?.(pointerDownEvent.pointerId);

  const onMove = (moveEvent) => {
    current = Math.max(-148, Math.min(0, moveEvent.clientX - startX));
    row.style.setProperty("--swipe", `${current}px`);
  };

  const onEnd = () => {
    row.removeEventListener("pointermove", onMove);
    row.removeEventListener("pointerup", onEnd);
    row.removeEventListener("pointercancel", onEnd);

    if (current < -96) {
      row.style.setProperty("--swipe", "-148px");
    } else {
      row.style.setProperty("--swipe", "0px");
    }
  };

  row.addEventListener("pointermove", onMove);
  row.addEventListener("pointerup", onEnd);
  row.addEventListener("pointercancel", onEnd);
}

function initImageCompare() {
  const compare = document.getElementById("image-compare");
  const range = document.getElementById("image-compare-range");
  if (!compare || !range) return;
  range.addEventListener("input", () => {
    compare.style.setProperty("--split", `${range.value}%`);
  });
}

function initPointerEffects() {
  const spotlight = document.getElementById("spotlight-card");
  const tilt = document.getElementById("tilt-card");

  spotlight?.addEventListener("pointermove", (event) => {
    const rect = spotlight.getBoundingClientRect();
    spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });

  tilt?.addEventListener("pointermove", (event) => {
    const rect = tilt.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    tilt.style.setProperty("--ry", `${x.toFixed(2)}deg`);
    tilt.style.setProperty("--rx", `${y.toFixed(2)}deg`);
  });
  tilt?.addEventListener("pointerleave", () => {
    tilt.style.setProperty("--ry", "0deg");
    tilt.style.setProperty("--rx", "0deg");
  });

  document.querySelectorAll(".cs-magnetic").forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      cancelAnimationFrame(motionRaf);
      motionRaf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * 0.05;
        const y = (event.clientY - (rect.top + rect.height / 2)) * 0.05;
        node.style.setProperty("--magnetic-x", `${Math.max(-3, Math.min(3, x))}px`);
        node.style.setProperty("--magnetic-y", `${Math.max(-3, Math.min(3, y))}px`);
      });
    });
    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--magnetic-x", "0px");
      node.style.setProperty("--magnetic-y", "0px");
    });
  });
}

function initResponsiveTracking() {
  const apply = () => {
    syncSidebarMode();
    if (window.innerWidth >= 821) {
      document.body.dataset.mobilePane = "ledger";
    } else {
      document.body.dataset.mobilePane = appState.mobilePane.val;
    }
    initSplitLayout();
  };

  window.addEventListener("resize", apply);
  apply();
}

function initTelemetryAnimations() {
  metricsInterval = window.setInterval(() => {
    appState.sliderDigits.a.val = (appState.sliderDigits.a.val + 1) % 10;
    appState.sliderDigits.b.val = (appState.sliderDigits.b.val + 3) % 10;
    appState.sliderDigits.c.val = (appState.sliderDigits.c.val + 2) % 10;
  }, 1300);
}

function init() {
  updateMetrics();
  ensureSelectedMessage();
  mountApp();
  initSearch();
  initControls();
  initDialogs();
  initKeyboardShortcuts();
  initImageCompare();
  initPointerEffects();
  initResponsiveTracking();
  initTelemetryAnimations();

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  queueHudLog("Tactical mail grid online.");
  queueHudLog("Priority watcher synced.", true);
}

document.addEventListener("DOMContentLoaded", init);
