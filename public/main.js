import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";
import { Pyramid } from "./js/shapes/pyramid.js";
import { GameOfLife } from "./js/animations/gameoflife.js";
import { PulsingParticles } from "./js/animations/pulsing-particles.js";
import { Firework } from "./js/parts/firework.js";

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


const animateCanvas = (ctx,firework,firework2)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            clearPolarCanvas(ctx);

            firework.Start(ctx);
            firework2.Start(ctx);
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
    
    const firework = new Firework(

        random(-CANVAS_WIDTH/2,CANVAS_WIDTH/2),
        CANVAS_HEIGHT/2 + 10,
        0,
        10,
        'hsl(180 100% 50%)'

    );
    const firework2 = new Firework(

        random(-CANVAS_WIDTH/2,CANVAS_WIDTH/2),
        CANVAS_HEIGHT/2 + 10,
        0,
        8,
        'hsl(120 100% 50%)'
        
    );
    //firework.render(ctx);

    animateCanvas(ctx,firework,firework2);

})();

// const cube = new Cube(300,-300,0,100,'hsl(180 100% 50%)');
// const sphere = new Sphere(100,0,0,200,'hsl(180 100% 50%)');

// const pyramid = new Pyramid(0,300,0,100,`hsl(60 100% 50%)`);
// const pyramid2 = new Pyramid(-200,-200,0,200,`hsl(324 100% 50%)`);

// const game = new GameOfLife(canvas);
// game.color = 'hsl(300 100% 50%)';

// const Particle_Animation = new PulsingParticles(canvas,500);