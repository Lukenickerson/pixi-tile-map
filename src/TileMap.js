const NOOP = () => {};

class TileMap {
  constructor(data = [], tileSize = 0) {
    this.data = data; // A 2-dimensional array of integers for sprite indices
    this.tileSize = tileSize;
  }

  static getMapSize(data = [], tileSize = 0) {
    return {
      x: data[0].length * tileSize,
      y: data.length * tileSize,
    };
  }

  static loopOverMap(data = [], callback = NOOP, tileSize = 0) {
    let y = 0;
    data.forEach((row) => {
      let x = 0;
      row.forEach((spriteIndex) => {
        callback(spriteIndex, { x, y });
        x += tileSize;
      });
      y += tileSize;
    });
  }

  getSize() {
    return TileMap.getMapSize(this.data, this.tileSize);
  }

  forEach(callback = NOOP) {
    return TileMap.loopOverMap(this.data, callback, this.tileSize);
  }
}

export default TileMap;
