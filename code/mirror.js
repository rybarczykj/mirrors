// a really green mirror.
// one  of my first p5.js ventures

let capture;
function setup() {

  var a = createCanvas(windowWidth, windowHeight);
  a.parent('myContainer');
  // specify multiple formats for different browsers
  
  // select input
  capture = createCapture(VIDEO);
  // capture = loadImage('me.jpeg'); 

  capture.size(width , height);
  capture.hide();
}

function draw() {
    clear();
    background(0);
    capture.loadPixels();

    // map mouseX value to element size
    let size = floor(map(mouseX, 0, width, 4, 40)); 

    for (var starty = 0; starty < height; starty++) { 
        for (var startx = 0; startx < width; startx++) {
        
    
        // multiply y by the width (y is how many full rows we've had)
        var index = ((starty * width) + startx) * 4;
        var r = capture.pixels[index + 0];
        var g = capture.pixels[index + 1];
        var b = capture.pixels[index + 2];

        // different grayscale measurements
        // var bright = ((0.3 * r) + (0.59 * g) + (0.11 * b));
        let bright = (0.2126* r) + (0.7152*g) + (0.0722*b);


        noStroke(); // disables element stroke

        // fill in color (no grayscale)
        // fill(r, g, b); 
      
        let low = 0;
        let high = 255;

        // different palate ideas 
        // enable colorize to see it better

        let palate = ['rgb(45, 80, 45)', 'rgb(16, 162, 0)', 'rgb(60, 255, 0)', 'rgb(235, 255, 0)']; //greens
        // let palate = ['rgb(45, 80, 45)', 'rgb(16, 162, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)', 'rgb(255, 255, 255)']; //greens
        // let palate = ['rgb(74, 39, 0)', 'rgb(43,0,205)', 'rgb(255, 77, 0)', 'rgb(255, 0, 0)', 'rgb(105, 255, 0)', 'rgb(205, 255, 0)']
        // let palate = ['rgb(43,0,205)',  'rgb(105, 255, 0)', 'rgb(255, 77, 0)', 'rgb(205, 255, 0)', 'rgb(255, 0, 0)',]
        // let palate = [[0, 0, 0], [255, 0, 0]];
        // let palate = [[0, 0, 0], [0, 0, 0], [255, 0, 0], [0, 0, 0]];

        let colors = palate.length;
        let binsize = 255 / colors;
        let prev = 0;
        let next;
        
        for (let i = 0; i < colors; i++){
            next = prev + binsize;
            if ((bright >= prev) && (bright <= next)){
                low = prev;
                high = next;
                fill(palate[i]);
                break;
            }
            prev = next;
        }

        
        const x_loc = width - size - startx;  // NOTE THE MIRRORING
        const y_loc = starty;

        // let's make the size of the circle depend on brightness
        const circle_ratio = map(bright, low, high, 4, .01);
      
        // choose a shape to draw

        // ellipse(x_loc, y_loc, size * circle_ratio, size * circle_ratio);
        rect(x_loc , y_loc, size * circle_ratio, size * circle_ratio);
        // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
        // triangle(startx, starty, startx, starty + size, startx + size, starty)

        startx = startx + size -1;
        }
        starty = starty + size -1;
    }

}
