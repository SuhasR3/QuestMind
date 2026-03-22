import { useReducer, useCallback, useRef, useEffect } from 'react';
import { checkCrisis, getQuestStart, resolveAction, getNextBeat, getDebrief } from '../providers/mockDM';
import { BEAT_INTROS, FIELD_NOTES } from '../data/content';
import { useAnalytics } from './useAnalytics';

const INITIAL_STATE = {
  screen: 'title',
  intakeStep: 0,
  intakeAnswers: {},
  beat: 0,
  choices: [],
  choiceHistory: [],
  currentNarrative: '',
  fieldNote: '',
  threat: 72,
  playerPosition: 0,
  drakeScale: 1.0,
  drakeOpacity: 1.0,
  crisisMode: false,
  debriefData: null,
  transitioning: false,
  xpTotal: 0,
  battleLog: [],
  actionEffect: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...INITIAL_STATE, screen: 'intake', intakeStep: 0 };

    case 'ANSWER_INTAKE': {
      const newAnswers = { ...state.intakeAnswers, [action.qId]: action.aId };
      const newStep = state.intakeStep + 1;

      if (newStep >= 2) {
        const crisis = checkCrisis(newAnswers);
        const quest = getQuestStart();
        return {
          ...state,
          intakeAnswers: newAnswers,
          intakeStep: newStep,
          screen: 'quest',
          crisisMode: crisis,
          beat: 0,
          choices: quest.choices,
          currentNarrative: quest.narrative,
          fieldNote: quest.fieldNote,
          battleLog: [quest.narrative],
        };
      }
      return { ...state, intakeAnswers: newAnswers, intakeStep: newStep };
    }

    case 'SELECT_ACTION': {
      if (state.transitioning) return state;
      const result = resolveAction(state.beat, action.actionId);
      if (!result) return state;
      return {
        ...state,
        transitioning: true,
        actionEffect: action.actionId,
        choiceHistory: [...state.choiceHistory, action.actionId],
        threat: Math.max(0, state.threat + result.threatDelta),
        playerPosition: state.playerPosition + (result.effects.playerShift || 0),
        drakeScale: Math.max(0.2, state.drakeScale + (result.effects.drakeScale || 0)),
        drakeOpacity: Math.max(0.15, state.drakeOpacity + (result.effects.drakeOpacity || 0)),
        xpTotal: state.xpTotal + result.xpDelta,
        currentNarrative: result.narrative,
        battleLog: [...state.battleLog, result.narrative],
      };
    }

    case 'ADVANCE_BEAT': {
      const newBeat = state.beat + 1;
      if (newBeat >= 3) {
        const debrief = getDebrief(state.choiceHistory);
        return {
          ...state,
          beat: newBeat,
          transitioning: false,
          actionEffect: null,
          screen: 'debrief',
          debriefData: debrief,
        };
      }
      const next = getNextBeat(state.beat);
      return {
        ...state,
        beat: newBeat,
        transitioning: false,
        actionEffect: null,
        choices: next.choices,
        currentNarrative: next.narrative,
        fieldNote: next.fieldNote,
        battleLog: [...state.battleLog, next.narrative],
      };
    }

    case 'TRIGGER_CRISIS':
      return { ...state, crisisMode: true };

    case 'DISMISS_CRISIS':
      return { ...state, crisisMode: false };

    case 'RESTART':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const transitionTimer = useRef(null);
  const actionLock = useRef(false);
  const { emit } = useAnalytics();

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
    emit('session_started');
  }, [emit]);

  const answerIntake = useCallback(
    (qId, aId) => {
      dispatch({ type: 'ANSWER_INTAKE', qId, aId });
    },
    []
  );

  const selectAction = useCallback(
    (actionId) => {
      if (actionLock.current) return;
      actionLock.current = true;

      dispatch({ type: 'SELECT_ACTION', actionId });
      emit('action_selected', { action: actionId });

      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        actionLock.current = false;
        dispatch({ type: 'ADVANCE_BEAT' });
      }, 1600);
    },
    [emit]
  );

  const triggerCrisis = useCallback(() => {
    dispatch({ type: 'TRIGGER_CRISIS' });
    emit('crisis_signal_triggered');
  }, [emit]);

  const dismissCrisis = useCallback(() => {
    dispatch({ type: 'DISMISS_CRISIS' });
  }, []);

  const restart = useCallback(() => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    actionLock.current = false;
    dispatch({ type: 'RESTART' });
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (state.screen === 'quest' && state.beat > 0 && !state.transitioning) {
      emit('beat_completed', { beat: state.beat });
    }
  }, [state.beat, state.screen, state.transitioning, emit]);

  useEffect(() => {
    if (state.screen === 'quest' && state.beat === 0 && state.choices.length > 0) {
      emit('intake_completed');
    }
  }, [state.screen, state.beat, state.choices.length, emit]);

  useEffect(() => {
    if (state.screen === 'debrief') {
      emit('debrief_viewed');
      emit('session_completed');
    }
  }, [state.screen, emit]);

  return {
    state,
    startGame,
    answerIntake,
    selectAction,
    triggerCrisis,
    dismissCrisis,
    restart,
  };
}
