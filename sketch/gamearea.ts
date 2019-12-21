class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: Cloud;
    private bee: Bee;
    private beeSwarm: [Bee];
    private time: number;
    //private beeSwarm: [];
    public collision: CollisionObject;
    private beeStartingPointX: [number, number]
    private beeStartingPointY: [number, number];

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        this.bee = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50);
        this.beeSwarm = [this.bee = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50)];
        this.time = 0;
        this.collision = new CollisionObject(); 
        
    }

    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
        this.bee.update();
        this.spawnCloud()
        
        this.bee.mouseClickedBee(mouseX, mouseY);
    }

    private spawnCloud(){
        this.cloud.checkCollisionWithFlower(this.flower);
        this.bee.checkCollisionWithFlower(this.flower);
        //this.bee.buzzTo(this.flower);
        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde

    }

    private spawnBee() {
        
        this.time += deltaTime
        if(this.time > 3000){
            this.bee.buzzTo(this.flower);
            this.bee.draw();   
        }
/*         
        for (let index = 0; index < ; index++) {
            this.beeSwarm[index] = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50);
                return this.beeSwarm[index].draw(); 
         
        //this.bee.draw();
        // Skapa en geting och lägg till i this.bees arrayen
        // Se till att g¨ra detta med ett visst intervall
/*         if (deltaTime == 500){
            this.bee.draw();
            //this.beeSwarm.push();
        } */ 

    
}

    public draw() {
        this.flower.draw();
        this.ground.draw();
        this.pot.draw();
        this.cloud.draw();
        this.spawnBee();
/*         for (let index = 0; index < this.beeSwarm.length; index++) {
            this.beeSwarm[index].draw();  
        } */
        //this.bee.draw();
        this.collision.draw(); 
    }
}


