interface Flowers {
    bud: p5.Image,
    flower0: p5.Image,
    flower25: p5.Image,
    flower75: p5.Image,
    flower100: p5.Image,
}

class Flower {
    public currentFlower: p5.Image;
    private time: number;
    public readonly r: number;
    private history: p5.Vector[];

    public constructor(x: number, y: number, private width: number, private height: number) {
        this.currentFlower = listOfFlowers.bud;
        this.time = 0;
        this.r = 36;
        this.history = [createVector(x, y)];
    }

    public get beginningOfStem() {
        return this.history[0];
    }

    public get endOfStem() {
        return this.history[this.history.length - 1]
    }

    public update() {
        const newX = this.handlePlayerInput();
        this.grow(newX);
        this.move();
    }

    private grow(x: number) {
        const y = this.endOfStem.y - 1.5;
        const maxLength = height / 2;
        var v = createVector(x, y);

        this.history.push(v);
        if (this.history.length > maxLength * 2) {
            this.history.shift();
        }

        this.time += deltaTime;

        if (this.time > 5000) {
            this.currentFlower = listOfFlowers.flower75;
        }
    }

    private move() {
        for (const point of this.history) {
            point.y += 1.5;
        }
    }

    private handlePlayerInput(): number {
        let x = this.endOfStem.x
        if (this.time > 5000) {
            if (keyIsDown(LEFT_ARROW)) {
                x -= 3;
            }
            else if (keyIsDown(RIGHT_ARROW)) {
                x += 3;
            }
            if (x > width - this.r) {
                x = width - this.r;
            }
            if (x < this.r) {
                x = this.r;
            }
        }
        return x;
    }

    private static readonly vertexHistoryJump = 100;
    private magicStuff = Flower.vertexHistoryJump;
    public draw() {
        stroke(100, 215, 46)
        strokeWeight(6);
        noFill();

        beginShape();
        curveVertex(this.beginningOfStem.x, this.beginningOfStem.y);
        curveVertex(this.beginningOfStem.x, this.beginningOfStem.y);
        for (let i = this.magicStuff % Flower.vertexHistoryJump; i < this.history.length; i += Flower.vertexHistoryJump) {
            const pos = this.history[i];
            curveVertex(pos.x, pos.y);
        }
        curveVertex(this.endOfStem.x, this.endOfStem.y);
        curveVertex(this.endOfStem.x, this.endOfStem.y);

        endShape();

        // for (let i = 0; i < pointsToDraw.length; i++) {
        //     const pos = pointsToDraw[i];
        //     if (i % 4 === 0) beginShape();
        //     curveVertex(pos.x, pos.y);
        //     if (i % 4 === 0) endShape();
        // }

        this.magicStuff--;
        if (this.magicStuff === 0) this.magicStuff = Flower.vertexHistoryJump;

        push();
        imageMode(CENTER);
        image(this.currentFlower, this.endOfStem.x, this.endOfStem.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.endOfStem.x, this.endOfStem.y, this.r * 2, this.r * 2);
        pop();
    }
}