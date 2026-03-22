import { useGameState } from './hooks/useGameState';
import TitleScreen from './components/TitleScreen';
import IntakeScreen from './components/IntakeScreen';
import BattleScreen from './components/battle/BattleScreen';
import DebriefScreen from './components/DebriefScreen';
import CrisisOverlay from './components/CrisisOverlay';

export default function App() {
  const {
    state,
    startGame,
    answerIntake,
    selectAction,
    dismissCrisis,
    restart,
  } = useGameState();

  return (
    <div className="app">
      {state.screen === 'title' && (
        <TitleScreen onStart={startGame} />
      )}

      {state.screen === 'intake' && (
        <IntakeScreen step={state.intakeStep} onAnswer={answerIntake} />
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
