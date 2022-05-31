import { Tools } from "../tools.js";
const { random, scale } = Tools;

export class MandelbrotFractal{
    constructor(canvas){
        this.display = canvas;
        this.context = this.display.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.Iterations = 0;
        this.Max_Interations = 100;
        this.pixels = this.context.getImageData(0,0, this.display.width,this.display.height);
        this.zoomX = 0;
        this.zoomY = 0;
        this.X_SLIDER = document.getElementById('X-Slider');
        this.Y_SLIDER = document.getElementById('Y-Slider');
        this.setXRange(0, 4, 2, 0.001);
        this.setYRange(0, 4, 2, 0.001);
        this.connectSliderX();
        this.connectSliderY();
        console.log(this.zoomX, this.zoomY)
    }
    connectSliderX(){
        this.X_SLIDER.addEventListener('input', (ev)=>{
            this.zoomX = ev.target.value;
        })
    }
    connectSliderY(){
        this.Y_SLIDER.addEventListener('input', (ev)=>{
            this.zoomY = ev.target.value;
        })
    }
    setXRange(min,max,value,step){
        value = value || 0;
        step = step || 1;
        this.X_SLIDER.setAttribute('min', min);
        this.X_SLIDER.setAttribute('max', max);
        this.X_SLIDER.setAttribute('value', value);
        this.X_SLIDER.setAttribute('step', step);
        const nodeList = document.querySelectorAll('.X-range-display');
        const DisplayRanges = [...nodeList];
        DisplayRanges[0].innerText = min.toString();
        DisplayRanges[1].innerText = value.toString();
        DisplayRanges[2].innerText = max.toString();
    }
    setYRange(min,max,value,step){
        value = value || 0;
        step = step || 1;
        this.Y_SLIDER.setAttribute('min', min);
        this.Y_SLIDER.setAttribute('max', max);
        this.Y_SLIDER.setAttribute('value', value);
        this.Y_SLIDER.setAttribute('step', step);
        const nodeList = document.querySelectorAll('.Y-range-display');
        const DisplayRanges = [...nodeList];
        DisplayRanges[0].innerText = min.toString();
        DisplayRanges[1].innerText = value.toString();
        DisplayRanges[2].innerText = max.toString();
    }
    render(){
        
        for(let x = 0; x < this.display.width; x++){
            for(let y = 0; y < this.display.height; y++){

                let a = scale(x, 0, this.display.width, -this.zoomX, this.zoomX);
                let b = scale(y, 0, this.display.height, -this.zoomY, this.zoomY);

                let constant_A = a;
                let constant_B = b;

                let n = 0;

                while(n < this.Max_Interations){
                    const aa = a*a - b*b;
                    const bb = 2 * a * b;

                    a = aa + constant_A;
                    b = bb + constant_B;

                    if( Math.abs(a + b) > 16){
                        break;
                    }

                    n++;
                }

                let bright = scale(n, 0, this.Max_Interations, 0, 1);
                bright = scale(Math.sqrt(bright), 0, 1, 0, 255);

                if(n === this.Max_Interations){
                    bright = 0;
                }

                const pixel = (x + y * this.display.width) * 4;
                this.pixels.data[pixel] = bright;
                this.pixels.data[pixel + 1] = bright;
                this.pixels.data[pixel + 2] = bright;
                this.pixels.data[pixel + 3] = 255;
            }
        }
        this.context.putImageData(this.pixels,0,0);
        
    }
}