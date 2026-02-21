import { DIFFICULTY_EXP } from './models.js';
import { completeQuest } from './progression.js';
import { initializeState, updateState } from './state.js';
import { renderDashboard } from './ui.js';

let state = initializeState();

setupForm();
setupReset();
runDailyResetIfNeeded();
refreshUI();

function refreshUI() {
  renderDashboard(state, (questId) => {
    state = updateState(state, (draft) => completeQuest(draft, questId));
    refreshUI();
  });
}

function setupForm() {
  const form = document.querySelector('#questForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const quest = {
      id: `custom-${crypto.randomUUID()}`,
      title: String(data.get('title')).trim(),
      category: String(data.get('category')),
      difficulty: String(data.get('difficulty')),
      completed: false,
      createdAt: new Date().toISOString()
    };

    if (!quest.title || !DIFFICULTY_EXP[quest.difficulty]) {
      return;
    }

    state = updateState(state, (draft) => {
      draft.quests.unshift(quest);
      return draft;
    });

    form.reset();
    refreshUI();
  });
}

function setupReset() {
  const button = document.querySelector('#resetDayBtn');

  button.addEventListener('click', () => {
    state = updateState(state, (draft) => {
      draft.quests = draft.quests.map((quest) => ({ ...quest, completed: false }));
      draft.lastResetDate = new Date().toDateString();
      return draft;
    });

    refreshUI();
  });
}

function runDailyResetIfNeeded() {
  const today = new Date().toDateString();

  if (state.lastResetDate === today) {
    return;
  }

  state = updateState(state, (draft) => {
    draft.quests = draft.quests.map((quest) => ({ ...quest, completed: false }));
    draft.lastResetDate = today;
    return draft;
  });
}
