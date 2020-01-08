interface BadCloudImages {
    badCloudImg1: p5.Image;
    badCloudImg2: p5.Image;
    badCloudImg3: p5.Image;
}

class BadCloud {

    public badCloud: [p5.Image, p5.Image, p5.Image];
    public badCloudImg: p5.Image;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private radie: number;
    private _hasChangedWaterLevel: boolean;
    /* private time: number; */
    


    public constructor(x: number, y: number, width: number, height: number) {

        this.badCloud = [badCloudImages.badCloudImg1, badCloudImages.badCloudImg2, badCloudImages.badCloudImg3];
        this.badCloudImg = random(this.badCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radie = 38;
        this._hasChangedWaterLevel = false;
        /* this.time = 0; */
    }

    
    public update(fallSpeedBadCloud: number) {
        this.move(fallSpeedBadCloud);
    }


    public checkCollisionWithFlower(flower: Flower, waterContainer: WaterContainer): boolean {
        const d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.radie + flower.radie) {
            
            flower.currentFlower = listOfFlowers.flowerHurt;
            if (!soundEffects.sadFlowerCloudSound.isPlaying()) {
                soundEffects.sadFlowerCloudSound.play(0.5);
            }
            if (d < this.radie + flower.radie && waterContainer._waterlevel <= 0.25) {
                flower.currentFlower = listOfFlowers.flower25Brown;
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