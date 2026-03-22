import { QUESTS } from '../data/content';

export default function QuestIntroScreen({ questId, onStart }) {
  const quest = QUESTS[questId];
  if (!quest) return null;

  return (
    <div className="quest-intro-screen screen-enter">
      <div className="quest-intro__domain pixel-text">{quest.cbtLabel}</div>
      <div className="quest-intro__name pixel-panel">{quest.name}</div>
      <div className="quest-intro__level pixel-text">{quest.level}</div>
      <p className="quest-intro__lore">{quest.lore}</p>
      <button className="btn-primary" onClick={onStart} autoFocus>
        Enter Battle
      </button>
    </div>
  );
}
