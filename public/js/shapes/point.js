"use strict";

import { Vector, CVectors } from "../vector.js";

export default class Point{
    constructor(x,y,z,radius){
        this.position = new Vector(x,y,z);
        this.radius = radius || 1;
        this.strokeWidth = 1;
        this.strokeColor = 'transparent';
        this.fillColor = 'hsl(0 0% 0%)';
        this.startAngle = 0;
        this.endAngle = Math.PI*2;
    }
    render(ctx){
        ctx.beginPath();
        //ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.fillColor;
        ctx.arc(this.position.x,this.position.y,this.radius, this.startAngle, this.endAngle);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }
}

export { Point };