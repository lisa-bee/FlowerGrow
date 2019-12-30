class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private badCloud: BadCloud;
    private goodCloud: GoodCloud;
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
        this.badCloud = new BadCloud(badCloudImg1, 50, -120, 100, 70);
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
        this.badCloud.update();
        this.goodCloud.update();
        this.spawnCloud();
        this.spawnBee();

        if (this.badCloud.checkCollisionWithFlower(this.flower)) {
            if (this.badCloud.hasChangedWaterLevel === false) {
                this.waterContainer.decreaseWaterLevel(0.2);
                this.badCloud.hasChangedWaterLevel = true;
            }
        }

        if (this.goodCloud.checkCollisionWithFlower(this.flower)) {
            if (this.goodCloud.hasChangedWaterLevel === false) {
                this.waterContainer.increaseWaterLevel(0.2);
                this.goodCloud.hasChangedWaterLevel = true;
            }
        }
    }


    private spawnCloud() {

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
            if (bee.checkCollisionWithFlower(this.flower)) {
                if (bee.hasChangedWaterLevel === false) {
                    this.waterContainer.decreaseWaterLevel(0.2);
                    bee.hasChangedWaterLevel = true;
                }
            }
        })
    }

    public draw() {
        this.flower.draw();
        this.ground.draw();
        this.pot.draw();
        this.badCloud.draw();
        this.goodCloud.draw();
        this.playerScore.draw();
        this.waterContainer.draw();
        this.beeSwarm.forEach(bee => {
            bee.draw();
        })
    }
}