import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

export default class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  onKeyDown(dCol, dRow) {
    return (keydown) => {
      if (keydown) {
        this.player.moveByCellCoord(dCol, dRow, (cell) => cell.findObjectsByType('grass').length);
      }
    };
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: this.onKeyDown(-1, 0),
      ArrowRight: this.onKeyDown(1, 0),
      ArrowDown: this.onKeyDown(0, 1),
      ArrowUp: this.onKeyDown(0, -1),
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}
