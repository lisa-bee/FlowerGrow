class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    public badClouds: BadCloud[];
    private goodClouds: GoodCloud[];
    public beeSwarm: Bee[];
    private time: number;
    private beeSpawnTime: number;
    private badCloudSpawnTime: number;
    private goodCloudSpawnTime: number;
    private beeStartingPointX: [number, number];
    private beeStartingPointY: [number, number];
    private playerScore: PlayerScore;
    private instructionMenu: InstructionMenu;
    private waterContainer: WaterContainer;
    private isGameRunning: boolean;
    private gameOver: GameOver;
    private gameIsOver: boolean;
    private moreBadCloudsTime: number;
    private fallSpeedBadCloud: number;
    private fallSpeedGoodCloud: number;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 550, 70, 70);
        this.badClouds = [];
        this.goodClouds = [];
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.beeSwarm = [];
        this.time = 0;
        this.beeSpawnTime = 0;
        this.badCloudSpawnTime = 0;
        this.goodCloudSpawnTime = 0;
        this.playerScore = new PlayerScore();
        this.instructionMenu = new InstructionMenu();
        this.waterContainer = new WaterContainer();
        this.isGameRunning = false;
        this.gameOver = new GameOver;
        this.gameIsOver = false;
        this.moreBadCloudsTime = 30000;
        this.fallSpeedBadCloud = 1.5;
        this.fallSpeedGoodCloud = 2;
    }


    public update() {
        this.gameIsOver = this.gameOver.endGame(this.waterContainer);
        if (!this.isGameRunning) {
            this.isGameRunning = this.instructionMenu.startGame();
        }
        if (this.isGameRunning && !this.gameIsOver) {
            for (let i = 0; i < this.badClouds.length; i++) {
                let badCloud = this.badClouds[i];
                badCloud.update(this.fallSpeedBadCloud);
            }
            for (let i = 0; i < this.goodClouds.length; i++) {
                let goodCloud = this.goodClouds[i];
                goodCloud.update(this.fallSpeedGoodCloud);
            }
            this.ground.update();
            this.pot.update();
            this.flower.update(this.waterContainer, this.fallSpeedBadCloud);
            this.spawnBadCloud();
            this.spawnGoodCloud();
            this.spawnBee();
            this.spawnMoreBadClouds();
            this.fallSpeedBadCloud *= 1.0002;
            this.fallSpeedGoodCloud *= 1.0002;
            this.time += deltaTime;
        }
    }

    private spawnGoodCloud() {

        if (millis() >= random(15000, 30000) + this.goodCloudSpawnTime) {
            this.goodClouds.push(new GoodCloud(random(0, 400), -100, 90, 110));
            this.goodCloudSpawnTime = millis();
        }

        for (const goodCloud of this.goodClouds) {
            if (goodCloud.Y > height + 800) {
                this.goodClouds.shift();
            } // tar bort första molnet i arrayen
            if (goodCloud.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                if (goodCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.increaseWaterLevel(0.2);
                    goodCloud.hasChangedWaterLevel = true;
                }
            }
        }

        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde

    }


    private spawnBadCloud() {
        if (millis() >= 1800 + this.badCloudSpawnTime) {
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.badCloudSpawnTime = millis();
        }

        for (const badCloud of this.badClouds) {
            if (badCloud.Y > height + 800) {
                this.badClouds.shift();
            } // tar bort första molnet i arrayen
            if (badCloud.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                if (badCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.decreaseWaterLevel(0.2);
                    badCloud.hasChangedWaterLevel = true;
                }
            }
        }
    }

    private spawnMoreBadClouds() {
        if (millis() >= 900 + this.moreBadCloudsTime) {
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.moreBadCloudsTime = millis();
        }
        for (const badCloud of this.badClouds) {
            if (badCloud.Y > height + 800) {
                this.badClouds.shift();
            } // tar bort första molnet i arrayen
        }
    }


    public spawnBee() {
        if (this.time > 7000) {

            if (millis() >= 10000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }

            this.beeSwarm.forEach(bee => {
                bee.checkCollisionWithFlower(this.flower, this.waterContainer);
                bee.buzzTo(this.flower);
                bee.update();
                //bee.mouseClickedBee(mouseX, mouseY);
                if (bee.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                    if (bee.hasChangedWaterLevel === false) {
                        this.waterContainer.decreaseWaterLevel(0.2);
                        bee.hasChangedWaterLevel = true;
                    }
                }
            })

        }
    }

    public draw() {
        if (!this.isGameRunning) {
            this.instructionMenu.draw();
        }
        if (this.gameIsOver) {
            this.gameOver.draw(this.playerScore);
        }
        else if (this.isGameRunning && !this.gameIsOver) {
            this.flower.draw();
            this.ground.draw();
            this.pot.draw();
            this.beeSwarm.forEach(bee => {
                bee.draw();
            })
            this.badClouds.forEach(badCloud => {
                badCloud.draw();
            })
            this.goodClouds.forEach(goodCloud => {
                goodCloud.draw();
            })
            this.playerScore.draw();
            this.waterContainer.draw();
        }
    }

}