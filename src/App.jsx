import { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { useAuth } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';
import TitleScreen from './components/TitleScreen';
import IntakeScreen from './components/IntakeScreen';
import QuestIntroScreen from './components/QuestIntroScreen';
import BattleScreen from './components/battle/BattleScreen';
import DebriefScreen from './components/DebriefScreen';
import CrisisOverlay from './components/CrisisOverlay';

export default function App() {
  const { user, loading, signOut } = useAuth();
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
  const { ensurePlaying } = useBackgroundMusic();

  useEffect(() => {
    if (user) ensurePlaying();
  }, [user, ensurePlaying]);

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

  const handleStart = () => { ensurePlaying(); startGame(); };
  const handleDevQuest = (id) => { ensurePlaying(); setQuest(id); };
  const handleBattle = () => { ensurePlaying(); startBattle(); };

  return (
    <div className="app">
      {state.screen === 'title' && (
        <TitleScreen
          onStart={handleStart}
          onDevQuest={handleDevQuest}
          onInteract={ensurePlaying}
          user={user}
          onSignOut={signOut}
        />
      )}

      {state.screen === 'intake' && (
        <IntakeScreen step={state.intakeStep} onAnswer={answerIntake} />
      )}

      {state.screen === 'quest-intro' && (
        <QuestIntroScreen questId={state.activeQuest} onStart={handleBattle} />
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
