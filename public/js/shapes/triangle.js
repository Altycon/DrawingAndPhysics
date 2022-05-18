"use strict";

import { Vector } from "../components/vector.js";

export class Triangle{
    constructor(x,y,size){
       this.position = new Vector(x,y);
       this.color = `hsl(0 100% 100% / .5)`;
       this.pointColor = this.color;
       this.pointRadius = 5;
       this.size = size;
       this.sideLength = 400;
       this.cornerA = this.createPosition(this.position,this.size,270);
       this.cornerB = this.createPosition(this.cornerA,random(0,400,true), random(0,90,true));
       this.cornerC = this.createPosition(this.cornerA, random(0,400,true), random(90,180,true))
       this.center = new Vector(0,0);
       this.A2B_Center = this.getCenterBetween(this.cornerA,this.cornerB);
       this.B2C_Center = this.getCenterBetween(this.cornerB,this.cornerC);
       this.C2A_Center = this.getCenterBetween(this.cornerC,this.cornerA);
       this.centroid = this.findCentroid();
       this.startArc = 0;
       this.endArc = Math.PI*2;
    }
    createPosition(position,length,deg){
        const theta = deg * Math.PI/180;
        const x = position.x + length * Math.cos(theta);
        const y = position.y + length * Math.sin(theta);
        return new Vector(x,y);
    }
    getCenterBetween(position1,position2){
        return new Vector( (position1.x + position2.x)/2, (position1.y + position2.y)/2)
    }
    findCentroid(){
        const x = (this.cornerA.x + this.cornerB.x + this.cornerC.x)/3;
        const y =(this.cornerA.y + this.cornerB.y + this.cornerC.y)/3;
        return new Vector(x,y)
    }
    touchingEdges(position,distance){
        return (position < -distance/2 || position > distance/2);
    }
    randomVelocityInit(){
        const speed = 2;
        this.velocity1 = new Vector(random(-speed,speed),random(-speed,speed));
        this.velocity2 = new Vector(random(-speed,speed),random(-speed,speed));
        this.velocity3 = new Vector(random(-speed,speed),random(-speed,speed));
    }
    movePoints(ctx){
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
    }
    renderPoint(ctx,point,color){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(point.x,point.y,this.pointRadius,this.startArc,this.endArc);
        ctx.fill();
    }
    renderLine(ctx,position1,position2,color){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(position1.x, position1.y);
        ctx.lineTo(position2.x,position2.y);
        ctx.closePath();
        ctx.stroke();
    }
    renderPoints(ctx){
        this.renderPoint(ctx,this.position, 'yellow')
        this.renderPoint(ctx, this.cornerA,'red');
        this.renderPoint(ctx, this.cornerB, 'blue');
        this.renderPoint(ctx, this.cornerC, 'green');
        this.renderPoint(ctx, this.A2B_Center, 'pink');
        this.renderPoint(ctx, this.B2C_Center, 'pink');
        this.renderPoint(ctx, this.C2A_Center, 'pink');
        this.renderPoint(ctx, this.centroid, 'limegreen');
    }
    renderLines(ctx){
        this.renderLine(ctx,this.cornerA,this.cornerB,'white');
        this.renderLine(ctx,this.cornerB,this.cornerC,'white');
        this.renderLine(ctx,this.cornerC,this.cornerA,'white');
        this.renderLine(ctx,this.cornerA,this.B2C_Center,'yellow');
        this.renderLine(ctx,this.cornerB,this.C2A_Center,'yellow');
        this.renderLine(ctx,this.cornerC,this.A2B_Center,'yellow');
    }
}