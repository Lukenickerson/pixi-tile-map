// import * as PIXI from 'pixi.js'
import PixiSpritesheet from './PixiSpritesheet.js'; // eslint-disable-line import/extensions
import TileMap from './TileMap.js'; // eslint-disable-line import/extensions
import pixiEvents from './pixi-events.js'; // eslint-disable-line import/extensions

const { PIXI, document } = window;
if (PIXI === undefined) { alert('PIXI not found on window.'); } // eslint-disable-line no-alert
if (document === undefined) { alert('No document on window.'); } // eslint-disable-line no-alert

const CONTAINER_ID = 'pixi-view';
const MAP_URL = './assets/map.json';
const SPRITESHEET_URL = './assets/world-spritesheet.png';
const SPRITE_SIZE = 16; // sprites are square
const SPRITE_DIMS = Object.freeze({ x: SPRITE_SIZE, y: SPRITE_SIZE });
const ZOOM_MULTIPLIER = -0.0015;

function makePixiApp(id = CONTAINER_ID) {
  const containerElt = document.getElementById(id);
  const app = new PIXI.Application({
    width: containerElt.offsetWidth,
    height: containerElt.offsetHeight,
    transparent: true,
    antialias: false,
  });
  PIXI.settings.ROUND_PIXELS = true;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  containerElt.appendChild(app.view);
  return app;
}

function loadDOM() {
  return new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve));
}

function loadResources() {
  return new Promise((resolve, reject) => {
    const loader = new PIXI.Loader();
    loader
      .add('spritesheet', SPRITESHEET_URL)
      .add('map', MAP_URL)
      .load((_, resources) => resolve(resources))
      .onError.add(reject);
  });
}

function makeTileContainer(mapSize) {
  const tileContainer = new PIXI.Container();
  tileContainer.x = 0;
  tileContainer.y = 0;
  tileContainer.width = mapSize.x;
  tileContainer.height = mapSize.y;
  pixiEvents.addDragEvents(tileContainer);
  return tileContainer;
}

function makeSprite(texture, { x, y }) {
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.set(0.5, 0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;
  return sprite;
}

// Note: mutates tileContainer
function populateTileContainer(tileContainer, map, spritesheetTexture) {
  const textures = (new PixiSpritesheet({ document, PIXI }))
    .parseTextureIntoTextures(spritesheetTexture, SPRITE_DIMS);

  map.forEach((spriteIndex, coords) => {
    tileContainer.addChild(makeSprite(textures[spriteIndex], coords));
  });
}

function setupZoom(displayObject) {
  window.addEventListener('wheel', (event) => {
    pixiEvents.zoom(displayObject, event.deltaY * ZOOM_MULTIPLIER);
  });
}

async function init() {
  await loadDOM();
  // Create the pixi app and load resources
  const app = makePixiApp();
  const resources = await loadResources();

  // Setup the map data
  const map = new TileMap(resources.map.data, SPRITE_SIZE);

  // Setup the tile container - with map data and move events
  const tileContainer = makeTileContainer(map.getSize());
  app.stage.addChild(tileContainer);
  populateTileContainer(tileContainer, map, resources.spritesheet.texture);
  // ...and the ability to zoom with mouse wheel
  setupZoom(tileContainer);
}

init();
