function PuzzleGrid(x, y, side) {

  this.x = x;
  this.y = y;
  this.width = 192;
  this.height = 192;
  if(side === 'left')
  {
    this.group = gameState.leftGridGroup;
  }
  else {
    this.group = gameState.rightGridGroup;
  }

  this.grid = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,0,0,0,0,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

  this.gridOffset = (8 - this.grid.length) / 2;

  this.drawGrid(this.grid);

}

PuzzleGrid.prototype.drawGrid = function(pattern) {

  //Set the grid offset
  var offset = 0;
  if(pattern.length === 2)
    offset = 72;
  else if(pattern.length === 4)
    offset = 48;
  else if(pattern.length === 6)
    offset = 24;

  //Draw the pattern
  var g = gameState.graphics;
  for(var i = 0; i < pattern.length; i++)
  {
    for(var j = 0; j < pattern[i].length; j++)
    {
      if(pattern[i][j] === 0)
      {
        g.lineStyle(1, 0x484a21, 1);
        g.beginFill(0xFFFFFF, 1);
        g.drawRect(this.x + offset + j*24, this.y + offset + i*24, 24, 24);
        g.endFill();
      }
      else {
        g.lineStyle(1, 0x393939, 1);
        g.beginFill(0x393939, 1);
        g.drawRect(this.x + offset + j*24, this.y + offset + i*24, 24, 24);
        g.endFill();
      }
    }
  }

};

//Check if a tile fits in the grid
PuzzleGrid.prototype.placeTile = function(tile) {

  var relativeX = tile.x - this.x - tile.pattern.length*12;
  var relativeY = tile.y - this.y - tile.pattern.length*12;
  var gridX = Math.round(relativeX / 24);
  var gridY = Math.round(relativeY / 24);

  // gameState.graphics.beginFill(0x0000FF, 0.5);
  // gameState.graphics.drawRect(gridX*24+this.x, gridY*24+this.y, 24, 24);
  // gameState.graphics.endFill();

  var i = 0; var j = 0;
  //1x1
  if(tile.pattern.length === 1)
  {
      if(tile.pattern[0][0] === 1 && this.grid[gridY+0][gridX+0] === 0)
      {
        tile.leaveGroup();
        this.group.add(tile);
        tile.group = this.group;
        tile.x = gridX * 24 + this.x + 12;
        tile.y = gridY * 24 + this.y + 12;
        return true;
      }
      else
      {
        return false;
      }
  }
  //2x2
  else if(tile.pattern.length === 2)
  {
    for(i = 0; i < 2; i++)
    {
      for(j = 0; j < 2; j++)
      {
        if(tile.pattern[i][j] === 1)
        {
          if(this.grid[gridY+i][gridX+j] !== 0)
            return false;
        }
      }
    }
    tile.leaveGroup();
    this.group.add(tile);
    tile.group = this.group;
    tile.x = gridX * 24 + this.x + 24;
    tile.y = gridY * 24 + this.y + 24;
    return true;
  }
  //3x3
  else
  {
    for(i = 0; i < 3; i++)
    {
      for(j = 0; j < 3; j++)
      {
        if(tile.pattern[i][j] === 1)
        {
          if(this.grid[gridY+i][gridX+j] !== 0)
          {
            return false;
          }
        }
      }
    }
    tile.leaveGroup();
    this.group.add(tile);
    tile.group = this.group;
    tile.x = gridX * 24 + this.x + 36;
    tile.y = gridY * 24 + this.y + 36;
    return true;
  }

};
