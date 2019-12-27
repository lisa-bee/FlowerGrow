class PlayerScore {
    private time: number;
    private score: number;

    public constructor() {
        this.time = 0;
        this.score = 0;
    }

    public printPlayerScore() {
        if (millis() >= 500 + this.time) {
            this.score++;
            this.time = millis();
        }
        fill(50);
        textSize(25);
        text(this.score + "m", 20, 580);
    }
    public draw() {
        this.printPlayerScore();
    }

}

