import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  autoResize: true,
  backgroundColor: "grey",
  resolution: window.devicePixelRatio || 1,
  width: window.innerWidth,
  height: window.innerHeight,
});
d3.select("#canvas-container").node().appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const colorFilter = new PIXI.filters.ColorMatrixFilter();
const blurFilter = new PIXI.filters.BlurFilter();
app.stage.filters = [colorFilter, blurFilter];

let imageSprite, maskSprite;
let initOffsetMultiplier;

const maxTime = 300;
let time = 0;

app.loader
  .add("background", "./assets/images/gritty_cover.png")
  .add("mask", "./assets/images/gritty_cover_mask.png")
  .load((loader, resources) => {
    imageSprite = new PIXI.Sprite(resources.background.texture);
    maskSprite = new PIXI.Sprite(resources.mask.texture);
    container.addChild(imageSprite);
    container.addChild(maskSprite);

    container.scale.x = setScale(0);
    container.scale.y = setScale(0);
    window.addEventListener("resize", resize);
    resize();
    container.y = setPos(0);
    animate();
  });

function animate() {
  app.ticker.add((delta) => {
    if (time < maxTime) {
      setTransformValues(time / maxTime);
    }
    time += delta;
  });
}

function setTransformValues(progress) {
  if (progress > 0.4) {
    const zoomProgress = 1 / (1 + Math.exp(-(progress - 0.7) * 50));
    const maskProgress = 1 - 1 / (1 + Math.exp(-(progress - 0.7) * 10));
    container.scale.x = setScale(zoomProgress);
    container.scale.y = setScale(zoomProgress);
    container.y = setPos(zoomProgress);
    maskSprite.alpha = maskProgress;
  } else {
    const inProgress = progress / 0.4;
    colorFilter.brightness(inProgress);
    blurFilter.blur = Math.max(0, 30 * (1 - inProgress - Math.random() * 0.4));
  }
}

function setScale(progress) {
  return 4 * (1 - progress) + progress;
}

function setPos(progress) {
  return (
    window.innerHeight *
    (initOffsetMultiplier * (1 - progress) + 0.5 * progress)
  );
}

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  setBackgroundDims();
}

function setBackgroundDims() {
  let containerWidth = window.innerWidth,
    containerHeight = window.innerHeight;
  container.pivot.x = containerWidth / 2 - 10;
  container.pivot.y = containerHeight / 2;
  container.x = containerWidth / 2;
  [imageSprite, maskSprite].forEach((sprite) => {
    let imageRatio = sprite.width / sprite.height,
      containerRatio = containerWidth / containerHeight;
    if (containerRatio > imageRatio) {
      sprite.height = containerHeight;
      sprite.width = containerHeight * imageRatio;
      sprite.position.x = (containerWidth - sprite.width) * 0.5;
      sprite.position.y = 0;
      initOffsetMultiplier = 1.5;
    } else {
      sprite.width = containerWidth;
      sprite.height = containerWidth / imageRatio;
      sprite.position.y = (containerHeight - sprite.height) * 0.5;
      sprite.position.x = 0;
      initOffsetMultiplier = 1;
    }
  });  
}
