let beeLeftImage: p5.Image;
let beeRightImage: p5.Image;
let beeDeadImage: p5.Image;
let buzzingBee: p5.SoundFile;
let beeBuzzToSound: p5.SoundFile;
let beeBuzzAwaySound: p5.SoundFile;

function clone<T extends Object>(instance: T): T {
    const copy = new (instance.constructor as { new (): T })();
    (Object as any).assign(copy, instance);
    return copy;
}


class Bee {
    private img: p5.Image
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    public isBeeDead: boolean;
    private r: number;
    private beeHitFlower: boolean;
    private time: number;
    private _beeBuzzToSound: p5.SoundFile;
    private _stopBeeBuzzToSound: p5.SoundFile
    private _hasChangedWaterLevel: boolean;
    //private _beeOutOffGameArea: boolean;

    public constructor(x: any, y: any, width: number, height: number) {

        this.img = beeRightImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isBeeDead = false;
        this.r = this.width / 2;
        this.beeHitFlower = false;
        this.time = 0;
        this._beeBuzzToSound = clone(beeBuzzToSound);
        this._stopBeeBuzzToSound = clone(beeBuzzToSound);
        this._hasChangedWaterLevel = false;
        //this._beeOutOffGameArea = false;
    }

    public get isBeeClicked() {
        return this.isBeeDead;
    }

    public move() {
        this.y = this.y + random(-5, 5);

        if (this.isBeeDead) {
            this.y = this.y + 6;
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

        // if (game.beeSwarm.length >= 3) {
/*         if (this.y >= 630 || this.y <= -30){
            game.beeSwarm.shift();
        } */
    }

    public checkIfBeeOffScreen(): boolean{
        if (this.y >= 630 || this.y <= -30){
            //game.beeSwarm.shift();
            return true;
        }
        else{
            return false;
        }
    }

    public handleBuzzToSounds() {
        if (!this.isBeeDead && !this.beeHitFlower) {
            console.log('start')
            this._beeBuzzToSound.playMode('untilDone');
            this._beeBuzzToSound.play();
        }

        if (this.isBeeDead) {
            /*             game.beeSwarm.forEach(Bee => {
                            if(this.isBeeDead || this.beeHitFlower && this._beeBuzzToSound.isPlaying()){
                                this._beeBuzzToSound.stop();
                            }
                        console.log('stooop')
                        
                        }) */
        this._beeBuzzToSound.stop();
             if (game.beeSwarm.length >=2){
                this._stopBeeBuzzToSound.playMode('untilDone');
                this._stopBeeBuzzToSound.play();
            } 
            console.log('stooooop')
            }
        else if(this.beeHitFlower){
            if(this._beeBuzzToSound.isPlaying()){
                this._beeBuzzToSound.stop();
            }
            if (this._stopBeeBuzzToSound.isPlaying() && this.beeHitFlower || this.isBeeDead){
                this._stopBeeBuzzToSound.stop();
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

            if (d < this.r + flower.r) {
                flower.currentFlower = listOfFlowers.flowerHurt;
                this.beeHitFlower = true;

                if (!sadFlowerBeeSound.isPlaying() && !beeBuzzAwaySound.isPlaying()) {
                    console.log('buzzing away...')
                    sadFlowerBeeSound.play(0.5);
                    beeBuzzAwaySound.play();
                }
                if (d < this.r + flower.r && waterContainer._waterlevel <= 0.25) {
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

    public mouseClickedBee(mouseClickX: number, mouseClickY: number) {

        if (mouseIsPressed && mouseClickX > this.x && mouseClickX < this.x + this.width && mouseClickY > this.y && mouseClickY < this.y + this.height) {
            this.isBeeDead = true;
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

    public get hasChangedWaterLevel(): boolean {
        return this._hasChangedWaterLevel;
    }

    public set hasChangedWaterLevel(boolean) {
        this._hasChangedWaterLevel = boolean;
    }
}