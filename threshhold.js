// photoshop threshold tool clone
let capture;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 2;
const PIXEL_H = 2;

// const THRESH = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);

    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();

    frameRate(10);
    slider = createSlider(0, 255, 100);
    slider.position(10, 10);
    slider.style('width', '200px');
}

function draw() {
    clear();
    capture.loadPixels();
    // strokeWeight(1);

    let THRESH = slider.value();

    var x_loc;
    var y_loc;
    var index;
    noStroke();

    for (var starty = 0; starty < height; starty++) {
        for (var startx = 0; startx < width; startx++) {
            index = (starty * width + startx) * 4;
            let r = capture.pixels[index + 0];
            let g = capture.pixels[index + 1];
            let b = capture.pixels[index + 2];
            let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            if (bright >= THRESH) {
                fill('white');
            } else {
                fill('black');
            }

            x_loc = width - PIXEL_W - startx; // NOTE THE MIRRORING
            y_loc = starty;

            rect(x_loc, y_loc, PIXEL_W, PIXEL_H);

            startx = startx + PIXEL_W - 1;
        }
        starty = starty + PIXEL_H - 1;
    }
}
