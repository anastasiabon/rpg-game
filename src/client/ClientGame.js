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
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.world;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  onKeyDown(dCol, dRow, dir) {
    return (keydown) => {
      if (keydown && this.player && this.player.motionProgress === 1) {
        const canMove = this.player.moveByCellCoord(dCol, dRow, (cell) => cell.findObjectsByType('grass').length);

        if (canMove) {
          this.player.setState(dir);
          this.player.once('motion-stopped', () => this.player.setState('main'));
        }
      }
    };
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: this.onKeyDown(-1, 0, 'left'),
      ArrowRight: this.onKeyDown(1, 0, 'right'),
      ArrowDown: this.onKeyDown(0, 1, 'down'),
      ArrowUp: this.onKeyDown(0, -1, 'up'),
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}
