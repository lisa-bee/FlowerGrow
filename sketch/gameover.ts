class GameOver {
    private gameOverX: number;
    private gameOverY: number;
    private message: string;
    private boxX: number;
    private boxY: number;
    private boxWidth: number;
    private boxHeight: number;
    private radius: number;


    public constructor() {
        this.gameOverX = 200;
        this.gameOverY = 300;
        this.message = "Grow Over!\nYou grew "
        this.boxX = 200;
        this.boxY = 300;
        this.boxWidth = 300;
        this.boxHeight = 250;
        this.radius = 50;
    }

    public endGame(waterContainer: WaterContainer): boolean {
        if (waterContainer._waterlevel <= 0.1) {
            return true;
        }
        return false;
    }

    public draw(playerscore: PlayerScore) {
        push();
        strokeWeight(5);
        stroke("#9b4c00");
        fill(255, 255, 255, 90);
        tint(100);
        rectMode(CENTER);
        rect(this.boxX, this.boxY, this.boxWidth, this.boxHeight, this.radius);
        pop();
        push();
        textSize(30);
        fill("black");
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        text(this.message + playerscore._score + " m.", this.gameOverX, this.gameOverY, 300, 70);
        pop();
    }
}