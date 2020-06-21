var size = 75;
var rows = size;
var cols = size;
var start = undefined;
var end = undefined;
var grid = new Array(rows);
var openSet = new Set([]);
var closedSet = new Set([]);
var path = [];
var done = false;

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y);
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
      grid[i][j] = new Cell(i, j);
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
  // pathFinder();

  console.log(grid);
  //   console.log("Setup");
}

function draw() {
  background(color(255, 255, 0));
  //   console.log("Draw");

  if (openSet.size != 0 && !done) {
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
  if (!done) {
    console.log("No Solution");
  } else {
    var temp = end;
    while (temp != undefined) {
      path.push(temp);
      temp = temp.parent;
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(0, 0, 0));
    }
  }
  for (val of openSet) {
    val.show(color(0, 175, 0));
  }

  for (val of closedSet) {
    val.show(color(180, 0, 0));
  }
  for (val of path) {
    val.show(color(0, 0, 255));
  }
  if (path.length == 0) {
    console.log("EMPTY!");
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
