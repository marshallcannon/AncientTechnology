var loadingState = {

  preload: function() {

    game.load.spritesheet('tile1', 'assets/tile.png', 24, 24);
    game.load.spritesheet('tile2', 'assets/tile2x2.png', 48, 48);
    game.load.spritesheet('tile3', 'assets/tile3x3.png', 72, 72);

    game.load.image('gameBackground', 'assets/background.png');

    //Load buildings
    game.load.image('quarry', 'assets/quarry.png');
    game.load.image('crystal', 'assets/crystal.png');
    game.load.image('biterBuilding', 'assets/biterBuilding.png');

    //Load units
    game.load.image('biter', 'assets/biter.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

    game.state.start('game');

  },

  update: function() {

  }

};
