interface Flowers {
    bud: p5.Image,
    flower0: p5.Image,
    flower25: p5.Image,
    flower75: p5.Image,
    flower100: p5.Image,
}

class Flower {
    private flower: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private time: number;

    public constructor(x: number, y: number, width: number, height: number) {
        this.flower = flowers.bud;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0
    }

    public update() {
        this.move()
        this.grow()
    }

    private grow() {
        this.time += deltaTime

        if (this.time > 5000) {
            this.flower = flowers.flower75
        }
    }

    private move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 6;
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            this.x += 6;
        }
        if (this.x > width - this.width) {
            this.x = width - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    public draw() {
        image(this.flower, this.x, this.y, this.width, this.height);
    }
}