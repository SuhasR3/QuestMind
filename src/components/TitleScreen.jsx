import { DISCLAIMER_TEXT } from '../data/content';

export default function TitleScreen({ onStart, user, onSignOut }) {
  return (
    <div className="title-screen screen-enter">
      {user && onSignOut && (
        <div className="title-screen__session pixel-panel">
          <span className="title-screen__session-email">{user.email}</span>
          <button type="button" className="title-screen__sign-out" onClick={() => onSignOut()}>
            Sign out
          </button>
        </div>
      )}
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

        <p className="title-screen__disclaimer">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
