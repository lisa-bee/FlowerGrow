let goodCloudImg: p5.Image;

class GoodCloud {

    public goodCloud: [p5.Image, p5.Image];
    public goodCloudImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private r: number;
    private time: number;
    private _hasChangedWaterLevel: boolean;

    public constructor(x: number, y: number, width: number, height: number) {

        this.goodCloud = [goodCloudImg, goodCloudImg];
        this.goodCloudImg = random(this.goodCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.r = 38;
        this.time = 0;
        this._hasChangedWaterLevel = false;
    }

    public update() {
        this.time += deltaTime;
        if (this.time > 15000) {
            this.move();
        }
    }

    public checkCollisionWithFlower(flower: Flower): boolean {
        const d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.r + flower.r) {
            flower.currentFlower = listOfFlowers.flower100;
            if (!happyFlowerSound.isPlaying()) {
                happyFlowerSound.play(0.5);
            }
            return true;
        }
        return false;
    }

    private move() {
        this.y = this.y + 2;
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

    public get hasChangedWaterLevel(): boolean {
        return this._hasChangedWaterLevel;
    }

    public set hasChangedWaterLevel(boolean) {
        this._hasChangedWaterLevel = boolean;
    }

    public get Y() {
        return this.y;
    }
}