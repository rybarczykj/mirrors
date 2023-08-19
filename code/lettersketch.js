// letters
// like ascii art
// import { place_in_bin } from './utils.js';


/*
 some fun palettes to type: 
  - "  /  ......................................|||| ...            ™️   "
*/
let capture;
const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_W = 10;
const PIXEL_H = 8;
const TEXTSIZE = 1.2 * PIXEL_W;

// const PALATE = ['JACK', 'JJJ', 'A', '!?', '::', '-', '.', '`'];
// const PALATE = [':)', '+', '-', '`'];
// const PALATE =
//     '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~i!lI;:,"^`".';
const PALATE = ['$#', 'A', 'i', '?', ' '];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);

    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
    frameRate(10);

    
    input = createInput();
    input.position(20, 65);


}

function draw() {
    clear();
    background(220);
    capture.loadPixels();

    const myPalate = input.value().split(' ');
    
    if(input.value().length > 1){
        palateToDisplay = myPalate
    } else{
        palateToDisplay = PALATE;
    }  


    do_thing_for_each_pixel_of_image(
        capture,
        do_text,
        PIXEL_W,
        PIXEL_H,
        (mirror = true),
        (params = { palate: palateToDisplay , textsize: TEXTSIZE }),
    );
}


function keyTyped() {
    if (key === 's') {
        const date = new Date();
        saveCanvas(canvas,  `myCanvas-${date}`, 'jpg');
    }
  }
  