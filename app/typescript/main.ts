import sayHello = require("./greet");
import Connect4 = require("./connect4");
import Game = require("./game")

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    let connect4 = new Connect4();
    elt.innerText = connect4.test();
}

window.onload = () => {
    var game = new Game();
};