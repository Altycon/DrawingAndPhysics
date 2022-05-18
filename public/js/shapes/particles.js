"use strict";

import { Tools } from "../tools.js";
const { random } = Tools;

import { Vector } from "../components/vector.js";

export class Particle{
    constructor(x,y,radius){
        this.position = new Vector(x,y);
        this.speed = 0;
        this.velocity = new Vector(0,0);
        this.radius = radius || 1;
        this.color = 'hsl(0 0% 0%)';
        this.startArc = 0;
        this.endArc = Math.PI*2;
    }
    randomVelocityInit(){
        this.velocity.x = random(-this.speed,this.speed);
        this.velocity.y = random(-this.speed,this.speed);
    }
    move(canvas){
        
        if(this.position.x < -canvas.width/2 || this.position.x > canvas.width/2){
            this.velocity.x = this.velocity.x * -1;
        }
        if(this.position.y < -canvas.height/2 || this.position.y > canvas.height/2){
            this.velocity.y = this.velocity.y * -1;
        }
        this.position = this.position.add(this.velocity);
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.position.x, this.position.y, this.radius, this.startArc, this.endArc);
        ctx.fill();
        //ctx.stroke();
    }
}
