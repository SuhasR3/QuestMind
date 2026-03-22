export default function PlayerSprite({ actionEffect }) {
  const effectClass = actionEffect
    ? `player-sprite--${
        actionEffect === 'a' ? 'approach' : actionEffect === 'b' ? 'observe' : 'ground'
      }`
    : '';

  return (
    <div
      className={`player-sprite ${effectClass}`}
      role="img"
      aria-label="Player character"
    />
  );
}
