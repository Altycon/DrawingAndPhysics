"use strict";

import { CMatrix } from "../math/matrix.js";
import { Vector } from "../components/vector.js";
import { Point } from "../components/point.js";

export class Pyramid{
	constructor(x,y,z,radius,color){
		this.center = new Vector(x,y,z);
		this.radius = radius;
		this.color = color
		this.totalPoints = 70;
		this.points = [];
		
		// create points
		this.pointA = new Point(0, -0.5, 0);
		
		this.pointF1 = new Point(-0.5, 0.5, -0.5);
		this.pointF2 = new Point(0.5, 0.5, -0.5);
		
		this.pointB1 = new Point(-0.5, 0.5, 0.5);
		this.pointB2 = new Point(0.5, 0.5, 0.5);
		this.points.push(this.pointA);
		this.points.push(this.pointF1);
		this.points.push(this.pointF2);
		this.points.push(this.pointB2);
		this.points.push(this.pointB1);
		this.editPoints();
		this.Zangle = 0.01;
	}
	editPoints(){
		this.points.forEach(point => {
			//point.radius = 10;
			point.color = this.color;
			point.position.setMagnitude(this.radius);
		});
	}
	connectPoints(ctx,i,j){
		const a = this.points[i];
		const b = this.points[j];
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.moveTo(a.position.x, a.position.y);
		ctx.lineTo(b.position.x, b.position.y);
		ctx.closePath();
		ctx.stroke();
	}
	createEdges(ctx){
		
		this.connectPoints(ctx, 0, 1);
		this.connectPoints(ctx, 0, 2);
		this.connectPoints(ctx, 0, 3);
		this.connectPoints(ctx, 0, 4);
		
		this.connectPoints(ctx, 1,2);
		this.connectPoints(ctx, 2,3);
		this.connectPoints(ctx, 3,4);
		this.connectPoints(ctx, 4,1);
	}
	rotate(angle){
		this.points.forEach( point=> {
			let rotated = CMatrix.Multiply(CMatrix.rotateZ(angle), point.position);
			rotated = CMatrix.Multiply(CMatrix.rotateX(angle), rotated);
			//rotated = CMatrix.Multiply(CMatrix.rotateY(angle), rotated);
			const projected2d = CMatrix.Multiply(CMatrix.Projection, rotated);
			
			point.position.x = projected2d.x;
			point.position.y = projected2d.y;
			point.position.z = projected2d.z;
		});
	}
	renderPoints(ctx){
		this.points.forEach(point => {
			point.render(ctx)
		});
		//const str = `x: ${this.points[0].position.x}, y: ${this.points[0].position.y}, z: ${this.points[0].position.z}`;
		//ctx.font = '24px sans-serif';
		//ctx.fillStyle = 'limegreen';
		//ctx.fillText(str, -400, 300);
		//ctx.fill();
	}
	Start(ctx){
		ctx.save();
		ctx.translate(this.center.x, this.center.y)
		this.rotate(this.Zangle);
		this.createEdges(ctx);
		this.renderPoints(ctx);
		ctx.restore();
	}
}