let logo: p5.Image;

class InstructionMenu {
    private logo: p5.Image;
    private logoX: number;
    private logoY: number;
    private logoHeight: number;
    private logoWidth: number;
    // private boxColor: string;
    private textColor: string;
    private boxHeight: number;
    private boxWidth: number;
    private boxX: number;
    private boxY: number;
    private instructionX: number;
    private instructionY: number;
    private radius: number;
    private message: string;

    public constructor() {
        this.logo = logo;
        this.logoX = 200;
        this.logoY = 130;
        this.logoWidth = 300;
        this.logoHeight = 150;
        // this.boxColor = "green";
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

    public startGame(): boolean {
        if (keyCode === ENTER) {
            return true;
        }

        return false;
    }

    public draw() {
        push();
        strokeWeight(5);
        stroke("#9b4c00");
        fill(102, 204, 0, 90);
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
    }


}