let happyFlowerSound: p5.SoundFile;
let sadFlowerCloudSound: p5.SoundFile;
let sadFlowerBeeSound: p5.SoundFile;
let leafLeft: p5.Image;
let leafRight: p5.Image;

interface Flowers {
    bud: p5.Image,
    flowerHurt: p5.Image,
    flower0: p5.Image,
    flower25: p5.Image,
    flower25Brown: p5.Image,
    flower75: p5.Image,
    flower100: p5.Image,
    flower100Brown: p5.Image
}

class Flower {
    public currentFlower: p5.Image;
    private time: number;
    public readonly radie: number;
    private history: p5.Vector[];
    private onlyRenderEachXPoint: number;
    private keepSamePointsForDifferentDrawsAdjuster: number;

    public constructor(x: number, y: number, private width: number, private height: number) {
        this.currentFlower = listOfFlowers.bud;
        this.time = 0;
        this.radie = 19;
        this.onlyRenderEachXPoint = 45;
        this.keepSamePointsForDifferentDrawsAdjuster = this.onlyRenderEachXPoint;
        this.history = [createVector(x, y)];
    }

    public get beginningOfStem() {
        return this.history[0];
    }

    public get endOfStem() {
        return this.history[this.history.length - 1];
    }

    public update(waterContainer: WaterContainer, fallSpeed: number) {
        const newX = this.handlePlayerInput();
        this.grow(newX, fallSpeed);
        this.move(fallSpeed);
        this.time += deltaTime;
        if (this.time > 1500) {
            if (waterContainer._waterlevel <= 1) {
                this.currentFlower = listOfFlowers.flower100;
            }
            if (waterContainer._waterlevel <= 0.75) {
                this.currentFlower = listOfFlowers.flower75;
            }
            if (waterContainer._waterlevel <= 0.5) {
                this.currentFlower = listOfFlowers.flower25;
            }
            if (waterContainer._waterlevel <= 0.25) {
                this.currentFlower = listOfFlowers.flower0;
            }
        }

    }

    private grow(x: number, fallSpeed: number) {

        const y = this.endOfStem.y - fallSpeed; // hastighet
        var v = createVector(x, y);
        this.history.push(v);
        const maxLength = 140;
        if (this.history.length > maxLength) {
            this.history.shift();
        }
    }

    private growingLeaf(positionX:number, positionY:number){

        if (this.time > 1500) {           
                image(leafLeft, positionX - 25, positionY - 13, 25, 12);
                image(leafRight, positionX + 2, positionY- 10, 25, 12);      
        }
    }

    private move(fallSpeed: number) {
        if (this.time > 2200) { // höjd
            for (const point of this.history) {
                point.y += fallSpeed; //hastighet
            }
        }
    }

    private handlePlayerInput(): number {
        let x = this.endOfStem.x
        if (this.time > 1500) {
            if (keyIsDown(65)) {
                x -= 3;
            }
            else if (keyIsDown(68)) {
                x += 3;
            }
            if (x > width - this.radie) {
                x = width - this.radie;
            }
            if (x < this.radie) {
                x = this.radie;
            }
        }
        return x;
    }

    private resolveHistoryPositionsToDraw(): Array<p5.Vector> {
        const pointsToDraw = [];
        pointsToDraw.push(this.beginningOfStem);
        for (let i = this.keepSamePointsForDifferentDrawsAdjuster % this.onlyRenderEachXPoint; i < this.history.length; i += this.onlyRenderEachXPoint) {
            pointsToDraw.push(this.history[i]);
        }
        pointsToDraw.push(this.endOfStem);

        this.keepSamePointsForDifferentDrawsAdjuster--;
        if (this.keepSamePointsForDifferentDrawsAdjuster === 0) this.keepSamePointsForDifferentDrawsAdjuster = this.onlyRenderEachXPoint;

        console.log(pointsToDraw)
        return pointsToDraw;
    }

    public draw() {
        stroke(100, 215, 46)
        strokeWeight(6);
        noFill();
        const historyPositionsToDraw = this.resolveHistoryPositionsToDraw();
        beginShape();
        curveVertex(historyPositionsToDraw[0].x, historyPositionsToDraw[0].y);
        for (let i = 0; i < historyPositionsToDraw.length; i++) {
            curveVertex(historyPositionsToDraw[i].x, historyPositionsToDraw[i].y);
            
           if(historyPositionsToDraw[i].y >= 320){
                this.growingLeaf(historyPositionsToDraw[i].x,historyPositionsToDraw[i].y)
           }   
        }
        curveVertex(historyPositionsToDraw[historyPositionsToDraw.length - 1].x - 1, historyPositionsToDraw[historyPositionsToDraw.length - 1].y - 1);
        endShape();
        push();
        pop();
        push();
        imageMode(CENTER);
        image(this.currentFlower, this.endOfStem.x, this.endOfStem.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.endOfStem.x, this.endOfStem.y, this.radie * 2, this.radie * 2);
        pop();

    }
}