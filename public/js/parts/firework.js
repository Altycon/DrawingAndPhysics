import { Vector } from "../components/vector.js";
import { Particle } from "../shapes/particle.js";
import { Tools } from "../tools.js";
const { random } = Tools;

export class Firework{
    constructor(x,y,z,mass){
        this.body = new Particle(x,y,z,mass);
        this.speed = 7 * window.devicePixelRatio;
        this.body.color = 'white';
        this.body.velocity.y = -this.speed;
        this.body.hasBoundary = false;
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.gravity = new Vector(0,1);
        this.wind = new Vector(0.01,0);
        
        this.exploded = false;
        this.particles = [];
        this.createParticles(30)
    }
    drag(){
        // Direction of Drag
        const drag = new Vector(this.body.velocity.x,this.body.velocity.y);
        drag.normalize();
        drag.multiply(-1);

        const Cd = 0.01;
        const speed = this.body.velocity.getMagnitude();
        drag.setMagnitude( Cd * (speed * speed) );
        return drag;
    }
    createParticles(num){
    	for(let i = 0; i < num; i++){
    		const x = 0;
    		const y = 0;
    		const z = 0;
    		const mass = 2;
    		const color = `hsl(${random(0,360,true)} 100% 50%)`;
    		const particle = new Particle(x,y,z,mass);
            particle.randomVelocityInit();
            //particle.velocity.setMagnitude(2) // makes circle explosion
            particle.velocity.multiply(4); // random explosion
    		particle.color = color;
            particle.hasBoundary = false;
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
            ctx.save();
            ctx.translate(this.body.position.x, this.body.position.y);
    		this.particles[i].render(ctx);
            ctx.restore();
		}	
    }
    applyForces(){
            this.body.applyForce(this.gravity);
            this.body.applyForce(this.drag());
            //this.body.applyForce(this.wind);
    }
    update(canvas){
        //update/movement
        
        this.applyForces();
        this.body.move(canvas);
        if(this.body.velocity.y >= 0){
            this.exploded = true;
			this.explode(canvas);
		}
    }
    render(ctx){
        if(!this.exploded) this.body.render(ctx);
        else this.renderParticles(ctx);
    }
    removeParticles(){
        for(let i = this.particles.length -1; i > 0; i--){

        }
    }
    Start(ctx){
        this.update(ctx.canvas);
        this.render(ctx);
    }
}