class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    public badClouds: BadCloud[];
    private goodCloud: GoodCloud;
    public beeSwarm: Bee[];
    private beeSpawnTime: number;
    private cloudSpawnTime: number;
    private beeStartingPointX: [number, number];
    private beeStartingPointY: [number, number];
    private playerScore: PlayerScore;
    private instructionMenu: InstructionMenu;
    private waterContainer: WaterContainer;
    private isGameRunning: boolean;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.badClouds = [];
        this.goodCloud = new GoodCloud(goodCloudImg, 200, -120, 90, 100);
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.beeSwarm = [];
        this.beeSpawnTime = 0;
        this.cloudSpawnTime = 0;
        this.playerScore = new PlayerScore();
        this.instructionMenu = new InstructionMenu();
        this.waterContainer = new WaterContainer();
        this.isGameRunning = false;
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
            this.ground.update();
            this.pot.update();
            this.flower.update();
            this.goodCloud.update();
            this.spawnCloud();
            this.spawnBee();
    
            if (this.goodCloud.checkCollisionWithFlower(this.flower)) {
                if (this.goodCloud.hasChangedWaterLevel === false) {
                    this.waterContainer.increaseWaterLevel(0.1);
                    this.goodCloud.hasChangedWaterLevel = true;
                }
        }
    }
}


    private spawnCloud() {
        if (millis() >= 4000 + this.cloudSpawnTime) {
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.badClouds.push(new BadCloud(random(0, 400), random(-100, -700), 100, 70));
            this.cloudSpawnTime = millis();
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
            this.goodCloud.draw();
            this.playerScore.draw();
            this.waterContainer.draw();
            this.beeSwarm.forEach(bee => {
                bee.draw();
            })
            this.badClouds.forEach(badCloud => {
                badCloud.draw();
            })
        }
    }

}