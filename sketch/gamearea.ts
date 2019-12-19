class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
    }    
    
    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update()
    }
    
    public draw() {
        this.ground.draw();
        this.pot.draw();
        this.flower.draw();
    }
    
}

