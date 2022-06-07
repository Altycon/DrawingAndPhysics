import { Line } from "../components/line.js";
import { Point } from "../components/point.js";
import { CVectors } from "../components/vector.js";
import { Tools } from "../tools.js";
const {random} = Tools;

export class Wrap{
    constructor(canvas,points){
        // Make the points array a required input into constructor
        this.display = canvas;
        this.context = this.display.getContext('2d');
        this.width = this.display.width;
        this.height = this.display.height;
        this.points = points;
        this.hull = [];
        this.sortPoints();
        this.leftMost = this.points[0];
        this.currentVertex = this.leftMost;
        this.currentVertex.radius = 5;
        this.currentVertex.setColor(220,100,50);
        this.index = 2;
        this.nextIndex = -1;
        this.nextVertex = this.points[1];
        this.hull.push(this.currentVertex);
        this.done = false;
    }
    example(num){
        const buffer = this.width*0.1;
        for(let i = 0; i < num; i++){
            const x = random(buffer,this.width-buffer);
            const y = random(buffer,this.height-buffer);
            const point = new Point(x,y,0,5);
            point.setColor(180,100,50);
            this.points.push(point);
        }
    }
    
    sortPoints(){
        this.points.sort( (a,b)=> a.position.x - b.position.x);
    }
    searchPoints(){

    }
    renderPoints(){
        for(let i = 0; i < this.points.length; i++){
            this.points[i].render(this.context);
        }
    }
    renderHull(){
        const start = this.hull[0].position;
        this.context.beginPath();
        this.context.strokeStyle = 'hsl(0 100% 50%)';
        this.context.moveTo(start.x, start.y);
        for(let i = 1; i < this.hull.length; i++){
            const end = this.hull[i].position;
            this.context.lineTo(end.x, end.y);
        }
        this.context.closePath();
        this.context.stroke();
    }
    fillHull(){
        const start = this.hull[0].position;
        this.context.beginPath();
        this.context.fillStyle = 'hsl(175 100% 50%)';
        this.context.moveTo(start.x, start.y);
        for(let i = 1; i < this.hull.length; i++){
            const end = this.hull[i].position;
            this.context.lineTo(end.x, end.y);
        }
        this.context.closePath();
        this.context.fill();
    }
    Start(){
        
        if(!this.done){
            

            const lineB = new Line(
                this.currentVertex.position.x, 
                this.currentVertex.position.y,
                this.nextVertex.position.x,
                this.nextVertex.position.y,
                'hsl(180 100% 50%)'
            );
            lineB.render(this.context);
            
            let checking = this.points[this.index];
            const lineA = new Line(
                this.currentVertex.position.x,
                this.currentVertex.position.y,
                checking.position.x,
                checking.position.y,
                'hsl(0 100% 100%)'
            );
            lineA.render(this.context);

            const a = CVectors.subtract(this.nextVertex.position, this.currentVertex.position);
            const b = CVectors.subtract(checking.position, this.currentVertex.position);
            const cross = a.crossProduct(b);

            if(cross.z < 0){
                this.nextVertex = checking;
                this.nextIndex = this.index;
            }
            this.index = this.index + 1;
            if(this.index === this.points.length){
                if(this.nextVertex === this.leftMost){
                    console.log('done');
                    this.done = true;
                }else{
                    this.hull.push(this.nextVertex);
                    this.currentVertex = this.nextVertex;
                    this.index = 0;
                    this.nextVertex = this.leftMost;
                }
                
            }
            this.currentVertex.render(this.context);
            this.leftMost.render(this.context);
        }

        this.renderPoints();
        this.renderHull();
        this.fillHull();
        
    }
}