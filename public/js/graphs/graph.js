"use strict";

import { Line } from "../components/line.js";
import { Point } from "../components/point.js";
import { Vector } from "../components/vector.js";
import { GraphController } from "./graph-controller.js";

export class Graph{
    constructor(x,y,width,height){
        this.position = new Vector(x,y);
        this.apectRatio = 16/9;
        this.width = width;
        this.height = height ? height: this.width/this.apectRatio;
        this.background = `hsl(0 100% 100% / .4)`;
        this.border = `hsl(120 100% 50% / 1)`;
        this.center = new Vector(this.position.x + this.width/2, this.position.y + this.height/2);
        this.topCenter = new Vector(this.position.x + (this.width/2), this.position.y);
        this.bottomCenter = new Vector(this.position.x + (this.width/2), this.position.y + this.height);
        this.leftCenter = new Vector(this.position.x, this.position.y + (this.height/2));
        this.rightCenter = new Vector(this.position.x + this.width, this.position.y + (this.height/2));
        this.Increments = this.createIncrements();
        this.line_width = 1 * window.devicePixelRatio;
        
        this.points = [];
        this.createPoint(0,0,0,5,'hsl(300 100% 50%)');
        this.controller = new GraphController(this.points[0]);
        this.controller.setXRange(this.leftCenter.x, this.rightCenter.x,0);
        this.controller.setYRange(this.topCenter.y, this.bottomCenter.y,0);
        this.controller.setZRange(-1,1,0)
    }
    createPoint(x,y,z,radius,color){
        const point = new Point(x,y,z,radius);
        point.fillColor = color;
        this.points.push(point);
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
        ctx.lineWidth = this.line_width;

        ctx.strokeStyle = this.border;
        ctx.moveTo(this.topCenter.x, this.topCenter.y);
        ctx.lineTo(this.bottomCenter.x, this.bottomCenter.y);
        // ctx.closePath();
        ctx.stroke();

        // ctx.beginPath();
        ctx.moveTo(this.leftCenter.x, this.leftCenter.y);
        ctx.lineTo(this.rightCenter.x, this.rightCenter.y);
        // ctx.closePath();
        ctx.stroke();
    }
    createIncrements(){
    	const Resolution = 20;
        const Line_Length = Resolution/2;
    	const Ys = Math.floor(this.topCenter.y/Resolution)*-1; // I don't know why 
        const Xs = Math.floor(this.rightCenter.x/Resolution);

        const Increment_Array = [];
        
        for(let i = 1; i < Ys*2; i++){
            
            const Pos_Y_Line = new Line(
                this.center.x - Line_Length, this.center.y + (Resolution * i),
                this.center.x + Line_Length, this.center.y + (Resolution * i),
                this.border
            );
            const Neg_Y_Line = new Line(
                this.center.x - Line_Length, this.center.y - (Resolution * i),
                this.center.x + Line_Length, this.center.y - (Resolution * i),
                this.border
            );
            Increment_Array.push(Pos_Y_Line);
            Increment_Array.push(Neg_Y_Line);
        }
        for(let j = 1; j < Xs*2; j++){
           
            const Pos_X_Line = new Line(
                this.center.x + (Resolution * j), this.center.y - Line_Length,
                this.center.x + (Resolution * j), this.center.y + Line_Length,
                this.border
            );
            const Neg_X_Line = new Line(
                this.center.x - (Resolution * j), this.center.y - Line_Length,
                this.center.x - (Resolution * j), this.center.y + Line_Length,
                this.border
            );
            Increment_Array.push(Pos_X_Line);
            Increment_Array.push(Neg_X_Line);
        }
        return Increment_Array;
    }
    renderIncrements(ctx){
        for(let i = 0; i < this.Increments.length; i++){
            this.Increments[i].render(ctx);
        }
    }
    renderPoints(ctx){
        if(this.points.length){
            for(let i = 0; i < this.points.length; i++){
                this.points[i].render(ctx);
            }
        }
        
    }
    render(ctx){
        this.renderDisplay(ctx);
        this.renderGraphLines(ctx);
        this.renderIncrements(ctx);
        this.renderPoints(ctx);
    }
}