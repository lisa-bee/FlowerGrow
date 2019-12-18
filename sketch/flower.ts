let flower75: p5.Image;
let flowerX = 187.5;

class Flower {
    private flower75: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    public constructor(flower75: p5.Image, x: number, y: number, width: number, height: number) {
        this.flower75 = flower75;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public move() {
        if (keyIsDown(LEFT_ARROW)) {
            flowerX = flowerX - 6;
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            flowerX = flowerX + 6;
        }
        if (flowerX > 375) {
            flowerX = 375;
        }
        if (flowerX < 0) {
            flowerX = 0;
        }
    }

    public draw() {
        const { flower75, x, y, width, height } = this;
        image(flower75, x, y, width, height);
    }
}