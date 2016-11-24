import Connect4 = require("./connect4");
import { Ball, Player } from "./elements";
import { players } from "./elements";

class Game {

    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    connect4: Connect4;
    columnHeight: number[];
    ballsInColumn: Ball[][];
    gameOver: boolean;

    readonly span: number = 50;
    readonly boardAreaMarginLeft: number;
    readonly boardAreaMarginTop: number;

    constructor() {
        this.connect4 = new Connect4();
        this.boardAreaMarginLeft = 30;
        this.boardAreaMarginTop = 30;
        this.columnHeight = [];
        this.ballsInColumn = [];
        this.gameOver = false;
        for (let i = 0; i < this.connect4.WIDTH; i++) {
            this.columnHeight[i] = this.connect4.HEIGHT;
            this.ballsInColumn[i] = [];
        }
    }

    start(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.c = this.canvas.getContext('2d');
        this.drawBackground();
        this.initEventsListeners();
    }

    initEventsListeners = (): void => {
        this.canvas.addEventListener('click', (e) => {
            let col = (e.offsetX - this.boardAreaMarginLeft) / this.span;
            col = Math.floor(col);
            let row = (e.offsetY - this.boardAreaMarginTop) / this.span;
            row = Math.floor(row);
            let isMouseClickInsideBoard: boolean = (
                col >= 0 && col < this.connect4.WIDTH
                && row >= 0 && row < this.connect4.HEIGHT);

            if (isMouseClickInsideBoard && this.connect4.isPlayable(col)
                && !this.gameOver) {

                this.drawDropingBall(col);
                this.connect4.move(col);
            }
        });
        this.canvas.addEventListener('mousemove', (e) => {
            let columnHighlightingColor = players[this.connect4.getCurrentPlayerId()].columnHighlightingColor;

        });
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
        let dy: number = 10;
        let halfSpan: number = this.span / 2;
        let radius = halfSpan - 3;
        let x = this.boardAreaMarginLeft + (2 * col + 1) * halfSpan;
        let y = this.boardAreaMarginTop + halfSpan;
        let distance = this.boardAreaMarginTop + this.columnHeight[col] * this.span - halfSpan;
        let player = players[this.connect4.getCurrentPlayerId()];
        let animate = () => {
            this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            this.drawExistingBalls();
            this.drawNewBall(player, x, y + dy / 2, radius);
            y += dy;
            if (y < distance)
                requestAnimationFrame(animate);
            else {
                this.ballsInColumn[col].push(
                    new Ball(player, x, distance, radius));
                this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawBackground();
                this.drawExistingBalls();
                if (this.connect4.isLegalHasWon(this.connect4.getBoard(player))) {
                    this.gameOver = true;
                    this.message('message', `${player.name} wins`);
                }
            }
        }
        animate();
        this.columnHeight[col]--;
    }

    drawExistingBalls = (): void => {
        for (let index = 0; index < this.connect4.WIDTH; index++) {
            let balls = this.ballsInColumn[index];
            for (let ballIndex = 0; ballIndex < balls.length; ballIndex++) {
                balls[ballIndex].draw(this.c);
            }
        }
    }

    drawNewBall = (player: Player, x: number, y: number, radius: number): void => {
        let ball = new Ball(player, x, y, radius);
        ball.draw(this.c);
    }

    message(divName: string, mesg: string): void {
        const elt = document.getElementById(divName);
        let connect4 = new Connect4();
        elt.innerText = mesg;
    }
}

export = Game;
