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
        strokeWeight(3);
        stroke(100, 200, 0);
        fill(50);
        textSize(25);
        text(this.score + "m", 20, 580);
    }
    public draw() {
        this.printPlayerScore();
    }

    public get _score() {
        return this.score;
    }

}

