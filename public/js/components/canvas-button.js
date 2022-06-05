"use strict";

import { Vector } from "./vector.js";

export class CanvasButton{
    constructor(canvas,x,y,width,height,color){
        this.dpi = window.devicePixelRatio;
        this.display = canvas;
        this.context = this.display.getContext('2d');
        this.position = new Vector(x,y);
        this.width = width || 100;
        this.height = height|| 50;
        this.color = color || 'hsl(0 0% 0%)';
        this.fontSize = 16;
        this.fontStyle = 'serif';
        this.text = 'Button';
        this.pointer = {x:null,y:null};
        this.pressed = false;
        this.on = false;
        this.off= true;
        this.display.addEventListener('pointerdown', this.pointerDown.bind(this));
        this.display.addEventListener('pointerup', this.pointerUp.bind(this));
    }
    isWithin(pointer){
        return (
            pointer.x > this.position.x && 
            pointer.x < this.position.x + this.width &&
            pointer.y > this.position.y && 
            pointer.y < this.position.y + this.height
        )
    }
    pointerDown(ev){
        this.pointer.x = ev.offsetX * this.dpi;
        this.pointer.y = ev.offsetY * this.dpi;

        if(this.isWithin(this.pointer)){
            this.pressed = true;
            //confirm(`Button has been pressed and "this.pressed = ${this.pressed}`)
        }
    }
    pointerUp(ev){
        this.pressed = false;
        this.pointer.x = null;
        this.pointer.y = null;
    }
    render(){
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.strokeStyle = 'hsl(0 0% 0%)';
        this.context.rect(this.position.x, this.position.y,this.width,this.height);
        this.context.fill();
        //Text
        this.context.font = `${this.fontSize}px ${this.fontStyle}`;
        this.context.textAlign = 'center';
        this.context.fillStyle = 'hsl(180 100% 50%)';
        this.context.fillText(this.text, this.position.x + this.width/2, this.position.y + this.fontSize/4 + this.height/2);
    }
}