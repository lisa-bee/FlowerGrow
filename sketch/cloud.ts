let badCloudImg: p5.Image;

class Cloud {

    public badCloudImg: p5.Image;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public r: number;


    public constructor(badCloudImg: p5.Image, x: number, y: number, width: number, height: number) {
        this.badCloudImg = badCloudImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.r = 38;
    }

    public update() {
        this.move();
    }


    public checkCollisionWithFlower(flower: Flower) {
        var d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.r + flower.r) {

            flower.currentFlower = listOfFlowers.flower25;
        }
    }

    private move() {
        this.y = this.y + 1.5;
        if (this.y > height) {
            this.y = -100;
            this.x = random(400);
        }
    }

    public draw() {
        push();
        imageMode(CENTER);
        image(this.badCloudImg, this.x, this.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        pop();

    }
}