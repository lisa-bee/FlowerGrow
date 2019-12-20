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
        this.r = 50;
    }


    public update() {
        this.move();
       /*  this.collisionCalc(); */
    }

   /*  private collisionCalc() {
        var d = dist(this.x, this.y, collisionobjectX, collisionobjectY);
        if (d < this.r + collisionobjectR) {
            this.flower = flowers.bud;
        }
    } */

    private move() {
        this.y = this.y + 1.5;
        if (this.y > height) {
            this.y = -100;
            this.x = random(500);
        }
    }

    public draw() {
        push();
        image(this.badCloudImg, this.x, this.y, this.width, this.height);
        pop()
       /*  push()
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        pop(); */

    }
}