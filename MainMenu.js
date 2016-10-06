
BasicGame.MainMenu = function (game) {};

BasicGame.MainMenu.prototype = {

    create: function () {

        // The display list is emptied when changing states
        // so we have to put slickUI's display objects back in
        this.world.add(slickUI.container.displayGroup);

        // If you want to share the same UI across states,
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

    startGame: function (pointer) {

        // Stop the music? (otherwise it'll carry on playing)
        // this.game.music.stop();

        // And start the actual game
        this.state.start('Game');

    }

};
