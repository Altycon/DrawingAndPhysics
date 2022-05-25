import { Vector } from "../components/vector.js";
import { Particle } from "../shapes/particle.js";
import { Tools } from "../tools.js";
const { random } = Tools;

export class Firework{
    constructor(x,y,z,mass,color){
        this.body = new Particle(x,y,z,mass);
        this.speed = 30 * window.devicePixelRatio;
        this.body.color = color || 'white';
        this.opacity = 1;
        this.body.velocity.y = -this.speed;
        this.body.hasBoundary = false;
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.gravity = new Vector(0,.2);
        this.wind = new Vector(0.01,0);
        
        this.exploded = false;
        this.particles = [];
        // if(Math.random() > 0.5) this.createRandomExplosion(30);
        // else this.createCircleExplosion(30);
        
    }
    drag(){
        // Direction of Drag
        const drag = new Vector(this.body.velocity.x,this.body.velocity.y);
        drag.normalize();
        drag.multiply(-1);

        const Cd = 0.03;
        const speed = this.body.velocity.getMagnitude();
        drag.setMagnitude( Cd * (speed * speed) );
        return drag;
    }
    createRandomExplosion(num){
    	for(let i = 0; i < num; i++){
    		const x = 0;
    		const y = 0;
    		const z = random(-100,100);
    		const mass = 4;
    		const particle = new Particle(x,y,z,mass);
            particle.randomVelocityInit();
            //particle.velocity.setMagnitude(2) // makes circle explosion
            particle.velocity.multiply(4); // random explosion
    		particle.setColor(random(0,360),100,50);
            particle.hasBoundary = false;
    		this.particles.push(particle)
		}	
    }
    createCircleExplosion(num){
    	for(let i = 0; i < num; i++){
    		const x = 0;
    		const y = 0;
    		const z = random(-100,100);
    		const mass = 4;
    		const particle = new Particle(x,y,z,mass);
            particle.randomVelocityInit();
            particle.velocity.setMagnitude(2) // makes circle explosion
            //particle.velocity.multiply(4); // random explosion
    		particle.setColor(random(0,360),100,50);
            particle.hasBoundary = false;
    		this.particles.push(particle)
		}	
    }
    explode(canvas){
    	for(let i = 0; i < this.particles.length; i++){
            this.particles[i].setOpacity(this.opacity)
    		this.particles[i].move(canvas)
		}
        this.opacity -= 0.01;	
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
        this.particles = this.particles.filter( particle => particle.collapsed === false);
    }
    Start(ctx){
        this.update(ctx.canvas);
        this.render(ctx);
        this.removeParticles();
    }
}