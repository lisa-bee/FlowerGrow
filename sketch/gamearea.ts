class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private bee: Bee;
    public collision: CollisionObject;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.bee = new Bee(random(startingPointX), random (startingPointY), 50, 50);
    }

    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update()
        this.bee.update();
        this.collision = new CollisionObject();
    }

    public update() {
        this.flower.update();
    }

    public draw() {
        this.ground.draw();
        this.pot.draw();     
        this.flower.draw();
        this.bee.draw();
        this.collision.draw();
    }

}

