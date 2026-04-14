import van from 'vanjs-core';
import Mousetrap from 'mousetrap';
import Split from 'split.js';
import pell from 'pell';
import TreeSelect from 'treeselectjs';

const { div, span, p } = van.tags;

// ============================================================================
// APP STATE MANAGEMENT
// ============================================================================

// Global app state using VanJS reactive primitives
const appState = {
  // Folder management
  folders: van.state([
    { id: 'inbox', name: 'Inbox', unreadCount: van.state(12), isActive: van.state(true) },
    { id: 'sent', name: 'Sent', unreadCount: van.state(0), isActive: van.state(false) },
    { id: 'drafts', name: 'Drafts', unreadCount: van.state(3), isActive: van.state(false) },
    { id: 'spam', name: 'Spam', unreadCount: van.state(0), isActive: van.state(false) },
    { id: 'trash', name: 'Trash', unreadCount: van.state(5), isActive: van.state(false) },
  ]),

  // Message management
  messages: van.state([
    {
      id: 'msg1',
      from: 'alice@example.com',
      to: 'user@example.com',
      subject: 'Project Update - Q1 Review',
      body: 'Hi,\n\nHere is the project status update for Q1. Everything is on track.\n\nBest regards,\nAlice',
      timestamp: new Date(Date.now() - 3600000),
      isRead: van.state(false),
      isSelected: van.state(false),
      folderId: 'inbox',
    },
    {
      id: 'msg2',
      from: 'bob@company.com',
      to: 'user@example.com',
      subject: 'Meeting Notes - Design Review',
      body: 'Thanks for joining the design review meeting. The feedback was very helpful.',
      timestamp: new Date(Date.now() - 7200000),
      isRead: van.state(true),
      isSelected: van.state(false),
      folderId: 'inbox',
    },
    {
      id: 'msg3',
      from: 'carol@startup.io',
      to: 'user@example.com',
      subject: 'Partnership Opportunity',
      body: 'We are interested in exploring a partnership with your organization...',
      timestamp: new Date(Date.now() - 86400000),
      isRead: van.state(false),
      isSelected: van.state(false),
      folderId: 'inbox',
    },
  ]),

  // UI state
  selectedFolder: van.state('inbox'),
  selectedMessage: van.state(null),
  showCompose: van.state(false),
  showSettings: van.state(false),
  searchQuery: van.state(''),

  // Selection state
  selectedMessages: van.state([]),
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function setActiveFolder(folderId) {
  appState.folders.val.forEach(folder => {
    folder.isActive.val = folder.id === folderId;
  });
  appState.selectedFolder.val = folderId;
  appState.selectedMessage.val = null;
  appState.selectedMessages.val = [];
}

function selectMessage(messageId) {
  appState.selectedMessage.val = messageId;
  const msg = appState.messages.val.find(m => m.id === messageId);
  if (msg) {
    msg.isRead.val = true;
  }
}

function toggleMessageSelection(messageId) {
  const selected = appState.selectedMessages.val;
  const index = selected.indexOf(messageId);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(messageId);
  }
  appState.selectedMessages.val = [...selected];
}

function getVisibleMessages() {
  const currentFolder = appState.selectedFolder.val;
  return appState.messages.val.filter(msg => msg.folderId === currentFolder);
}

function formatTime(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

function SidebarComponent() {
  return div(
    { class: 'sidebar' },
    div({ class: 'sidebar-header' }, p(null, 'FOLDERS')),
    div(
      { class: 'folder-nav', id: 'folder-nav' },
      () =>
        appState.folders.val.map(folder =>
          div(
            {
              class: () =>
                `folder-item ${folder.isActive.val ? 'active' : ''}`,
              onclick: () => setActiveFolder(folder.id),
            },
            span({ class: 'folder-item-name' }, folder.name),
            folder.unreadCount.val > 0
              ? span({ class: 'folder-item-count' }, folder.unreadCount.val)
              : null
          )
        )
    ),
    div(
      { class: 'sidebar-footer' },
      // Settings button handled in main layout
    )
  );
}

// ============================================================================
// MESSAGE LIST COMPONENT
// ============================================================================

function MessageListComponent() {
  return div(
    { class: 'message-list-pane' },
    div(
      { class: 'list-header' },
      p(null, () => {
        const folder = appState.folders.val.find(f => f.id === appState.selectedFolder.val);
        return folder ? folder.name : 'Inbox';
      })
    ),
    div(
      { class: 'list-toolbar' },
      (() => {
        const input = document.createElement('input');
        input.type = 'text';
        input.class = 'cs-input';
        input.placeholder = 'Search...';
        input.id = 'search-input';
        return input;
      })()
    ),
    div(
      { class: 'message-list', id: 'message-list' },
      () =>
        getVisibleMessages().map(msg =>
          div(
            {
              class: () => {
                const classes = ['message-row'];
                if (!msg.isRead.val) classes.push('unread');
                if (appState.selectedMessage.val === msg.id) classes.push('selected');
                return classes.join(' ');
              },
              onclick: () => selectMessage(msg.id),
            },
            div({ class: 'message-content' }, span({ class: 'message-sender' }, msg.from), span({ class: 'message-subject' }, msg.subject)),
            span({ class: 'message-time' }, formatTime(msg.timestamp))
          )
        )
    )
  );
}

// ============================================================================
// READING PANE COMPONENT
// ============================================================================

function ReadingPaneComponent() {
  return div(
    { class: 'reading-pane', id: 'reading-pane' },
    () => {
      const selectedMsg = appState.messages.val.find(m => m.id === appState.selectedMessage.val);

      if (!selectedMsg) {
        return div(
          { class: 'reading-pane-content' },
          div({ class: 'no-selection' }, p(null, 'Select a message to read'))
        );
      }

      return div(
        { class: 'reading-pane-content' },
        div(
          { class: 'message-metadata' },
          div({ class: 'message-metadata-row' }, span({ class: 'metadata-label' }, 'From:'), span({ class: 'metadata-value' }, selectedMsg.from)),
          div({ class: 'message-metadata-row' }, span({ class: 'metadata-label' }, 'To:'), span({ class: 'metadata-value' }, selectedMsg.to)),
          div(
            { class: 'message-metadata-row' },
            span({ class: 'metadata-label' }, 'Date:'),
            span({ class: 'metadata-value' }, selectedMsg.timestamp.toLocaleString())
          ),
          div(
            { class: 'message-metadata-row' },
            span({ class: 'metadata-label' }, 'Subject:'),
            span({ class: 'metadata-value' }, selectedMsg.subject)
          )
        ),
        div({ class: 'message-body' }, selectedMsg.body),
        div(
          { class: 'reading-pane-actions' },
          (() => {
            const replyBtn = document.createElement('button');
            replyBtn.class = 'cs-btn';
            replyBtn.textContent = 'Reply';
            replyBtn.onclick = () => {
              appState.showCompose.val = true;
              const composeDialog = document.getElementById('compose-dialog');
              composeDialog.showModal();
              initializePellEditor();
            };
            return replyBtn;
          })(),
          (() => {
            const archiveBtn = document.createElement('button');
            archiveBtn.class = 'cs-btn';
            archiveBtn.textContent = 'Archive';
            archiveBtn.onclick = () => alert('Archived message');
            return archiveBtn;
          })(),
          (() => {
            const moveBtn = document.createElement('button');
            moveBtn.class = 'cs-btn';
            moveBtn.textContent = 'Move';
            moveBtn.onclick = () => document.getElementById('move-dialog').showModal();
            return moveBtn;
          })()
        )
      );
    }
  );
}

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

function initKeyboardShortcuts() {
  // Navigation
  Mousetrap.bind('g i', () => setActiveFolder('inbox'));
  Mousetrap.bind('g s', () => setActiveFolder('sent'));
  Mousetrap.bind('g d', () => setActiveFolder('drafts'));

  // Message actions
  Mousetrap.bind('c', () => {
    appState.showCompose.val = true;
    document.getElementById('compose-dialog').showModal();
  });

  Mousetrap.bind('j', () => {
    const messages = getVisibleMessages();
    const currentIndex = messages.findIndex(m => m.id === appState.selectedMessage.val);
    if (currentIndex < messages.length - 1) {
      selectMessage(messages[currentIndex + 1].id);
    }
  });

  Mousetrap.bind('k', () => {
    const messages = getVisibleMessages();
    const currentIndex = messages.findIndex(m => m.id === appState.selectedMessage.val);
    if (currentIndex > 0) {
      selectMessage(messages[currentIndex - 1].id);
    }
  });

  Mousetrap.bind('e', () => {
    if (appState.selectedMessage.val) {
      alert('Message archived');
    }
  });

  Mousetrap.bind('#', () => {
    if (appState.selectedMessage.val) {
      alert('Message deleted');
    }
  });

  Mousetrap.bind('/', () => {
    document.getElementById('search-input')?.focus();
  });
}

// ============================================================================
// PELL EDITOR INITIALIZATION
// ============================================================================

function initializePellEditor() {
  const editorContainer = document.getElementById('compose-editor');
  if (editorContainer && editorContainer.children.length === 0) {
    pell.init({
      element: editorContainer,
      onChange: html => {
        // Store the editor content in a data attribute
        editorContainer.dataset.content = html;
      },
      defaultParagraphSeparator: 'p',
      forceDefaultParagraphSeparator: true,
      classes: {
        actionbar: 'pell-button-group',
        button: 'pell-button',
        content: 'pell-content',
      },
    });
  }
}

// ============================================================================
// FOLDER PICKER INITIALIZATION
// ============================================================================

function initializeFolderPicker() {
  const pickerContainer = document.getElementById('folder-picker');
  if (pickerContainer && pickerContainer.children.length === 0) {
    const folderTree = [
      {
        name: 'Inbox',
        id: 'inbox',
        children: [],
      },
      {
        name: 'Sent',
        id: 'sent',
        children: [],
      },
      {
        name: 'Drafts',
        id: 'drafts',
        children: [],
      },
      {
        name: 'Spam',
        id: 'spam',
        children: [],
      },
      {
        name: 'Trash',
        id: 'trash',
        children: [],
      },
      {
        name: 'Archives',
        id: 'archives',
        children: [
          { name: '2024', id: 'archives-2024', children: [] },
          { name: '2023', id: 'archives-2023', children: [] },
        ],
      },
    ];

    const ts = new TreeSelect({
      elementId: 'folder-picker',
      hasOptionDescription: false,
      texts: {
        placeholder: 'Select a folder...',
        search: 'Search folders...',
      },
      options: folderTree,
    });

    // Store the selected folder ID
    pickerContainer.dataset.selectedFolder = null;
    ts.onChange(() => {
      const selected = ts.getSelectedOptions();
      if (selected && selected.length > 0) {
        pickerContainer.dataset.selectedFolder = selected[0].id;
      }
    });
  }
}

// ============================================================================
// MOVE MESSAGE FUNCTIONALITY
// ============================================================================

function moveMessageToFolder(messageId, targetFolderId) {
  const message = appState.messages.val.find(m => m.id === messageId);
  if (message) {
    message.folderId = targetFolderId;
    appState.messages.val = [...appState.messages.val];
    appState.selectedMessage.val = null;

    // Update folder unread counts
    const targetFolder = appState.folders.val.find(f => f.id === targetFolderId);
    if (targetFolder && !message.isRead.val) {
      targetFolder.unreadCount.val += 1;
    }
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
  // Render main app components
  const container = document.querySelector('.app-container');
  if (container) {
    container.innerHTML = '';

    // Create the three-pane layout
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar gutter';
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <h3>FOLDERS</h3>
      </div>
      <nav class="folder-nav" id="folder-nav"></nav>
      <hr class="cs-hr" />
      <div class="sidebar-footer">
        <button class="cs-btn" id="settings-btn">Settings</button>
      </div>
    `;

    const messageList = document.createElement('section');
    messageList.className = 'message-list-pane gutter';
    messageList.innerHTML = `
      <div class="list-header">
        <h3 id="current-folder-title">Inbox</h3>
        <div class="list-toolbar">
          <input type="text" class="cs-input" id="search-input" placeholder="Search..." />
        </div>
      </div>
      <hr class="cs-hr" />
      <div class="message-list" id="message-list"></div>
    `;

    const readingPane = document.createElement('section');
    readingPane.className = 'reading-pane gutter';
    readingPane.innerHTML = `<div class="reading-pane-content" id="reading-pane-content"></div>`;

    container.appendChild(sidebar);
    container.appendChild(messageList);
    container.appendChild(readingPane);

    // Mount VanJS components
    van.add(document.getElementById('folder-nav'), SidebarComponent);
    van.add(document.getElementById('message-list'), () =>
      getVisibleMessages().map(msg =>
        div(
          {
            class: () => {
              const classes = ['message-row'];
              if (!msg.isRead.val) classes.push('unread');
              if (appState.selectedMessage.val === msg.id) classes.push('selected');
              return classes.join(' ');
            },
            onclick: () => selectMessage(msg.id),
          },
          div({ class: 'message-content' }, span({ class: 'message-sender' }, msg.from), span({ class: 'message-subject' }, msg.subject)),
          span({ class: 'message-time' }, formatTime(msg.timestamp))
        )
      )
    );
    van.add(
      document.getElementById('reading-pane-content'),
      () => {
        const selectedMsg = appState.messages.val.find(m => m.id === appState.selectedMessage.val);

        if (!selectedMsg) {
          return div(
            { class: 'no-selection' },
            p(null, 'Select a message to read')
          );
        }

        return div(
          div(
            { class: 'message-metadata' },
            div({ class: 'message-metadata-row' }, span({ class: 'metadata-label' }, 'From:'), span({ class: 'metadata-value' }, selectedMsg.from)),
            div({ class: 'message-metadata-row' }, span({ class: 'metadata-label' }, 'To:'), span({ class: 'metadata-value' }, selectedMsg.to)),
            div(
              { class: 'message-metadata-row' },
              span({ class: 'metadata-label' }, 'Date:'),
              span({ class: 'metadata-value' }, selectedMsg.timestamp.toLocaleString())
            ),
            div(
              { class: 'message-metadata-row' },
              span({ class: 'metadata-label' }, 'Subject:'),
              span({ class: 'metadata-value' }, selectedMsg.subject)
            )
          ),
          div({ class: 'message-body' }, selectedMsg.body),
          div(
            { class: 'reading-pane-actions' },
            (() => {
              const replyBtn = document.createElement('button');
              replyBtn.className = 'cs-btn';
              replyBtn.textContent = 'Reply';
              replyBtn.onclick = () => {
                appState.showCompose.val = true;
                const composeDialog = document.getElementById('compose-dialog');
                composeDialog.showModal();
                initializePellEditor();
              };
              return replyBtn;
            })(),
            (() => {
              const archiveBtn = document.createElement('button');
              archiveBtn.className = 'cs-btn';
              archiveBtn.textContent = 'Archive';
              archiveBtn.onclick = () => {
                appState.messages.val = appState.messages.val.filter(m => m.id !== selectedMsg.id);
                appState.selectedMessage.val = null;
              };
              return archiveBtn;
            })(),
            (() => {
              const moveBtn = document.createElement('button');
              moveBtn.className = 'cs-btn';
              moveBtn.textContent = 'Move';
              moveBtn.onclick = () => document.getElementById('move-dialog').showModal();
              return moveBtn;
            })()
          )
        );
      }
    );
  }

  // Initialize resizable panes with split.js
  setTimeout(() => {
    const container = document.querySelector('.app-container');
    if (container && container.children.length === 3) {
      Split([container.children[0], container.children[1], container.children[2]], {
        sizes: [20, 50, 30],
        minSize: [150, 200, 200],
        gutterSize: 4,
        gutterAlign: 'center',
        direction: 'horizontal',
      });
    }
  }, 0);

  // Event listeners
  const newMessageBtn = document.getElementById('new-message-btn');
  if (newMessageBtn) {
    newMessageBtn.addEventListener('click', () => {
      appState.showCompose.val = true;
      const composeDialog = document.getElementById('compose-dialog');
      composeDialog.showModal();
      initializePellEditor();
    });
  }

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      appState.showSettings.val = true;
      document.getElementById('settings-dialog').showModal();
    });
  }

  // Handle move dialog
  const moveDialog = document.getElementById('move-dialog');
  if (moveDialog) {
    const originalShowModal = moveDialog.showModal;
    moveDialog.showModal = function () {
      initializeFolderPicker();
      return originalShowModal.call(this);
    };

    const moveDialogForm = moveDialog.querySelector('form');
    if (moveDialogForm) {
      const moveButtons = moveDialog.querySelectorAll('.footer-btns .cs-btn');
      if (moveButtons.length > 0) {
        moveButtons[0].addEventListener('click', () => {
          const targetFolderId = document.getElementById('folder-picker')?.dataset?.selectedFolder;
          if (targetFolderId && appState.selectedMessage.val) {
            moveMessageToFolder(appState.selectedMessage.val, targetFolderId);
            moveDialog.close();
            alert(`Message moved to folder`);
          } else {
            alert('Please select a folder');
          }
        });
      }
    }
  }

  const composeSendBtn = document.getElementById('compose-send');
  if (composeSendBtn) {
    composeSendBtn.addEventListener('click', () => {
      const to = document.getElementById('compose-to')?.value;
      const subject = document.getElementById('compose-subject')?.value;
      const body = document.getElementById('compose-editor')?.dataset?.content || 'No message body';

      if (to && subject) {
        // Add new message to the appropriate folder
        const newMessage = {
          id: `msg${Date.now()}`,
          from: 'user@example.com',
          to: to,
          subject: subject,
          body: body,
          timestamp: new Date(),
          isRead: van.state(true),
          isSelected: van.state(false),
          folderId: 'sent',
        };
        appState.messages.val.unshift(newMessage);
        alert(`Message sent to ${to}`);
      } else {
        alert('Please fill in To and Subject fields');
        return;
      }

      document.getElementById('compose-dialog').close();
      // Clear the form
      document.getElementById('compose-to').value = '';
      document.getElementById('compose-cc').value = '';
      document.getElementById('compose-bcc').value = '';
      document.getElementById('compose-subject').value = '';
      document.getElementById('compose-editor').innerHTML = '';
    });
  }

  // Initialize keyboard shortcuts
  initKeyboardShortcuts();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
