/*###########################################################
                  PARENT BUILDING OBJECT
###########################################################*/


/*###########################################################
                        QUARRY
###########################################################*/
function Quarry() {

  Phaser.Sprite.call(this, game, 20, 240, 'quarry');

  this.inputEnabled = true;
  this.events.onInputDown.add(this.click, this);

  this.progress = 0;
  this.goal = 100;

  this.techLevel = 1;

  this.progressBar = game.add.graphics(this.x, this.y + this.height);

  this.puzzle = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,0,4,4,4,4],
    [4,4,4,0,0,0,4,4],
    [4,4,0,0,0,4,4,4],
    [4,4,4,4,0,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

}
Quarry.prototype = Object.create(Phaser.Sprite.prototype);

Quarry.prototype.update = function() {

  if(this.progress < this.goal)
    this.progress++;
  else
  {
    if(gameState.bagGroup.length < 9)
    {
      gameState.bag.addTile(this.makeNewTile());
      this.progress = 0;
    }
  }

  this.progressBar.clear();
  this.progressBar.beginFill(0xFFFFFF, 0.75);
  this.progressBar.drawRect(0, 0, this.progress/this.goal*150, 7);
  this.progressBar.endFill();

};

Quarry.prototype.click = function() {

  gameState.leftGrid.switchGrid(this);

};

Quarry.prototype.makeNewTile = function() {

  var randomList;
  if(this.techLevel === 2)
    randomList = game.rnd.between(2, 3);
  else
    randomList = 2;

  if(randomList === 2)
  {
    return new Tile(this.x + this.width/2, this.y + this.height/2, game.tilePatterns2[game.rnd.between(0, game.tilePatterns2.length-1)].pattern, gameState.bagGroup);
  }


};
