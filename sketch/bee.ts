let beeLeftImage: p5.Image;
let beeRightImage: p5.Image;
let beeDeadImage: p5.Image;


//let endingPointX = 200;

class Bee {
    private img: p5.Image
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    public isBeeDead: boolean;
    private r: number;

    public constructor(x: any, y: any, width: number, height: number) {

        this.img = beeRightImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isBeeDead = false;
        this.r = this.width/2;
    }

    public get isBeeClicked() {
        return this.isBeeDead;
    }

    public move() {
        //this.x = this.x + random(-1, 1);
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

        if(this.isBeeDead){
            this.img = beeDeadImage;
            if (game.beeSwarm.length >= 5){
                game.beeSwarm.shift();
            }
            
        }

    }

    public checkCollisionWithFlower(flower: Flower) {
        let d = dist(this.x + 25, this.y + 25, flower.endOfStem.x, flower.endOfStem.y);

        if (d < this.r + flower.r) {
            flower.flower = flowers.flower25
        }
    }

    public mouseClickedBee(mouseClickX:number, mouseClickY:number){
        
        if(mouseIsPressed && mouseClickX > this.x && mouseClickX < this.x + this.width && mouseClickY > this.y && mouseClickY < this.y + this.height){  
            
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





