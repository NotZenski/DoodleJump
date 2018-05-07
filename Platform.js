import Node from './Node';
import PlatformType from './constants/PlatformType';
import Settings from './constants/Settings';

let broken = 0;

class Platform extends Node {
  state = false;
  interacted = false;
  velocity = { x: 1, y: 0 };
  constructor({ app, textures, score }) {
    super(textures.platform_red);
    this.textures = textures;
    this.width = 70 * Settings.scale;
    this.height = 17 * Settings.scale;
    this.x = this.width / 2 + Math.random() * (app.renderer.width - this.width);

    //Setting the probability of which type of platforms should be shown
    if (score >= 5000) {
      this.types = [
        PlatformType.moving,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.vanishable,
        PlatformType.vanishable,
        PlatformType.vanishable,
        PlatformType.vanishable,
      ];
    } else if (score >= 2000 && score < 5000) {
      this.types = [
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.vanishable,
        PlatformType.vanishable,
        PlatformType.vanishable,
        PlatformType.vanishable,
      ];
    } else if (score >= 1000 && score < 2000) {
      this.types = [
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
      ];
    } else if (score >= 500 && score < 1000) {
      this.types = [
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.moving,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
        PlatformType.breakable,
      ];
    } else if (score >= 100 && score < 500) {
      this.types = [
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.normal,
        PlatformType.moving,
        PlatformType.moving,
      ];
    } else {
      this.types = [PlatformType.normal];
    }

    this.type = this.types[Math.floor(Math.random() * this.types.length)];

    if (this.type === PlatformType.breakable && broken < 1) {
      broken += 1;
    } else if (this.type === PlatformType.breakable && broken >= 1) {
      this.type = PlatformType.normal;
      broken = 0;
    }
  }

  reset = () => {
    this.y -= 12;
  };

  get type() {
    return this._type;
  }

  set type(value) {
    if (this._type === value) return;
    this._type = value;
    this.texture = this.textures[value];
  }
}

export default Platform;
