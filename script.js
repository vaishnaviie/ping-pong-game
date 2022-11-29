const canvas=document.getElementById("canvas");
const ctx= canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function xy(x,y){
    return{
        x:x,
        y:y
    }
}

class Ball{
    constructor(pos,velocity,radius){
        this.pos=pos;
        this.velocity=velocity;
        this.radius=radius;

        this.update=function(){
            this.pos.x+=this.velocity.x;
            this.pos.y+=this.velocity.y;
        }

        this.draw=function(){
            ctx.fillStyle= "rgb(203, 47, 172)";
            ctx.strokeStyle="rgb(203, 47, 172)";
            ctx.beginPath();
            ctx.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2);
            ctx.stroke();
            ctx.fill();
            ctx.stroke();
        }
    }
};

class Paddle{
    constructor(pos,velocity,width,height){
        this.pos=pos;
        this.velocity=velocity;
        this.width=width;
        this.height=height;

        this.update=function(){
            
        }

        this.draw=function(){
            ctx.fillStyle="rgb(203, 47, 172)";
            ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height);
            // ctx.fill();
        }
    }
};

function ballCollusionWithEdges(ball){
    if(ball.pos.y+ball.radius>=canvas.height){
        ball.velocity.y*=-1;
    }
    if(ball.pos.x+ball.radius>=canvas.width){
        ball.velocity.x*=-1;
    }
    if(ball.pos.y<=0){
        ball.velocity.y*=-1;
    }
    if(ball.pos.x<=0){
        ball.velocity.x*=-1;
    }
}

const ball=new Ball(xy(500,250),xy(15,15),20);
const Paddle1=new Paddle(xy(100,canvas.height-30),xy(16,16),200,30);
const Paddle2=new Paddle(xy(500,0),xy(16,16),200,30);

function gameUpdate(){
    ball.update();
    ballCollusionWithEdges(ball);
    Paddle1.update();

}

function gameDraw(){
    ball.draw();
    Paddle1.draw();
    Paddle2.draw();
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}

gameLoop();



