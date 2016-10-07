
BasicGame.Game = function () {};

BasicGame.Game.prototype = {

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

        var button;
        slickUI.add(button = new SlickUI.Element.Button(10, 10, 140, 80));
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
