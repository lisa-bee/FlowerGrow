let goodCloudImg: p5.Image;

class GoodCloud {

public goodCloudImg: p5.Image;
public x: number;
public y: number;
public width: number;
public height: number;
public r: number;
public time: number;


public constructor(goodCloudImg: p5.Image, x: number, y: number, width: number, height: number) {

    this.goodCloudImg = goodCloudImg;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.r = 38;
    this.time = 0;

}



public update() {
    this.time += deltaTime;
    if (this.time > 15000) {
        this.move();
    }
}

public checkCollisionWithFlower(flower: Flower) {
    var d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
    if (d < this.r + flower.r) {

        flower.currentFlower = listOfFlowers.flower100;
    }
}


private move() {
    this.y = this.y + 2;
    if (this.y > height * 4) {
        this.y = -100;
        this.x = random(30, 370);
    }
}


public draw() {
    push();
    imageMode(CENTER);
    image(this.goodCloudImg, this.x, this.y, this.width, this.height);
    pop();
    push();
    noFill();
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    pop();

}
}