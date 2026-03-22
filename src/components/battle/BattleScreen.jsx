import { useRef, useEffect } from 'react';
import BattleStage from './BattleStage';
import ActionCards from './ActionCards';

function threatColor(value) {
  if (value > 55) return '#d94040';
  if (value > 30) return '#e8c832';
  return '#2db87a';
}

export default function BattleScreen({ state, onAction }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.battleLog.length]);

  return (
    <div className="battle-screen">
      {/* ─── Enemy HUD (top-left) ─── */}
      <div className="enemy-hud pixel-panel">
        <div className="enemy-hud__header">
          <div className="enemy-hud__name">
            {state.questName} <span>{state.questLevel}</span>
          </div>
          <div className="enemy-hud__beat">
            Beat {Math.min(state.beat + 1, 3)}/3
          </div>
        </div>
        <div className="threat-meter" role="progressbar" aria-valuenow={state.threat} aria-valuemin={0} aria-valuemax={100} aria-label="Threat level">
          <div
            className="threat-meter__fill"
            style={{
              width: `${state.threat}%`,
              backgroundColor: threatColor(state.threat),
            }}
          />
        </div>
        <div className="threat-meter__label">
          THREAT {state.threat > 55 ? 'HIGH' : state.threat > 30 ? 'MODERATE' : 'LOW'}
        </div>
      </div>

      {/* ─── Battle Log (top-right) ─── */}
      <div className="battle-log pixel-panel">
        <div className="battle-log__title">Battle Log</div>
        {state.battleLog.map((entry, i) => (
          <div key={i} className="battle-log__entry">
            {entry}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* ─── Battle Stage (center) ─── */}
      <BattleStage
        playerPosition={state.playerPosition}
        drakeScale={state.drakeScale}
        drakeOpacity={state.drakeOpacity}
        actionEffect={state.actionEffect}
        beat={state.beat}
        questId={state.activeQuest}
      />

      {/* ─── Field Note (bottom-left) ─── */}
      <div className="field-note pixel-panel">
        <div className="field-note__label">Field Note</div>
        <p className="field-note__text">{state.fieldNote}</p>
      </div>

      {/* ─── Action Area (bottom-right) ─── */}
      <div className="action-area">
        {state.toastMessage && (
          <div
            key={`toast-${state.beat}-${state.actionEffect}`}
            className="technique-toast pixel-panel"
          >
            {state.toastMessage}
          </div>
        )}
        <ActionCards
          key={state.beat}
          choices={state.choices}
          onAction={onAction}
          disabled={state.transitioning}
        />
      </div>
    </div>
  );
}
