/*##########################################################
                      BITER BUILDING
##########################################################*/
function BiterBuilding() {

  Building.call(this, 210, 160, 'biterBuilding', gameState.rightGrid);

  this.puzzle = [
    [4,4,4,4,4,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,0,0,4,4,4],
    [4,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,4],
    [4,4,0,0,0,0,4,4],
    [4,4,4,0,0,4,4,4],
    [4,4,4,4,4,4,4,4]
  ];

  this.goal = 200;

}
BiterBuilding.prototype = Object.create(Building.prototype);

BiterBuilding.prototype.trigger = function() {

  gameState.allyUnits.add(new Biter(this.x + 52, this.y + 47, this.level));

  this.progress = 0;

};
