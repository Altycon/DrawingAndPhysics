import { Tools } from "./js/tools.js";
import { Point } from "./js/shapes/point.js";

const { random, scale, getDPI, fixCanvasForMobile, clearCanvas, clearPolarCanvas } = Tools;


const animateCanvas = (ctx,item,items)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

        }
        lastTime = timestamp;
        requestAnimationFrame(animate)
    }
    animate;
}
(function init(){

    const dpi = getDPI();
    const canvas = document.getElementById('canvas');
    fixCanvasForMobile(canvas)
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    ctx.translate(CANVAS_WIDTH*0.5,CANVAS_HEIGHT*0.5);
    
    const point = new Point(0,0,0,20);
    const point2 = new Point(100,0,0,20);
    point2.fillColor = 'hsl(180 100% 50%)';
    point.render(ctx);
    point2.render(ctx);


})();