import { Tools } from "../tools.js";
const { scale } = Tools;

export class GraphController{
    constructor(point){
        this.point = point;
        this.X_SLIDER = document.getElementById('X-Slider');
        this.Y_SLIDER = document.getElementById('Y-Slider');
        this.Z_SLIDER = document.getElementById('Z-Slider');
        this.connectSliderX();
        this.connectSliderY();
        this.connectSliderZ();
        this.P1X = document.getElementById('p1x');
        this.P1Y = document.getElementById('p1y');
        this.P1Z = document.getElementById('p1z');
        this.P1RADIUS = document.getElementById('p1radius');
        this.P1COLOR = document.getElementById('p1color');

        this.P2X = document.getElementById('p1x');
        this.P2Y = document.getElementById('p1y');
        this.P2Z = document.getElementById('p1z');
        this.P2RADIUS = document.getElementById('p1radius');
        this.P2COLOR = document.getElementById('p1color');
    }
    connectSliderX(){
        this.X_SLIDER.addEventListener('input', (ev)=>{
            this.point.position.x = ev.target.value;
        })
    }
    connectSliderY(){
        this.Y_SLIDER.addEventListener('input', (ev)=>{
            this.point.position.y = ev.target.value;
        })
    }
    connectSliderZ(){
        this.Z_SLIDER.addEventListener('input', (ev)=>{
            this.point.position.z = ev.target.value;
            this.point.radius = scale(this.point.position.z,-1,1,0,100);
        })
    }
    setXRange(min,max,value){
        value = value || 0;
        this.X_SLIDER.setAttribute('min', min);
        this.X_SLIDER.setAttribute('max', max);
        this.X_SLIDER.setAttribute('value', value);
        const nodeList = document.querySelectorAll('.X-range-display');
        const DisplayRanges = [...nodeList];
        DisplayRanges[0].innerText = min.toString();
        DisplayRanges[1].innerText = value.toString();
        DisplayRanges[2].innerText = max.toString();
    }
    setYRange(min,max,value){
        value = value || 0;
        this.Y_SLIDER.setAttribute('min', min);
        this.Y_SLIDER.setAttribute('max', max);
        this.Y_SLIDER.setAttribute('value', value);
        const nodeList = document.querySelectorAll('.Y-range-display');
        const DisplayRanges = [...nodeList];
        DisplayRanges[0].innerText = min.toString();
        DisplayRanges[1].innerText = value.toString();
        DisplayRanges[2].innerText = max.toString();
    }
    setZRange(min,max,value){
        value = value || 0;
        this.Z_SLIDER.setAttribute('min', min);
        this.Z_SLIDER.setAttribute('max', max);
        this.Z_SLIDER.setAttribute('value', value);
        const nodeList = document.querySelectorAll('.Z-range-display');
        const DisplayRanges = [...nodeList];
        DisplayRanges[0].innerText = min.toString();
        DisplayRanges[1].innerText = value.toString();
        DisplayRanges[2].innerText = max.toString();
    }
    connectPointInputs(){
        this.P1X.addEventListener('input',(ev)=>{
            
        })
    }
}