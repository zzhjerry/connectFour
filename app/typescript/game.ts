/// <reference path="phaser.d.ts"/>

import Phaser = require("phaser");

class Game {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'app', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('logo', 'phaser2.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}

export = Game;