"use strict";

import { Tools } from "../tools.js";
const { random } = Tools;
import { Point } from "../components/point.js";
import { CVectors } from "../components/vector.js";
import { Line } from "../components/line.js";


export class ChaosShape{
    #NumArray;
    #labels;
    constructor(numberOfPoints,display){
        
        this.display = display;
        this.context = this.display.getContext('2d');
        //this.context.translate(this.display.width/2,this.display.height/2);
        this.width = this.display.width;
        this.height = this.display.height;
        this.points = new Array(numberOfPoints).fill(null);
        for(let i = 0; i < this.points.length; i++){
            const x = random(0,this.width);
            const y = random(0,this.height);
            // const z = random(0,100);  // What can i do with the z axis?
            const point = new Point(x,y,0,5);
            point.setColor(180);
            this.points[i] = point;
        }
        this.StartingPoint = new Point(random(0,this.width),random(0,this.height),0,5);
        this.StartingPoint.setColor(300);
        this.#NumArray = [1,2,3,4,5,6];
        this.#labels = ['A','B','C'];
    }
    nextPoint(point){
        const pick = random(0,this.points.length,true);
        let v;
        let newPoint;
        switch(pick){
            case 0:
                v = CVectors.MidPoint(point.position, this.points[pick].position);
                newPoint = new Point(v.x, v.y,0,10);
                newPoint.setColor(60);
                this.points.push(newPoint);
                break;
            case 1:
                v = CVectors.MidPoint(point.position, this.points[pick].position);
                newPoint = new Point(v.x, v.y,0,10);
                newPoint.setColor(60);
                this.points.push(newPoint);
                break;
            case 2:
                v = CVectors.MidPoint(point.position, this.points[pick].position);
                newPoint = new Point(v.x, v.y,0,10);
                newPoint.setColor(60);
                this.points.push(newPoint);
                break;
        }
    }
    update(){
        //Starting point
        
        const point = new Point(random(0,this.width),random(0,this.height),0,5);
        point.setColor(300);
        this.points.push(point);
        
        this.nextPoint(point);
    }
    
    Start(){
        //this.update();
        const len = this.points.length;
        for(let i = 0; i < len; i++){
            this.points[i].render(this.context);
            if(i < 3){
                this.context.font = '16px serif';
                this.context.fillText(this.#labels[i],this.points[i].position.x,this.points[i].position.y);
            }
        }
        
    }
}