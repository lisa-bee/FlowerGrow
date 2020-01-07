let goodCloudImg: p5.Image;

class GoodCloud {

    public goodCloud: [p5.Image, p5.Image];
    public goodCloudImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private radie: number;
    private _hasChangedWaterLevel: boolean;
    /* private time: number; */

    public constructor(x: number, y: number, width: number, height: number) {

        this.goodCloud = [goodCloudImg, goodCloudImg];
        this.goodCloudImg = random(this.goodCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radie = 38;
        this._hasChangedWaterLevel = false;
        /* this.time = 0; */
    }

    public update(fallSpeedGoodCloud: number) {
        this.move(fallSpeedGoodCloud);
    }

    public checkCollisionWithFlower(flower: Flower, waterContainer: WaterContainer): boolean {
        const d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.radie + flower.radie) {
            flower.currentFlower = listOfFlowers.flower100;
            if (!happyFlowerSound.isPlaying()) {
                happyFlowerSound.play(0.5);
            }
            if (d < this.radie + flower.radie && waterContainer._waterlevel <= 0.25) {
                flower.currentFlower = listOfFlowers.flower100Brown;
            }
            return true;
        }
        return false;
    }

    private move(fallSpeedGoodCloud: number) {
        this.y = this.y + fallSpeedGoodCloud;
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
        ellipse(this.x, this.y, this.radie * 2, this.radie * 2);
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