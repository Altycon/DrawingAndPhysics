export const Tools = {
    random: (min,max,bool)=> bool? Math.floor(Math.random()*(max-min)+min):Math.random()*(max-min)+min,
    scale: (number,inMin,inMax,outMin,outMax)=>{
        return (number - inMin)*(outMax-outMin)/(inMax-inMin)+outMax;
    },
    getDPI: ()=> window.devicePixelRatio,
    fixCanvasForMobile: (canvas)=>{
        const dpi = window.devicePixelRatio;
        const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        canvas.setAttribute('width',style_width * dpi);
        canvas.setAttribute('height',style_height * dpi);
    },
    clearCanvas: (ctx)=>{
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        ctx.clearRect(0,0,width,height);
    },
    clearPolarCanvas: (ctx)=>{
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        ctx.clearRect(-width/2,-height/2,width,height);
    }
}