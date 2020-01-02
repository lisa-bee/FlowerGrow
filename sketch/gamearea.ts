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
    private instructionMenu: InstructionMenu;
    private waterContainer: WaterContainer;
    private isGameRunning: boolean;

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
        this.instructionMenu = new InstructionMenu();
        this.waterContainer = new WaterContainer();
        this.isGameRunning = false;
    }


    public update() {
        if (!this.isGameRunning) {
            this.isGameRunning = this.instructionMenu.startGame();
        }
        if (this.isGameRunning) {
            this.ground.update();
            this.pot.update();
            this.flower.update();
            this.badCloud.update();
            this.goodCloud.update();
            this.spawnCloud();
            this.spawnBee();
        }
    }


    private spawnCloud() {
        this.badCloud.checkCollisionWithFlower(this.flower);
        this.goodCloud.checkCollisionWithFlower(this.flower);
        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde
    }

    public spawnBee() {

        if (millis() >= 20000 + this.beeSpawnTime) {
            this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
            this.beeSpawnTime = millis();
        }

        this.beeSwarm.forEach(bee => {
            bee.checkCollisionWithFlower(this.flower);
            bee.buzzTo(this.flower);
            bee.update();
            bee.mouseClickedBee(mouseX, mouseY);
            //bee.beeBuzzingSound();
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
            this.badCloud.draw();
            this.goodCloud.draw();
            this.playerScore.draw();
            this.waterContainer.draw();
            this.beeSwarm.forEach(bee => {
                bee.draw();
            })
        }
    }

}