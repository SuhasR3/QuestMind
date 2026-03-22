import { useState } from 'react';
import { DISCLAIMER_TEXT } from '../data/content';

const DEV_QUESTS = ['fog_drake', 'the_weight', 'the_static', 'mirror_twin'];

export default function TitleScreen({ onStart, onDevQuest }) {
  const [devMode, setDevMode] = useState(false);

  return (
    <div className="title-screen screen-enter">
      <img
        src="/logo.png"
        alt=""
        className="title-screen__bg"
        draggable="false"
      />

      <div className="title-screen__scrim" aria-hidden="true" />

      <div className="title-screen__overlay">
        <p className="title-screen__tagline">
          A mental fitness experience. Not therapy. Not about winning. A game about practicing.
        </p>

        <button
          className="title-screen__start"
          onClick={onStart}
          autoFocus
        >
          BEGIN QUEST
        </button>

        {onDevQuest && (
          <div className="dev-shortcuts">
            <button
              className="dev-toggle-btn"
              onClick={() => setDevMode((v) => !v)}
            >
              {devMode ? '✕ close dev' : '⚙ dev mode'}
            </button>

            {devMode && DEV_QUESTS.map((id) => (
              <button
                key={id}
                className="dev-shortcut-btn"
                onClick={() => onDevQuest(id)}
              >
                {id.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        )}

        <p className="title-screen__disclaimer">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
