"use strict";

import { Vector } from "./vector.js";

export class Point{
    constructor(x,y,z,radius){
        this.position = new Vector(x,y,z);
        this.radius = radius || 1;
        this.strokeWidth = 1;
        this.strokeColor = 'transparent';
        this.fillColor = 'hsl(0 0% 0%)';
        this.startAngle = 0;
        this.endAngle = Math.PI*2;

        //change the color to this
        this.hue = undefined;
        this.saturation = undefined;
        this.lightness = undefined;
        this.opacity = undefined;
        // Add this to fillstyle in render
        // `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${this.opacity})`;
    }
    setOpacity(num){
        this.opacity = num;
    }
    setColor(h,s,l,o){
        this.hue = h || 0;
        this.saturation = s || 100;
        this.lightness = l || 50;
        this.opacity = o || 1;
    }
    render(ctx){
        ctx.beginPath();
        //ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${this.opacity})`;
        ctx.arc(this.position.x,this.position.y,this.radius, this.startAngle, this.endAngle);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }
};