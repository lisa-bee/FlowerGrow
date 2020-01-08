
class GameArea {
    private grass: Grass;
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
    public gameIsOver: boolean;
    private fallSpeedBadCloud: number;
    private fallSpeedGoodCloud: number;
    public keyPressed: boolean;

    constructor() {
        this.grass = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 600, 70, 70);
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
        this.fallSpeedBadCloud = 1.5;
        this.fallSpeedGoodCloud = 2;
        this.keyPressed = false;
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
            this.grass.update();
            this.pot.update();
            this.flower.update(this.waterContainer, this.fallSpeedBadCloud);
            this.spawnBadCloud();
            this.spawnGoodCloud();
            this.spawnBee();
            this.fallSpeedBadCloud *= 1.0002;
            this.fallSpeedGoodCloud *= 1.0002;
            this.time += deltaTime;
        }
    }

    private spawnGoodCloud() {

        if (millis() >= random(10000, 28000) + this.goodCloudSpawnTime) {
            this.goodClouds.push(new GoodCloud(random(0, 400), -100, 90, 110));
            this.goodCloudSpawnTime = millis();
        }

        for (const goodCloud of this.goodClouds) {
            if (goodCloud.Y > height + 800) {
                this.goodClouds.shift();
            }
            if (goodCloud.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                if (goodCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.increaseWaterLevel(0.2);
                    goodCloud.hasChangedWaterLevel = true;
                }
            }
        }
    }


    private spawnBadCloud() {
        if (this.time >= 50000) {
            if (millis() >= 900 + this.badCloudSpawnTime) {
                this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
                this.badCloudSpawnTime = millis();
            }
        }
        if (this.time >= 35000) {
            if (millis() >= 900 + this.badCloudSpawnTime) {
                this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
                this.badCloudSpawnTime = millis();
            }
        }

        if (this.time >= 0) {
            if (millis() >= 1800 + this.badCloudSpawnTime) {
                this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
                this.badCloudSpawnTime = millis();
            }
        }

        for (const badCloud of this.badClouds) {
            if (badCloud.Y > height + 800) {
                this.badClouds.shift();
            }
            if (badCloud.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                if (badCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.decreaseWaterLevel(0.2);
                    badCloud.hasChangedWaterLevel = true;
                }
            }
        }
    }

    public spawnBee() {

        if (this.time > 100000) {
            if (millis() >= 4000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }

        else if (this.time > 80000) {
            if (millis() >= 4000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }

        else if (this.time > 40000) {
            if (millis() >= 5000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }

        else if (this.time > 7000) {
            if (millis() >= 10000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }

        this.beeSwarm.forEach(bee => {
            bee.checkCollisionWithFlower(this.flower, this.waterContainer);
            bee.buzzTo(this.flower);
            bee.update();
            bee.mouseClickedBee(mouseX, mouseY);
            if (bee.checkCollisionWithFlower(this.flower, this.waterContainer)) {
                if (bee.hasChangedWaterLevel === false) {
                    this.waterContainer.decreaseWaterLevel(0.2);
                    bee.hasChangedWaterLevel = true;
                }
            }

            if (bee.checkIfBeeOffScreen() == true) {
                this.deleteBeeFromArray();
            }
        })
    }

    private deleteBeeFromArray() {
        let indexPosition = this.checkBeeToBeDeleted()
        this.beeSwarm.splice(indexPosition, 1);
    }

    private checkBeeToBeDeleted(): number {
        let index;
        for (index = 0; index < this.beeSwarm.length; index++) {
            if (this.beeSwarm[index].checkIfBeeOffScreen() == true) {
                break;
            }
        }
        return index;
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
            this.grass.draw();
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