"use strict";

export class GameOfLife{
	constructor(canvas){
		this.display = canvas;
		this.width = this.display.width;
		this.height = this.display.height;
		this.resolution = 10;
		this.columns = this.width / this.resolution;
		this.rows = this.height / this.resolution;
		this.grid = new Array(this.columns).fill(null)
		.map(_=> new Array(this.rows).fill(null)
		.map(_=> Math.floor(Math.random()*2)));
	}
	render(ctx){
		for(let col = 0; col < this.grid.length; col++){
			for(let row = 0; row < this.grid[i].length; row++){
				const cell = this.grid[col][row];
				
				ctx.beginPath();
				ctx.fillStyle = cell ? 'black':'white';
				ctx.rect(col * this.resolution, row * this.resolution, this.resolution,this.resolution);
				ctx.fill()
			}
		}
	}
}