let bg: p5.Image;
let game: GameArea;
let listOfFlowers: Flowers;
let backgroundMusic: p5.SoundFile;
let leafImages: LeafImages;
let beeImages: BeeImages;
let soundEffects: SoundEffects;
let badCloudImages: BadCloudImages;

function preload() {
    bg = loadImage('./assets/images/background400x600.png');
    potImg = loadImage('./assets/images/pot.png');
    grassImg = loadImage('./assets/images/grass.png');
    goodCloudImg = loadImage('./assets/images/good_cloud.png');
    backgroundMusic = (window as any).loadSound('./assets/music/backgroundMusic.mp3');
    logo = loadImage('./assets/images/logo.png');

    listOfFlowers = {
        bud: loadImage('./assets/images/bud_new.png'),
        flowerHurt: loadImage('./assets/images/flower_hurt.png'),
        flower0: loadImage('./assets/images/flower_0.png'),
        flower25: loadImage('./assets/images/flower_25.png'),
        flower25Brown: loadImage('./assets/images/flower_25_brown.png'),
        flower75: loadImage('./assets/images/flower_75.png'),
        flower100: loadImage('./assets/images/flower_100.png'),
        flower100Brown: loadImage('./assets/images/flower_100_brown.png')
    }

    badCloudImages = {
        badCloudImg1: loadImage('./assets/images/bad_cloud1.png'),
        badCloudImg2: loadImage('./assets/images/bad_cloud2.png'),
        badCloudImg3: loadImage('./assets/images/bad_cloud3.png'),
    }

    beeImages = {
        beeLeftImage: loadImage('./assets/images/beeLeft.png'),
        beeRightImage: loadImage('./assets/images/beeRight.png'),
        beeDeadImage: loadImage('./assets/images/beeDead.png'),  
    }

    leafImages = {
        leafLeft: loadImage('./assets/images/leafLeft.png'),
        leafRight: loadImage('./assets/images/leafRight.png'),
    }

    soundEffects = {
        buzzingBee: (window as any).loadSound('./assets/sounds/bee-buzz.wav'),
        happyFlowerSound: (window as any).loadSound('./assets/sounds/happyFlowerLaugh.wav'),
        sadFlowerCloudSound: (window as any).loadSound('./assets/sounds/sadFlowerCloudSound.wav'),
        sadFlowerBeeSound: (window as any).loadSound('./assets/sounds/sadFlowerBeeSound.wav'),
        beeBuzzToSound: (window as any).loadSound('./assets/sounds/beeBuzzToSound.wav'),
        beeBuzzAwaySound: (window as any).loadSound('./assets/sounds/beeBuzzAwaySound.wav'),
    }
}

function setup() {
    createCanvas(400, 600);
    frameRate(60);
    game = new GameArea();
    backgroundMusic.setVolume(0.2);
    backgroundMusic.loop();
}

function draw() {
    background(bg);
    game.update();
    game.draw();
}

function keyPressed(): boolean {
    if (keyCode === ENTER && game.gameIsOver) {
        game = new GameArea()
        return true;
    }
    return false;
}    