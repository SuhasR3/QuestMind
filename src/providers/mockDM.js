import { QUESTS, getDebriefForHistory } from '../data/content';

const CRISIS_PATTERNS = [
  { q1: 'frozen', q2: 'freeze' },
  { q1: 'stormy', q2: 'freeze' },
];

export function checkCrisis(answers) {
  return CRISIS_PATTERNS.some((p) => answers.q1 === p.q1 && answers.q2 === p.q2);
}

export function getQuestStart(questId = 'fog_drake') {
  const quest = QUESTS[questId];
  const beat = quest.beats[0];
  return {
    phase: 'quest',
    narrative: beat.intro,
    choices: buildChoices(quest, 0),
    fieldNote: beat.fieldNote,
    xp_delta: 0,
    crisis_signal: false,
  };
}

export function resolveAction(questId, beat, actionId) {
  const quest = QUESTS[questId];
  const action = quest.beats[beat]?.actions[actionId];
  if (!action) return null;
  return {
    narrative: action.narrative,
    toast: action.toast,
    threatDelta: action.threatDelta,
    xpDelta: action.xpDelta,
    effects: action.effects,
    correct: action.correct,
  };
}

export function getNextBeat(questId, beat) {
  const quest = QUESTS[questId];
  const nextBeat = beat + 1;
  if (nextBeat >= 3) return null;
  const beatData = quest.beats[nextBeat];
  return {
    phase: 'quest',
    narrative: beatData.intro,
    choices: buildChoices(quest, nextBeat),
    fieldNote: beatData.fieldNote,
  };
}

export function getDebrief(questId, choiceHistory) {
  const quest = QUESTS[questId];

  if (quest.debrief) {
    const movesRecap = quest.hasWrongMove
      ? choiceHistory.map((actionId, beatIdx) => {
          const beat = quest.beats[beatIdx];
          const action = beat?.actions[actionId];
          return {
            beat: beatIdx + 1,
            actionLabel: action?.label || actionId,
            correct: action?.correct ?? true,
            toast: action?.toast || '',
          };
        })
      : null;

    return {
      phase: 'debrief',
      ...quest.debrief,
      movesRecap,
    };
  }

  const data = getDebriefForHistory(choiceHistory);
  return { phase: 'debrief', ...data, movesRecap: null };
}

function buildChoices(quest, beatIdx) {
  const beat = quest.beats[beatIdx];
  return ['a', 'b', 'c'].map((id) => ({
    id,
    text: beat.actions[id].label,
    description: beat.actions[id].description,
  }));
}
