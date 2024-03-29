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
    crossProduct(vector){
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        return new Vector(x,y,z);
    }
}

class UnitVector{
    constructor(){
        this.x = 1;
        this.y = 1;
        this.z = 1;
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
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z)
    },
    subtract: (vector1,vector2)=>{
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    },
    divide: (vector,scaler)=>{
        return new Vector(vector.x / scaler, vector.y / scaler, vector.z / scaler);
    },
    DotProduct: (vector1, vector2)=>{
        return ((vector1.x * vector2.x)+(vector1.y * vector2.y))
    },
    CrossProduct: (vector1, vector2)=> {
        const x = vector1.y * vector2.z - vector1.z * vector2.y;
        const y = vector1.z * vector2.x - vector1.x * vector2.z;
        const z = vector1.x * vector2.y - vector1.y * vector2.x;
        return new Vector(x,y,z);
    },
    AngleBetweenRadians: (vector1, vector2)=>{
        return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
    },
    ToDegrees: (radian)=>{
        return radian * 180/Math.PI;
    },
    MidPoint(vector1,vector2){
        const vector = new Vector((vector1.x + vector2.x), (vector1.y + vector2.y));
        vector.multiply(0.5)
        return vector;
        //return new Vector((vector1.x + vector2.x)*0.5, (vector1.y + vector2.y)*0.5);
    },
    findPoint(vector1,vector2,distance){
        const vector = new Vector((vector1.x + vector2.x), (vector1.y + vector2.y));
        vector.multiply(distance)
        return vector;
    }
}
export { Vector, UnitVector, CVectors };