class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: BadCloud;
    public goodCloud: GoodCloud;
    public beeSwarm: Bee[];
    private beeSpawnTime: number;
    private beeStartingPointX: [number, number];
    private beeStartingPointY: [number, number];
    private playerScore: PlayerScore;
    private waterContainer: WaterContainer;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new BadCloud(badCloudImg1, 50, -120, 100, 70);
        this.goodCloud = new GoodCloud(goodCloudImg, 200, -120, 90, 100);
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.beeSwarm = [];
        this.beeSpawnTime = 0;
        this.playerScore = new PlayerScore();
        this.waterContainer = new WaterContainer();
    }

    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
        this.goodCloud.update();
        this.spawnCloud();
        this.spawnBee();
    }


    private spawnCloud() {
        this.cloud.checkCollisionWithFlower(this.flower);
        this.goodCloud.checkCollisionWithFlower(this.flower);
        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde
    }

    public spawnBee() {

        if (millis() >= 5000 + this.beeSpawnTime) {
            this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
            this.beeSpawnTime = millis();
        }

        this.beeSwarm.forEach(bee => {
            bee.checkCollisionWithFlower(this.flower);
            bee.buzzTo(this.flower);
            bee.update();
            bee.mouseClickedBee(mouseX, mouseY);
        })
    }

    public draw() {
        this.flower.draw();
        this.ground.draw();
        this.pot.draw();
        this.cloud.draw();
        this.goodCloud.draw();
        this.playerScore.draw();
        this.waterContainer.draw();
        this.beeSwarm.forEach(bee => {
            bee.draw();
        })
    }
}