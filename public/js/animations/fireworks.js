import { Firework } from "../parts/firework.js";
import { Tools } from "../tools.js";
const { random } = Tools;

export class Fireworks{
    constructor(ctx,amount,rate){
        this.context = ctx;
        this.dpi = window.devicePixelRatio;
        this.amount = amount;
        this.rate = rate || 1;
        this.collection = [];
        // for(let i = 0 ; i < amount; i++){
        //     const x = random(-this.context.canvas.width/2, this.context.canvas.width/2);
        //     const y = this.context.canvas.height/2;
        //     const z = 0;
        //     const mass = random(10,20);
        //     this.collection.push(new Firework(x,y,z,mass));
        // }
        this.totalFireworks = 0;
        this.counter = 0;
    }
    createFirework(){
        const x = random(-this.context.canvas.width/2, this.context.canvas.width/2);
        const y = this.context.canvas.height/2;
        const z = random(-100,100);
        const mass = random(2,6);
        const fw = new Firework(x,y,z,mass);
        fw.body.setColor(180);
        if(Math.random() > 0.5) fw.createCircleExplosion(30);
        fw.createRandomExplosion(30);
        this.collection.push(fw);
        
    }
    addFireworks(){
        if(this.totalFireworks >= this.amount * this.rate) return;
        if(this.counter % this.rate === 0) this.createFirework();
        
    }
    renderFireworks(ctx){
        for(let i = 0; i < this.collection.length; i ++){
            if(this.collection.length === 0) return;
            this.collection[i].Start(ctx);
        }
    }
    removeFireworks(){
        this.collection = this.collection.filter( firework => firework.particles.length > 0);
    }
    Start(ctx){

        this.addFireworks();
        this.totalFireworks++;
        this.counter++;
        this.renderFireworks(ctx);
        this.removeFireworks();
    }
}