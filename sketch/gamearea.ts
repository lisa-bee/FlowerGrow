class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private bee: Bee;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.bee = new Bee(mouseY, mouseX, 40, 50, false);
    }

    public update() {
        this.flower.update()
        this.bee.update();
    }


    public draw() {
        this.ground.draw();
        this.pot.draw();
        this.bee.draw();
        this.flower.draw();
    }

}

