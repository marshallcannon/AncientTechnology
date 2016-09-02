/*##################################################
                      BITER
##################################################*/
function Biter(x, y, level) {

  Phaser.Sprite.call(this, game, x, y, 'biter');

}
Biter.prototype = Object.create(Phaser.Sprite.prototype);

Biter.prototype.update = function() {

  this.body.moveTo(2000, 300, Phaser.ANGLE_RIGHT);

};
