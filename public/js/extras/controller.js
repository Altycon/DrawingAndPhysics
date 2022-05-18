"use strict";

import { Vector } from "../components/vector.js";

export class TouchController{
    constructor(element,dpi){
        this.element = element;
        this.dpi = dpi;
        this.Start();
        this.Move();
    }
    Start(){
        this.element.addEventListener('touchstart', (ev)=>{
            ev.preventDefault();
            if(ev.touches.length === 1){
                const touch = ev.touches[0]
                const x = touch.clientX - this.element.width/(this.dpi * 2);
                const y = touch.clientY - this.element.height/(this.dpi * 2);
                MOUSE_POSITION = new Vector(x,y);
                console.log(MOUSE_POSITION)
            }
        })
    }
    Move(){
        this.element.addEventListener('touchmove', (ev)=>{
            ev.preventDefault();
            if(ev.touches.length === 1){
                const touch = ev.touches[0]
                const x = touch.clientX - this.element.width/(this.dpi * 2);
                const y = touch.clientY - this.element.height/(this.dpi * 2);
                MOUSE_POSITION = new Vector(x,y);
                //console.log(ev)
            }
        })
    }
    End(){
        this.element.addEventListener('touchend', (ev)=>{
            ev.preventDefault();
            if(ev.touches.length === 1){
                MOUSE_POSITION = new Vector(null,null);
            }
        })
    }
}