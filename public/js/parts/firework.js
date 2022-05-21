import { Vector } from "../components/vector.js";
import { Particle } from "../shapes/particle.js";
import { Tools } from "../tools.js";
const { random } = Tools;

export class Firework{
    constructor(x,y,z,size,color){
        this.body = new Particle(x,y,z);
        this.startPosition = new Vector(x,y,z);
        this.size = size;
        this.body.radius = this.size/2;
        this.body.color = color;
        this.body.velocity.x = 0;
        this.body.velocity.y = -10;
        this.body.hasBoundary = false;
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.gravity = new Vector(0,random(0.11, 0.13));
        this.particles = [];
        this.createParticles(10)
    }
    applyForce(force){
        this.body.velocity.add(force)
    }
    createParticles(num){
    	for(let i = 0; i < num; i++){
    		const x = 0;
    		const y = 0;
    		const z = 0;
    		const radius = 1;
    		const color = `hsl(${random(0,360,true)} 100% 50%)`;
    		//const v = new Vector(random(-2,2), random(-2,2),0);
    		const particle = new Particle(x,y,z,radius);
    		particle.color = color;
    		particle.randomVelocityInit()
    		this.particles.push(particle)
		}	
    }
    explode(canvas){
    	for(let i = 0; i < this.particles.length; i++){
    		this.particles[i].move(canvas)
		}	
    }
    renderParticles(ctx){
    	for(let i = 0; i < this.particles.length; i++){
    		this.particles[i].render(ctx);
		}	
   }
    update(canvas){
        //update/movement
		if(this.body.velocity.y >= 0){
			this.explode(canvas);
		}
        this.applyForce(this.gravity)
        this.body.move(canvas)
    }
    render(ctx){
        this.body.render(ctx);
        this.renderParticles(ctx);
    }
    Start(ctx){
        this.update(ctx.canvas);
        this.render(ctx);
    }
}