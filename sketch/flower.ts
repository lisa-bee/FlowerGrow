interface Flowers {
    bud: p5.Image,
    flower0: p5.Image,
    flower25: p5.Image,
    flower75: p5.Image,
    flower100: p5.Image,
}

class Flower {
    public currentFlower: p5.Image;
    private width: number;
    private height: number;
    private time: number;
    private _r: number;
    private history: p5.Vector[];

    public constructor(x: number, y: number, width: number, height: number) {
        this.currentFlower = listOfFlowers.bud;
        this.width = width;
        this.height = height;
        this.time = 0;
        this._r = 36;
        this.history = [createVector(x, y)];
    }

    public get r() {
        return this._r;
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
        var v = createVector(x, y);

        this.history.push(v);

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

    public draw() {
        noFill();
        stroke(100, 215, 46);
        strokeWeight(1);

        for (var i = 0; i < this.history.length; i++) {
            beginShape();
            curveVertex(this.history[i].x, this.history[i].y);
            curveVertex(this.history[i + -1].x, this.history[i + -1].y);
            curveVertex(this.history[i + -2].x, this.history[i + -2].y);
            curveVertex(this.history[i + -3].x, this.history[i + -3].y);
            endShape();

        }


        // for (var i = 0; i < this.history.length; i++) {
        //     var pos = this.history[i];
        //     fill(100, 215, 46);
        //     noStroke();
        //     ellipse(pos.x, pos.y, 5, 5);

        // }

        push();
        imageMode(CENTER);
        image(this.currentFlower, this.endOfStem.x, this.endOfStem.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.endOfStem.x, this.endOfStem.y, this._r * 2, this._r * 2);
        pop();
    }
}