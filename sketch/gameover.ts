class GameOver {
    private gameOverX: number;
    private gameOverY: number;
    private message: string;

    public constructor() {
        this.gameOverX = 200;
        this.gameOverY = 300;
        this.message = "Game Over!"
    }

    public gameIsOver() {

    }

    public draw() {
        push();
        textSize(25);
        fill("black");
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        text(this.message, this.gameOverX, this.gameOverY);
        pop();
    }
}