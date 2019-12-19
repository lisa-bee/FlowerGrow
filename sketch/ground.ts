let bg: p5.Image;
let potImg: p5.Image;
let grassImg: p5.Image;
class Grass {

    public grassImg: p5.Image;
    public x: number;
    public y: number;
    public width: number;
    public height: number;


    public constructor(grassImg: p5.Image, x: number, y: number, width: number, height: number) {

        this.grassImg = grassImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public draw() {
       return image(this.grassImg, this.x, this.y, this.width, this.height);
    }

    public update() {
        this.move();
    }
    
    private move() {
        this.y = this.y + 1;
    }

}
class Pot {

    public potImg: p5.Image;
    public x: number;
    public y: number;
    public width: number;
    public height: number;


    public constructor(potImg: p5.Image, x: number, y: number, width: number, height: number) {

        this.potImg = potImg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public draw() {

        return image(this.potImg, this.x, this.y, this.width, this.height);
    }

    public update() {
        this.move();
    }
    
        private move() {
        this.y = this.y + 1;
    }
    
}
