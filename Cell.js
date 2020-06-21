function Cell(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.obstacle = false;
  this.cop = false;
  this.neighbors = [];
  this.parent = undefined;

  if (random(1) < 0.05) {
    this.obstacle = true;
  }
  //   if (random(1) < 0.008) {
  //     this.cop = true;
  //   }

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
