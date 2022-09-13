// letters
// like ascii art
// import { do_thing_for_each_pixel_of_image, do_text } from './utils.js';

let capture;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 25;
const PIXEL_H = 20;
const TEXTSIZE = PIXEL_W;

const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];

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
    console.log('hi');
    do_thing_for_each_pixel_of_image(
        capture,
        do_text,
        (pixel_w = PIXEL_W),
        (pixel_h = PIXEL_H),
        (params = { PALATE }),
    );
}
