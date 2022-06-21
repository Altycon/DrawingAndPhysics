"use strict";

import { Tools } from "../tools.js";
const { scale } = Tools;
export class Cardiod{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'hsl(0 100% 100%)';
        this.TWOPI = Math.PI*2;
        this.steps = 0;
        this.factor = 0;
    }
    getPosition(index){
        const angle = scale(index % this.steps, 0, this.steps, 0, this.TWOPI);
        const x = this.radius * Math.cos(angle);
        const y = this.radius * Math.sin(angle);
        return {x:x,y:y}
    }
    render(ctx){

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, this.TWOPI);
        ctx.stroke();

        for(let i = 0; i < this.steps; i++){
            const angle = scale(i, 0, this.steps, 0, this.TWOPI);
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(x, y, 2, 0, this.TWOPI);
            ctx.fill();
            
        }

        for(let i = 0; i < this.steps; i++){

            const a = this.getPosition(i);
            const b = this.getPosition(i * this.factor);

            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x,b.y);
            ctx.closePath();
            ctx.stroke();
        }

    }
}