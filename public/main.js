import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";
import { Pyramid } from "./js/shapes/pyramid.js";

const { 
        random, 
        scale, 
        getDPI, 
        fixCanvasForMobile, 
        clearCanvas, 
        clearPolarCanvas, 
        PerlinNoise 
    } = Tools;


const animateCanvas = (ctx,cube,sphere, pyramid, pyramid2)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            clearPolarCanvas(ctx);

            //cube.Start(ctx);

            //sphere.Start(ctx);
            
            pyramid.Start(ctx);
			pyramid2.Start(ctx);
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
    const sphere = new Sphere(100,0,0,200,'hsl(180 100% 50%)');
    
    const pyramid = new Pyramid(0,0,0,100,`hsl(60 100% 50%)`);
	const pyramid2 = new Pyramid(-200,-200,0,200,`hsl(324 100% 50%)`);

    animateCanvas(ctx,cube,sphere, pyramid, pyramid2);

})();