let potImg: p5.Image;

class Pot {

    public potImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private time: number;


    public constructor(potImg: p5.Image, x: number, y: number, width: number, height: number) {

        this.potImg = potImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0;
    }

    public draw() {
        push();
        image(this.potImg, this.x, this.y, this.width, this.height);
        pop();
    }

    public update() {
        this.move();
    }

    private move() {
        this.time += deltaTime;
        if (this.time > 1500) {
            this.y = this.y + 1.5;
        }
    }
}
