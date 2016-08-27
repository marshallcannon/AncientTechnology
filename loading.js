var loadingState = {

  preload: function() {

    game.load.image('tile', 'assets/tile.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

    game.state.start('game');

  },

  update: function() {

  }

};
