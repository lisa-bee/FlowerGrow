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
        strokeWeight(3);
        stroke(6, 61, 153);
        fill(50);
        rect(this.x, this.y, this.width, this.height, 10);
        noStroke();
        const c = color(31, 99, 224);
        fill(c);
        const steps = 10 * this.waterlevel;
        const stepSize = this.height / 10;
        for (let i = 1; i <= steps; i++) {
            if (i == 1) {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize) - 1.5, this.width - 3, stepSize, 0, 0, 100, 100);
            } else if (i == steps && this.waterlevel == 1) {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize) + 1.5, this.width - 3, stepSize, 100, 100, 0, 0);
            }
            else {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize), this.width - 3, stepSize);
            }
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

    public get _waterlevel() {
        return this.waterlevel;
    }

}