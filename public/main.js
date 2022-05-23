import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";
import { Pyramid } from "./js/shapes/pyramid.js";
import { GameOfLife } from "./js/animations/gameoflife.js";
import { PulsingParticles } from "./js/animations/pulsing-particles.js";
import { Firework } from "./js/parts/firework.js";
import { Fireworks } from "./js/animations/fireworks.js";

const { 
        random, 
        scale, 
        getDPI, 
        fixCanvasForMobile, 
        clearCanvas, 
        clearPolarCanvas, 
        PerlinNoise 
    } = Tools;

/** TESTED
 *  
 *  3D SHAPES
 *  cube.Start(ctx);
 *  sphere.Start(ctx);
 *  pyramid.Start(ctx);
 *  pyramid2.Start(ctx);
 *  
 *  ANIMATIONS
 *  game.Start(ctx);
 *  Particle_Animation.Start(ctx);
 */


const animateCanvas = (ctx,firework,FIREWORKS)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            clearPolarCanvas(ctx);

            //firework.Start(ctx);
            FIREWORKS.Start(ctx);
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
    
    const firework = new Firework(0,CANVAS_HEIGHT/2,0,10);
    const FIREWORKS = new Fireworks(ctx,200,5);
    
    animateCanvas(ctx,firework,FIREWORKS);

})();

// const cube = new Cube(300,-300,0,100,'hsl(180 100% 50%)');
// const sphere = new Sphere(100,0,0,200,'hsl(180 100% 50%)');

// const pyramid = new Pyramid(0,300,0,100,`hsl(60 100% 50%)`);
// const pyramid2 = new Pyramid(-200,-200,0,200,`hsl(324 100% 50%)`);

// const game = new GameOfLife(canvas);
// game.color = 'hsl(300 100% 50%)';

// const Particle_Animation = new PulsingParticles(canvas,500);