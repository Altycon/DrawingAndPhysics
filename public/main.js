import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";

const { 
        random, 
        scale, 
        getDPI, 
        fixCanvasForMobile, 
        clearCanvas, 
        clearPolarCanvas, 
        PerlinNoise 
    } = Tools;


const animateCanvas = (ctx,cube,sphere)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            clearPolarCanvas(ctx);

            //cube.Start(ctx);

            sphere.rotateXAxis(ctx, 0.01);
            sphere.render(ctx);
        }
        lastTime = timestamp;
        requestAnimationFrame(animate)
    }
    animate();
}
(function init(){

    const dpi = getDPI();
    const canvas = document.getElementById('canvas');
    fixCanvasForMobile(canvas)
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    ctx.translate(CANVAS_WIDTH*0.5,CANVAS_HEIGHT*0.5);
    
    const cube = new Cube(0,0,0,100,'hsl(180 100% 50%)');
    const sphere = new Sphere(0,0,0,300,'hsl(180 100% 50%)');

    animateCanvas(ctx,cube,sphere);

})();