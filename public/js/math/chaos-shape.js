"use strict";

import { Tools } from "../tools.js";
const { random } = Tools;
import { Point } from "../components/point.js";
import { CVectors, Vector } from "../components/vector.js";
import { Line } from "../components/line.js";

// CLAY!!! Change point variable names to vertices when refering to points of triangle
// Create another array of points for the points that you're calculating.
// Then use the first element of the points array as the new point for calculating
// This way you don't have to figure out a recursive function.
// ....I should be able to animate each calculation this way...

export class ChaosShape{
    constructor(x,y,numberOfPoints,size,color){
        this.position = new Vector(x,y);
        this.numberOfPoints = numberOfPoints;
        this.vertices = [];
        this.size = size;
        this.solidColor = color;
     
        for(let i = 0; i < this.numberOfPoints; i++){
        	const angle = i * (Math.PI*2)/this.numberOfPoints;
        	const x = this.position.x + this.size * Math.sin(angle);
        	const y = this.position.y + this.size * Math.cos(angle);
            const vertex = new Point(x,y,0,5);
            if(this.solidColor === true) vertex.setColor(0,100,100,0.5);
            else if(this.solidColor === 0) vertex.setColor(this.solidColor,0,0,0.5);
            else if(this.solidColor >= 0) vertex.setColor(this.solidColor,100,50,0.5);
            else vertex.setColor(random(0,360),100,50,0.5);
            this.vertices.push(vertex)
        }
        this.points = []
        this.StartingPoint = new Point(random(this.position.x,this.size),random(this.position.y,this.size));
        //this.StartingPoint.setColor(60,100,50);
        this.points.push(this.StartingPoint);
        this.interations = 0;
        this.previousPick = null;
    }
    getVertex(){
        const attemps = 100;
        for(let i = 0; i < attemps; i++){
            const pick = random(0,this.vertices.length,true);
            if(this.previousPick != pick){
                this.previousPick = pick;
                const color = [
                    this.vertices[pick].hue,
                    this.vertices[pick].saturation,
                    this.vertices[pick].lightness,
                    this.vertices[pick].opacity,
                ];
                
                const vertex = this.vertices[pick]
                return [vertex,color]
            }
        }
        
    }
    update(){
        
        const [vertex,color] = this.getVertex();
        const v = CVectors.MidPoint(this.points[0].position, vertex.position);
        const point = new Point(v.x, v.y, 0, 1);
        point.setColor(color[0],color[1],color[2],color[3]);
        // point.setColor(180,100,50,.1);
        this.points.unshift(point)
        
    }
    startGame(ctx){
        if(this.interations < 500){

            const len = this.vertices.length;
            for(let i = 0; i < len; i++){
                this.vertices[i].render(ctx);
            }
            let start = 0, end = 100;
            while(start < end){
                
                this.update();

                start++;
            }
            this.interations++;
        }
        for(let j = 0; j < this.points.length; j++){
            this.points[j].render(ctx);
        }
        ctx.beginPath();
        ctx.font = '16px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(this.interations, ctx.canvas.width/2, ctx.canvas.height-100);
    }
    setTriangleVertices(){
        this.vertices = [];
        for(let i = 0; i < this.numberOfPoints; i++){
        	const angle = i * (Math.PI*2)/this.numberOfPoints;
        	const x = this.position.x + random(0,300,true) * Math.sin(angle);
        	const y = this.position.y + random(0,300,true) * Math.cos(angle);
            const vertex = new Point(x,y,0,5);
            if(this.solidColor === true) vertex.setColor(0,100,100,0.5);
            else if(this.solidColor === 0) vertex.setColor(this.solidColor,0,0,0.5);
            else if(this.solidColor >= 0) vertex.setColor(this.solidColor,100,50,0.5);
            else vertex.setColor(random(0,360),100,50,0.5);
            this.vertices.push(vertex)
        }
    }
    updateTriangle(){
        //const [vertex,color] = this.getVertex();
        const v = CVectors.MidPoint(this.points[0].position, vertex.position);
        const point = new Point(v.x, v.y, 0, 1);
        point.setColor(color[0],color[1],color[2],color[3]);
        // point.setColor(180,100,50,.1);
        this.points.unshift(point)
    }
    startTriangle(){
        this.setTriangleVertices();
        
    }
    Start(ctx){
        
        this.startGame(ctx);
        
        
    }
}