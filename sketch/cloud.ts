let badCloudImg: p5.Image;

class Cloud {

    public badCloudImg: p5.Image;
    public x: number;
    public y: number;
    public width: number;
    public height: number;


    public constructor(badCloudImg: p5.Image, x: number, y: number, width: number, height: number) {
        this.badCloudImg = badCloudImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    public update() {
        this.move();
    }

    private move() {
        this.y = this.y + 1.5;
        this.x = this.x + 2;
    }

    public draw() {
        return image(this.badCloudImg, this.x, this.y, this.width, this.height);
    }
}