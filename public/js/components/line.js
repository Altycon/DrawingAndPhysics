"use strict";

export class Line{
    constructor(startX,startY,endX,endY,color,width){
        this.start = {x: startX, y: startY};
        this.end = {x: endX, y: endY};
        this.color = color || 'hsl(0 0% 0%)';
        this.width = width || 1 * window.devicePixelRatio;
    }
    render(ctx){
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.closePath();
        ctx.stroke();
    }
}