class GameArea {
    private ground: Grass;
    private pot: Pot;
    private flower: Flower;
<<<<<<< HEAD
    private cloud: Cloud;
=======
    public collision: CollisionObject;
>>>>>>> 111f395cdc01e449aa7826fb40b70d00ef266f5d

    constructor() {
        this.ground = new Grass(grassImg, 0, 500, 600, 100);
        this.pot = new Pot(potImg, 135, 450, 120, 100);
        this.flower = new Flower(width / 2, 300, 70, 70);
<<<<<<< HEAD
        this.cloud = new Cloud(badCloudImg, 50, -120, 100, 70);
    }    
    
=======
        this.collision = new CollisionObject();
    }

>>>>>>> 111f395cdc01e449aa7826fb40b70d00ef266f5d
    public update() {
        this.ground.update();
        this.pot.update();
        this.flower.update();
        this.cloud.update();
    }

    public draw() {
        this.ground.draw();
        this.pot.draw();
        this.flower.draw();
<<<<<<< HEAD
        this.cloud.draw();
=======
        this.collision.draw();

>>>>>>> 111f395cdc01e449aa7826fb40b70d00ef266f5d
    }

}

