var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Create groups
    this.backgroundGroup = game.add.group();

    //Create graphics object
    this.graphics = game.add.graphics(0, 0);

    //Create tile groups
    this.bagGroup = game.add.group();
    this.leftGridGroup = game.add.group();
    this.rightGridGroup = game.add.group();

    //Add game background
    this.backgroundGroup.add(game.make.sprite(0, 0, 'gameBackground'));

    for(var i = 0; i < game.tilePatterns2.length; i++)
    {
      this.bagGroup.add(new Tile(i * 50 + 100, 100, game.tilePatterns2[i].pattern));
    }

    for(var j = 0; j < game.tilePatterns3.length; j++)
    {
      var testX = (j * 80)%600 + 100;
      var testY = Math.floor((j*80)/600) * 100 + 200;
      this.bagGroup.add(new Tile(testX, testY, game.tilePatterns3[j].pattern));
    }

    //Add left and right grids
    this.leftGrid = new PuzzleGrid(29, 379);
    this.rightGrid = new PuzzleGrid(579, 379);

  },

  update: function() {

  },

  render: function() {

    game.debug.text(game.time.fps, 25, 25);

  }

};
