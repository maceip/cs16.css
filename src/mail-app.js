// ============================================================================
// LIBRARY IMPORTS
// ============================================================================
// VanJS - Reactive state management and component rendering (zero dependencies)
import van from 'vanjs-core';
// Mousetrap - Keyboard shortcuts (j/k navigation, c compose, e archive, etc)
import Mousetrap from 'mousetrap';
// Split.js - Resizable panes (no dependencies, desktop-style layout)
import Split from 'split.js';
// Pell - Lightweight rich text editor for email composition
import pell from 'pell';
// TreeSelect - Hierarchical folder picker for move/label operations
import TreeSelect from 'treeselectjs';
// DOMPurify - Sanitizes email HTML to prevent XSS attacks
import DOMPurify from 'dompurify';

const { div, span, p, button, input, label, nav, h3, h2, section, aside, hr } = van.tags;

// ============================================================================
// APP STATE MANAGEMENT
// ============================================================================

const appState = {
  folders: van.state([
    { id: 'inbox', name: 'Inbox', unreadCount: van.state(12), isActive: van.state(true) },
    { id: 'sent', name: 'Sent', unreadCount: van.state(0), isActive: van.state(false) },
    { id: 'drafts', name: 'Drafts', unreadCount: van.state(3), isActive: van.state(false) },
    { id: 'spam', name: 'Spam', unreadCount: van.state(0), isActive: van.state(false) },
    { id: 'trash', name: 'Trash', unreadCount: van.state(5), isActive: van.state(false) },
  ]),

  messages: van.state([
    {
      id: 'msg1',
      from: 'alice@example.com',
      to: 'user@example.com',
      subject: 'Project Update - Q1 Review',
      body: '<p>Hi,</p><p>Here is the project status update for Q1. Everything is on track.</p><p>Best regards,<br/>Alice</p>',
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
      body: '<p>Thanks for joining the design review meeting. The feedback was very helpful.</p>',
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
      body: '<p>We are interested in exploring a partnership with your organization...</p>',
      timestamp: new Date(Date.now() - 86400000),
      isRead: van.state(false),
      isSelected: van.state(false),
      folderId: 'inbox',
    },
  ]),

  selectedFolder: van.state('inbox'),
  selectedMessage: van.state(null),
  showCompose: van.state(false),
  showSettings: van.state(false),
  uploadProgress: van.state(0),
  searchQuery: van.state(''),
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
}

function selectMessage(messageId) {
  appState.selectedMessage.val = messageId;
  const msg = appState.messages.val.find(m => m.id === messageId);
  if (msg) {
    msg.isRead.val = true;
  }
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
// COMPONENT: FOLDER NAV (VanJS Reactive)
// ============================================================================
// Uses VanJS state reactivity: folder.isActive.val updates trigger re-renders
// Uses VanJS computed classes: class: () => ... re-evaluates on state change
// This is a responsive component that updates when folders or unread counts change

function FolderNav() {
  return nav(
    { class: 'folder-nav' },
    () =>
      appState.folders.val.map(folder =>
        div(
          {
            class: () => `folder-item ${folder.isActive.val ? 'active' : ''}`,
            onclick: () => setActiveFolder(folder.id),
          },
          span({ class: 'folder-item-name' }, folder.name),
          folder.unreadCount.val > 0
            ? span({ class: 'folder-item-count' }, folder.unreadCount.val)
            : null
        )
      )
  );
}

// ============================================================================
// COMPONENT: MESSAGE LIST (VanJS Reactive)
// ============================================================================
// Uses VanJS computed rendering: () => getVisibleMessages().map(...)
// Filters messages based on selectedFolder.val
// Updates dynamically when messages added/removed or folder changes
// Shows read/unread state via msg.isRead.val reactivity

function MessageList() {
  return div(
    { class: 'message-list' },
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
          div(
            { class: 'message-content' },
            span({ class: 'message-sender' }, msg.from),
            span({ class: 'message-subject' }, msg.subject)
          ),
          span({ class: 'message-time' }, formatTime(msg.timestamp))
        )
      )
  );
}

// ============================================================================
// COMPONENT: READING PANE (VanJS + DOMPurify)
// ============================================================================
// Uses VanJS computed rendering: finds selected message and re-renders on change
// Uses DOMPurify.sanitize() to safely render HTML email bodies
// Prevents XSS attacks by stripping malicious script tags and event handlers
// Only whitelisted HTML tags (p, a, strong, em, br, etc) are allowed through

function ReadingPane() {
  return div(
    { class: 'reading-pane-content' },
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
          div(
            { class: 'message-metadata-row' },
            span({ class: 'metadata-label' }, 'From:'),
            span({ class: 'metadata-value' }, selectedMsg.from)
          ),
          div(
            { class: 'message-metadata-row' },
            span({ class: 'metadata-label' }, 'To:'),
            span({ class: 'metadata-value' }, selectedMsg.to)
          ),
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
        // DOMPurify sanitizes HTML email bodies to prevent XSS attacks
        // Only safe HTML tags are allowed through (p, strong, em, a, br, etc)
        div(
          { class: 'message-body' },
          { innerHTML: DOMPurify.sanitize(selectedMsg.body) }
        ),
        div(
          { class: 'reading-pane-actions' },
          (() => {
            const replyBtn = document.createElement('button');
            replyBtn.className = 'cs-btn';
            replyBtn.textContent = 'Reply';
            replyBtn.onclick = () => {
              document.getElementById('compose-dialog').showModal();
              setTimeout(initializePellEditor, 100);
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

// ============================================================================
// PELL EDITOR INITIALIZATION
// ============================================================================
// Pell: Lightweight, zero-dependency rich text editor
// Features: bold, italic, underline, strikethrough, heading, quote, code, link
// No external editor bloat - pure vanilla JS implementation
// Integrates with VanJS state via onChange callback (stores HTML to dataset)

function initializePellEditor() {
  const editorContainer = document.getElementById('compose-editor');
  if (editorContainer && editorContainer.children.length === 0) {
    pell.init({
      element: editorContainer,
      onChange: html => {
        // Store sanitized HTML content - will be sanitized again by DOMPurify on send
        editorContainer.dataset.content = html;
      },
      defaultParagraphSeparator: 'p',
      forceDefaultParagraphSeparator: true,
    });
  }
}

// ============================================================================
// FOLDER PICKER INITIALIZATION (TreeSelect.js)
// ============================================================================
// TreeSelect: Hierarchical folder/label picker - perfect for "move to folder" dialogs
// Supports nested folder structures (Archives > 2024, 2025, etc)
// Zero-dependency library with clean visual style matching cs16.css
// Used for: move messages, apply labels, set filter targets

function initializeFolderPicker() {
  const pickerContainer = document.getElementById('folder-picker');
  if (pickerContainer && pickerContainer.children.length === 0) {
    const folderTree = [
      { name: 'Inbox', id: 'inbox', children: [] },
      { name: 'Sent', id: 'sent', children: [] },
      { name: 'Drafts', id: 'drafts', children: [] },
      { name: 'Spam', id: 'spam', children: [] },
      { name: 'Trash', id: 'trash', children: [] },
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

    const targetFolder = appState.folders.val.find(f => f.id === targetFolderId);
    if (targetFolder && !message.isRead.val) {
      targetFolder.unreadCount.val += 1;
    }
  }
}

// ============================================================================
// KEYBOARD SHORTCUTS (Mousetrap.js)
// ============================================================================
// Mousetrap: Zero-dependency keyboard shortcut library
// Perfect for mail client - Vim-like navigation and Gmail-inspired shortcuts
// Shortcuts:
//   g+i: Go to Inbox       | g+s: Go to Sent       | g+d: Go to Drafts
//   j: Next message        | k: Previous message   | c: Compose
//   e: Archive/Delete      | /: Focus search

function initKeyboardShortcuts() {
  Mousetrap.bind('g i', () => setActiveFolder('inbox'));
  Mousetrap.bind('g s', () => setActiveFolder('sent'));
  Mousetrap.bind('g d', () => setActiveFolder('drafts'));

  Mousetrap.bind('c', () => {
    document.getElementById('compose-dialog').showModal();
    setTimeout(initializePellEditor, 100);
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
      const msg = appState.messages.val.find(m => m.id === appState.selectedMessage.val);
      if (msg) {
        appState.messages.val = appState.messages.val.filter(m => m.id !== msg.id);
        appState.selectedMessage.val = null;
      }
    }
  });

  Mousetrap.bind('/', () => {
    document.getElementById('search-input')?.focus();
  });
}

// ============================================================================
// INITIALIZATION (VanJS + Split.js)
// ============================================================================
// Mounts all VanJS components into DOM
// Uses van.add() to attach reactive components to container elements
// Initializes Split.js for resizable three-pane desktop layout
// Split.js: Zero-dependency, drag-to-resize panes (no jQuery required)

function init() {
  const container = document.querySelector('.app-container');
  if (container) {
    // Clear container
    container.innerHTML = '';

    // Create sidebar with VanJS reactive folder navigation
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar gutter';
    container.appendChild(sidebar);
    van.add(sidebar, () =>
      div(
        div({ class: 'sidebar-header' }, h3(null, 'FOLDERS')),
        FolderNav(),
        hr({ class: 'cs-hr' }),
        div(
          { class: 'sidebar-footer' },
          (() => {
            const settingsBtn = document.createElement('button');
            settingsBtn.className = 'cs-btn';
            settingsBtn.textContent = 'Settings';
            settingsBtn.id = 'settings-btn';
            settingsBtn.onclick = () => document.getElementById('settings-dialog').showModal();
            return settingsBtn;
          })()
        )
      )
    );

    // Create message list pane with reactive message rendering
    const messageListPane = document.createElement('section');
    messageListPane.className = 'message-list-pane gutter';
    container.appendChild(messageListPane);
    van.add(messageListPane, () =>
      div(
        div({ class: 'list-header' }, h3(null, () => {
          const folder = appState.folders.val.find(f => f.id === appState.selectedFolder.val);
          return folder ? folder.name : 'Inbox';
        })),
        div(
          { class: 'list-toolbar' },
          (() => {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'cs-input';
            searchInput.placeholder = 'Search...';
            searchInput.id = 'search-input';
            return searchInput;
          })()
        ),
        hr({ class: 'cs-hr' }),
        MessageList()
      )
    );

    // Create reading pane with DOMPurify-safe HTML rendering
    const readingPane = document.createElement('section');
    readingPane.className = 'reading-pane gutter';
    container.appendChild(readingPane);
    van.add(readingPane, ReadingPane);

    // Initialize Split.js for desktop-style resizable panes
    // Provides smooth drag-to-resize between sidebar, list, and reading pane
    setTimeout(() => {
      const children = document.querySelectorAll('.app-container > *');
      if (children.length === 3) {
        Split(Array.from(children), {
          sizes: [20, 50, 30],
          minSize: [150, 200, 200],
          gutterSize: 4,
          gutterAlign: 'center',
          direction: 'horizontal',
        });
      }
    }, 0);
  }

  // Setup event listeners
  const newMessageBtn = document.getElementById('new-message-btn');
  if (newMessageBtn) {
    newMessageBtn.addEventListener('click', () => {
      document.getElementById('compose-dialog').showModal();
      setTimeout(initializePellEditor, 100);
    });
  }

  // Compose send button - demonstrates DOMPurify + Progress Bar
  const composeSendBtn = document.getElementById('compose-send');
  if (composeSendBtn) {
    composeSendBtn.addEventListener('click', () => {
      const to = document.getElementById('compose-to')?.value;
      const subject = document.getElementById('compose-subject')?.value;
      // Get HTML from Pell editor and sanitize it with DOMPurify before storage
      // This ensures no scripts or malicious HTML is stored even if bypassed in editor
      const rawBody = document.getElementById('compose-editor')?.dataset?.content || '<p>No message body</p>';
      const body = DOMPurify.sanitize(rawBody);

      if (to && subject) {
        const newMessage = {
          id: `msg${Date.now()}`,
          from: 'user@example.com',
          to: to,
          subject: subject,
          body: body, // Already sanitized by DOMPurify
          timestamp: new Date(),
          isRead: van.state(true),
          isSelected: van.state(false),
          folderId: 'sent',
        };
        appState.messages.val.unshift(newMessage);

        document.getElementById('compose-dialog').close();
        document.getElementById('compose-to').value = '';
        document.getElementById('compose-cc').value = '';
        document.getElementById('compose-bcc').value = '';
        document.getElementById('compose-subject').value = '';
        document.getElementById('compose-editor').innerHTML = '';

        // Show cs-progress-bar during simulated upload
        // This demonstrates the cs16.css progress bar component
        appState.uploadProgress.val = 0;
        document.getElementById('transmission-progress').style.display = 'block';
        const progressBars = document.getElementById('progress-bars');

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
              document.getElementById('transmission-progress').style.display = 'none';
            }, 500);
          }
          if (progressBars) {
            progressBars.style.width = progress + '%';
          }
        }, 100);
      }
    });
  }

  // Move dialog
  const moveDialog = document.getElementById('move-dialog');
  if (moveDialog) {
    const originalShowModal = moveDialog.showModal;
    moveDialog.showModal = function () {
      initializeFolderPicker();
      return originalShowModal.call(this);
    };

    const moveButtons = moveDialog.querySelectorAll('.footer-btns .cs-btn');
    if (moveButtons.length > 0) {
      moveButtons[0].addEventListener('click', () => {
        const targetFolderId = document.getElementById('folder-picker')?.dataset?.selectedFolder;
        if (targetFolderId && appState.selectedMessage.val) {
          moveMessageToFolder(appState.selectedMessage.val, targetFolderId);
          moveDialog.close();
        }
      });
    }
  }

  // Initialize keyboard shortcuts
  initKeyboardShortcuts();
}

// Start app
document.addEventListener('DOMContentLoaded', init);
