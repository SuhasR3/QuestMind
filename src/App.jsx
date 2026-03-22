import { useGameState } from './hooks/useGameState';
import { useAuth } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';
import TitleScreen from './components/TitleScreen';
import IntakeScreen from './components/IntakeScreen';
import BattleScreen from './components/battle/BattleScreen';
import DebriefScreen from './components/DebriefScreen';
import CrisisOverlay from './components/CrisisOverlay';

export default function App() {
  const { user, loading, signOut } = useAuth();
  const {
    state,
    startGame,
    answerIntake,
    selectAction,
    dismissCrisis,
    restart,
  } = useGameState();

  if (loading) {
    return (
      <div className="app app--loading">
        <p className="app-loading-text">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <AuthScreen />
      </div>
    );
  }

  return (
    <div className="app">
      {state.screen === 'title' && (
        <TitleScreen onStart={startGame} user={user} onSignOut={signOut} />
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
