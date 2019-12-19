class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: Cloud;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
    }    
    
    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
    }
    
    public draw() {
        this.ground.draw();
        this.pot.draw();
        this.flower.draw();
        this.cloud.draw();
    }
    
}

