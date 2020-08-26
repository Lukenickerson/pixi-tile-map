// eslint-disable-next-line import/extensions
import Spritesheet from './Spritesheet.js';

class PixiSpritesheet extends Spritesheet {
  constructor(options) {
    super(options);
    this.PIXI = options.PIXI;
    return this;
  }

  static parseTexture(document, texture, spriteDims, options) {
    const image = texture.baseTexture.resource.source;
    return PixiSpritesheet.parse(
      document,
      image,
      { x: texture.width, y: texture.height },
      spriteDims,
      options,
    );
  }

  static parseTextureIntoTextures(document, PIXI, texture, spriteDims, options) {
    const datas = PixiSpritesheet.parseTexture(document, texture, spriteDims, options);
    const textures = datas.map((imageData) => (
      PIXI.Texture.fromBuffer(imageData, spriteDims.x, spriteDims.y)
    ));
    return textures;
  }

  parseTextureIntoTextures(texture, spriteDims, options) {
    return PixiSpritesheet.parseTextureIntoTextures(
      this.doc, this.PIXI, texture, spriteDims, options,
    );
  }
}

export default PixiSpritesheet;
