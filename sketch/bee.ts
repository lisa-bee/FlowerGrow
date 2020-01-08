let beeLeftImage: p5.Image;
let beeRightImage: p5.Image;
let beeDeadImage: p5.Image;
let buzzingBee: p5.SoundFile;
let beeBuzzToSound: p5.SoundFile;
let beeBuzzAwaySound: p5.SoundFile;

function clone<T extends Object>(instance: T): T {
    const copy = new (instance.constructor as { new(): T })();
    (Object as any).assign(copy, instance);
    return copy;
}

class Bee {
    private img: p5.Image
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private isBeeDead: boolean;
    private radie: number;
    private beeHitFlower: boolean;
    private time: number;
    private _beeBuzzToSound: p5.SoundFile;
    private _secundaryBeeSound: p5.SoundFile
    private _hasChangedWaterLevel: boolean;

    public constructor(x: any, y: any, width: number, height: number) {
        this.img = beeRightImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isBeeDead = false;
        this.radie = this.width / 2;
        this.beeHitFlower = false;
        this.time = 0;
        this._beeBuzzToSound = clone(beeBuzzToSound);
        this._secundaryBeeSound = clone(beeBuzzToSound);
        this._hasChangedWaterLevel = false;
    }

    public move() {
        this.y = this.y + random(-5, 5);

        if (this.isBeeDead) {
            this.y = this.y + 8;
        }
    }

    public buzzTo(flower: Flower) {
        let endingPointY = 275;

        if (this.x == flower.endOfStem.x - 25) {
            this.x = this.x;
        }
        else {
            if (flower.endOfStem.x - 25 <= this.x) {
                this.x -= 1;
                this.img = beeLeftImage;
            }
            else {
                this.x += 1;
                this.img = beeRightImage;
            }
        }

        if (this.y == endingPointY) {
            this.y = this.y;
        }
        else {
            if (endingPointY <= this.y) {
                this.y -= 1;
            }
            else {
                this.y += 1;
            }
        }

        if (this.isBeeDead) {
            this.img = beeDeadImage;
        }

        if (this.beeHitFlower && !this.isBeeDead) {
            this.buzzAwayAfterHitFlower(flower)
        }
    }

    private handleBuzzToSounds() {
        if (!this.isBeeDead && !this.beeHitFlower) {
            this._beeBuzzToSound.playMode('untilDone');
            this._beeBuzzToSound.play();
        }

        if (this.isBeeDead) {
            this._beeBuzzToSound.stop();
            if (game.beeSwarm.length > 1 && !this._beeBuzzToSound.isPlaying()) {
                this._secundaryBeeSound.playMode('untilDone');
                this._secundaryBeeSound.play();
            }

            else if (game.beeSwarm.length == 0) {
                this._secundaryBeeSound.stop()
            }
        }
        if (this.beeHitFlower) {
            if (this._beeBuzzToSound.isPlaying()) {
                this._beeBuzzToSound.stop();
            }

            if (this._secundaryBeeSound.isPlaying() && this.beeHitFlower || this.isBeeDead) {
                this._secundaryBeeSound.stop();
            }
        }
    }

    private buzzAwayAfterHitFlower(flower: Flower) {
        this.time += deltaTime;
        if (this.time > 1000) {
            this.y -= 5;
            if (flower.endOfStem.x >= 200) {
                this.x -= 4;
                this.img = beeLeftImage;
            }
            else {
                this.x += 4;
                this.img = beeRightImage;
            }
        }
    }

    public checkCollisionWithFlower(flower: Flower, waterContainer: WaterContainer): boolean {

        if (!this.isBeeDead) {
            let d = dist(this.x + 25, this.y + 25, flower.endOfStem.x, flower.endOfStem.y);

            if (d < this.radie + flower.radie) {
                flower.currentFlower = listOfFlowers.flowerHurt;
                this.beeHitFlower = true;

                if (!sadFlowerBeeSound.isPlaying() && !beeBuzzAwaySound.isPlaying()) {
                    sadFlowerBeeSound.play(0.5);
                    beeBuzzAwaySound.play();
                }
                if (d < this.radie + flower.radie && waterContainer._waterlevel <= 0.25) {
                    flower.currentFlower = listOfFlowers.flower25Brown;
                }
                return true;
            }
        }

        else {
            beeBuzzAwaySound.stop();
        }

        return false;
    }

    public get hasChangedWaterLevel(): boolean {
        return this._hasChangedWaterLevel;
    }

    public set hasChangedWaterLevel(boolean) {
        this._hasChangedWaterLevel = boolean;
    }

    public mouseClickedBee(mouseClickX: number, mouseClickY: number) {

        if (mouseIsPressed && mouseClickX > this.x && mouseClickX < this.x + this.width && mouseClickY > this.y && mouseClickY < this.y + this.height) {
            this.isBeeDead = true;
        }
    }

    public checkIfBeeOffScreen(): boolean {
        if (this.y >= 630 || this.y <= -30) {
            return true;
        }
        else {
            return false;
        }
    }

    public update() {
        this.move();
        this.mouseClickedBee(mouseX, mouseY);
        this.handleBuzzToSounds();
    }

    public draw() {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}