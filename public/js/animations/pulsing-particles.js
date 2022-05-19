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
    particleCollision(){
    	for(let i = 0; i < this.particles.length; i++){
    		const particle1 = this.particles[i];
    		for(let j = 0; j < this.particles.length; j++){
    			const particle2 = this.particles[j];
    			if(particle1 === particle2) continue;
    			const distance = CVectors.getDistance(particle1.position, particle2.position);
    			if(distance < particle1.radius + particle2.radius){
    				particle1.velocity.x = particle2.velocity.x * -1;
    				particle1.velocity.y = particle2.velocity.y * -1;
    			}
    		}
    	}
   }
    update(){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].pulse();
            this.particles[i].move(this.display);
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
        this.particleCollision();
        this.update();
        this.renderParticles(ctx);
    }
}