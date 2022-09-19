// letters
// like ascii art
// import { place_in_bin } from './utils.js';

let capture;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 10;
const PIXEL_H = 8;
const TEXTSIZE = 1.2 * PIXEL_W;

// const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];
const PALATE =
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~i!lI;:,"^`".';

function setup() {
    createCanvas(windowWidth, windowHeight);

    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
    frameRate(10);
}

function draw() {
    clear();
    capture.loadPixels();

    do_thing_for_each_pixel_of_image(
        capture,
        do_text,
        PIXEL_W,
        PIXEL_H,
        (mirror = true),
        (params = { palate: PALATE, textsize: TEXTSIZE }),
    );
}
