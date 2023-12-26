function setup() {
  a = createCanvas(640, 480);
  a.parent('myContainer3');
  background(204);
  video1 = createCapture(VIDEO);

  video1.size(640, 480);
  video1.hide();
}

function draw() {
  image(video1, 0, 0, mouseX, mouseY);
  image(video1, 0, 0, 100, 100);
  image(video1, 200, 200, 500, 100);

  image(video1, 0, 300, 40, 50);
}
