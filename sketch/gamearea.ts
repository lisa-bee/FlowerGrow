class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: Cloud;
    public beeSwarm: Bee[] ;
    private beeSpawnTime: number;
    private beeStartingPointX: [number, number];
    private beeStartingPointY: [number, number];
   // public collision: CollisionObject;

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
        
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.beeSwarm = [];
       // this.collision = new CollisionObject(); 
        this.beeSpawnTime = 0;    
    }

    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
        this.spawnCloud();
        this.spawnBee();
    }


    private spawnCloud() {
        this.cloud.checkCollisionWithFlower(this.flower);
        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde
    }

    public spawnBee(){
        
        if (millis() >= 5000 + this.beeSpawnTime) {
            this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
            this.beeSpawnTime = millis(); 
          }

            this.beeSwarm.forEach(bee  => {
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
        //this.collision.draw();

        this.beeSwarm.forEach(bee  => {
            bee.draw();
        })    
    }
}