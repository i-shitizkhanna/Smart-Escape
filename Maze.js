var size = 50;
var rows = size;
var cols = size;
var start = undefined;
var end = undefined;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];

function Dot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.obstacle = false;

  if (random(1) < 0.3) {
    this.obstacle = true;
  }
  this.show = function (color) {
    if (this.obstacle) {
      return;
    }
    fill(color);

    noStroke();

    ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, w / 2);
  };
}
function reset() {}

function setup() {
  createCanvas(850, 600);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Dot(i, j);
    }
  }

  start = grid[0][0];
  end = grid[cols - i][rows - 1];

  openSet.push(start);

  //   console.log(grid);
  //   console.log("Setup");
}

function draw() {
  background(0);
  //   console.log("Draw");

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255, 0, 255));
    }
  }
  for (val of openSet) {
    val.show(color(255, 0, 0));
  }

  for (val of closedSet) {
    val.show(color(0, 255, 0));
  }
}
