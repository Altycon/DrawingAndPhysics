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
        this.maxRadius = this.radius;
        this.area = Math.PI * Math.pow(this.radius, 2);
        this.color = 'hsl(0 0% 0%)';
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.angle = 0;
        this.theta = 0;
        this.hasBoundary = true;
    }
    randomVelocityInit(){
        this.speed = random(0,2);
        this.velocity.x = random(-this.speed,this.speed);
        this.velocity.y = random(-this.speed,this.speed);
    }
    pulse(speed){
        if(speed) this.theta = speed;
        this.radius = scale(Math.sin(this.angle), -1, 1, 1,this.maxRadius);
        this.angle += this.theta;
    }
    move(canvas){
        if(this.hasBoundary){
            if(this.position.x - this.radius < -canvas.width/2 || this.position.x + this.radius > canvas.width/2){
                this.velocity.x = this.velocity.x * -1;
            }
            if(this.position.y - this.radius < -canvas.height/2 || this.position.y + this.radius > canvas.height/2){
                this.velocity.y = this.velocity.y * -1;
            }
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
