let game: gameArea;
/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
    bg = loadImage('assets/images/background400x600.png');
    potImg = loadImage('assets/images/pot.png');
    grassImg = loadImage('assets/images/grass.png');
    // Tyvärr har jag inte fått till den globala typningen för
    // inladdningen av ljud men fungerar bra enligt nedan..
    // sound = (window as any).loadSound('../assets/mySound.wav');
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
    noCursor();
    fullscreen();
    game = new gameArea()

}

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */
function draw() {
    background(bg);
    game.draw();

}

/**
 *  Built in windowResize listener function in P5
 */
/* function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} */