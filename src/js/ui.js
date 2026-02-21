import { DIFFICULTY_EXP, STAT_CONFIG } from './models.js';
import { expToNextLevel } from './progression.js';

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function renderDashboard(state, onCompleteQuest) {
  const profilePanel = document.querySelector('#profilePanel');
  profilePanel.innerHTML = `
    <p>Alias: ${state.player.alias}</p>
    <p>Player LV ${state.player.level} • ${state.player.totalExp} total EXP</p>
  `;

  renderStats(state);
  renderQuests(state, onCompleteQuest);
}

function renderStats(state) {
  const container = document.querySelector('#statsGrid');
  const template = document.querySelector('#statCardTemplate');
  container.innerHTML = '';

  Object.entries(STAT_CONFIG).forEach(([key, config]) => {
    const current = state.stats[key];
    const needed = expToNextLevel(current.level);
    const progress = Math.min((current.exp / needed) * 100, 100);

    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('[data-name]').textContent = config.label;
    card.querySelector('[data-level]').textContent = `LV ${current.level}`;
    card.querySelector('[data-fill]').style.width = `${progress}%`;
    card.querySelector('[data-caption]').textContent = `${current.exp}/${needed} EXP • ${config.description}`;
    container.appendChild(card);
  });
}

function renderQuests(state, onCompleteQuest) {
  const container = document.querySelector('#questList');
  const template = document.querySelector('#questItemTemplate');
  container.innerHTML = '';

  state.quests.forEach((quest) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.querySelector('[data-title]').textContent = quest.title;
    item.querySelector('[data-meta]').textContent = `${STAT_CONFIG[quest.category].label} • ${capitalize(quest.difficulty)} (+${DIFFICULTY_EXP[quest.difficulty]} EXP)`;

    const actionButton = item.querySelector('[data-action]');
    actionButton.disabled = quest.completed;
    actionButton.textContent = quest.completed ? 'Completed' : 'Complete';
    actionButton.addEventListener('click', () => onCompleteQuest(quest.id));

    if (quest.completed) {
      item.classList.add('is-complete');
    }

    container.appendChild(item);
  });
}
