import { DISCLAIMER_TEXT } from '../data/content';

const DEV_QUESTS = ['fog_drake', 'the_weight', 'the_static', 'mirror_twin'];

export default function TitleScreen({ onStart, onDevQuest }) {
  return (
    <div className="title-screen screen-enter">
      <div className="title-screen__fog" aria-hidden="true">
        <div className="title-screen__fog-layer" />
        <div className="title-screen__fog-layer" />
        <div className="title-screen__fog-layer" />
      </div>

      <div className="title-screen__content">
        <h1 className="title-screen__logo">
          QUESTMIND
          <span>BATTLE</span>
        </h1>

        <p className="title-screen__tagline">
          A mental fitness experience.<br />
          Not therapy. Not about winning.<br />
          A game about practicing.
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
            <span className="dev-shortcuts__label">dev &rarr;</span>
            {DEV_QUESTS.map((id) => (
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
