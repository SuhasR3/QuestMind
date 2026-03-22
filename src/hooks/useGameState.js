import { useReducer, useCallback, useRef, useEffect } from 'react';
import { checkCrisis, getQuestStart, resolveAction, getNextBeat, getDebrief } from '../providers/mockDM';
import { QUESTS } from '../data/content';
import { useAnalytics } from './useAnalytics';

const INITIAL_STATE = {
  screen: 'title',
  intakeStep: 0,
  intakeAnswers: {},
  activeQuest: 'fog_drake',
  questName: 'FOG DRAKE',
  questLevel: 'Lv.03',
  beat: 0,
  choices: [],
  choiceHistory: [],
  choiceResults: [],
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
  correctCount: 0,
  battleLog: [],
  actionEffect: null,
  toastMessage: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...INITIAL_STATE, screen: 'intake', intakeStep: 0 };

    case 'SET_QUEST': {
      const quest = QUESTS[action.questId];
      if (!quest) return state;
      return {
        ...INITIAL_STATE,
        activeQuest: action.questId,
        questName: quest.name,
        questLevel: quest.level,
        screen: 'quest-intro',
      };
    }

    case 'START_BATTLE': {
      const questStart = getQuestStart(state.activeQuest);
      return {
        ...state,
        screen: 'quest',
        beat: 0,
        choices: questStart.choices,
        currentNarrative: questStart.narrative,
        fieldNote: questStart.fieldNote,
        battleLog: [questStart.narrative],
      };
    }

    case 'ANSWER_INTAKE': {
      const newAnswers = { ...state.intakeAnswers, [action.qId]: action.aId };
      const newStep = state.intakeStep + 1;

      if (newStep >= 2) {
        const crisis = checkCrisis(newAnswers);
        const quest = QUESTS[state.activeQuest];
        return {
          ...state,
          intakeAnswers: newAnswers,
          intakeStep: newStep,
          screen: 'quest-intro',
          crisisMode: crisis,
          questName: quest.name,
          questLevel: quest.level,
        };
      }
      return { ...state, intakeAnswers: newAnswers, intakeStep: newStep };
    }

    case 'SELECT_ACTION': {
      if (state.transitioning) return state;
      const result = resolveAction(state.activeQuest, state.beat, action.actionId);
      if (!result) return state;
      const isCorrect = result.correct !== false;
      return {
        ...state,
        transitioning: true,
        actionEffect: action.actionId,
        choiceHistory: [...state.choiceHistory, action.actionId],
        choiceResults: [...state.choiceResults, {
          beat: state.beat + 1,
          actionId: action.actionId,
          correct: isCorrect,
          toast: result.toast || '',
        }],
        threat: Math.max(0, Math.min(100, state.threat + result.threatDelta)),
        playerPosition: state.playerPosition + (result.effects.playerShift || 0),
        drakeScale: Math.max(0.2, Math.min(1.5, state.drakeScale + (result.effects.drakeScale || 0))),
        drakeOpacity: Math.max(0.15, Math.min(1.2, state.drakeOpacity + (result.effects.drakeOpacity || 0))),
        xpTotal: state.xpTotal + result.xpDelta,
        correctCount: state.correctCount + (isCorrect ? 1 : 0),
        currentNarrative: result.narrative,
        toastMessage: result.toast || '',
        battleLog: [...state.battleLog, result.narrative],
      };
    }

    case 'ADVANCE_BEAT': {
      const newBeat = state.beat + 1;
      if (newBeat >= 3) {
        const debrief = getDebrief(state.activeQuest, state.choiceHistory);
        return {
          ...state,
          beat: newBeat,
          transitioning: false,
          actionEffect: null,
          toastMessage: '',
          screen: 'debrief',
          debriefData: debrief,
        };
      }
      const next = getNextBeat(state.activeQuest, state.beat);
      return {
        ...state,
        beat: newBeat,
        transitioning: false,
        actionEffect: null,
        toastMessage: '',
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

  const setQuest = useCallback((questId) => {
    dispatch({ type: 'SET_QUEST', questId });
  }, []);

  const startBattle = useCallback(() => {
    dispatch({ type: 'START_BATTLE' });
  }, []);

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
    setQuest,
    startBattle,
    answerIntake,
    selectAction,
    triggerCrisis,
    dismissCrisis,
    restart,
  };
}
