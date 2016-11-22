import sayHello = require("./greet");
import Connect4 = require("./connect4");

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    let connect4 = new Connect4();
    elt.innerText = connect4.test();
}

showHello('app', 'TypeScript');