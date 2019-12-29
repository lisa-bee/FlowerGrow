class InstructionMenu {
    private boxColor: string;
    private textColor: string;
    private height: number;
    private width: number;
    private instructionX: number;
    private instructionY: number;
    private radius: number;
    private message: string;

    public constructor() {
        this.boxColor = "green";
        this.textColor = "black";
        this.height = 500;
        this.width = 300;
        this.instructionX = 200;
        this.instructionY = 300;
        this.radius = 50;
        this.message = "Welcome!";
    }

    public startGame(): boolean {
        if (keyCode === ENTER) {
            return true;
        }

        return false;
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