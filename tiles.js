function Tile(x, y, pattern, group) {

  var imageResult = this.getImageFromPattern(pattern);

  //Save the pattern as a property
  this.pattern = pattern;

  //Reference to group
  this.group = group;

  //Run sprite code
  Phaser.Sprite.call(this, game, x, y, imageResult.sheet);
  this.anchor.setTo(0.5, 0.5);

  //We use these variables to keep track of where the tile is in a puzzle grid
  this.gridX = 0;
  this.gridY = 0;

  //Choose frame, rotate, and flip
  this.frame = imageResult.frame;
  this.angle = imageResult.rotation;
  if(imageResult.mirrorX)
    this.scale.x = -1;
  if(imageResult.mirrorY)
    this.scale.y = -1;

  //Give the block a random color
  this.tint = game.colors[game.rnd.between(0, game.colors.length - 1)];

  //Enable input and dragging
  this.inputEnabled = true;
  this.input.enableDrag();
  this.input.dragFromCenter = false;
  this.input.pixelPerfectClick = true;

  this.events.onDragStart.add(this.pickupTile, this);
  this.events.onDragStop.add(this.dropTile, this);

}
Tile.prototype = Object.create(Phaser.Sprite.prototype);

Tile.prototype.pickupTile = function() {

  //If it's coming from a grid, update the grid
  if(this.group === gameState.leftGridGroup)
  {
    gameState.leftGrid.removeFromGrid(this, this.gridX, this.gridY);
  }
  if(this.group === gameState.rightGridGroup)
  {
    gameState.rightGrid.removeFromGrid(this, this.gridX, this.gridY);
  }

};

Tile.prototype.dropTile = function() {

  //If dropped in left grid
  if(pointInBox({x: this.x, y: this.y}, gameState.leftGrid))
  {
    if(!gameState.leftGrid.placeTile(this))
      this.slideBack();
  }
  //If dropped in right grid
  else if(pointInBox({x: this.x, y: this.y}, gameState.rightGrid))
  {
    if(!gameState.rightGrid.placeTile(this))
      this.slideBack();
  }
  //If dropped in the bag
  else if(pointInBox({x: this.x, y: this.y}, gameState.bag))
  {
    if(!gameState.bag.addTile(this))
      this.slideBack();
  }
  else
  {
    this.slideBack();
    if(this.group === gameState.leftGridGroup)
    {
      gameState.leftGrid.addToGrid(this, this.gridX, this.gridY);
    }
    if(this.group === gameState.rightGridGroup)
    {
      gameState.rightGrid.addToGrid(this, this.gridX, this.gridY);
    }
  }

};

Tile.prototype.slideBack = function() {

  this.slideTo(this.input.dragStartPoint);

};

Tile.prototype.slideTo = function(destination) {

  var time = destination.distance(new Phaser.Point(this.x, this.y)) * 1.2;
  if(time > 0)
  {

    //Disable dragging
    this.input.disableDrag();

    game.add.tween(this).to({x: destination.x, y: destination.y}, time, Phaser.Easing.Quadratic.InOut, true);

    //Enable dragging again when it gets back to its original spot
    game.time.events.add(time, function() {this.input.enableDrag();}, this);

  }

};

Tile.prototype.getImageFromPattern = function(pattern) {

  //3x3 pattern
  if(pattern.length === 3)
  {
    for(var i = 0; i < game.tilePatterns3.length; i++)
    {
      if(pattern.equals(game.tilePatterns3[i].pattern))
        return game.tilePatterns3[i].result;
    }
    console.error('Invalid pattern');
  }
  //2x2 pattern
  else if(pattern.length === 2)
  {
    for(var j = 0; j < game.tilePatterns2.length; j++)
    {
      if(pattern.equals(game.tilePatterns2[j].pattern))
        return game.tilePatterns2[j].result;
    }
    console.error('Invalid pattern');
  }
  //1x1 pattern
  else
  {
    return {sheet: 'tile1', frame: 0, rotation: 0};
  }

};

Tile.prototype.leaveGroup = function() {

  if(this.group)
  {
    this.group.remove(this);
    //If it's coming from the bag, move all the tiles in the bag
    if(this.group === gameState.bagGroup)
    {
      gameState.bag.updateAllTiles();
    }
    this.group = null;
  }

};

Tile.prototype.hide = function() {

  this.visible = false;
  this.inputEnabled = false;

};

Tile.prototype.show = function() {

  this.visible = true;
  this.inputEnabled = true;

};

//Possible tile colors
game.colors = [0xbe3939,0x404e82,0x86e29d,0xedc433,0xb0fff1,0xe270ff];
