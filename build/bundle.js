"use strict";
var BadCloud = (function () {
    function BadCloud(x, y, width, height) {
        this.badCloud = [badCloudAssets.badCloudImg1, badCloudAssets.badCloudImg2, badCloudAssets.badCloudImg3];
        this.badCloudImg = random(this.badCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = 38;
        this._hasChangedWaterLevel = false;
    }
    BadCloud.prototype.update = function (fallSpeedBadCloud) {
        this.move(fallSpeedBadCloud);
    };
    BadCloud.prototype.checkCollisionWithFlower = function (flower, waterContainer) {
        var d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.radius + flower.radius) {
            flower.currentFlower = flowerAssets.flowerHurt;
            if (!flowerAssets.sadFlowerCloudSound.isPlaying()) {
                flowerAssets.sadFlowerCloudSound.play(0.5);
            }
            if (d < this.radius + flower.radius && waterContainer._waterlevel <= 0.25) {
                flower.currentFlower = flowerAssets.flower25Brown;
            }
            return true;
        }
        return false;
    };
    BadCloud.prototype.move = function (fallSpeedBadCloud) {
        this.y = this.y + fallSpeedBadCloud;
    };
    BadCloud.prototype.draw = function () {
        push();
        imageMode(CENTER);
        image(this.badCloudImg, this.x, this.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        pop();
    };
    Object.defineProperty(BadCloud.prototype, "hasChangedWaterLevel", {
        get: function () {
            return this._hasChangedWaterLevel;
        },
        set: function (boolean) {
            this._hasChangedWaterLevel = boolean;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadCloud.prototype, "Y", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    return BadCloud;
}());
function clone(instance) {
    var copy = new instance.constructor();
    Object.assign(copy, instance);
    return copy;
}
var Bee = (function () {
    function Bee(x, y, width, height) {
        this.img = beeAssets.beeRightImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isBeeDead = false;
        this.radius = this.width / 2;
        this.beeHitFlower = false;
        this.time = 0;
        this._beeBuzzToSound = clone(beeAssets.beeBuzzToSound);
        this._secundaryBeeSound = clone(beeAssets.beeBuzzToSound);
        this._hasChangedWaterLevel = false;
    }
    Bee.prototype.move = function () {
        this.y = this.y + random(-5, 5);
        if (this.isBeeDead) {
            this.y = this.y + 8;
        }
    };
    Bee.prototype.buzzTo = function (flower) {
        var endingPointY = 275;
        if (this.x == flower.endOfStem.x - 25) {
            this.x = this.x;
        }
        else {
            if (flower.endOfStem.x - 25 <= this.x) {
                this.x -= 1;
                this.img = beeAssets.beeLeftImage;
            }
            else {
                this.x += 1;
                this.img = beeAssets.beeRightImage;
            }
        }
        if (this.y == endingPointY) {
            this.y = this.y;
        }
        else {
            if (endingPointY <= this.y) {
                this.y -= 1;
            }
            else {
                this.y += 1;
            }
        }
        if (this.isBeeDead) {
            this.img = beeAssets.beeDeadImage;
        }
        if (this.beeHitFlower && !this.isBeeDead) {
            this.buzzAwayAfterHitFlower(flower);
        }
    };
    Bee.prototype.handleBuzzToSounds = function () {
        if (!this.isBeeDead && !this.beeHitFlower) {
            this._beeBuzzToSound.playMode('untilDone');
            this._beeBuzzToSound.play();
        }
        if (this.isBeeDead) {
            this._beeBuzzToSound.stop();
            if (game.beeSwarm.length > 1 && !this._beeBuzzToSound.isPlaying()) {
                this._secundaryBeeSound.playMode('untilDone');
                this._secundaryBeeSound.play();
            }
            else if (game.beeSwarm.length == 0) {
                this._secundaryBeeSound.stop();
            }
        }
        if (this.beeHitFlower) {
            if (this._beeBuzzToSound.isPlaying()) {
                this._beeBuzzToSound.stop();
            }
            if (this._secundaryBeeSound.isPlaying() && this.beeHitFlower || this.isBeeDead) {
                this._secundaryBeeSound.stop();
            }
        }
    };
    Bee.prototype.buzzAwayAfterHitFlower = function (flower) {
        this.time += deltaTime;
        if (this.time > 1000) {
            this.y -= 5;
            if (flower.endOfStem.x >= 200) {
                this.x -= 4;
                this.img = beeAssets.beeLeftImage;
            }
            else {
                this.x += 4;
                this.img = beeAssets.beeRightImage;
            }
        }
    };
    Bee.prototype.checkCollisionWithFlower = function (flower, waterContainer) {
        if (!this.isBeeDead) {
            var d = dist(this.x + 25, this.y + 25, flower.endOfStem.x, flower.endOfStem.y);
            if (d < this.radius + flower.radius) {
                flower.currentFlower = flowerAssets.flowerHurt;
                this.beeHitFlower = true;
                if (!flowerAssets.sadFlowerBeeSound.isPlaying() && !beeAssets.beeBuzzAwaySound.isPlaying()) {
                    flowerAssets.sadFlowerBeeSound.play(0.5);
                    beeAssets.beeBuzzAwaySound.play();
                }
                if (d < this.radius + flower.radius && waterContainer._waterlevel <= 0.25) {
                    flower.currentFlower = flowerAssets.flower25Brown;
                }
                return true;
            }
        }
        else {
            beeAssets.beeBuzzAwaySound.stop();
        }
        return false;
    };
    Object.defineProperty(Bee.prototype, "hasChangedWaterLevel", {
        get: function () {
            return this._hasChangedWaterLevel;
        },
        set: function (boolean) {
            this._hasChangedWaterLevel = boolean;
        },
        enumerable: true,
        configurable: true
    });
    Bee.prototype.mouseClickedBee = function (mouseClickX, mouseClickY) {
        if (mouseIsPressed && mouseClickX > this.x && mouseClickX < this.x + this.width && mouseClickY > this.y && mouseClickY < this.y + this.height) {
            this.isBeeDead = true;
        }
    };
    Bee.prototype.checkIfBeeOffScreen = function () {
        if (this.y >= 630 || this.y <= -30) {
            return true;
        }
        else {
            return false;
        }
    };
    Bee.prototype.update = function () {
        this.move();
        this.mouseClickedBee(mouseX, mouseY);
        this.handleBuzzToSounds();
    };
    Bee.prototype.draw = function () {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    };
    return Bee;
}());
var Flower = (function () {
    function Flower(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.currentFlower = flowerAssets.bud;
        this.time = 0;
        this.radius = 22;
        this.onlyRenderEachXPoint = 45;
        this.keepSamePointsForDifferentDrawsAdjuster = this.onlyRenderEachXPoint;
        this.history = [createVector(x, y)];
    }
    Object.defineProperty(Flower.prototype, "beginningOfStem", {
        get: function () {
            return this.history[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flower.prototype, "endOfStem", {
        get: function () {
            return this.history[this.history.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Flower.prototype.update = function (waterContainer, fallSpeed) {
        var newX = this.handlePlayerInput();
        this.grow(newX, fallSpeed);
        this.move(fallSpeed);
        this.time += deltaTime;
        if (this.time > 2500) {
            if (waterContainer._waterlevel <= 1) {
                this.currentFlower = flowerAssets.flower100;
            }
            if (waterContainer._waterlevel <= 0.75) {
                this.currentFlower = flowerAssets.flower75;
            }
            if (waterContainer._waterlevel <= 0.5) {
                this.currentFlower = flowerAssets.flower25;
            }
            if (waterContainer._waterlevel <= 0.25) {
                this.currentFlower = flowerAssets.flower0;
            }
        }
    };
    Flower.prototype.grow = function (x, fallSpeed) {
        var y = this.endOfStem.y - fallSpeed;
        var v = createVector(x, y);
        this.history.push(v);
        var maxLength = 200;
        if (this.history.length > maxLength) {
            this.history.shift();
        }
    };
    Flower.prototype.growingLeaf = function (positionX, positionY) {
        image(flowerAssets.leafLeft, positionX - 23, positionY - 6, 23, 12);
        image(flowerAssets.leafRight, positionX, positionY - 6, 23, 12);
    };
    Flower.prototype.move = function (fallSpeed) {
        if (this.time > 3100) {
            for (var _i = 0, _a = this.history; _i < _a.length; _i++) {
                var point_1 = _a[_i];
                point_1.y += fallSpeed;
            }
        }
    };
    Flower.prototype.handlePlayerInput = function () {
        var x = this.endOfStem.x;
        if (this.time > 2000) {
            if (keyIsDown(65)) {
                x -= 3;
            }
            else if (keyIsDown(68)) {
                x += 3;
            }
            if (x > width - this.radius) {
                x = width - this.radius;
            }
            if (x < this.radius) {
                x = this.radius;
            }
        }
        return x;
    };
    Flower.prototype.resolveHistoryPositionsToDraw = function () {
        var pointsToDraw = [];
        pointsToDraw.push(this.beginningOfStem);
        for (var i = this.keepSamePointsForDifferentDrawsAdjuster % this.onlyRenderEachXPoint; i < this.history.length; i += this.onlyRenderEachXPoint) {
            pointsToDraw.push(this.history[i]);
        }
        pointsToDraw.push(this.endOfStem);
        this.keepSamePointsForDifferentDrawsAdjuster--;
        if (this.keepSamePointsForDifferentDrawsAdjuster === 0)
            this.keepSamePointsForDifferentDrawsAdjuster = this.onlyRenderEachXPoint;
        return pointsToDraw;
    };
    Flower.prototype.draw = function () {
        stroke(100, 215, 46);
        strokeWeight(6);
        noFill();
        var historyPositionsToDraw = this.resolveHistoryPositionsToDraw();
        beginShape();
        curveVertex(historyPositionsToDraw[0].x, historyPositionsToDraw[0].y);
        for (var i = 0; i < historyPositionsToDraw.length; i++) {
            curveVertex(historyPositionsToDraw[i].x, historyPositionsToDraw[i].y);
        }
        curveVertex(historyPositionsToDraw[historyPositionsToDraw.length - 1].x - 1, historyPositionsToDraw[historyPositionsToDraw.length - 1].y - 1);
        endShape();
        push();
        for (var i = 0; i < historyPositionsToDraw.length; i++) {
            this.growingLeaf(historyPositionsToDraw[i].x, historyPositionsToDraw[i].y);
        }
        pop();
        push();
        imageMode(CENTER);
        image(this.currentFlower, this.endOfStem.x, this.endOfStem.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.endOfStem.x, this.endOfStem.y, this.radius * 2, this.radius * 2);
        pop();
    };
    return Flower;
}());
var GameArea = (function () {
    function GameArea() {
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
    GameArea.prototype.update = function () {
        this.gameIsOver = this.gameOver.endGame(this.waterContainer);
        if (!this.isGameRunning) {
            this.isGameRunning = this.instructionMenu.startGame();
        }
        if (this.isGameRunning && !this.gameIsOver) {
            for (var i = 0; i < this.badClouds.length; i++) {
                var badCloud = this.badClouds[i];
                badCloud.update(this.fallSpeedBadCloud);
            }
            for (var i = 0; i < this.goodClouds.length; i++) {
                var goodCloud = this.goodClouds[i];
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
    };
    GameArea.prototype.spawnGoodCloud = function () {
        if (this.time >= 4000) {
            if (millis() >= random(10000, 28000) + this.goodCloudSpawnTime) {
                this.goodClouds.push(new GoodCloud(random(0, 400), -100, 90, 110));
                this.goodCloudSpawnTime = millis();
            }
            for (var _i = 0, _a = this.goodClouds; _i < _a.length; _i++) {
                var goodCloud = _a[_i];
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
    };
    GameArea.prototype.spawnBadCloud = function () {
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
        for (var _i = 0, _a = this.badClouds; _i < _a.length; _i++) {
            var badCloud = _a[_i];
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
    };
    GameArea.prototype.spawnBee = function () {
        var _this = this;
        if (this.time > 150000) {
            if (millis() >= 5000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }
        else if (this.time > 90000) {
            if (millis() >= 5000 + this.beeSpawnTime) {
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSwarm.push(new Bee(random(this.beeStartingPointX), random(this.beeStartingPointY), 50, 50));
                this.beeSpawnTime = millis();
            }
        }
        else if (this.time > 50000) {
            if (millis() >= 5500 + this.beeSpawnTime) {
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
        this.beeSwarm.forEach(function (bee) {
            bee.checkCollisionWithFlower(_this.flower, _this.waterContainer);
            bee.buzzTo(_this.flower);
            bee.update();
            if (bee.checkCollisionWithFlower(_this.flower, _this.waterContainer)) {
                if (bee.hasChangedWaterLevel === false) {
                    _this.waterContainer.decreaseWaterLevel(0.2);
                    bee.hasChangedWaterLevel = true;
                }
            }
            if (bee.checkIfBeeOffScreen() == true) {
                _this.deleteBeeFromArray();
            }
        });
    };
    GameArea.prototype.deleteBeeFromArray = function () {
        var indexPosition = this.checkBeeToBeDeleted();
        this.beeSwarm.splice(indexPosition, 1);
    };
    GameArea.prototype.checkBeeToBeDeleted = function () {
        var index;
        for (index = 0; index < this.beeSwarm.length; index++) {
            if (this.beeSwarm[index].checkIfBeeOffScreen() == true) {
                break;
            }
        }
        return index;
    };
    GameArea.prototype.draw = function () {
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
            this.beeSwarm.forEach(function (bee) {
                bee.draw();
            });
            this.badClouds.forEach(function (badCloud) {
                badCloud.draw();
            });
            this.goodClouds.forEach(function (goodCloud) {
                goodCloud.draw();
            });
            this.playerScore.draw();
            this.waterContainer.draw();
        }
    };
    return GameArea;
}());
var GameOver = (function () {
    function GameOver() {
        this.flower0X = 200;
        this.flower0Y = 175;
        this.flower0Height = 110;
        this.flower0Width = 110;
        this.gameOverX = 200;
        this.gameOverY = 300;
        this.message = "Grow Over!\nYou grew ";
        this.message2 = "\nPress enter to play again.";
        this.boxX = 200;
        this.boxY = 300;
        this.boxWidth = 300;
        this.boxHeight = 250;
        this.radius = 50;
    }
    GameOver.prototype.endGame = function (waterContainer) {
        if (waterContainer._waterlevel <= 0.1) {
            return true;
        }
        return false;
    };
    GameOver.prototype.draw = function (playerscore) {
        push();
        strokeWeight(5);
        stroke("#9b4c00");
        fill(255, 255, 255, 90);
        tint(100);
        rectMode(CENTER);
        rect(this.boxX, this.boxY, this.boxWidth, this.boxHeight, this.radius);
        pop();
        push();
        textSize(20);
        fill("black");
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        text(this.message + playerscore._score + " m." + this.message2, this.gameOverX, this.gameOverY, 300, 70);
        pop();
        push();
        imageMode(CENTER);
        image(flowerAssets.flower0, this.flower0X, this.flower0Y, this.flower0Width, this.flower0Height);
        pop();
    };
    return GameOver;
}());
var goodCloudImg;
var GoodCloud = (function () {
    function GoodCloud(x, y, width, height) {
        this.goodCloud = [goodCloudImg, goodCloudImg];
        this.goodCloudImg = random(this.goodCloud);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = 38;
        this._hasChangedWaterLevel = false;
    }
    GoodCloud.prototype.update = function (fallSpeedGoodCloud) {
        this.move(fallSpeedGoodCloud);
    };
    GoodCloud.prototype.checkCollisionWithFlower = function (flower, waterContainer) {
        var d = dist(this.x, this.y, flower.endOfStem.x, flower.endOfStem.y);
        if (d < this.radius + flower.radius) {
            flower.currentFlower = flowerAssets.flower100;
            if (!flowerAssets.happyFlowerSound.isPlaying()) {
                flowerAssets.happyFlowerSound.play(0.5);
            }
            if (d < this.radius + flower.radius && waterContainer._waterlevel <= 0.25) {
                flower.currentFlower = flowerAssets.flower100Brown;
            }
            return true;
        }
        return false;
    };
    GoodCloud.prototype.move = function (fallSpeedGoodCloud) {
        this.y = this.y + fallSpeedGoodCloud;
    };
    GoodCloud.prototype.draw = function () {
        push();
        imageMode(CENTER);
        image(this.goodCloudImg, this.x, this.y, this.width, this.height);
        pop();
        push();
        noFill();
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        pop();
    };
    Object.defineProperty(GoodCloud.prototype, "hasChangedWaterLevel", {
        get: function () {
            return this._hasChangedWaterLevel;
        },
        set: function (boolean) {
            this._hasChangedWaterLevel = boolean;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoodCloud.prototype, "Y", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    return GoodCloud;
}());
var grassImg;
var Grass = (function () {
    function Grass(grassImg, x, y, width, height) {
        this.grassImg = grassImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0;
    }
    Grass.prototype.draw = function () {
        push();
        image(this.grassImg, this.x, this.y, this.width, this.height);
        pop();
    };
    Grass.prototype.update = function () {
        this.move();
    };
    Grass.prototype.move = function () {
        this.time += deltaTime;
        if (this.time > 2200) {
            this.y = this.y + 1.5;
        }
    };
    return Grass;
}());
var logo;
var InstructionMenu = (function () {
    function InstructionMenu() {
        this.logo = logo;
        this.logoX = 200;
        this.logoY = 130;
        this.logoWidth = 300;
        this.logoHeight = 150;
        this.textColor = "black";
        this.boxHeight = 400;
        this.boxWidth = 300;
        this.boxX = 200;
        this.boxY = 340;
        this.instructionX = 200;
        this.instructionY = 350;
        this.radius = 50;
        this.message = "Help the flower grow as high as possible! \n\n Use A and D to steer the flower. Avoid the dark clouds, go through rain clouds to water the flower and mouse click on the bees before they reach the flower.\n\nPress enter to start game.";
    }
    InstructionMenu.prototype.startGame = function () {
        if (keyCode === ENTER) {
            return true;
        }
        return false;
    };
    InstructionMenu.prototype.draw = function () {
        push();
        strokeWeight(5);
        stroke("#9b4c00");
        fill(255, 255, 255, 90);
        tint(100);
        rectMode(CENTER);
        rect(this.boxX, this.boxY, this.boxWidth, this.boxHeight, this.radius);
        pop();
        push();
        textSize(18);
        fill(this.textColor);
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        text(this.message, this.instructionX, this.instructionY, 250, 250);
        pop();
        push();
        imageMode(CENTER);
        image(this.logo, this.logoX, this.logoY, this.logoWidth, this.logoHeight);
        pop();
    };
    return InstructionMenu;
}());
var PlayerScore = (function () {
    function PlayerScore() {
        this.time = 0;
        this.score = 0;
    }
    PlayerScore.prototype.printPlayerScore = function () {
        if (millis() >= 500 + this.time) {
            this.score++;
            this.time = millis();
        }
        push();
        strokeWeight(0.8);
        stroke(50);
        fill(50);
        textSize(25);
        text(this.score + "m", 20, 580);
        pop();
    };
    PlayerScore.prototype.draw = function () {
        this.printPlayerScore();
    };
    Object.defineProperty(PlayerScore.prototype, "_score", {
        get: function () {
            return this.score;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerScore;
}());
var potImg;
var Pot = (function () {
    function Pot(potImg, x, y, width, height) {
        this.potImg = potImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0;
    }
    Pot.prototype.draw = function () {
        push();
        image(this.potImg, this.x, this.y, this.width, this.height);
        pop();
    };
    Pot.prototype.update = function () {
        this.move();
    };
    Pot.prototype.move = function () {
        this.time += deltaTime;
        if (this.time > 2200) {
            this.y = this.y + 1.5;
        }
    };
    return Pot;
}());
var bg;
var game;
var flowerAssets;
var backgroundMusic;
var beeAssets;
var badCloudAssets;
function preload() {
    bg = loadImage('./assets/images/background400x600.png');
    potImg = loadImage('./assets/images/pot.png');
    grassImg = loadImage('./assets/images/grass.png');
    goodCloudImg = loadImage('./assets/images/good_cloud.png');
    backgroundMusic = window.loadSound('./assets/music/backgroundMusic.mp3');
    logo = loadImage('./assets/images/logo.png');
    flowerAssets = {
        bud: loadImage('./assets/images/bud_new.png'),
        flowerHurt: loadImage('./assets/images/flower_hurt.png'),
        flower0: loadImage('./assets/images/flower_0.png'),
        flower25: loadImage('./assets/images/flower_25.png'),
        flower25Brown: loadImage('./assets/images/flower_25_brown.png'),
        flower75: loadImage('./assets/images/flower_75.png'),
        flower100: loadImage('./assets/images/flower_100.png'),
        flower100Brown: loadImage('./assets/images/flower_100_brown.png'),
        leafLeft: loadImage('./assets/images/leafLeft.png'),
        leafRight: loadImage('./assets/images/leafRight.png'),
        happyFlowerSound: window.loadSound('./assets/sounds/happyFlowerLaugh.wav'),
        sadFlowerCloudSound: window.loadSound('./assets/sounds/sadFlowerCloudSound.wav'),
        sadFlowerBeeSound: window.loadSound('./assets/sounds/sadFlowerBeeSound.wav'),
    };
    badCloudAssets = {
        badCloudImg1: loadImage('./assets/images/bad_cloud1.png'),
        badCloudImg2: loadImage('./assets/images/bad_cloud2.png'),
        badCloudImg3: loadImage('./assets/images/bad_cloud3.png'),
    };
    beeAssets = {
        beeLeftImage: loadImage('./assets/images/beeLeft.png'),
        beeRightImage: loadImage('./assets/images/beeRight.png'),
        beeDeadImage: loadImage('./assets/images/beeDead.png'),
        buzzingBee: window.loadSound('./assets/sounds/bee-buzz.wav'),
        beeBuzzToSound: window.loadSound('./assets/sounds/beeBuzzToSound.wav'),
        beeBuzzAwaySound: window.loadSound('./assets/sounds/beeBuzzAwaySound.wav'),
    };
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
function keyPressed() {
    if (keyCode === ENTER && game.gameIsOver) {
        game = new GameArea();
        return true;
    }
    return false;
}
var WaterContainer = (function () {
    function WaterContainer() {
        this.x = 25;
        this.y = 390;
        this.width = 25;
        this.height = 160;
        this.waterlevel = 1;
    }
    WaterContainer.prototype.draw = function () {
        push();
        strokeWeight(3);
        stroke(6, 61, 153);
        fill(50);
        rect(this.x, this.y, this.width, this.height, 100);
        noStroke();
        var c = color(31, 99, 224);
        fill(c);
        var steps = 5 * this.waterlevel;
        var stepSize = this.height / 5;
        for (var i = 1; i <= steps; i++) {
            if (i == 1) {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize) - 1.5, this.width - 3, stepSize, 0, 0, 100, 100);
            }
            else if (i == steps && this.waterlevel == 1) {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize) + 1.5, this.width - 3, stepSize, 100, 100, 0, 0);
            }
            else {
                rect(this.x + 1.5, this.y + this.height - (i * stepSize), this.width - 3, stepSize);
            }
        }
        pop();
    };
    WaterContainer.prototype.decreaseWaterLevel = function (amount) {
        this.waterlevel -= amount;
    };
    WaterContainer.prototype.increaseWaterLevel = function (amount) {
        if (this.waterlevel + amount <= 1) {
            this.waterlevel += amount;
        }
    };
    Object.defineProperty(WaterContainer.prototype, "_waterlevel", {
        get: function () {
            return this.waterlevel;
        },
        enumerable: true,
        configurable: true
    });
    return WaterContainer;
}());
//# sourceMappingURL=bundle.js.map