class WaterContainer {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    // public waterlevel: number;

    public constructor() {
        this.x = 25;
        this.y = 390;
        this.width = 25;
        this.height = 160;
        // this.waterlevel = number;
    }

    public draw() {
        const c = color(31, 99, 224);
        fill(c);
        rect(this.x, this.y, this.width, this.height, 100);
    }

}