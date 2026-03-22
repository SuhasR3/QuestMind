import { DISCLAIMER_TEXT } from '../data/content';
import { useAnalytics } from '../hooks/useAnalytics';
import { useEffect, useRef } from 'react';

const DOMINANT_LABELS = {
  a: 'approach',
  b: 'observe',
  c: 'ground',
  mixed: 'mixed',
};

export default function DebriefScreen({ data, xp, onRestart }) {
  const { emit } = useAnalytics();
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current && data?.microAction) {
      emit('micro_action_viewed');
      tracked.current = true;
    }
  }, [data, emit]);

  if (!data) return null;

  const variant = DOMINANT_LABELS[data.dominant] || 'mixed';

  return (
    <div className="debrief-screen screen-enter">
      <div className="debrief-card pixel-panel">
        <div className="debrief-card__header">
          Quest Complete
          <div className="debrief-card__xp">+{xp} XP</div>
        </div>

        <h2 className={`debrief-card__technique debrief-card__technique--${variant}`}>
          You practiced: {data.technique}
        </h2>

        <p className="debrief-card__explanation">{data.explanation}</p>

        <div className="debrief-card__micro">
          <div className="debrief-card__micro-label">Your Micro-Action</div>
          <p className="debrief-card__micro-text">{data.microAction}</p>
        </div>

        <p className="debrief-card__source">{data.source}</p>

        {data.movesRecap && (
          <div className="moves-recap pixel-panel">
            <div className="moves-recap__title">Your Moves</div>
            {data.movesRecap.map((move) => (
              <div
                key={move.beat}
                className={`moves-recap__row ${move.correct ? 'moves-recap__row--correct' : 'moves-recap__row--wrong'}`}
              >
                <span className="moves-recap__beat">Beat {move.beat}</span>
                <span className="moves-recap__action">{move.actionLabel}</span>
                <span className="moves-recap__verdict">{move.correct ? '\u2713' : '\u2717'}</span>
                {!move.correct && (
                  <span className="moves-recap__note">{move.toast}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="debrief-card__actions">
          <button className="debrief-card__restart" onClick={onRestart} autoFocus>
            PLAY AGAIN
          </button>
          <span className="debrief-card__disclaimer">{DISCLAIMER_TEXT}</span>
        </div>
      </div>
    </div>
  );
}
