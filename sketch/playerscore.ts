class PlayerScore {
    private time: number;
    private score: number;

    public constructor() {
        this.time = 0;
        this.score = 0;
    }

    public printPlayerScore() {
        if (millis() >= 1000 + this.time) {
            this.score++;
            this.time = millis();
        }
        textSize(32);
        text(this.score, 10, 30);
    }
    public draw() {
        this.printPlayerScore();
    }

}

