import Long = require("long");

class Connect4 {

    showLong(divName: string) {
        const elt = document.getElementById(divName);
        const newLong = new Long(0xFFFFFFFF, 0x7FFFFFFF);
        elt.innerText = newLong.toString();
    }

}

export = Connect4;