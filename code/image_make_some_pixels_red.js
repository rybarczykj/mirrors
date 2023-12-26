// const { fill } = require("core-js/core/array");

let BIGGEST_PIXEL_RATIO = 0.01;
let SMALLEST_PIXEL_RATIO = 0.8;

let BIGGEST_PIXEL = 5;
let SMALLEST_PIXEL = 5;

let img;

const palate = ['black', 'white'];
const colors = palate.length;
const binsize = 255 / colors;

const THRESH = 30;

function preload() {
  img = loadImage('images/_.jpeg');
}

// function mouseMoved() {
//     redraw();
// }

function mouseClicked() {
  redraw();
}

function setup() {
  let w = Math.max(img.width, 2000);
  let ratio = img.width / img.height;
  let h = w / ratio;

  var a = createCanvas(w, h);
  a.parent('myContainer2');

  img.loadPixels();
  img.resize(w, h);
  img.updatePixels();
  noLoop();
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function draw() {
  clear();
  background(255);
  img.loadPixels();

  // map mouseX value to element size
  let size = floor(map(mouseX, 0, width, SMALLEST_PIXEL, BIGGEST_PIXEL));

  for (var starty = 0; starty < height; starty++) {
    for (var startx = 0; startx < width; startx++) {
      // multiply y by the width (y is how many full rows we've had)
      var index = (starty * width + startx) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      // different grayscale measurements
      // grayscale
      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      noStroke(); // disables element stroke
      if (bright >= THRESH) {
        fill(color(r, g, b));
      } else {
        fill(color(255, 0, 0));
      }

      const x_loc = startx; // NOTE THE MIRRORING
      const y_loc = starty;

      // let's make the size of the circle depend on brightness
      // const circle_ratio = map(bright, low, high, BIGGEST_PIXEL_RATIO, SMALLEST_PIXEL_RATIO);

      let circle_ratio1 = Math.random() * 10;
      let circle_ratio2 = Math.random() * 10;

      let max_shift = 0;
      let x_shift = map(Math.random(), 0, 1, max_shift * -1, max_shift);
      let y_shift = map(Math.random(), 0, 1, max_shift * -1, max_shift);

      // choose a shape to draw
      const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      // ellipse(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      // rect(x_loc , y_loc , size , size );
      rect(x_loc, y_loc, size * circle_ratio1, size * circle_ratio2);

      // rect(x_loc , y_loc, size *10 , size /4);

      // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
      // triangle(startx, starty, startx, starty + size, startx + size, starty)

      startx = startx + size - 1;
    }
    starty = starty + size - 1;
  }
}
