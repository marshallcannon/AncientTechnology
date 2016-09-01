function PuzzleGrid(x, y, gridGroup) {

  this.x = x;
  this.y = y;
  this.width = 192;
  this.height = 192;

  this.group = gridGroup;

  this.grid = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

  this.gridOffset = (8 - this.grid.length) / 2;

  this.drawGrid(this.grid);

}

PuzzleGrid.prototype.drawGrid = function() {

  var pattern = this.grid;

  //Set the grid offset
  var offset = 0;
  if(pattern.length === 2)
    offset = 72;
  else if(pattern.length === 4)
    offset = 48;
  else if(pattern.length === 6)
    offset = 24;

  //Draw the pattern
  var g = gameState.puzzleGridGraphics;
  g.clear();
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

//Check if a tile fits in the grid and place it
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
        tile.gridX = gridX;
        tile.gridY = gridY;
        this.addToGrid(tile, gridX, gridY);
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
    //Set the tiles group
    tile.leaveGroup();
    this.group.add(tile);
    tile.group = this.group;
    //Position the tile
    tile.x = gridX * 24 + this.x + 24;
    tile.y = gridY * 24 + this.y + 24;
    tile.gridX = gridX;
    tile.gridY = gridY;
    this.addToGrid(tile, gridX, gridY);
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
    tile.gridX = gridX;
    tile.gridY = gridY;
    this.addToGrid(tile, gridX, gridY);
    return true;
  }

};

//Update the grid array with a new tile
PuzzleGrid.prototype.addToGrid = function(tile, gridX, gridY) {

  for(var i = 0; i < tile.pattern.length; i++)
  {
    for(var j = 0; j < tile.pattern.length; j++)
    {
      if(tile.pattern[i][j] === 1)
      {
        this.grid[i+gridY][j+gridX] = 1;
      }
    }
  }

  if(this.checkSolved())
    this.targetBuilding.upgrade();

};

PuzzleGrid.prototype.removeFromGrid = function(tile, gridX, gridY) {

  for(var i = 0; i < tile.pattern.length; i++)
  {
    for(var j = 0; j < tile.pattern.length; j++)
    {
      if(tile.pattern[i][j] === 1)
      {
        this.grid[i+gridY][j+gridX] = 0;
      }
    }
  }

};

PuzzleGrid.prototype.switchGrid = function(building) {

  if(this.targetBuilding)
    {
    //Save the old tiles
    var selfLength = this.group.length;
    for(var i = 0; i < selfLength; i++)
    {
      console.log(selfLength);
      //Hide each tile
      this.group.getTop().hide();
      //Copy over each tile
      this.targetBuilding.saveGroup.add(this.group.getTop(i));
    }
  }
  //Clear the group to be safe
  this.group.removeAll();

  //Load the new grid
  this.targetBuilding = building;
  this.grid = this.targetBuilding.puzzle.slice();
  this.drawGrid();
  //Add tiles to puzzle grid group
  var length = this.targetBuilding.saveGroup.length;
  for(var k = 0; k < length; k++)
  {
    this.group.add(this.targetBuilding.saveGroup.getTop());
  }
  //Place tiles in grid
  for(var j = 0; j < this.group.length; j++)
  {
    //Place each tile
    this.addToGrid(this.group.getAt(j), this.group.getAt(j).gridX, this.group.getAt(j).gridY);
    //Show each tile
    this.group.getAt(j).show();
  }

};

PuzzleGrid.prototype.checkSolved = function() {

  for(var i = 0; i < this.grid.length; i++)
  {
    for(var j = 0; j < this.grid[i].length; j++)
    {
      if(this.grid[i][j] === 0)
        return false;
    }
  }
  return true;

};
