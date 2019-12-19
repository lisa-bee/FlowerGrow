let beeLeftImage: p5.Image;
let beeRightImage: p5.Image;

let startingPointX = [0];
let startingPointY = [0];
let endingPointX = 200;
let endingPointY = 300;


class Bee{
    private img: p5.Image
    private x: number;
    private y: number;
    private width: number;
    private height: number; 
    private isBeeDead: boolean;



    public constructor(x: any, y: any, width: number, height: number){

        this.img = beeRightImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isBeeDead = false;
    }

     public move(){
        //this.x = this.x + random(-1, 1);
        this.y = this.y + random(-5, 5);

        if (this.x == endingPointX){
            this.x = this.x;
        }
        else{
            this.x += 1
        }

        if (this.y == endingPointY){
            this.y = this.y;
        }
        else{
            this.y += 1
        }
        
/*         distX = endingPointX - this.x
        this.x = distX - 1;

         distY = endingPointY - this.y
         this.y += distY + 1;  */

        if(this.isBeeDead){
            this.y = this.y + 3;
        }

    } 

    public update(){
        this.move();
    } 

    public draw(){
        image(this.img, this.x, this.y, this.width, this.height);
    }
}