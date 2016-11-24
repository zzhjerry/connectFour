enum Player {
    Red,
    Blue,
};

class Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    readonly pi: number = Math.PI;

    constructor(player: Player, x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        switch (player) {
            case Player.Red:
                this.color = "red";
                break;
            case Player.Blue:
                this.color = "blue";
                break;
            default:
                throw new RangeError(`Player ${player} can only be 0 or 1`);
        }
    }

    draw = (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * this.pi);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

export { Player };
export { Ball };
