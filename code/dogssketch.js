// loop through dogs
// and show them in ascii

let img;
const WIDTH = 1500;
const HEIGHT = 1500;
const PIXEL_W = 8;
const PIXEL_H = 10;
const TEXTSIZE = 1.3 * PIXEL_H;
const GRAPH_H = 4000;
const GRAPH_W = 4000;

// const PALATE = ['XBOX', 'JJJ', 'A', '!?', '::', '-', '.', ' '];
// const PALATE = [':)', '+', '-', '`', ''];
// const PALATE =
//     '$@B%8&WM#*o  ';
// const PALATE = ['%%', '&', '%', '!', '.', ' '];
const PALATE = ['YO', ':)', '0!', ':)', ' '];
// const PALATE = 'JACK';
// const PALATE = ['$#', 'A', 'i', '?', ' '];
// const PALATE = ['PS', '2', 'OK', ' '];


function setup() {
    createCanvas(WIDTH, HEIGHT);
    // background(255, 204, 0);

    pg = createGraphics(GRAPH_W, GRAPH_H);
    pg.background('transparent');


    img = loadImage('../images/arm.jpeg');
    frameRate(.5);
}

// const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];

function draw() {
    pg.clear();
    background('transparent');

    img.resize(WIDTH * 0.66, 0);
    img.loadPixels();

    for (let y = 0; y < img.height; y = y + PIXEL_H) {
        for (let x = 0; x < img.width; x = x + PIXEL_W) {
            index = (y * img.width + x) * 4;
            let rgb = img.pixels.slice(index, index + 3);


            fill('red');
            textFont('Helvetica');
            textSize(TEXTSIZE);

            let bin = place_in_bin_according_to_brightness(rgb, PALATE.length);
            let letter = PALATE[bin];
            pg.textFont('Courier new');
            pg.text(letter, x, y);
        }
    }
    image(pg, 0, 0, GRAPH_W, GRAPH_H);

}

function exportHighRes() {
    // HighRes Export
    scaleOutput = 1;
    output = createGraphics(scaleOutput * 1000, scaleOutput * 640);
    draw();
    save(output, "HIGHRES", 'png');

    // Reset Default
    scaleOutput = 1;
    output = createGraphics(GRAPH_W, GRAPH_H);
    draw();
}


function keyTyped() {
    if (key === 's') {
        pg.save("pg.png"); 
    }
  }
  