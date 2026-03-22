import PlayerSprite from '../sprites/PlayerSprite';
import DrakeSprite from '../sprites/DrakeSprite';

export default function BattleStage({
  playerPosition,
  drakeScale,
  drakeOpacity,
  actionEffect,
  beat,
}) {
  const playerLeft = 12 + playerPosition * 6;
  const defeated = beat >= 3;

  const flashClass = actionEffect
    ? `battle-stage__flash battle-stage__flash--${
        actionEffect === 'a' ? 'approach'
        : actionEffect === 'b' ? 'observe'
        : 'ground'
      }`
    : '';

  return (
    <div className="battle-stage">
      <div className="battle-stage__fog-1" aria-hidden="true" />
      <div className="battle-stage__fog-2" aria-hidden="true" />
      <div className="battle-stage__fog-3" aria-hidden="true" />
      <div className="battle-stage__ground" aria-hidden="true" />

      {actionEffect && (
        <div className={flashClass} key={`flash-${beat}-${actionEffect}`} aria-hidden="true" />
      )}

      <div
        className="battle-stage__player"
        style={{ left: `${playerLeft}%` }}
      >
        <PlayerSprite actionEffect={actionEffect} />
      </div>

      <div
        className="battle-stage__drake"
        style={{
          transform: `scale(${drakeScale})`,
          opacity: drakeOpacity,
        }}
      >
        <DrakeSprite
          scale={1}
          opacity={1}
          defeated={defeated}
        />
      </div>
    </div>
  );
}
