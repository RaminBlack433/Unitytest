export const STAT_CONFIG = {
  health: { label: 'Health', description: 'Energy, recovery, and physical consistency.' },
  discipline: { label: 'Discipline', description: 'Willpower and habit consistency.' },
  money: { label: 'Money Management', description: 'Financial control and long-term planning.' },
  productivity: { label: 'Productivity', description: 'Output quality and deep focus.' }
};

export const DIFFICULTY_EXP = {
  easy: 10,
  medium: 20,
  hard: 35
};

export const STARTER_QUESTS = [
  { title: '10-minute mobility routine', category: 'health', difficulty: 'easy' },
  { title: 'No social media until noon', category: 'discipline', difficulty: 'medium' },
  { title: 'Review expenses for today', category: 'money', difficulty: 'medium' },
  { title: 'Finish one deep work sprint', category: 'productivity', difficulty: 'hard' }
];

export function createInitialState() {
  const stats = Object.keys(STAT_CONFIG).reduce((acc, key) => {
    acc[key] = { level: 1, exp: 0 };
    return acc;
  }, {});

  const quests = STARTER_QUESTS.map((quest, index) => ({
    id: `starter-${index + 1}`,
    ...quest,
    completed: false,
    createdAt: new Date().toISOString()
  }));

  return {
    player: {
      alias: 'Operator',
      level: 1,
      totalExp: 0
    },
    stats,
    quests,
    lastResetDate: new Date().toDateString()
  };
}
