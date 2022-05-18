"use strict";

import { Tools } from "../tools.js";
const { scale } = Tools;

import { CMatrix } from "../math/matrix.js";
import { Vector } from "../components/vector.js";
import { Point } from "../components/point.js";

export class Sphere{
    constructor(x,y,z,radius,color){
        this.position = new Vector(x,y,z);
        this.radius = radius;
        this.resolution = 30;
        this.strokeStyle = 'transparent';
        this.fillStyle = color;
        this.pointRadius = 5;
        this.startArc = 0;
        this.endArc = Math.PI*2;
        this.points = this.createPoints();
    }
    printPoints(){
        console.log(this.points)
    }
    createPoints(){
        const pointArray = []
        const total = this.resolution;
        const longitudeStart = -Math.PI;
        const longitudeEnd = Math.PI;
        const latitudeStart = -Math.PI/2;
        const latitudeEnd = Math.PI/2;

        for(let i = 0; i <= total; i++){
            const longitude = scale(i, 0, total, longitudeStart, longitudeEnd);
            for(let j = 0; j <= total; j++){
                const latitude = scale(j, 0, total, latitudeStart, latitudeEnd);
                
                const x = this.radius * Math.sin(longitude) * Math.cos(latitude);
                const y = this.radius * Math.sin(longitude) * Math.sin(latitude);
                const z = this.radius * Math.cos(longitude);
                const point = new Point(x,y,z,1);
                point.fillColor = this.fillStyle;
                pointArray.push(point);
            }
        }
        return pointArray;
    }
    rotateXAxis(ctx,angle){
        const distance = 0.5;
        for(let i = 0; i < this.points.length; i++){
            const point = this.points[i];
            let rotated = CMatrix.Multiply(CMatrix.rotateZ(angle),point.position);
            rotated = CMatrix.Multiply(CMatrix.rotateX(angle), rotated);
            rotated = CMatrix.Multiply(CMatrix.rotateY(angle), rotated);

            // const z = 1 / (distance - rotated.z);

            // const Proj = [ 
            //     [z,0,0], 
            //     [0,z,0] 
            // ];
            const project2d = CMatrix.Multiply(CMatrix.Projection,rotated);
            
            point.position.x = project2d.x;
            point.position.y = project2d.y;
            point.position.z = project2d.z;

            point.render(ctx);
        } 
    }
    render(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.position.x, this.position.y, this.pointRadius, this.startArc, this.endArc);
        ctx.fill();
        ctx.stroke();

        for(let i = 0; i < this.points.length; i++){
            const point = this.points[i];

            point.render(ctx)
        }
    }
}

// x = r sin(theta) cos(phi)
// y = r sin(theta) sin(phi)
// z = r cos(theta)