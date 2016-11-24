import Connect4 = require("./connect4");
import { Ball } from "./elements";
import { Player } from "./elements";

class Game {

    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    connect4: Connect4;
    columnHeight: number[];

    readonly span: number = 50;
    readonly boardAreaMarginLeft: number;
    readonly boardAreaMarginTop: number;

    constructor() {
        this.connect4 = new Connect4();
        this.boardAreaMarginLeft = 30;
        this.boardAreaMarginTop = 30;
        this.columnHeight = [];
        for (let i = 0; i < this.connect4.WIDTH; i++) {
            this.columnHeight[i] = this.connect4.HEIGHT;
        }
    }

    start(): void {
        // this.test();

        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.c = this.canvas.getContext('2d');
        this.drawBackground();
        this.loop();
        this.initEventsListeners();
    }

    initEventsListeners = (): void => {
        this.canvas.addEventListener('click', (e) => {
            let col = (e.offsetX - this.boardAreaMarginLeft) / this.span;
            col = Math.floor(col);
            if (col >= 0 && col < this.connect4.WIDTH)
                this.drawDropingBall(col);
        })
    }

    drawBackground(): void {
        let numHorizentalLines = this.connect4.HEIGHT + 1;
        let numVerticalLines = this.connect4.WIDTH + 1;
        let lengthHorizentalLine = this.connect4.WIDTH * this.span;
        let lengthVerticalLine = this.connect4.HEIGHT * this.span;

        let offsetX = this.boardAreaMarginLeft;
        let offsetY = this.boardAreaMarginTop;

        for (let i = 0; i < numHorizentalLines; i++) {
            this.c.beginPath();
            let y = offsetY + (this.span * i);
            let x1 = offsetX;
            let x2 = offsetX + lengthHorizentalLine;
            this.c.moveTo(x1, y);
            this.c.lineTo(x2, y);
            this.c.stroke();
        }
        for (let j = 0; j < numVerticalLines; j++) {
            this.c.beginPath();
            let x = offsetX + (this.span * j);
            let y1 = offsetY;
            let y2 = offsetY + lengthVerticalLine;
            this.c.moveTo(x, y1);
            this.c.lineTo(x, y2);
            this.c.stroke();
        }
    }

    drawDropingBall = (col: number): void => {
        let dy: number = 3;
        let halfSpan: number = this.span / 2;
        let radius = halfSpan - 3;
        let x = this.boardAreaMarginLeft + (2 * col + 1) * halfSpan;
        let y = this.boardAreaMarginTop + halfSpan;
        let distance = this.boardAreaMarginTop + this.columnHeight[col] * this.span - halfSpan;
        let animate = () => {
            this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            this.drawExistingBalls();
            this.drawNewBall(1, x, y + dy / 2, radius);
            y += dy;
            if (y < distance)
                requestAnimationFrame(animate);
        }
        animate();
        this.columnHeight[col]--;
    }

    drawExistingBalls = (player: Player, x: number, y: number, radius: number): void => {
    }

    drawNewBall = (player: Player, x: number, y: number, radius: number): void => {
        let ball = new Ball(player, x, y, radius);
        ball.draw(this.c);
    }

    loop() {
        let [x, y] = [10, 10];
        let [dx, dy] = [2, 2];
        let draw = () => {
            this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.c.beginPath();
            this.c.arc(x, y, 10, 0, Math.PI * 2);
            this.c.fillStyle = "#0095DD";
            this.c.fill();
            this.c.closePath();
            x += dx;
            y += dy;
            requestAnimationFrame(draw);
        }
        // draw();
        this.drawDropingBall(0);
    }

    test(): void {
        const elt = document.getElementById('app');
        let connect4 = new Connect4();
        elt.innerText = connect4.test().toString();
    }
}

export = Game;
