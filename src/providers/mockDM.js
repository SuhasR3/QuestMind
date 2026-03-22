import {
  BEAT_INTROS,
  BEAT_ACTIONS,
  FIELD_NOTES,
  getDebriefForHistory,
  CRISIS_PATTERNS,
} from '../data/content';

export function checkCrisis(answers) {
  return CRISIS_PATTERNS.some((p) => answers.q1 === p.q1 && answers.q2 === p.q2);
}

export function getQuestStart() {
  return {
    phase: 'quest',
    narrative: BEAT_INTROS[0],
    choices: buildChoices(0),
    fieldNote: FIELD_NOTES[0],
    xp_delta: 0,
    technique_revealed: null,
    micro_action: null,
    crisis_signal: false,
  };
}

export function resolveAction(beat, actionId) {
  const action = BEAT_ACTIONS[beat]?.[actionId];
  if (!action) return null;
  return {
    narrative: action.narrative,
    threatDelta: action.threatDelta,
    xpDelta: action.xpDelta,
    effects: action.effects,
  };
}

export function getNextBeat(beat) {
  const nextBeat = beat + 1;
  if (nextBeat >= 3) return null;
  return {
    phase: 'quest',
    narrative: BEAT_INTROS[nextBeat],
    choices: buildChoices(nextBeat),
    fieldNote: FIELD_NOTES[nextBeat],
  };
}

export function getDebrief(choiceHistory) {
  const data = getDebriefForHistory(choiceHistory);
  return {
    phase: 'debrief',
    ...data,
    crisis_signal: false,
  };
}

function buildChoices(beat) {
  const actions = BEAT_ACTIONS[beat];
  return [
    { id: 'a', text: actions.a.label, description: actions.a.description },
    { id: 'b', text: actions.b.label, description: actions.b.description },
    { id: 'c', text: actions.c.label, description: actions.c.description },
  ];
}
