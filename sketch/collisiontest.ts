class CollisionObject {
    private x: number;
    private y: number;
    private r: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 36;
    }

    public draw() {
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }
}