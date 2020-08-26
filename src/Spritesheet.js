// Spritesheet methods

class Spritesheet {
  constructor(options = {}) {
    this.doc = options.document;
    return this;
  }

  static makeCanvas(document, dims) {
    const canvas = document.createElement('canvas');
    canvas.width = dims.x;
    canvas.height = dims.y;
    const ctx = canvas.getContext('2d');
    // document.body.appendChild(canvas);
    return { canvas, ctx };
  }

  static getImage(data, dest, dims) {
    dest.ctx.clearRect(0, 0, dims.x, dims.y);
    dest.ctx.putImageData(data, 0, 0);
    const src = dest.canvas.toDataURL();
    const img = new Image();
    img.src = src;
    return img;
  }

  static parse(doc, image, sheetDims, spriteDims, options = {}) {
    const { asImage } = options;
    const source = Spritesheet.makeCanvas(doc, sheetDims);
    const dest = (asImage) ? Spritesheet.makeCanvas(doc, spriteDims) : null;
    const images = [];
    source.ctx.clearRect(0, 0, sheetDims.x, sheetDims.y);
    source.ctx.drawImage(image, 0, 0);

    for (let y = 0; y < sheetDims.y; y += spriteDims.y) {
      for (let x = 0; x < sheetDims.x; x += spriteDims.x) {
        const data = source.ctx.getImageData(x, y, spriteDims.x, spriteDims.y);
        images.push((asImage) ? Spritesheet.getImage(data, dest, spriteDims) : data);
      }
    }
    return images;
  }

  makeCanvas(dims) {
    return Spritesheet.makeCanvas(this.document, dims);
  }

  parse(image, sheetDims, spriteDims, options) {
    return Spritesheet.parse(this.document, image, sheetDims, spriteDims, options);
  }
}

export default Spritesheet;
