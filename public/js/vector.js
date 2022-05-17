"use strict";

class Vector{
    constructor(x,y,z){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    add(vector){
        this.x += vector.x || 0;
        this.y += vector.y || 0;
        this.z += vector.z || 0;
        return this;
    }
    subract(vector){
        this.x -= vector.x || 0;
        this.y -= vector.y || 0;
        this.z -= vector.z || 0;
        return this;
        //return new Vector(this.x + vector.x, this.y + vector.y, this.z - vector.z);
    }
    multiply(scaler){
        this.x *= scaler;
        this.y *= scaler;
        this.z *= scaler;
    }
    divide(scaler){
        this.x /= scaler;
        this.y /= scaler;
        this.z /= scaler;
    }
    getMagnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    setMagnitude(n){
        return this.normalize().multiply(n);
    }
    normalize(){
        const length = this.getMagnitude();
        if(length !==0) this.multiply(1/length);
        return this;
    }
}

const CVectors = {
    getDistance: (vector1, vector2)=>{
        return Math.hypot(vector2.x - vector1.x, vector2.y - vector1.y);
    },
    add: (vector1,vector2)=>{
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y)
    },
    subtract: (vector1,vector2)=>{
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    },
    DotProduct: (vector1, vector2)=>{
        return ((vector1.x * vector2.x)+(vector1.y * vector2.y))
    },
    AngleBetweenRadians: (vector1, vector2)=>{
        return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
    },
    ToDegrees: (radian)=>{
        return radian * 180/Math.PI;
    }
}
export { Vector,CVectors };