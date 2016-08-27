function Tile(x, y, pattern, group) {

  var imageResult = this.getImageFromPattern(pattern);

  //Save the pattern as a property
  this.pattern = pattern;

  //Reference to group
  this.group = group;

  //Run sprite code
  Phaser.Sprite.call(this, game, x, y, imageResult.sheet);
  this.anchor.setTo(0.5, 0.5);

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

  this.events.onDragStop.add(this.dropTile, this);

}
Tile.prototype = Object.create(Phaser.Sprite.prototype);

Tile.prototype.dropTile = function() {

  //If dropped in left grid
  if(pointInBox(this.x, this.y, gameState.leftGrid.x, gameState.leftGrid.y, gameState.leftGrid.width, gameState.leftGrid.height))
  {
    if(!gameState.leftGrid.placeTile(this))
      this.slideBack();
  }
  //If dropped in right grid
  else if(pointInBox(this.x, this.y, gameState.rightGrid.x, gameState.rightGrid.y, gameState.rightGrid.width, gameState.rightGrid.height))
  {

  }
  else
  {
    this.slideBack();
  }

};

Tile.prototype.slideBack = function() {

  //Disable dragging
  this.input.disableDrag();

  var time = this.input.dragStartPoint.distance(new Phaser.Point(this.x, this.y)) * 1.2;
  game.add.tween(this).to({x: this.input.dragStartPoint.x, y: this.input.dragStartPoint.y}, time, Phaser.Easing.Quadratic.InOut, true);

  //Enable dragging again when it gets back to its original spot
  game.time.events.add(time, function() {this.input.enableDrag();}, this);

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

  this.group.remove(this);

};

//Possible tile colors
game.colors = [0xbe3939,0x404e82,0x86e29d,0xedc433,0xb0fff1,0xe270ff];
