let grassImg: p5.Image;

class Grass {
    public grassImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private time: number;

    public constructor(grassImg: p5.Image, x: number, y: number, width: number, height: number) {
        this.grassImg = grassImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0;
    }

    public draw() {
        push();
        image(this.grassImg, this.x, this.y, this.width, this.height);
        pop();
    }

    public update() {
        this.move();
    }

    private move() {
        this.time += deltaTime;
        if (this.time > 2200) {
            this.y = this.y + 1.5;
        }
    }
}