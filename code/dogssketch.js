// loop through dogs
// and show them in ascii

let img;
const WIDTH = 1000;
const HEIGHT = 1000;
const PIXEL_W = 6;
const PIXEL_H = 6;
const TEXTSIZE = 1.5 * PIXEL_W;

// const PALATE = ['AAA', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`', ''];
const PALATE =
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~i!lI;:,"^`".';

function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(255, 204, 0);

    img = loadImage('../images/dogs/dog4.jpeg');

    frameRate(2);
}

// const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];

function draw() {
    clear();
    img.resize(WIDTH, 0);

    img.loadPixels();

    // console.log(mouseX, mouseY);

    do_thing_for_each_pixel_of_image(
        img,
        do_text,
        PIXEL_W,
        PIXEL_H,
        (mirror = false),
        (params = { palate: PALATE, textsize: TEXTSIZE }),
    );
}
