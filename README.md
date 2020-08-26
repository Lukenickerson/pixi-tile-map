# Tile Map Renderer in Pixi.js
*Exercise to build a small tile map renderer*

Try it out: https://lukenickerson.github.io/pixi-tile-map/ |

---

## Contents

### JS Code

* `tile-map-renderer` - the main file which loads the assets, assembles the tile map, etc. This will automatically run the `init` function when the file is loaded.
* `PixiSpritesheet` - a class for parsing a spritesheet texture into multiple textures
* `Spritesheet` - basic functionality for parsing a spritesheet (not specific to pixi)
* `TileMap` - a class for handling the specific tile map data format
* `pixi-events` - some helper methods for zooming and dragging pixi objects
* `mirror` - webcam mirror (completely unrelated)

### Assets

* `world-spritesheet.png` - image containing many 16x16 tiles
* `map.json` - data for the map, containing indices that align with the spritesheet

### Other

* `pixi.js` version 5.3.3 is loaded from a CDN
* A barebones `index.html` and `example.css` just provide a full-screen canvas and load the necessary scripts.

---

## Exercise Goals

### Essential

- [x] Load and parse sprites and tile world data
- [x] Render tiles based on map
- [x] Move the camera to scroll the world

### Extra

- [x] Zoom camera
- [ ] Culling and optimization
- [ ] Build w/ webpack
- [ ] Self-contained server https://www.npmjs.com/package/http-server
- [x] Webcam mirror (just for fun)
