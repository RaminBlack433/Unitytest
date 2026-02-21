import { createInitialState } from './models.js';
import { loadState, saveState } from './storage.js';

export function initializeState() {
  return loadState() ?? createInitialState();
}

export function updateState(state, updater) {
  const nextState = updater(structuredClone(state));
  saveState(nextState);
  return nextState;
}
