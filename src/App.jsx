import { useGameState } from './hooks/useGameState';
import TitleScreen from './components/TitleScreen';
import IntakeScreen from './components/IntakeScreen';
import QuestIntroScreen from './components/QuestIntroScreen';
import BattleScreen from './components/battle/BattleScreen';
import DebriefScreen from './components/DebriefScreen';
import CrisisOverlay from './components/CrisisOverlay';

export default function App() {
  const {
    state,
    startGame,
    setQuest,
    startBattle,
    answerIntake,
    selectAction,
    dismissCrisis,
    restart,
  } = useGameState();

  return (
    <div className="app">
      {state.screen === 'title' && (
        <TitleScreen onStart={startGame} onDevQuest={setQuest} />
      )}

      {state.screen === 'intake' && (
        <IntakeScreen step={state.intakeStep} onAnswer={answerIntake} />
      )}

      {state.screen === 'quest-intro' && (
        <QuestIntroScreen questId={state.activeQuest} onStart={startBattle} />
      )}

      {state.screen === 'quest' && (
        <BattleScreen state={state} onAction={selectAction} />
      )}

      {state.screen === 'debrief' && (
        <DebriefScreen data={state.debriefData} xp={state.xpTotal} onRestart={restart} />
      )}

      {state.crisisMode && (
        <CrisisOverlay onDismiss={dismissCrisis} />
      )}
    </div>
  );
}
