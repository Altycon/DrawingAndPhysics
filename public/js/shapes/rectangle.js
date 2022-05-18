"use strict";

import { Vector } from "../components/vector.js";

export class Rectangle{
    constructor(x,y,width,height){
        this.position = new Vector(x,y);
        this.width = width;
        this.height = height;
        this.strokeStyle = '';
        this.fillStyle = '';
        this.leftTop = new Vector(this.position.x,this.position.y);
        this.rightTop = new Vector(this.position.x + this.width, this.position.y);
        this.bottomRight = new Vector(this.position.x + this.width, this.position.y + this.height);
        this.bottomLeft = new Vector(this.position.x, this.position.y + this.height);
        this.degree = 0;
    }
    center(){
        this.position = new Vector(this.position.x - (this.width/2), this.position.y - (this.height/2))
    }
    rotate(degree){
        this.degree = degree;
    }
    stroke(color){
        this.strokeColor = color;
    }
    fill(color){
        this.fillStyle = color;
    }
    render(ctx){
        ctx.save();
        ctx.rotate(this.degree)
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.moveTo(this.position.x,this.position.y);
        ctx.lineTo(this.position.x + this.width, this.position.y);
        ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
        ctx.lineTo(this.position.x, this.position.y + this.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        // ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        // ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
    }
}