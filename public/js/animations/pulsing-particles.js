"use strict";

import { Particle } from "../shapes/particle.js";
import { Tools } from "../tools.js";
const { random } = Tools;

import { CVectors } from "../components/vector.js";

export class PulsingParticles{
    constructor(canvas,n){
        this.number_Of_Particles = n || 10;
        this.display = canvas;
        this.context = this.display.getContext('2d');
        this.width = this.display.width;
        this.height = this.display.height;
        this.color = 'hsl(0 100% 100%)';
        this.particles = this.createParticles(this.number_Of_Particles);
    }
    update(){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].pulse();
        }
    }
    createParticles(num){
        const arr = [];
        for(let i = 0; i < num; i++){
            const x = random(-this.width/2, this.width/2);
            const y = random(-this.height/2, this.height/2);
            const z = 0;
            const radius = random(1,3,true);
            const particle = new Particle(x,y,z,radius);
            particle.color = this.color;
            particle.theta = random(0.01,0.1);
            arr.push(particle);
            
        }
        return arr;
    }
    renderParticles(ctx){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].render(ctx);
        }
    }
    Start(ctx){
        this.update();
        this.renderParticles(ctx);
    }
}