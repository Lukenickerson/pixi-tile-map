// Reusable helpers for drag and zoom events in Pixi js
const AXES = ['x', 'y']; // working in 2 dimensions
const MIN_SCALE = 0.01;
const MAX_SCALE = 500;

// Note: mutates the display object
function addDragEvents(obj) {
  let startPos = null;
  const ogPos = { x: 0, y: 0 };

  const getEventPoint = (c, event) => event.data.getLocalPosition(c.parent);

  function onDragStart(event) {
    startPos = getEventPoint(this, event);
    AXES.forEach((axis) => { ogPos[axis] = this.position[axis]; });
  }

  function onDragEnd() {
    startPos = null;
  }

  function onDragMove(event) {
    if (!startPos) { return; }
    const eventPoint = getEventPoint(this, event);
    AXES.forEach((axis) => {
      const delta = eventPoint[axis] - startPos[axis];
      this.position[axis] = ogPos[axis] + delta;
    });
  }

  obj.interactive = true; // eslint-disable-line no-param-reassign
  obj.buttonMode = true; // eslint-disable-line no-param-reassign
  obj
    // Drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // Drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // Move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);
}

function zoom(obj, deltaScale) {
  const originalScale = obj.scale.x; // assume x and y scales are always the same
  const newScale = Math.min(Math.max(originalScale + deltaScale, MIN_SCALE), MAX_SCALE);
  const originalSize = { x: obj.width, y: obj.height };
  const newPos = {}; // populated below
  AXES.forEach((axis) => {
    const originalUnscaledSize = originalSize[axis] / originalScale;
    const newSize = originalUnscaledSize * newScale;
    const offset = (originalSize[axis] - newSize) / 2;
    newPos[axis] = obj.position[axis] + offset;
  });
  obj.setTransform(newPos.x, newPos.y, newScale, newScale);
}

export default { addDragEvents, zoom };
