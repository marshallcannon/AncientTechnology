function PuzzleGrid(x, y) {

  this.x = x;
  this.y = y;

  this.drawGrid([[0,1,1,0],[0,1,1,0],[1,1,1,1],[0,1,1,0]]);

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
      if(pattern[i][j] === 1)
      {
        g.lineStyle(1, 0xff0000, 1);
        g.beginFill(0xFFFFFF, 1);
        g.drawRect(this.x + offset + j*24, this.y + offset + i*24, 24, 24);
        g.endFill();
      }
      else {
        g.lineStyle(0, 0xff0000, 1);
        g.beginFill(0x393939, 1);
        g.drawRect(this.x + offset + j*24, this.y + offset + i*24, 24, 24);
        g.endFill();
      }
    }
  }

};
