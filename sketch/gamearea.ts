class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    public badClouds: BadCloud[];
    private goodClouds: GoodCloud[];
    public beeSwarm: Bee[];
    private beeSpawnTime: number;
    private badCloudSpawnTime: number;
    private goodCloudSpawnTime: number;
    private beeStartingPointX: [number, number];
    private beeStartingPointY: [number, number];
    private playerScore: PlayerScore;
    private instructionMenu: InstructionMenu;
    private waterContainer: WaterContainer;
    private isGameRunning: boolean;
    private delayTime: number;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.badClouds = [];
        this.goodClouds = [];
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.beeSwarm = [];
        this.beeSpawnTime = 0;
        this.badCloudSpawnTime = 0;
        this.goodCloudSpawnTime = 0;
        this.playerScore = new PlayerScore();
        this.instructionMenu = new InstructionMenu();
        this.waterContainer = new WaterContainer();
        this.isGameRunning = false;
        this.delayTime = 0;
    }


    public update() {
        if (!this.isGameRunning) {
            this.isGameRunning = this.instructionMenu.startGame();
        }
        if (this.isGameRunning) {
            for (let i = 0; i < this.badClouds.length; i++) {
                let badCloud = this.badClouds[i];
                badCloud.update();
            }
            for (let i = 0; i < this.goodClouds.length; i++) {
                let goodCloud = this.goodClouds[i];
                goodCloud.update();
            }
            this.ground.update();
            this.pot.update();
            this.flower.update();
            this.spawnBadCloud();
            this.spawnGoodCloud();
            this.spawnBee();
        }
    }



    private spawnGoodCloud() {

        if (millis() >= random(10000, 20000) + this.goodCloudSpawnTime) {
            this.goodClouds.push(new GoodCloud(random(0, 400), -100, 90, 110));
            this.goodCloudSpawnTime = millis();
        }

        for (const goodCloud of this.goodClouds) {
            if (goodCloud.Y > height + 800) {
                this.goodClouds.shift();
            } // tar bort första molnet i arrayen
            if (goodCloud.checkCollisionWithFlower(this.flower)) {
                if (goodCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.increaseWaterLevel(0.1);
                    goodCloud.hasChangedWaterLevel = true;

                }
                goodCloud.update();
            }
        }

        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde

    }


    private spawnBadCloud() {
        if (millis() >= 4000 + this.badCloudSpawnTime) {
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.badCloudSpawnTime = millis();
        }

        for (const badCloud of this.badClouds) {
            if (badCloud.Y > height + 800) {
                this.badClouds.shift();
            } // tar bort första molnet i arrayen
            if (badCloud.checkCollisionWithFlower(this.flower)) {
                if (badCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.decreaseWaterLevel(0.1);
                    badCloud.hasChangedWaterLevel = true;

                }
                badCloud.update();

            }
        }

        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde
    }

    public delayOfSpawnClouds() {
        this.delayTime += deltaTime;
        if (this.delayTime > 6000) {
            badCloud.update()
        }
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
                    this.waterContainer.decreaseWaterLevel(0.1);
                    bee.hasChangedWaterLevel = true;
                }
            }
        })
    }

    public draw() {
        if (!this.isGameRunning) {
            this.instructionMenu.draw();
        }
        else if (this.isGameRunning) {
            this.flower.draw();
            this.ground.draw();
            this.pot.draw();
            this.playerScore.draw();
            this.waterContainer.draw();
            this.beeSwarm.forEach(bee => {
                bee.draw();
            })
            this.badClouds.forEach(badCloud => {
                badCloud.draw();
            })
            this.goodClouds.forEach(goodCloud => {
                goodCloud.draw();
            })
        }
    }

}