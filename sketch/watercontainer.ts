class WaterContainer {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private waterlevel: number;

    public constructor() {
        this.x = 25;
        this.y = 390;
        this.width = 25;
        this.height = 160;
        this.waterlevel = 1; // %
    }

    public draw() {
        push();
        rect(this.x, this.y, this.width, this.height);
        noStroke();
        const c = color(31, 99, 224);
        fill(c);
        const steps = 10 * this.waterlevel;
        const stepSize = this.height / 10;
        for (let i = 1; i <= steps; i++) {
            rect(this.x, this.y + this.height - (i * stepSize), this.width, stepSize);
        }
        pop();
    }

    public decreaseWaterLevel(amount: number) {
        this.waterlevel -= amount;
    }

    public increaseWaterLevel(amount: number) {
        if (this.waterlevel + amount <= 1) {
            this.waterlevel += amount;
        }
    }

}