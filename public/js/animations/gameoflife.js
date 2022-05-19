"use strict";

export class GameOfLife{
	#dpi
	constructor(canvas){
		this.#dpi = window.devicePixelRatio;
		this.title = 'GAME OF LIFE';
		this.titleArray = this.title.split(' ');
		this.fontSize = 96;
		this.color = 'hsl(0 0% 0%)';
		this.display = canvas;
		this.width = this.display.width;
		this.height = this.display.height;
		this.resolution = this.#dpi > 1 ? 10:5;
		this.columns = Math.floor(this.width / this.resolution);
		this.rows = Math.floor(this.height / this.resolution);
		this.grid = new Array(this.columns).fill(null)
		.map(_=> new Array(this.rows).fill(null)
		.map(_=> Math.floor(Math.random()*2)));
		this.gridToChange = this.grid;
		console.log(this.titleArray)
	}
	renderTitle(ctx){
		ctx.font = `${this.fontSize * this.#dpi}px sans-serif`;
		ctx.fillStyle = 'hsl(180 100% 50% / .5)';
		ctx.textAlign = 'center';
		for(let i = 0; i < this.titleArray.length; i++){
			ctx.fillText(this.titleArray[i], this.width/2, (i+1) * this.fontSize * this.#dpi);
		}
	}
	renderGrid(ctx,grid){
		for(let col = 0; col < grid.length; col++){
			for(let row = 0; row < grid[col].length; row++){
				const cell = grid[col][row];
				
				ctx.beginPath();
				ctx.fillStyle = cell ? this.color:'transparent';
				ctx.rect(col * this.resolution, row * this.resolution, this.resolution,this.resolution);
				ctx.fill()
			}
		}
	}
	nextGeneration(grid){
		// Make copy of arry
		const nextGenerationArray = grid.map( arr => [...arr])

		// Check all cells
		for(let col = 0; col < this.grid.length; col++){
			for(let row = 0; row < this.grid[col].length; row++){
				const cell = this.grid[col][row];
				
				// Variable to hold the sum of neighbors around cell
				let numberOfNeighbors = 0;

				// check neighbors
				for(let i = -1; i < 2; i++){
					for(let j = -1; j < 2; j++){

						// if it's itself, move on
						if(i ===0 && j === 0) continue;

						const X_Cell = col + i;
						const Y_Cell = row + j;
						// checking edges and making sure neighbors are inside the boundary
						if(X_Cell >= 0 && X_Cell < this.columns &&
							Y_Cell >= 0 && Y_Cell < this.rows){
								const currentNeighbor = grid[col + i][row + j];
								numberOfNeighbors += currentNeighbor;
						}
					}
				}
				// Rules
				if(cell === 1 && numberOfNeighbors < 2){
					nextGenerationArray[col][row] = 0;
				}else if(cell === 1 && numberOfNeighbors > 3){
					nextGenerationArray[col][row] = 0;
				}else if(cell === 0 && numberOfNeighbors === 3){
					nextGenerationArray[col][row] = 1;
				}
			}
		}
		return nextGenerationArray;
	}
	Start(ctx){
		// Postion game on canvas
		ctx.save();
		// Translating from polar coordinates
		ctx.translate(-this.width/2, -this.height/2);

		this.renderTitle(ctx);
		this.grid = this.nextGeneration(this.grid);
		this.renderGrid(ctx,this.grid);
		ctx.restore()
	}
}