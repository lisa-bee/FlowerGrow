class gameArea {
    private ground: Grass;
    private pot: Pot;

    constructor() {
        this.ground = new Grass(grassImg, 0, grassY, 600, 100);
        this.pot = new Pot(potImg, 135, potY, 125, 100);
    }
   

    public draw() {
        this.ground.draw();
        this.pot.draw();
    }

    public update() {
        this.ground.update();
        this.pot.update();
    }
}

