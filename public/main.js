import { Tools } from "./js/tools.js";
import { Point } from "./js/components/point.js";
import { Cube } from "./js/shapes/cube.js";
import { Sphere } from "./js/shapes/sphere.js";
import { Pyramid } from "./js/shapes/pyramid.js";
import { GameOfLife } from "./js/animations/gameoflife.js";
import { PulsingParticles } from "./js/animations/pulsing-particles.js";

const { 
        random, 
        scale, 
        getDPI, 
        fixCanvasForMobile, 
        clearCanvas, 
        clearPolarCanvas, 
        PerlinNoise 
    } = Tools;


const animateCanvas = (ctx,cube,sphere, pyramid, pyramid2,game,Particle_Animation)=>{

    let lastTime;
    const animate = (timestamp)=>{
        if(lastTime != null){
            //code here

            clearPolarCanvas(ctx);

            //cube.Start(ctx);

            //sphere.Start(ctx);
            
            //pyramid.Start(ctx);
			//pyramid2.Start(ctx);

            //game.Start(ctx);

            Particle_Animation.Start(ctx);
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
    
    const cube = new Cube(300,-300,0,100,'hsl(180 100% 50%)');
    const sphere = new Sphere(100,0,0,200,'hsl(180 100% 50%)');
    
    const pyramid = new Pyramid(0,300,0,100,`hsl(60 100% 50%)`);
	const pyramid2 = new Pyramid(-200,-200,0,200,`hsl(324 100% 50%)`);
	
	const game = new GameOfLife(canvas);
	game.color = 'hsl(300 100% 50%)';

    const Particle_Animation = new PulsingParticles(canvas,500);
    console.log(Particle_Animation.particles)
    animateCanvas(ctx,cube,sphere, pyramid, pyramid2, game, Particle_Animation);

})();