let capture;
let shouldLoop = false;

let BIGGEST_PIXEL_RATIO = 5;
let SMALLEST_PIXEL_RATIO = 2;

let BIGGEST_PIXEL = 15;
let SMALLEST_PIXEL = 40;

// let palate = ['rgb(45, 80, 45)', 'rgb(16, 162, 0)', 'rgb(60, 255, 0)', 'rgb(235, 255, 0)']; //greens
// let palate = ['rgb(45, 80, 45)', 'rgb(16, 162, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)', 'rgb(255, 255, 255)']; //greens
// let palate = [ 'rgb(43,0,205)', 'rgb(255, 77, 0)', 'rgb(255, 0, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)']
// let palate = ['rgb(74, 39, 0)', 'rgb(43,0,205)', 'rgb(255, 77, 0)', 'rgb(255, 0, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)', 'rgb(255, 0, 0)', 'rgb(255, 77, 0)', 'rgb(43,0,205)',  'rgb(105, 255, 0)' , 'rgb(205, 255, 0)', 'rgb(255, 0, 0)']
// let palate = ['rgb(255, 0, 0)', 'rgb(122, 122, 122)']

// let palate = [
//   'rgb(40, 40, 40)',
//   'rgb(122, 122, 122)',
//   'rgb(220, 0, 0)',
//   'rgb(200, 200, 200)',
//   'rgb(200, 200, 200)',
//   'rgb(200, 200, 200)'
// ];

let palate = [
  'rgb(40, 40, 40)',
  'rgb(220, 0, 0)',
  'rgb(200, 200, 250)',
  'rgb(180, 180, 220)',
  'rgb(155, 155, 180)',
  'rgb(122, 122, 162)'
];
// let palate = [ 'rgb(205, 255, 0)', 'rgb(205, 255, 0)', 'rgb(205, 255, 0)', 'rgb(205, 255, 0)'];

// let palate = [ 'rgb(255, 0, 0)'];
// let palate = ['rgb(43,0,205)', 'rgb(255, 0, 0)',  'rgb(43,0,205)', 'rgb(255, 0, 0)'];
// let palate = ['rgb(0, 0, 235)', 'rgb(255, 255, 255)'];
// let palate = ['rgb(0, 0, 235)', 'rgb(255, 255, 255)'];

// let palate = ['rgb(0, 0, 0)', 'rgb(255, 0, 0)'];

// let palate = [[0, 0, 0], [0, 0, 0], [255, 0, 0], [0, 0, 0]];
// let palate = ['rgb(74, 39, 0)', 'rgb(74, 80, 0)',  'rgb(50, 50, 50)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)']
// let palate = ['rgb(74, 39, 0)', 'rgb(45, 80, 45)', 'rgb(16, 162, 0)', 'rgb(255, 0, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)']

function setup() {
  // CLICK TO PLAY

  var a = createCanvas(1712, 1098);
  a.parent('myContainer');

  // select input
  capture = createVideo('assets/plane_takeoff.mov');
  capture.volume(0);
  capture.size(width, height);
  noStroke();
  rectMode(CENTER);
  // capture.hide();
}

function mouseClicked() {
  shouldLoop = !shouldLoop;
  capture.loop();
  draw();
}

function draw() {
  clear();

  if (!shouldLoop) {
    frameRate(1);
    textSize(100);
    text('Click to start!!!', 100, 100);
    return;
  }
  frameRate(30);
  background(155);
  capture.loadPixels();

  // map mouseX value to element size
  let size = floor(map(mouseX, 0, width, SMALLEST_PIXEL, BIGGEST_PIXEL));

  for (var starty = 0; starty < height; starty++) {
    for (var startx = 0; startx < width; startx++) {
      // multiply y by the width (y is how many full rows we've had)
      var index = (starty * width + startx) * 4;
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];

      // different grayscale measurements
      // grayscale
      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      noStroke(); // disables element stroke

      // fill in color (no grayscale)
      // fill(bright); // for grayscale
      fill(color(r, g, b)); // for full color

      let low = 0;
      let high = 255;

      let colors = palate.length;
      let binsize = 255 / colors;
      let prev = 0;
      let next;

      for (let i = 0; i < colors; i++) {
        next = prev + binsize;
        if (bright >= prev && bright <= next) {
          low = prev;
          high = next;
          // uncomment for stroke
          // stroke(palate[i]);

          break;
        }
        prev = next;
      }

      const x_loc = startx; // NO MIRRORING
      const y_loc = starty;

      // let's make the size of the circle depend on brightness
      const circle_ratio = map(
        bright,
        low,
        high,
        BIGGEST_PIXEL_RATIO,
        SMALLEST_PIXEL_RATIO
      );

      // choose a shape to draw

      // ellipse(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      random = Math.floor(Math.random() * 2) == 0;

      // rect(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      ellipse(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      // rect(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      // ellipse(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      // rect(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
      // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
      // triangle(startx, starty, startx, starty + size, startx + size, starty)

      startx = startx + size - 1;
    }
    starty = starty + size - 1;
  }
  setTimeout(1);
}
