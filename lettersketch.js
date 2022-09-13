// letters
// like ascii art
// import { place_in_bin } from './utils.js';

let capture;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 10;
const PIXEL_H = 8;
const TEXTSIZE = 1 * PIXEL_W;

// const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];
const PALATE =
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~i!lI;:,"^`".';

function setup() {
    createCanvas(windowWidth, windowHeight);

    capture = createCapture(VIDEO);
    capture.size(width, height);
    // capture.hide();
    frameRate(10);
}

function draw() {
    clear();
    capture.loadPixels();
    // strokeWeight(1);
    textFont('Helvetica ');
    textSize(TEXTSIZE);
    // noStroke();

    var x_loc;
    var y_loc;
    var index;

    for (var starty = 0; starty < height; starty++) {
        for (var startx = 0; startx < width; startx++) {
            index = (starty * width + startx) * 4;
            let r = capture.pixels[index + 0];
            let g = capture.pixels[index + 1];
            let b = capture.pixels[index + 2];

            x_loc = width - PIXEL_W - startx; // NOTE THE MIRRORING
            y_loc = starty;

            fill('black');
            // rect(x_loc, y_loc, 10, 10);
            let bin = place_in_bin([r, g, b], PALATE.length);

            let letter = PALATE[bin];
            text(letter, x_loc, y_loc);

            // text('$', x_loc, y_loc);
            startx = startx + PIXEL_W - 1;
        }
        starty = starty + PIXEL_H - 1;
    }
}
