import Connect4 = require("./connect4");

class Game {

    start (): void {
        const elt = document.getElementById('app');
        let connect4 = new Connect4();
        elt.innerText = connect4.test().toString();
    }
}

export = Game;