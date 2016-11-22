import sayHello = require("./greet");
import Connect4 = require("./connect4");

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}


// showHello('app', 'TypeScript');
new Connect4().showLong('app');