"use strict";

import { Vector } from "../components/vector.js";

export class Graph{
    constructor(x,y,width,height){
        this.position = new Vector(x,y);
        this.apectRatio = 16/9;
        this.width = width;
        this.height = height ? height: this.width/this.apectRatio;
        this.background = `hsl(0 0% 0% / .2)`;
        this.border = `hsl(0 0% 0% / 1)`;
        this.center = new Vector(this.position.x + this.width/2, this.position.y + this.height/2);
        this.topCenter = new Vector(this.position.x + (this.width/2), this.position.y);
        this.bottomCenter = new Vector(this.position.x + (this.width/2), this.position.y + this.height);
        this.leftCenter = new Vector(this.position.x, this.position.y + (this.height/2));
        this.rightCenter = new Vector(this.position.x + this.width, this.position.y + (this.height/2));
    }
    renderDisplay(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.background;
        ctx.strokeStyle = this.border;
        ctx.rect(this.position.x, this.position.y,this.width,this.height);
        ctx.fill();
        ctx.stroke();
    }
    renderGraphLines(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;

        ctx.strokeStyle = this.border;
        ctx.moveTo(this.topCenter.x, this.topCenter.y);
        ctx.lineTo(this.bottomCenter.x, this.bottomCenter.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.leftCenter.x, this.leftCenter.y);
        ctx.lineTo(this.rightCenter.x, this.rightCenter.y);
        ctx.closePath();
        ctx.stroke();
    }
    renderIncrements(ctx){
        const Xs = Math.floor((this.width)/10);
        const Ys = Math.floor(this.height/10);
        
        for(let i = 1; i < Xs; i++){
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            //ctx.arc(this.leftCenter.x + (Xs * i), this.leftCenter.y - Ys, 2, 0, Math.PI*2);
            ctx.moveTo(this.leftCenter.x + (Xs * i), this.leftCenter.y - Ys);
            ctx.lineTo(this.leftCenter.x + (Xs * i), this.leftCenter.y + Ys);
            ctx.closePath();
            ctx.stroke();
        }
    }
    render(ctx){
        this.renderDisplay(ctx);
        this.renderGraphLines(ctx);
        this.renderIncrements(ctx);
    }
}