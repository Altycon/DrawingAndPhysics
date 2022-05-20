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
    }
    applyForce(force){
        this.body.velocity.add(force)
    }
    update(canvas){
        //update/movement
        
        this.applyForce(this.gravity)
        this.body.move(canvas)
    }
    render(ctx){
        this.body.render(ctx)
    }
    Start(ctx){
        this.update(ctx.canvas);
        this.render(ctx);
    }
}