import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";
import { Pyramid } from "./js/shapes/pyramid.js";
import { GameOfLife } from "./js/animations/gameoflife.js";
import { PulsingParticles } from "./js/animations/pulsing-particles.js";
import { Firework } from "./js/parts/firework.js";
import { Fireworks } from "./js/animations/fireworks.js";
import { Graph } from "./js/graphs/graph.js";
import { MandelbrotFractal } from "./js/math/mandelbrot.js";
import { ChaosShape } from "./js/math/chaos-shape.js";
import { CanvasButton } from "./js/components/canvas-button.js";

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


const animateCanvas = (ctx,actx,CANVAS_BUTTON, CHAOS_SHAPE)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            //clearPolarCanvas(ctx);
            clearCanvas(actx)
            //FIREWORKS.Start(ctx);
            //graph.render(ctx);
            //MANDELBROT_FRACTAL.render();

            //CANVAS_BUTTON.render();
            // if(CANVAS_BUTTON.pressed){
            //     CHAOS_SHAPE.numberOfPoints++;
            // }
            CHAOS_SHAPE.Start(actx);
            
        }
        lastTime = timestamp;
        requestAnimationFrame(animate)
    }
    animate();
} 
(function init(){

    const dpi = getDPI();
    const AnimationCanvas = document.getElementById('AnimationCanvas');
    fixCanvasForMobile(AnimationCanvas)
    const actx = AnimationCanvas.getContext('2d');
    const ANIMATION_CANVAS_WIDTH = AnimationCanvas.width;
    const ANIMATION_CANVAS_HIEGHT = AnimationCanvas.height;

    const canvas = document.getElementById('canvas');
    fixCanvasForMobile(canvas)
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    //ctx.translate(CANVAS_WIDTH*0.5,CANVAS_HEIGHT*0.5);
    
    // const FIREWORKS = new Fireworks(ctx,500,10);

    //const MANDELBROT_FRACTAL = new MandelbrotFractal(canvas);

   
    const CANVAS_BUTTON = new CanvasButton(AnimationCanvas, 300, 100);
    CANVAS_BUTTON.text = 'Touch'
    const SIZE = ANIMATION_CANVAS_WIDTH/2 > ANIMATION_CANVAS_HIEGHT/2 ? ANIMATION_CANVAS_HIEGHT/2:ANIMATION_CANVAS_WIDTH/2;
    const CHAOS_SHAPE = new ChaosShape(ANIMATION_CANVAS_WIDTH/2,ANIMATION_CANVAS_HIEGHT/2, 5, SIZE,true);
    CHAOS_SHAPE.setTriangleVertices(ANIMATION_CANVAS_WIDTH,ANIMATION_CANVAS_HIEGHT);
    
    animateCanvas(ctx, actx, CANVAS_BUTTON,CHAOS_SHAPE);

})();

// const cube = new Cube(300,-300,0,100,'hsl(180 100% 50%)');
// const sphere = new Sphere(100,0,0,200,'hsl(180 100% 50%)');

// const pyramid = new Pyramid(0,300,0,100,`hsl(60 100% 50%)`);
// const pyramid2 = new Pyramid(-200,-200,0,200,`hsl(324 100% 50%)`);

// const game = new GameOfLife(canvas);
// game.color = 'hsl(300 100% 50%)';

// const Particle_Animation = new PulsingParticles(canvas,500);