class PlayerScore {
    private lastPrint: number;
    private timeElapsed: number;

    public constructor() {
        this.lastPrint = millis() - 3000;
        this.timeElapsed = millis() - this.lastPrint;
    }

    public printPlayerScore() {
        for (let i = 0; i <= 10; i++) {
            if (this.timeElapsed > 3000) {
                i++;
                console.log(this.timeElapsed);
                this.lastPrint = millis();
            }
        }
    }
}
