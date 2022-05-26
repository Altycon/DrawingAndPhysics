"use strict";

import { Vector } from "../components/vector.js";

export class Graph{
    constructor(x,y,width,height){
        this.position = new Vector(x,y);
        this.apectRatio = 16/9;
        this.width = width;
        this.height = height ? height: this.width/this.apectRatio;
        this.background = `hsl(0 100% 100% / .4)`;
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
    	const Resolution = 20;
    	const NegYs = Math.floor(this.topCenter.y/Resolution) * -1;
        const Xs = Math.floor((this.width)/Resolution);
        const PosYs = Math.floor(this.bottomCenter.y/Resolution);
        for(let i = 1; i < NegYs; i++){
            ctx.beginPath();
            ctx.strokeStyle = this.border;
            //ctx.arc(this.leftCenter.x + (Xs * i), this.leftCenter.y - Ys, 2, 0, Math.PI*2);
            ctx.moveTo(this.center.x - Resolution, this.center.y - (Resolution * i));
            ctx.lineTo(this.center.x + Resolution, this.center.y - (Resolution * i));
            ctx.closePath();
            ctx.stroke();
        }
        for(let k = 1; k < PosYs; k++){
            ctx.beginPath();
            ctx.strokeStyle = this.border;
            //ctx.arc(this.leftCenter.x + (Xs * i), this.leftCenter.y - Ys, 2, 0, Math.PI*2);
            ctx.moveTo(this.center.x - Resolution, this.center.y + (Resolution * k));
            ctx.lineTo(this.center.x + Resolution, this.center.y + (Resolution * k));
            ctx.closePath();
            ctx.stroke();
        }
        for(let j = 1; j < Xs; j++){
            ctx.beginPath();
            ctx.strokeStyle = this.border;
            //ctx.arc(this.leftCenter.x + (Xs * i), this.leftCenter.y - Ys, 2, 0, Math.PI*2);
            ctx.moveTo(this.leftCenter.x + (Resolution * j), this.leftCenter.y - Resolution);
            ctx.lineTo(this.leftCenter.x + (Resolution * j), this.leftCenter.y + Resolution);
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