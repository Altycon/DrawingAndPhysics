"use strict";

import { Vector } from "../components/vector.js";

export class Cirlce{
    constructor(x,y){
        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.radius = 10;
        this.color = `hsl(60 0% 0%)`;
        this.startArc = 0;
        this.endArc = Math.PI*2;
    }
    move(){
        this.position = this.position.add(this.velocity);
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, this.startArc, this.endArc);
        ctx.fill();
    }
}
