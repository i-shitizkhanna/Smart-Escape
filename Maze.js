var size = 50;
var rows = size;
var cols = size;
var start = undefined;
var end = undefined;
var grid = new Array(rows);
var openSet = new Set([]);
var closedSet = new Set([]);
var path = [];
var done = false;

function Dot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.obstacle = false;
  this.cop = false;
  this.neighbors = [];
  this.parent = undefined;

  if (random(1) < 0.4) {
    this.obstacle = true;
  }
  if (random(1) < 0.008) {
    this.cop = true;
  }

  this.addNeighbors = function (grid) {
    var i = this.x;
    var j = this.y;
    if (i > 0 && j > 0) {
      if (!grid[i - 1][j - 1].obstacle) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
    }
    if (i > 0) {
      if (!grid[i - 1][j].obstacle) {
        this.neighbors.push(grid[i - 1][j]);
      }
    }
    if (i > 0 && j < cols - 1) {
      if (!grid[i - 1][j + 1].obstacle) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
    }
    if (j < cols - 1) {
      if (!grid[i][j + 1].obstacle) {
        this.neighbors.push(grid[i][j + 1]);
      }
    }
    if (i < rows - 1 && j < cols - 1) {
      if (!grid[i + 1][j + 1].obstacle) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }
    }
    if (i < rows - 1) {
      if (!grid[i + 1][j].obstacle) {
        this.neighbors.push(grid[i + 1][j]);
      }
    }
    if (i < rows - 1 && j > 0) {
      if (!grid[i + 1][j - 1].obstacle) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
    }
    if (j > 0) {
      if (!grid[i][j - 1].obstacle) {
        this.neighbors.push(grid[i][j - 1]);
      }
    }
  };
  this.show = function (clr) {
    if (this.obstacle) {
      return;
    }
    if (this.cop) {
      fill(color(140, 150, 225));

      noStroke();
      rect(this.x * w, this.y * h, w, h);
      return;
    }
    fill(clr);

    noStroke();

    ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, w / 2);
  };
}

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}
function pathFinder() {
  while (openSet.size != 0) {
    var current = undefined;
    for (val of openSet) {
      if (current === undefined) {
        current = val;
      } else {
        if (val.f < current.f) {
          current = val;
        }
      }
    }

    if (current === end) {
      done = true;
      console.log("DONE!");
      return;
    }
    openSet.delete(current);
    closedSet.add(current);
    var neighbors = current.neighbors;

    for (val of neighbors) {
      if (closedSet.has(val)) {
        continue;
      }
      var tempg = current.g + 1;

      if (openSet.has(val)) {
        if (tempg < val.g) {
          val.g = tempg;
        }
      } else {
        val.g = tempg;
        openSet.add(val);
      }

      val.h = heuristic(val, end);
      val.f = val.h + val.g;
      val.parent = current;
    }
  }
}
function reset() {}

function setup() {
  createCanvas(850, 600);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Dot(i, j);
    }
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[rows - 1][cols - 1];
  start.obstacle = false;
  end.obstacle = false;

  openSet.add(start);
  pathFinder();

  if (!done) {
    console.log("No Solution");
  } else {
    var temp = end;
    while (temp != undefined) {
      path.push(temp);
      temp = temp.parent;
    }
  }

  console.log(grid);
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
  for (val of path) {
    val.show(color(0, 0, 255));
  }

  noFill();
  stroke(color(0, 120, 120));
  beginShape();
  strokeWeight(w / 3);
  for (var i = 0; i < path.length; ++i) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}
