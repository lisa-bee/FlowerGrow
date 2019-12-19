var collisionobjectX: number = 50;
var collisionobjectY: number = 300;
var collisionobjectR: number = 36;

class CollisionObject {
    public x: number;
    public y: number;
    private r: number;

    public constructor() {
        this.x = collisionobjectX;
        this.y = collisionobjectY;
        this.r = collisionobjectR;
    }

    public draw() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }
}