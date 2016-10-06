var BasicGame = {};

BasicGame.Boot = function (game) {};

BasicGame.Boot.prototype = {

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
