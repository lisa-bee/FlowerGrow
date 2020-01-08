interface BadCloudAssets {
    badCloudImg1: p5.Image,
    badCloudImg2: p5.Image,
    badCloudImg3: p5.Image,
}

class BadCloud {
    public badCloud: [p5.Image, p5.Image, p5.Image];
    public badCloudImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private radius: number;
    private _hasChangedWaterLevel: boolean;

    public constructor(x: number, y: number, width: number, height: number) {
        this.badCloud = [badCloudAssets.badCloudImg1, badCloudAssets.badCloudImg2, badCloudAssets.badCloudImg3];
        this.badCloudImg = random(this.badCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = 38;
        this._hasChangedWaterLevel = false;
    }

    public update(fallSpeedBadCloud: number) {
        this.move(fallSpeedBadCloud);
    }

    public checkCollisionWithFlower(flower: Flower, waterContainer: WaterContainer): boolean {
        const d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.radius + flower.radius) {
            flower.currentFlower = flowerAssets.flowerHurt;
            
            if (!flowerAssets.sadFlowerCloudSound.isPlaying()) {
                flowerAssets.sadFlowerCloudSound.play(0.5);
            }
            if (d < this.radius + flower.radius && waterContainer._waterlevel <= 0.25) {
                flower.currentFlower = flowerAssets.flower25Brown;
            }
            return true;
        }
        return false;
    }

    private move(fallSpeedBadCloud: number) {
        this.y = this.y + fallSpeedBadCloud;
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
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
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