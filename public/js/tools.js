"use strict";

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
    },
    PerlinNoise: (x,y,z)=>{
        const PERLIN_YWRAPB = 4;
        const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
        const PERLIN_ZWRAPB = 8;
        const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
        const PERLIN_SIZE = 4095;
        let perlin_octaves = 4; // default to medium smooth
        let perlin_amp_falloff = 0.5; // 50% reduction/octave
        const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));
        let perlin; // will be initialized lazily by noise() or noiseSeed()

        const noise = (x, y = 0, z = 0)=>{
            if (perlin == null) {
                perlin = new Array(PERLIN_SIZE + 1);
                for (let i = 0; i < PERLIN_SIZE + 1; i++) {
                perlin[i] = Math.random();
                }
            }
            
            if (x < 0) {
                x = -x;
            }
            if (y < 0) {
                y = -y;
            }
            if (z < 0) {
                z = -z;
            }
            
            let xi = Math.floor(x),
                yi = Math.floor(y),
                zi = Math.floor(z);
            let xf = x - xi;
            let yf = y - yi;
            let zf = z - zi;
            let rxf, ryf;
            
            let r = 0;
            let ampl = 0.5;
            
            let n1, n2, n3;
            
            for (let o = 0; o < perlin_octaves; o++) {
                let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            
                rxf = scaled_cosine(xf);
                ryf = scaled_cosine(yf);
            
                n1 = perlin[of & PERLIN_SIZE];
                n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
                n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
                n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
                n1 += ryf * (n2 - n1);
            
                of += PERLIN_ZWRAP;
                n2 = perlin[of & PERLIN_SIZE];
                n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
                n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
                n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
                n2 += ryf * (n3 - n2);
            
                n1 += scaled_cosine(zf) * (n2 - n1);
            
                r += n1 * ampl;
                ampl *= perlin_amp_falloff;
                xi <<= 1;
                xf *= 2;
                yi <<= 1;
                yf *= 2;
                zi <<= 1;
                zf *= 2;
            
                if (xf >= 1.0) {
                    xi++;
                    xf--;
                }
                if (yf >= 1.0) {
                    yi++;
                    yf--;
                }
                if (zf >= 1.0) {
                    zi++;
                    zf--;
                }
            }
            return r;
        }
        return noise(x,y,z);
    }
}