let beeLeftImage: p5.Image;
let beeRightImage: p5.Image;
let beeDeadImage: p5.Image;

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
    }

    public get isBeeClicked() {
        return this.isBeeDead;
    }

    public move() {
        this.y = this.y + random(-5, 5);

        if (this.isBeeDead) {
            this.x = this.x + random(-5, 5)
            this.y = this.y + 3;
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

            if(this.beeHitFlower){
                this.buzzAwayAfterHitFlower(flower)
            }

        if (game.beeSwarm.length >= 5){
            game.beeSwarm.shift();
        } 
    }

    private buzzAwayAfterHitFlower(flower:Flower){
        this.time += deltaTime;
        if (this.time > 1000) {
            this.y -= 5;
            if (flower.endOfStem.x >= 200){
                this.x -= 4;
                this.img = beeLeftImage;
            }
            else{
                this.x += 4;
                this.img = beeRightImage;
            }
        }
    }

    public checkCollisionWithFlower(flower: Flower) {
        let d = dist(this.x + 25, this.y + 25, flower.endOfStem.x, flower.endOfStem.y);

        if (d < this.r + flower.r) {
            flower.currentFlower = listOfFlowers.flower25;
            this.beeHitFlower = true;
        }
    }

    public mouseClickedBee(mouseClickX: number, mouseClickY: number) {

        if (mouseIsPressed && mouseClickX > this.x && mouseClickX < this.x + this.width && mouseClickY > this.y && mouseClickY < this.y + this.height) {
            this.isBeeDead = true;
        }
    }

    public update() {
        this.move();
    }

    public draw() {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}





