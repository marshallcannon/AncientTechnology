function Tile(x, y, pattern, color) {

  var imageResult = this.getImageFromPattern(pattern);

  //Run sprite code
  Phaser.Sprite.call(this, game, x, y, imageResult.sheet);
  this.anchor.set(0.5);

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
  this.input.enableDrag(true);
  this.input.dragFromCenter = false;
  this.input.pixelPerfectClick = true;

  this.events.onDragStop.add(this.dropTile, this);

}
Tile.prototype = Object.create(Phaser.Sprite.prototype);

Tile.prototype.dropTile = function() {

  this.slideBack();

};

Tile.prototype.slideBack = function() {

  game.add.tween(this).to({x: this.input.dragStartPoint.x, y: this.input.dragStartPoint.y}, 1000, Phaser.Easing.Linear.In, true);

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

//Possible tile colors
game.colors = [0xbe3939,0x404e82,0x86e29d,0xedc433,0xb0fff1,0xe270ff];
