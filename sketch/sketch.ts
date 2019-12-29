let bg: p5.Image;
let game: GameArea;
let listOfFlowers: Flowers;
/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
    // Tyvärr har jag inte fått till den globala typningen för
    // inladdningen av ljud men fungerar bra enligt nedan..
    // sound = (window as any).loadSound('../assets/mySound.wav');
    bg = loadImage('assets/images/background400x600.png');
    potImg = loadImage('assets/images/pot.png');
    grassImg = loadImage('assets/images/grass.png');
    badCloudImg1 = loadImage('assets/images/bad_cloud1.png');
    badCloudImg2 = loadImage('assets/images/bad_cloud2.png');
    badCloudImg3 = loadImage('assets/images/bad_cloud3.png');
    beeLeftImage = loadImage('./assets/images/beeLeft.png');
    beeRightImage = loadImage('./assets/images/beeRight.png');
    beeDeadImage = loadImage('./assets/images/beeDead.png');

    listOfFlowers = {
        bud: loadImage('/assets/images/bud.png'),
        flower0: loadImage('/assets/images/flower_0.png'),
        flower25: loadImage('/assets/images/flower_25.png'),
        flower75: loadImage('/assets/images/flower_75.png'),
        flower100: loadImage('/assets/images/flower_100.png'),
    }
}


/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
    createCanvas(400, 600);
    frameRate(60);
    //GameArea.spawnBee();
    //noCursor();
    game = new GameArea();
}

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */
function draw() {
    background(bg);
    game.update();
    game.draw();
}
