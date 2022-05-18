"use strict";


import { Vector } from "../components/vector.js";
import { Point } from "../components/point.js";
import {CMatrix} from "../math/matrix.js";

export class Cube{
    constructor(x,y,z,size,color){
        this.center = new Vector(x,y,z);
        this.color = color || `hsl(${random(0,360)} 100% 50%)`;
        this.vertices = []
        this.size = size;
        this.magnitude = Math.sqrt(this.size ** 2 + this.size ** 2);
        this.vertexF1 = new Point(-0.5, -0.5, -0.5);
        this.vertexF2 = new Point(0.5, -0.5, -0.5);
        this.vertexF3 = new Point(0.5, 0.5, -0.5);
        this.vertexF4 = new Point(-0.5, 0.5, -0.5);
        this.vertexB1 = new Point(-0.5, -0.5, 0.5);
        this.vertexB2 = new Point(0.5, -0.5, 0.5);
        this.vertexB3 = new Point(0.5, 0.5, 0.5);
        this.vertexB4 = new Point(-0.5, 0.5, 0.5);
        this.vertices.push(this.vertexF1);
        this.vertices.push(this.vertexF2);
        this.vertices.push(this.vertexF3);
        this.vertices.push(this.vertexF4);
        this.vertices.push(this.vertexB1);
        this.vertices.push(this.vertexB2);
        this.vertices.push(this.vertexB3);
        this.vertices.push(this.vertexB4);
        this.editPoints();
        this.angleZ = 0.01;
        this.rotateZ = (angle)=>angle;
    }
    printLayout(){
        const layout = `Front \t Back \nF1 F2 \t B1 B2 \nF4 F3 \t B4 B3`;
        console.log(layout)
        console.log(this.vertices)
    }
    editPoints(){
        this.vertices.forEach( (vertex) => {
            vertex.radius = 2;
            // this.vertices[0].fillColor = 'hsl(0 100% 50%)';
            // this.vertices[1].fillColor = 'hsl(0 100% 50%)';
            // this.vertices[2].fillColor = 'hsl(0 100% 50%)';
            // this.vertices[3].fillColor = 'hsl(0 100% 50%)';
            vertex.fillColor = this.color;
            vertex.position.setMagnitude(this.magnitude);
        })
    }
    rotatePoints(){
        let rotated;
        this.vertices.forEach( vertex => {

            rotated = CMatrix.Multiply(CMatrix.rotateZ(this.angleZ), vertex.position);
            rotated = CMatrix.Multiply(CMatrix.rotateX(this.angleZ), rotated);
            //rotated = CMatrix.Multiply(CMatrix.rotateY(this.angleZ), rotated);

            // const distance = 2;
            // const z = 1 / (distance - rotated.z);
            // const projection_change = CMatrix.ProjectionChange(z);

            const projected = CMatrix.Multiply(CMatrix.Projection, rotated);
            vertex.position.x = projected.x;
            vertex.position.y = projected.y;
            vertex.position.z = projected.z;
        });
    }
    connectPoints(i,j,ctx){
        const va1 = this.vertices[i];
        const va2 = this.vertices[j];
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.stokeStyle = this.color;
        ctx.moveTo(va1.position.x, va1.position.y);
        ctx.lineTo(va2.position.x, va2.position.y);
        ctx.closePath();
        ctx.stroke();
    }
    createEdges(ctx){
        for(let i = 0; i < 4; i++){
            this.connectPoints(i, (i+1) % 4, ctx);
            this.connectPoints(i+4, ((i+1) % 4) +4, ctx);
            this.connectPoints(i, i+4, ctx);
        }
    }
    renderPoints(ctx){
        this.vertices.forEach( vertex => vertex.render(ctx))

        // let Vstring = `x: ${this.vertices[0].position.x}, y: ${this.vertices[0].position.y}, z: ${this.vertices[0].position.z}`;
        // ctx.fillStyle = 'hsl(120 100 50%)';
        // ctx.font = '36px serif';
        // ctx.fillText(Vstring, -700,-300);
    }
    Start(ctx){
        ctx.save();
        ctx.translate(this.center.x, this.center.y)
        this.rotatePoints();
        //this.vertices.forEach( vertex => vertex.position.setMagnitude(100))
        this.createEdges(ctx);
        this.renderPoints(ctx);
        ctx.restore();
    }
}