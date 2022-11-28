const canvas=document.getElementById("canvas");
const ctx= canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let ballX=200;
let ballY=200;
let ballRadius=20;
let ballVelocityX=2;
let ballVelocityY=2;

function gameUpdate(){
    ballX+=ballVelocityX;
    ballY+=ballVelocityY;
}

function gameDraw(){
    ctx.fillStyle= "rgb(203, 47, 172)";
    ctx.strokeStyle="rgb(203, 47, 172)";
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.stroke();
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(gameLoop);
    gameUpdate();
    gameDraw();
}

gameLoop();



