import worldCfg from '../configs/world.json';

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    const { map } = worldCfg;

    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0][0]],
          frame: 0,
          x: x * 48,
          y: y * 48,
          w: 48,
          h: 48,
        });
      });
    });
  }
}

export default ClientWorld;
