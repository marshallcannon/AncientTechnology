function Bag() {

  //Set the coordinates
  this.x = 250;
  this.y = 325;
  this.width = 300;
  this.height = 275;

  this.group = gameState.bagGroup;

  this.tilePositions = [new Phaser.Point(300, 385), new Phaser.Point(400, 385), new Phaser.Point(500, 385),
                        new Phaser.Point(300, 465), new Phaser.Point(400, 465), new Phaser.Point(500, 465),
                        new Phaser.Point(300, 545), new Phaser.Point(400, 545), new Phaser.Point(500, 545)];

}

Bag.prototype.addTile = function(tile) {

  //If there's room in the bag
  if(this.group.length < 9)
  {
    tile.leaveGroup();
    this.group.add(tile);
    tile.group = this.group;
    tile.slideTo(this.tilePositions[this.group.getChildIndex(tile)]);
    return true;
  }
  else
  {
    console.log('Full!');
  }

};

Bag.prototype.updateAllTiles = function() {

  for(var i = 0; i < this.group.length; i++)
  {
    var tile = this.group.getAt(i);
    tile.slideTo(this.tilePositions[this.group.getChildIndex(tile)]);
  }

};
