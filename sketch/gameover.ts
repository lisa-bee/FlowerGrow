class GameOver {
    private flower0X: number;
    private flower0Y: number;
    private flower0Height: number;
    private flower0Width: number;
    private gameOverX: number;
    private gameOverY: number;
    private message: string;
    private message2: string;
    private boxX: number;
    private boxY: number;
    private boxWidth: number;
    private boxHeight: number;
    private radius: number;


    public constructor() {
        this.flower0X = 200;
        this.flower0Y = 175;
        this.flower0Height = 110;
        this.flower0Width = 110;
        this.gameOverX = 200;
        this.gameOverY = 300;
        this.message = "Grow Over!\nYou grew ";
        this.message2 = "Press enter to play again."
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
        textSize(20);
        fill("black");
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        text(this.message + playerscore._score + " m. \n\n Press enter to play again.", this.gameOverX, this.gameOverY, 300, 70);
        text(this.message2, this.gameOverX, this.gameOverY, 200, 30)
        pop();
        push();
        imageMode(CENTER);
        image(listOfFlowers.flower0, this.flower0X, this.flower0Y, this.flower0Width, this.flower0Height);
        pop();
    }
}