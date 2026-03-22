import { ACTION_LABELS } from '../../data/content';

const CARD_VARIANTS = {
  a: 'approach',
  b: 'observe',
  c: 'ground',
};

export default function ActionCards({ choices, onAction, disabled }) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="action-menu pixel-panel">
      <div className="action-menu__label">Choose Your Action</div>
      {choices.map((choice) => {
        const variant = CARD_VARIANTS[choice.id];
        return (
          <button
            key={choice.id}
            className={`action-card action-card--${variant} action-card--enter`}
            onClick={() => onAction(choice.id)}
            disabled={disabled}
            aria-label={`${ACTION_LABELS[choice.id]}: ${choice.text} — ${choice.description}`}
          >
            <span className="action-card__type">
              {ACTION_LABELS[choice.id]}
            </span>
            <span className="action-card__info">
              <span className="action-card__name">{choice.text}</span>
              <span className="action-card__desc">{choice.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
