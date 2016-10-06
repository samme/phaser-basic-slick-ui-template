
BasicGame.Preloader = function (game) {};

BasicGame.Preloader.prototype = {

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
