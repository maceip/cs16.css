import van from 'vanjs-core';

const { div, button } = van.tags;

// ============================================================================
// SERVER BROWSER STATE
// ============================================================================

const browserState = {
  currentTab: van.state('internet'),
  selectedServer: van.state(null),
  servers: van.state([
    {
      id: 1,
      name: 'S.G. [03] DM',
      game: 'www.svarog-game.cor',
      players: '21 / 32',
      map: 'de_inferno',
      latency: 2,
    },
    {
      id: 2,
      name: 'HOBOPOCC|Ju CX 1',
      game: 'Counter-Strike',
      players: '5 / 32',
      map: 'de_dust2',
      latency: 16,
    },
    {
      id: 3,
      name: ': : : GOROD 48 : : :',
      game: 'Zombie Plague 4.3 Flu...',
      players: '9 / 32',
      map: 'zm_torornto_new2',
      latency: 23,
    },
    {
      id: 4,
      name: '3kaй сервер! 16+ [★]',
      game: 'Counter-Strike',
      players: '22 / 25',
      map: 'de_nuke',
      latency: 24,
    },
    {
      id: 5,
      name: 'KPOBAHHUU ToPOP [www.RK-cs.ru]',
      game: 'Game Hosting by My...',
      players: '6 / 20',
      map: 'de_dust2_2x2',
      latency: 24,
    },
    {
      id: 6,
      name: 'FuN_public->[Steam/NonSteam]',
      game: 'www.vk.com/fun_publ',
      players: '2 / 12',
      map: 'de_dust2x2',
      latency: 24,
    },
    {
      id: 7,
      name: '[Rus Public] Angels of Devils',
      game: '[CServer.ru]',
      players: '17 / 24',
      map: 'de_dust2_2x2',
      latency: 24,
    },
    {
      id: 8,
      name: 'Ultras|Deathe he сервер, ЗПО War 3 zm!',
      game: 'Game Hosting by My...',
      players: '6 / 20',
      map: 'de_dust2_2x2',
      latency: 24,
    },
    {
      id: 9,
      name: 'Cw Server Klana RUSSIAN FIVE',
      game: 'Counter-Strike',
      players: '18 / 21',
      map: 'de_dust2_2x2',
      latency: 24,
    },
    {
      id: 10,
      name: 'Insomnia HardSkill',
      game: 'Counter-Strike',
      players: '17 / 25',
      map: 'awp_india',
      latency: 24,
    },
    {
      id: 11,
      name: 'Regional Public #1',
      game: 'Counter-Strike',
      players: '9 / 23',
      map: 'de_westwood',
      latency: 24,
    },
    {
      id: 12,
      name: 'Спящий Это Татарстон·EntH=)',
      game: 'Counter-Strike',
      players: '0 / 18',
      map: '35hp',
      latency: 24,
    },
    {
      id: 13,
      name: 'CSR',
      game: 'Counter-Strike',
      players: '0 / 18',
      map: '35hp',
      latency: 24,
    },
  ]),
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function selectServer(serverId) {
  browserState.selectedServer.val = browserState.selectedServer.val === serverId ? null : serverId;
}

function switchTab(tabName) {
  browserState.currentTab.val = tabName;
  browserState.selectedServer.val = null;
}

// ============================================================================
// SERVER LIST COMPONENT (VanJS)
// ============================================================================

function ServerList() {
  return div(
    { class: 'server-list' },
    () =>
      browserState.servers.val.map(server =>
        div(
          {
            class: () => {
              const classes = ['server-row'];
              if (browserState.selectedServer.val === server.id) classes.push('selected');
              if (server.latency > 50) classes.push('high-latency');
              return classes.join(' ');
            },
            onclick: () => selectServer(server.id),
          },
          div({ class: 'server-name' }, server.name),
          div({ class: 'server-game' }, server.game),
          div({ class: 'server-players' }, server.players),
          div({ class: 'server-map' }, server.map),
          div({ class: 'server-latency' }, server.latency)
        )
      )
  );
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
  // Mount server list
  const serverListContainer = document.getElementById('server-list');
  if (serverListContainer) {
    van.add(serverListContainer, ServerList);
  }

  // Setup tab button listeners
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked tab
      btn.classList.add('active');
      // Switch tab
      switchTab(btn.dataset.tab);
    });
  });

  // Setup toolbar buttons
  const quickRefreshBtn = document.getElementById('quick-refresh');
  if (quickRefreshBtn) {
    quickRefreshBtn.addEventListener('click', () => {
      console.log('Quick refresh clicked');
      // Simulate refresh animation
      quickRefreshBtn.style.opacity = '0.5';
      setTimeout(() => {
        quickRefreshBtn.style.opacity = '1';
      }, 200);
    });
  }

  const refreshAllBtn = document.getElementById('refresh-all');
  if (refreshAllBtn) {
    refreshAllBtn.addEventListener('click', () => {
      console.log('Refresh all clicked');
      refreshAllBtn.style.opacity = '0.5';
      setTimeout(() => {
        refreshAllBtn.style.opacity = '1';
      }, 200);
    });
  }

  const connectBtn = document.getElementById('connect-btn');
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      if (browserState.selectedServer.val) {
        const server = browserState.servers.val.find(s => s.id === browserState.selectedServer.val);
        console.log('Connecting to:', server.name);
        alert(`Connecting to: ${server.name}`);
      } else {
        alert('Please select a server first');
      }
    });
  }
}

// Start app
document.addEventListener('DOMContentLoaded', init);
