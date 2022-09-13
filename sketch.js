// loop through dogs
// and show them in ascii


let img;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 25;
const PIXEL_H = 20;
const TEXTSIZE = PIXEL_W;

const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];

function setup() {
    createCanvas(windowWidth, windowHeight);

    img = loadImage('images/dogs/dog0.jpeg');

    img.resize(width, height);
    // img.hide();

    frameRate(10);
}



function draw() {
    clear();
    img.loadPixels();
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
            let r = img.pixels[index + 0];
            let g = img.pixels[index + 1];
            let b = img.pixels[index + 2];

            x_loc = width - PIXEL_W - startx; // NOTE THE MIRRORING
            y_loc = starty;

            fill('black');
            // rect(x_loc, y_loc, 10, 10);
            let bin = get_normalized_brightness(r, g, b);

            let letter = PALATE[bin];
            text(letter, x_loc, y_loc);

            // text('$', x_loc, y_loc);
            startx = startx + PIXEL_W - 1;
        }
        starty = starty + PIXEL_H - 1;
    }
}
