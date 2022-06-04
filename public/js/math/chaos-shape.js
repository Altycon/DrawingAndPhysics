"use strict";

import { Tools } from "../tools.js";
const { random } = Tools;
import { Point } from "../components/point.js";
import { CVectors } from "../components/vector.js";
import { Line } from "../components/line.js";

// CLAY!!! Change point variable names to vertices when refering to points of triangle
// Create another array of points for the points that you're calculating.
// Then use the first element of the points array as the new point for calculating
// This way you don't have to figure out a recursive function.
// ....I should be able to animate each calculation this way...

export class ChaosShape{
    #NumArray;
    #labels;
    constructor(numberOfPoints,display){
        
        this.display = display;
        this.context = this.display.getContext('2d');
        this.context.translate(this.display.width/2,this.display.height/2);
        this.width = this.display.width;
        this.height = this.display.height;
        this.vertices = new Array(numberOfPoints).fill(null);
        this.size =500;
     
        for(let i = 0; i < this.vertices.length; i++){
        	const angle = random(0,360,true)*Math.PI/180;
        	const x = this.size * Math.sin(angle);
        	const y = this.size * Math.cos(angle);
            //const x = random(0,this.width);
            //const y = random(0,this.height);
            // const z = random(0,100);  // What can i do with the z axis?
            const vertex = new Point(x,y,0,10);
            vertex.setColor(320);
            this.vertices[i] = vertex;
        }
        this.points = []
        this.StartingPoint = new Point(random(0,this.width),random(0,this.height),0,10);
        this.StartingPoint.setColor(0);
        this.points.push(this.StartingPoint);
        this.#NumArray = [1,2,3,4,5,6];
        this.#labels = ['A','B','C'];
    }
    getVertex(){
        const pick = random(0,this.vertices.length,true);
        return this.vertices[pick]
    }
    update(){
    
        const vertex = this.getVertex();
        const v = CVectors.MidPoint(this.points[0].position, vertex.position);
        const point = new Point(v.x, v.y, 0, 3);
        point.setColor(220);
        this.points.unshift(point)
        
    }
    Start(){
        
        const len = this.vertices.length;
        for(let i = 0; i < len; i++){
            this.vertices[i].render(this.context);
            if(i < 3){
                this.context.font = '16px serif';
                this.context.fillStyle = 'hsl(180 100% 50%)';
                this.context.fillText(this.#labels[i],this.vertices[i].position.x+10,this.vertices[i].position.y+10);
            }
        }
        this.update();
        for(let j = 0; j < this.points.length; j++){
            this.points[j].render(this.context);
        } 
        
    }
}