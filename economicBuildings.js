/*###########################################################
                  PARENT BUILDING OBJECT
###########################################################*/
function Building(x, y, image, gridPreference) {

  Phaser.Sprite.call(this, game, x, y, image);

  this.inputEnabled = true;
  this.events.onInputDown.add(this.click, this);

  this.progress = 0;
  this.goal = 100;

  this.level = 0;

  if(gridPreference)
    this.gridPreference = gridPreference;
  else {
    console.warn("This building has no grid preference! I don't to assume anybody's grid preference!");
  }

  this.progressBar = game.add.graphics(this.x, this.y + this.height);

  this.puzzle = [
    [4,4,4,4,4,4,4,4],
    [4,0,0,4,4,0,0,4],
    [4,4,0,4,4,0,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,0,4,4,0,4,4],
    [4,0,0,4,4,0,0,4],
    [4,4,4,4,4,4,4,4]
  ];

  //Use this property to save a group of tiles
  this.saveGroup = game.add.group();

}
Building.prototype = Object.create(Phaser.Sprite.prototype);

Building.prototype.update = function() {

  if(this.progress < this.goal)
    this.progress++;
  else
    this.trigger();

  this.progressBar.clear();
  this.progressBar.beginFill(0xFFFFFF, 0.75);
  this.progressBar.drawRect(0, 0, this.progress/this.goal*this.width, 7);
  this.progressBar.endFill();

};

Building.prototype.trigger = function() {

  console.warn('Uh oh! This building has no trigger function!');
  console.log(this);

};

Building.prototype.click = function() {

  this.gridPreference.switchGrid(this);

};

Building.prototype.upgrade = function() {

  this.level++;

  if(this.level <= this.upgradeList.length)
    this.upgradeList[this.level-1].call(this);

};

/*###########################################################
                        QUARRY
###########################################################*/
function Quarry() {

  Building.call(this, 20, 240, 'quarry', gameState.leftGrid);

  this.puzzle = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,0,0,0,0,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,0,0,0,0,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

  this.goal = 100;

}
Quarry.prototype = Object.create(Building.prototype);

Quarry.prototype.makeNewTile = function() {

  var randomList;
  if(gameState.techLevel === 2)
    randomList = game.rnd.between(1, 3);
  else
    randomList = game.rnd.between(1, 5);

  if(randomList === 1)
    return new Tile(this.x + this.width/2, this.y + this.height/2, [[1]], gameState.bagGroup);
  else if(randomList <= 3)
  {
    return new Tile(this.x + this.width/2, this.y + this.height/2, game.tilePatterns2[game.rnd.between(0, game.tilePatterns2.length-1)].pattern, gameState.bagGroup);
  }

};

Quarry.prototype.trigger = function() {

  if(gameState.bagGroup.length < 9)
  {
    gameState.bag.addTile(this.makeNewTile());
    this.progress = 0;
  }

};

Quarry.prototype.upgradeList = [
  //Level 1
  function() {

    this.active = true;
    console.log('Upgraded!');

  },

  //Level 2
  function() {



  }
];

/*######################################################
                      Crystal
######################################################*/
function Crystal() {

  Building.call(this, 36, 144, 'crystal', gameState.leftGrid);

  this.puzzle = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,0,0,4,0,4,4],
    [4,4,0,4,0,0,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

  this.goal = 1000;

}
Crystal.prototype = Object.create(Building.prototype);

Crystal.prototype.trigger = function() {

  this.progress = 0;

};
