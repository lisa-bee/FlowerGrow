class Ground {

public grass: p5.Image;
public x: number;
public y: number;
public width: number;
public height: number;

 
public constructor(grass: p5.Image, x: number, y: number, width: number, height: number){
 
this.grass = grass
this.x = x;
this.y = y;
this.width = width;
this.height = height;
 
 }
 
public show() {
 
 
return image(this.grass, this.x, this.y, this.width, this.height);
    }
}