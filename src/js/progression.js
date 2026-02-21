import { DIFFICULTY_EXP } from './models.js';

export function expToNextLevel(level) {
  return 60 + (level - 1) * 25;
}

export function addExpToTrack(track, expGain) {
  let level = track.level;
  let exp = track.exp + expGain;

  while (exp >= expToNextLevel(level)) {
    exp -= expToNextLevel(level);
    level += 1;
  }

  return { level, exp };
}

export function completeQuest(state, questId) {
  const quest = state.quests.find((item) => item.id === questId);

  if (!quest || quest.completed) {
    return state;
  }

  const expGain = DIFFICULTY_EXP[quest.difficulty];
  quest.completed = true;

  state.player.totalExp += expGain;
  state.player = addExpToTrack(state.player, expGain);
  state.stats[quest.category] = addExpToTrack(state.stats[quest.category], expGain);

  return state;
}
