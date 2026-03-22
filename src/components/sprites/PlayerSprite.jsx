export default function PlayerSprite({ actionEffect, questId }) {
  const effectClass = actionEffect
    ? `player-sprite--${
        actionEffect === 'a' ? 'approach' : actionEffect === 'b' ? 'observe' : 'ground'
      }`
    : '';

  const variantClass =
    questId === 'fog_drake' ? 'player-sprite--drake'
    : questId === 'the_weight' ? 'player-sprite--weight'
    : '';

  return (
    <div
      className={`player-sprite ${variantClass} ${effectClass}`}
      role="img"
      aria-label="Player character"
    />
  );
}
