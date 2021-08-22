let i = 0;
let j = 0;
let bars = [];
let barWidth = 50;
let slider;

let aboveGround = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  slider = createSlider(5, width / 6, barWidth);
  slider.position(10, 10);
  slider.style("width", "80px");

  for (let i = 0; i < floor((width - 50) / barWidth); i++) {
    let size = floor(random(400 - 50));
    let offset =
      25 + (width - 50 - floor((width - 50) / barWidth) * barWidth) / 2;
    bars[i] = new Bar(
      i * barWidth + offset,
      height - size - aboveGround,
      barWidth,
      size,
      "lightslategray"
    );
  }

  frameRate(4);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bars = [];
  i = 0;
  j = 0;
  for (let i = 0; i < floor((width - 50) / barWidth); i++) {
    let size = floor(random(400 - 50));
    let offset =
      25 + (width - 50 - floor((width - 50) / barWidth) * barWidth) / 2;
    bars[i] = new Bar(
      i * barWidth + offset,
      height - size - aboveGround,
      barWidth,
      size,
      "lightslategray"
    );
  }
}

function draw() {
  background(15, 33, 30);

  for (let bar of bars) {
    bar.display();
  }
  if (i < bars.length) {
    if (j < bars.length - i - 1) {
      bars[j].display("yellow");
      bars[j + 1].display("yellow");
      if (bars[j].height > bars[j + 1].height) {
        bars[j].swap(bars[j + 1]);
      }
      j++;
    } else {
      bars[j].color = "deepskyblue";
      bars[j].display();
      j = 0;
      i++;
    }
  }
  checkSlider();
}

class Bar {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
  }

  display(col = this.color) {
    fill(col);
    rect(this.x, this.y, this.width, this.height);

    if (barWidth > 40) {
      textSize(20);
      textAlign(CENTER);
      text(this.height, this.x + this.width / 2, this.y);
    }
  }

  swap(otherBar) {
    let temp = this.height;
    this.height = otherBar.height;
    otherBar.height = temp;
    this.y = height - this.height - aboveGround;
    otherBar.y = height - otherBar.height - aboveGround;
  }
}

function checkSlider() {
  if (slider.value() != barWidth) {
    barWidth = slider.value();
    bars = [];
    i = 0;
    j = 0;
    for (let i = 0; i < floor((width - 50) / barWidth); i++) {
      let size = floor(random(400 - 50));
      let offset =
        25 + (width - 50 - floor((width - 50) / barWidth) * barWidth) / 2;
      bars[i] = new Bar(
        i * barWidth + offset,
        height - size - aboveGround,
        barWidth,
        size,
        "gray"
      );
    }
  }
}

function drawScenery() {
  fill(28, 36, 47);
  rect(0, 0, width, height - 50);
  fill(56, 68, 80);
  let x1 = -width / 2.5;
  let x2 = x1 + width;
  let x3 = (x1 + x2) / 2;
  let y1 = height - aboveGround;
  let y2 = height - aboveGround;
  let y3 = height - aboveGround - 400;
  triangle(x1, y1, x2, y2, x3, y3);

  x1 += width / 2;
  x2 = x1 + width;
  x3 = (x1 + x2) / 2;
  triangle(x1, y1, x2, y2, x3, y3);

  x1 += width / 2;
  x2 = x1 + width;
  x3 = (x1 + x2) / 2;
  triangle(x1, y1, x2, y2, x3, y3);
}
