import { INTAKE_QUESTIONS } from '../data/content';

export default function IntakeScreen({ step, onAnswer }) {
  const question = INTAKE_QUESTIONS[step];
  if (!question) return null;

  return (
    <div className="intake-screen screen-enter">
      <div className="intake-card" key={question.id}>
        <p className="intake-card__step pixel-text">
          Question {step + 1} of {INTAKE_QUESTIONS.length}
        </p>

        <h2 className="intake-card__question">{question.text}</h2>

        <div className="intake-card__options" role="group" aria-label={question.text}>
          {question.options.map((opt) => (
            <button
              key={opt.id}
              className="intake-option"
              onClick={() => onAnswer(question.id, opt.id)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
