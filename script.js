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

function gameUpdate(){

    ball.update();
    ballCollusionWithEdges(ball);

}

function gameDraw(){
    ball.draw();

}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}

gameLoop();



