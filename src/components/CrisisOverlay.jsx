import { CRISIS_RESOURCES } from '../data/content';

export default function CrisisOverlay({ onDismiss }) {
  return (
    <div className="crisis-overlay" role="alertdialog" aria-labelledby="crisis-title">
      <div className="crisis-card pixel-panel">
        <h2 id="crisis-title" className="crisis-card__title">
          {CRISIS_RESOURCES.title}
        </h2>

        <p className="crisis-card__message">{CRISIS_RESOURCES.message}</p>

        <div className="crisis-card__resources">
          {CRISIS_RESOURCES.resources.map((r) => (
            <div key={r.name} className="crisis-resource">
              <div className="crisis-resource__name">{r.name}</div>
              <div className="crisis-resource__action">{r.action}</div>
              <div className="crisis-resource__available">{r.available}</div>
            </div>
          ))}
        </div>

        <p className="crisis-card__footer">{CRISIS_RESOURCES.footer}</p>

        <button className="crisis-card__continue" onClick={onDismiss} autoFocus>
          CONTINUE TO QUEST
        </button>
      </div>
    </div>
  );
}
