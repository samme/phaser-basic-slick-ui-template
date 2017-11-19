
// Global. SlickUI requires it.
// Will be assigned from `new Phaser.Game`, down below.
var game;

// Global. Will be assigned in BasicGame.preloaderState.preload()
var slickUI;

// Global. Container for all our states.
var BasicGame = {};

// (1) Boot

BasicGame.bootState = {

  preload: function () {
    // Here we load the assets required for our preloader *only*
    this.load.image('preloaderBackground', 'assets/barbarian_loading.png');
    this.load.image('preloaderBar', 'assets/loading.png');
  },

  create: function () {
    // By this point the preloader assets have loaded to the cache
    // So now let's start the real preloader going
    this.state.start('Preloader');
  }

};

// (2) Preloader

BasicGame.preloaderState = {

  preload: function () {
    // These are the assets we loaded in Boot.js
    // A nice fiery background and a loading progress bar
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

    this.background.alignIn(this.world, Phaser.CENTER);
    this.preloadBar.alignIn(this.world, Phaser.CENTER);

    // This sets the preloadBar sprite as a loader sprite.
    // What that does is automatically crop the sprite from 0 to full-width
    // as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    // Here we load the rest of the assets our game needs.
    this.load.image('sky', 'assets/sky10.png');
    this.load.image('titlepage', 'assets/cougar_dragonsun.png');
    this.load.spritesheet('dragon', 'assets/stormlord-dragon96x64.png', 96, 64);
    this.load.audio('titleMusic', ['assets/Totta-HeroQuest-Pophousedub-remix.mp3']);
    // + lots of other required assets here

    // https://github.com/Flaxis/slick-ui#getting-started
    slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('bower_components/slick-ui/preview/assets/ui/kenney/kenney.json');
  },

  create: function () {
    // Once the load has finished we could disable the crop …
    // this.preloadBar.cropEnabled = false;

    this.state.start('MainMenu');
  }

};

// (3) Main Menu

BasicGame.mainMenuState = {

  create: function () {
    // The display list is emptied when changing states
    // so we have to put slickUI's display objects back in
    this.world.add(slickUI.container.displayGroup);

    // If you want to keep the same UI across states,
    // you could move the display group to the Stage instead:
    // this.stage.addChild(slickUI.container.displayGroup);

    this.game.music = this.add.audio('titleMusic');
    this.game.music.play();

    var titlepage = this.add.sprite(0, 0, 'titlepage');
    titlepage.alignIn(this.world, Phaser.CENTER);

    // https://github.com/Flaxis/slick-ui#usage
    var panel;
    slickUI.add(panel = new SlickUI.Element.Panel(8, 8, 150, game.height - 16));

    var button;
    panel.add(button = new SlickUI.Element.Button(0, 0, 140, 80));
    button.events.onInputUp.add(this.startGame, this);
    button.add(new SlickUI.Element.Text(0, 0, 'Start')).center();

    this.add.tween(panel).from({alpha: 0}, 500, Phaser.Easing.Quadratic.In).start();
    this.add.tween(panel).from({x: -150}, 500, Phaser.Easing.Back.InOut).start();
  },

  shutdown: function () {
    slickUI.container.displayGroup.removeAll(true);
  },

  startGame: function () {
    // Stop the music? (otherwise it'll carry on playing)
    // this.game.music.stop();

    // And start the actual game
    this.state.start('Game');
  }

};

BasicGame.gameState = {

  create: function () {
    this.world.add(slickUI.container.displayGroup);

    this.sky = this.add.sprite(0, 0, 'sky');
    this.sky.scale.set(this.world.width / this.sky.texture.width);

    this.dragon = this.add.sprite(0, 0, 'dragon');
    this.dragon.anchor.set(0.5);
    this.dragon.alignIn(this.world, Phaser.CENTER);
    this.dragon.animations.add('flyright', [0, 1, 2, 3, 4, 5], 10, true);
    this.dragon.play('flyright');

    this.physics.arcade.enable(this.dragon);

    var button = new SlickUI.Element.Button(10, 10, 140, 80);
    slickUI.add(button);
    button.events.onInputUp.add(this.quitGame, this);
    button.add(new SlickUI.Element.Text(0, 0, 'Quit')).center();
  },

  update: function () {
    var arcade = this.physics.arcade;
    var dragon = this.dragon;

    if (arcade.distanceToPointer(dragon) > (dragon.height / 2)) {
      dragon.body.drag.set(0);
      arcade.moveToPointer(dragon, 240);
    } else {
      dragon.body.drag.set(960);
    }

    // this.dragon.scale.x = Phaser.Math.sign(this.dragon.body.velocity.x) || 1;

    dragon.rotation = Phaser.Math.linear(dragon.rotation, dragon.body.angle, 1 / 30);
  },

  shutdown: function () {
    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.game.music.stop();

    slickUI.container.displayGroup.removeAll(true);
  },

  quitGame: function () {
    // Then let's go back to the main menu.
    this.state.start('MainMenu');
  }

};

// Create game

game = new Phaser.Game({
  width: 720,
  height: 564,
  parent: 'gameContainer',
  scaleMode: Phaser.ScaleManager.SHOW_ALL
});

// Add the States your game has.
game.state.add('Boot', BasicGame.bootState);
game.state.add('Preloader', BasicGame.preloaderState);
game.state.add('MainMenu', BasicGame.mainMenuState);
game.state.add('Game', BasicGame.gameState);

//  Now start the Boot state.
game.state.start('Boot');
