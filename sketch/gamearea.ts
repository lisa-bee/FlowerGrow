class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: Cloud;
    private bee: Bee;
    public collision: CollisionObject;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
        this.bee = new Bee(random(startingPointX), random(startingPointY), 50, 50);
        this.collision = new CollisionObject();
    }


    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
        this.bee.update();
        this.spawnCloud()
    }

    private spawnCloud(){
        this.cloud.checkCollisionWithFlower(this.flower)
        this.spawnBee()

        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde
    }



    private spawnBee() {
        // Skapa en geting och lägg till i this.bees arrayen
        // Se till att g¨ra detta med ett visst intervall

    }

    public draw() {
        this.flower.draw();
        this.ground.draw();
        this.pot.draw();
        this.cloud.draw();
        this.bee.draw();
        this.collision.draw();
    }

}


