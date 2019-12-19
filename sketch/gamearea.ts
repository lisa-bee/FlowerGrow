class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;

    constructor() {
<<<<<<< HEAD
        this.ground = new Grass(grassImg, 0, grassY, 600, 100);
        this.pot = new Pot(potImg, 135, potY, 125, 100);
=======
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
>>>>>>> 8b86ad26b77ec843a211a2d469ab9fe8a5ca31ff
    }

    public update() {
        this.flower.update()
    }


    public draw() {
        this.ground.draw();
        this.pot.draw();
        this.flower.draw();
    }

    public update() {
        this.ground.update();
        this.pot.update();
    }
}

