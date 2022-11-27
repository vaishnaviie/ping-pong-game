const canvas=document.getElementById("canvas");
const ctx= canvas.getContext("2d");
// var ctx = c.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


ctx.fillStyle= "rgb(203, 47, 172)";
ctx.strokeStyle="rgb(203, 47, 172)";
ctx.beginPath();
ctx.arc(100,200,20,0,Math.PI*2);
ctx.stroke();
ctx.fill();
ctx.stroke();

