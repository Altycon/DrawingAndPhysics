"use strict";

import { Tools } from "../tools.js";
const { random, scale } = Tools;

import { Vector } from "../components/vector.js";
// A = π * (r*r) Area = pi * radius squared
export class Particle{
    constructor(x,y,z,radius){
        this.position = new Vector(x,y,z);
        this.speed = 0;
        this.velocity = new Vector(0,0);
        this.radius = radius || 1;
        this.area = Math.sqrt(Math.PI * this.radius);
        this.color = 'hsl(0 0% 0%)';
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.angle = 0;
        this.theta = 0.1
        this.randomVelocityInit();
    }
    randomVelocityInit(){
        this.speed = random(0,2);
        this.velocity.x = random(-this.speed,this.speed);
        this.velocity.y = random(-this.speed,this.speed);
    }
    pulse(){
        this.radius = scale(Math.sin(this.angle), -1, 1, 1, this.area);
        this.angle += this.theta;
        //this.draw();
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
        //ctx.shadowColor = `hsl(120 100% 50%)`;
        //ctx.shadowBlur = this.radius / 2;
        ctx.arc(this.position.x, this.position.y, this.radius, this.startArc, this.endArc);
        ctx.fill();
        //ctx.stroke();
    }
}
