class InstructionMenu {
    private boxColor: string;
    private textColor: string;
    private height: number;
    private width: number;
    private instructionX: number;
    private instructionY: number;
    private radius: number;
    private message: string;
    private isGameRunning: boolean;

    public constructor() {
        this.boxColor = "green";
        this.textColor = "black";
        this.height = 350;
        this.width = 250;
        this.instructionX = 200;
        this.instructionY = 300;
        this.radius = 30;
        this.message = "Welcome!";
        this.isGameRunning = false;
    }

    public update() {
        let isGameRunning = this.isGameRunning;
        if (isGameRunning = false) {
            this.draw();
        }
    }

    public draw() {
        push();
        fill(this.boxColor);
        noStroke();
        rectMode(CENTER)
        rect(this.instructionX, this.instructionY, this.width, this.height, this.radius);
        pop();
        push();
        textSize(32);
        fill(this.textColor);
        noStroke();
        textAlign(CENTER);
        text(this.message, this.instructionX, this.instructionY);
        pop();
    }


}