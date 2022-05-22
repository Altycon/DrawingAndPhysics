"use strict";

import { Tools } from "../tools.js";
const { random, scale } = Tools;

import { Vector, UnitVector, CVectors } from "../components/vector.js";

// A = π * (r*r) Area = pi * radius squared

export class Particle{
    constructor(x,y,z,mass){
        this.position = new Vector(x,y,z);
        this.speed = 0;
        this.mass = mass;
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.radius = Math.sqrt(this.mass);
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
        this.speed = random(0,1);
        this.velocity.x = random(-this.speed,this.speed);
        this.velocity.y = random(-this.speed,this.speed);
    }
    pulse(speed){
        if(speed) this.theta = speed;
        this.radius = scale(Math.sin(this.angle), -1, 1, 1,this.maxRadius);
        this.angle += this.theta;
    }
    applyForce(forceVector){
        const force = CVectors.divide(forceVector, this.mass);
        this.acceleration.add(force);
        
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
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.multiply(0)
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.position.x, this.position.y, this.radius, this.startArc, this.endArc);
        ctx.fill();
        //ctx.stroke();
    }
}
