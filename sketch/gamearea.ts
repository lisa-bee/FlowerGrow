class gameArea {
    private ground: Grass;
    private pot: Pot;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
    }
   

    public draw() {
        this.ground.draw();
        this.pot.draw();
    }

}

