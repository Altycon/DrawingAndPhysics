

// Using Perlin Noise to move an object randomly around canvas
// Making the X offset and Y offset variables different gives more random motion
let Xoff = 0;
let Yoff = 0;
const animateCanvas = (ctx,item)=>{
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const animate = ()=>{
        clearCanvas(ctx);
        item.position.x = scale(noise(Xoff), 0,1, -width/2,width/2);
        item.position.y = scale(noise(Yoff), 0,1, -height/2,height/2);
        item.radius = scale(noise(Xoff), 0,1, 1,100)
        item.render(ctx);
        Xoff += 0.001;
        Yoff += 0.009;
        requestAnimationFrame(animate);
    }
    animate();
}








// This is an example of rotating a cube


const createRotationPoints = ()=>{
    const POINTS = []
    const BackTopLeft = new Point(-0.5, -0.5, -0.5);
    const BackTopRight = new Point(0.5, -0.5, -0.5);
    const BackBottomLeft = new Point(0.5, 0.5, -0.5);
    const BackBottomRight = new Point(-0.5, 0.5, -0.5);
    
    const FrontTopLeft = new Point(-0.5, -0.5, 0.5);
    const FrontTopRight = new Point(0.5, -0.5, 0.5);
    const FrontBottomLeft = new Point(0.5, 0.5, 0.5);
    const FrontBottomRight = new Point(-0.5, 0.5, 0.5);
    
    POINTS.push(BackTopLeft)
    POINTS.push(BackTopRight)
    POINTS.push(BackBottomRight)
    POINTS.push(BackBottomLeft)
    POINTS.push(FrontTopLeft)
    POINTS.push(FrontTopRight)
    POINTS.push(FrontBottomRight)
    POINTS.push(FrontBottomLeft)
    return POINTS;
}



const connect = (ctx,i,j,points)=>{
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.moveTo(points[i].position.x, points[i].position.y);
    ctx.lineTo(points[j].position.x, points[j].position.y);
    ctx.closePath();
    ctx.stroke();
}


const animateCanvas2 = (ctx, Particles, POINTS, dpi)=>{
    const Number_Of_Points = POINTS.length;
    let angleZ = 0;
    let angleX = 0;
    let angleY = 0;
    let lastTime;
    const animate = (timestamp)=>{

        if(lastTime != null){

            clearCanvas(ctx);

            //runTriangleAnimation(ctx,Particles);

            const v = CVectors.subtract(MOUSE_POSITION,CENTER)
            const m = CVectors.getDistance(CENTER,v);
            v.setMagnitude(200)

            ctx.beginPath();
            ctx.strokeStyle = 'hsl(0 100% 100%)';
            ctx.moveTo(CENTER.x, CENTER.y);
            ctx.lineTo(v.x * dpi,v.y * dpi);
            ctx.closePath();
            ctx.stroke();


            let ProjectedPoints = new Array(8).fill(new Point())
            
            let index = 0 //ProjectedPoints.length - 1;

            for(let i = 0; i < Number_Of_Points; i++){
                // rotate and then project the 3d point into 2d
                
                let rotated = CMatrix.Multiply(rotateZ(angleZ), POINTS[i].position);
                rotated = CMatrix.Multiply(rotateX(angleX), rotated);
                rotated = CMatrix.Multiply(rotateY(angleY), rotated);

                const projected2d = CMatrix.Multiply(Projection, rotated);
                projected2d.multiply(300)

                const point = new Point(projected2d.x, projected2d.y);
                point.radius = 10;

                //ProjectedPoints.push(point)
                ProjectedPoints[index] = point;
                
                index++;
            }

            for(let k = 0; k < ProjectedPoints.length; k++){
                ProjectedPoints[k].render(ctx);
            }

            // for(let i = 0; i < 4; i++){
            //     connect(ctx, i, (i+1) % 4, ProjectedPoints);
            //     connect(ctx, i+4, ((i+1) % 4) +4, ProjectedPoints);
            //     connect(ctx, i, i+4, ProjectedPoints);
            // }
            connect(ctx,0,1,ProjectedPoints)
            connect(ctx,0,2,ProjectedPoints)
            connect(ctx,1,3,ProjectedPoints)
            connect(ctx,2,3,ProjectedPoints)

            connect(ctx,4,5,ProjectedPoints)
            connect(ctx,5,7,ProjectedPoints)
            connect(ctx,7,6,ProjectedPoints)
            connect(ctx,6,4,ProjectedPoints)

            connect(ctx,0,4,ProjectedPoints)
            connect(ctx,1,5,ProjectedPoints)
            connect(ctx,3,7,ProjectedPoints)
            connect(ctx,2,6,ProjectedPoints)
            
            angleZ += .001;
            angleX += .001;
            angleY += .001;
        }
        lastTime = timestamp;
        requestAnimationFrame(animate);
    }
    animate();
}

// Basic function to create some particles

const createParticles = (num,width,height)=>{
    let arr = [];
    for(let i = 0; i < num; i++){
        const x = random(-width/2,width/2);
        const y = random(-height/2,height/2);
        arr.push(new Particle(x,y))
    }
    return arr;
}


// That neat triangle animation...

const renderTriangle = (ctx,position1,position2,position3, color, lineColor) =>{
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.5;
    ctx.moveTo(position1.x, position1.y);
    ctx.lineTo(position2.x, position2.y);
    ctx.lineTo(position3.x, position3.y);
    ctx.closePath();
    ctx.fill();
    //lineColor ? ctx.stroke():'';
}

const InitializeTriangleAnimationParticles = (width,height)=>{
    const Particles = createParticles(300,width,height);
    const len = Particles.length;
    
    for(let i = 0; i < len; i++){
        Particles[i].color = 'hsl(180 100% 50%)';
        Particles[i].speed = random(0,5)
        Particles[i].randomVelocityInit();
    }
    return Particles;
}
const runTriangleAnimation = (ctx,Particles)=>{
    const len = Particles.length;
    const MIN_DISTANCE = 50;
    for(let i = 0; i < len; i++){
        const Current_Particle = Particles[i];

        for(let j = 0; j < len; j++){
            const Neighbor_Particle1 = Particles[j];
            
            if(Current_Particle === Neighbor_Particle1) continue;
            const d1 = CVectors.getDistance(Current_Particle.position,Neighbor_Particle1.position);

            if(d1 < MIN_DISTANCE){
                for(let k = 0; k < len; k++){
                    const Neighbor_Particle2 = Particles[k];
                    if(Current_Particle === Neighbor_Particle2 || Neighbor_Particle1 === Neighbor_Particle2) continue;
                    const d2 = CVectors.getDistance(Current_Particle.position, Neighbor_Particle2.position);
                    if(d2 < MIN_DISTANCE){
                        renderTriangle(
                            ctx,
                            Current_Particle.position,
                            Neighbor_Particle1.position,
                            Neighbor_Particle2.position,
                            'hsl(0 0% 0% / .3)',
                            'hsl(180 100% 50% / .4)'
                            )
                    }
                }
            }
        }
        Current_Particle.move(ctx.canvas)
        //Current_Particle.render(ctx)
    }
}