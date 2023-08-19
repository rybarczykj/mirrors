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

    slider = createSlider(0, 255, 100);
    slider.position(10, 10);
    slider.style('width', '200px');
    frameRate(10);
}

function draw() {
    clear();
    capture.loadPixels();
    // strokeWeight(1);

    let THRESH = slider.value();

    // var x_loc;
    // var y_loc;
    // var index;
    do_thing_for_each_pixel_of_image(
        capture,
        do_thresh,
        PIXEL_W,
        PIXEL_H,
        (mirror = true),
        (params = { thresh: THRESH, width: PIXEL_W, height: PIXEL_H }),
    );
}
