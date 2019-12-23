class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
    private cloud: Cloud;
    //public bee: Bee;
    private beeSwarm: Bee[] ;
    private time: number;
    private spawnTime: number;
    public collision: CollisionObject;
    private beeStartingPointX: [number, number]
    private beeStartingPointY: [number, number];
    //private spawnIndex: number;


    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
        this.beeStartingPointX = [0, 400];
        this.beeStartingPointY = [0, 600];
        //this.bee = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50);
        this.beeSwarm = [new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50)];
        this.collision = new CollisionObject(); 
        this.time = 0;
        this.spawnTime = 0;
        //this.spawnIndex = 0;
        
    }

    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
        //this.bee.update();
        this.spawnCloud();
       
        //this.handleSpawnedBee();
        this.spawnBee();

    }

    private spawnCloud(){
        this.cloud.checkCollisionWithFlower(this.flower);
        //this.bee.checkCollisionWithFlower(this.flower);
        //this.bee.buzzTo(this.flower);
       // this.bee.mouseClickedBee(mouseX, mouseY);
        
        // this.checkCollision()
        // for varje moln kolla om spelaren kolliderade
        // for varje geting kolla om spelaren kollideraqde

    }

    public spawnBee(){

        if (millis() >= 5000 + this.time) {
            let i = 0
            this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
            console.log(this.beeSwarm)
/*             this.beeSwarm[i].checkCollisionWithFlower(this.flower);
            this.beeSwarm[i].buzzTo(this.flower);
            this.beeSwarm[i].mouseClickedBee(mouseX, mouseY);*/
            this.time = millis(); 
            i++
          }

          this.beeSwarm.forEach(bee  => {
            bee.checkCollisionWithFlower(this.flower);
            bee.buzzTo(this.flower);
            bee.update();
            bee.mouseClickedBee(mouseX, mouseY);
            
        })
          
        
        

        //this.beeSwarm.push(this.bee);
/*         for (let index = 0; index < 50; index++) {
            this.beeSwarm[index] = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50);
        }  */
           //this.beeSwarm.push(this.bee = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
        
         //this.bee = new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50)
        //return this.bee.draw();
        //this.bee.draw();
        //this.bee.draw();
        //console.log(this.beeSwarm)
        
        // Skapa en geting och lägg till i this.bees arrayen
        // Se till att g¨ra detta med ett visst intervall
} 
 
public handleSpawnedBee(){
    

    if (millis() >= 5000 + this.spawnTime) {
        let i = 0;
        i += 1;
        

        console.log(i)
        this.spawnTime = millis();

    }    
        
} 

    public draw() {
        this.flower.draw();
        this.ground.draw();
        this.pot.draw();
        this.cloud.draw();

        this.beeSwarm.forEach(bee  => {
            bee.draw();
            
        })
            
 /*       });
         for (let index = 0; index < this.beeSwarm.length; index++) {
            this.beeSwarm[index].draw();
            console.log(index)
        } */

       

        //this.bee.draw();
        
        //this.bee.draw();
        //setInterval(this.spawnBee, 5000);
        

        //this.bee.draw();

        //this.bee.draw();
        //this.bee.draw();
        this.collision.draw(); 
    }
}


