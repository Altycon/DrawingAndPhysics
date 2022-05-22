import { Firework } from "../parts/firework.js";
import { Tools } from "../tools.js";
const { random } = Tools;

export class Fireworks{
    constructor(ctx,amount){
        this.context = ctx;
        this.dpi = window.devicePixelRatio;
        this.collection = [];
        for(let i = 0 ; i < amount; i++){
            const x = random(-this.context.canvas.width/2, this.context.canvas.width/2);
            const y = this.context.canvas.height/2;
            const z = 0;
            let mass;
            mass = random(10,20);
            this.collection.push(new Firework(x,y,z,mass));
        }
    }
    Start(ctx){
        for(let i = 0; i < this.collection.length; i ++){
            this.collection[i].Start(ctx);
        }
    }
}