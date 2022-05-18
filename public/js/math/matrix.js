"use strict";

import { Vector } from "../components/vector.js";

// 2d Rotation Matrix
/**
 *  Rz = [ cos(theta) -sin(theta) 0 ]
 *       [ sin(theta)  cos(theta) 0 ]
 *       [      0           0     1 ]
 * 
 *  Rx = [ 1    0           0       ]
 *       [ 0 cos(theta) -sin(theta) ]
 *       [ 0 sin(theta)  cos(theta) ]
 * 
 *  Ry = [ cos(theta)  0 sin(theta) ]
 *       [      0      1      0     ]
 *       [-sin(theta)  0 cos(theta) ]
 */

export const CMatrix = {
    Projection: [ 
        [1,0,0], 
        [0,1,0],
        [0,0,1]
    ],
    ProjectionChange: (z)=> {
        return [ 
            [z,0,0], 
            [0,z,0],
            [0,0,z]
        ];
    },
    rotateZ: (theta)=>{
        return [
            [Math.cos(theta), -Math.sin(theta),0],
            [Math.sin(theta), Math.cos(theta),0],
            [0,0,1]
        ]
    },
    rotateX: (theta)=>{
        return [
            [1,0,0],
            [0, Math.cos(theta), -Math.sin(theta)],
            [0, Math.sin(theta), Math.cos(theta)]
        ]
    },
    rotateY: (theta)=>{
        return [
            [Math.cos(theta), 0, Math.sin(theta)],
            [0,1,0],
            [-Math.sin(theta), 0, Math.cos(theta)]
        ]
    },
    VectorToMatrix: (vector)=>{
        const Columns = 1;
        const Rows = 3;
        const Matrix = new Array(Rows).fill(null).map( _=> new Array(Columns).fill(null));
        Matrix[0][0] = vector.x;
        Matrix[1][0] = vector.y;
        Matrix[2][0] = vector.z;
        return Matrix;
    },
    MatrixToVector: (matrix)=>{
        if(matrix.length > 2){
            return new Vector(matrix[0][0], matrix[1][0], matrix[2][0]);
        }else{
            return new Vector(matrix[0][0], matrix[1][0]);
        }
    },
    Multiply: (projection,vector)=>{
        const Position = CMatrix.VectorToMatrix(vector);
        const Projection_Rows = projection.length;
        const Projection_Columns = projection[0].length;
        const Position_Rows = Position.length;
        const Position_Columns = Position[0].length;

        if(Projection_Columns != Position_Rows){
            console.log('Projection Matrix rows must match Position Matrix columns')
        }
        const result = new Array(Projection_Rows).fill(null).map(_=> new Array(Position_Columns).fill(null));

        // const a = Position[0][0];
        // const b = Position[1][0];
        // const c = Position[2][0];

        // const e = projection[0][0];
        // const f = projection[0][1];
        // const g = projection[0][2];

        // const h = projection[1][0];
        // const i = projection[1][1];
        // const j = projection[1][2];

        // const k = projection[2][0];
        // const l = projection[2][1];
        // const m = projection[2][2];

        // const x = ( a * e ) + ( b * f ) + ( c * g );
        // const y = ( a * h ) + ( b * i ) + ( c * j );
        // const z = ( a * k ) + ( b * l ) + ( c * m );

        // result[0][0] = x;
        // result[1][0] = y;
        // result[2][0] = z;

        for(let q = 0 ; q < Projection_Rows; q++){
            for(let r = 0; r < Position_Columns; r++){
                let sum = 0;
                for(let s = 0; s < Projection_Columns; s++){
                    sum += projection[q][s] * Position[s][r];
                }
                result[q][r] = sum;
            }
        }
        
        // console.log(`Projection Rows: ${Projection_Rows}, Projection Columns: ${Projection_Columns}`)
        // console.log(`Position Rows: ${Position_Rows}, Position Columns: ${Position_Columns}`)
        // console.log(`a: ${a}, b: ${b}, c: ${c}`);
        // console.log(`e: ${e}, f: ${f}, g: ${g}`);
        // console.log(`h: ${h}, i: ${i}, j: ${j}`);
        // console.log(`k: ${k}, l: ${l}, m: ${m}`);

        return CMatrix.MatrixToVector(result);
    }
}

