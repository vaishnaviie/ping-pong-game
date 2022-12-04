const canvas=document.getElementById("canvas");
const ctx= canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const LEFT="ArrowLeft";
const RIGHT="ArrowRight";
const keyPressed=[LEFT,RIGHT];

window.addEventListener("keydown",function(e){
    keyPressed[e.key]=true;
})
window.addEventListener("keyup",function(e){
    keyPressed[e.key]=false;
})

function xy(x,y){
    return{
        x:x,
        y:y
    }
}

const colors=["#FAF901","#85FA01","#01FA8A","#01FAD3","#01CBFA","#019EFA","#0110FA","#C601FA","#FA01F9","#FA017B","#FA0101","#FA6F01","#FAB801","#FAB801"];


class Ball{
    constructor(pos,velocity,radius){
        this.pos=pos;
        this.velocity=velocity;
        this.radius=radius;
        this.i=0;

        this.update=function(){
            this.pos.x+=this.velocity.x;
            this.pos.y+=this.velocity.y;
        }
        
        this.draw=function(){
            // ctx.fillStyle= "rgb(203, 47, 172)";
            // ctx.strokeStyle="rgb(203, 47, 172)";
            ctx.fillStyle= colors[this.i];
            ctx.strokeStyle=colors[this.i];
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
        this.score=0;
        this.i=0;

        this.update=function(){
            if(keyPressed[RIGHT]){
                this.pos.x+=this.velocity.x;
            }
            if(keyPressed[LEFT]){
                this.pos.x-=this.velocity.x;
            }
        };

        this.draw=function(){
            // ctx.fillStyle="rgb(203, 47, 172)";
            ctx.fillStyle=colors[this.i];
            ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height);
            // ctx.fill();
        };

        this.getHalfWidth=function(){
            return this.width/2;
        };

        this.getHalfHeight=function(){
            return this.height/2;
        };

        this.getCenter=function(){
            return xy(
                this.pos.x+ this.getHalfWidth(),
                this.pos.y+ this.getHalfHeight()
            )
        };
    }
};

function ballCollusionWithEdges(ball){
    // if(ball.pos.y+ball.radius>=canvas.height){
    //     ball.velocity.y*=-1;
    // }
    if(ball.pos.x+ball.radius>=canvas.width){
        ball.velocity.x*=-1;
    }
    // if(ball.pos.y<=0){
    //     ball.velocity.y*=-1;
    // }
    if(ball.pos.x<=0){
        ball.velocity.x*=-1;
    }
}

function PaddleCollusionWithEdges(Paddle){
    if(Paddle.pos.x<=0){
        Paddle.pos.x=0;
    }
    if(Paddle.pos.x+Paddle.width>canvas.width){
        Paddle.pos.x=canvas.width-Paddle.width;
    }
}

function player2(ball,Paddle){
    if(ball.velocity.y<0 ){
        if(ball.pos.x>Paddle.pos.x){
            Paddle.pos.x+=Paddle.velocity.x;
            if(Paddle.pos.x+Paddle.width>=canvas.width){
                Paddle.pos.x=canvas.width-Paddle.width;
            }
        }

        if(ball.pos.x<Paddle.pos.x){
            Paddle.pos.x-=Paddle.velocity.x;          
            if(Paddle.pos.x<=0){
                Paddle.pos.x=0;
            }
        }
        
    }
}

function responseball(ball){
    if(ball.velocity.y<0){
        ball.pos.x=(Math.random()*canvas.width-200)+100;
        ball.pos.y=150;
    }
    if(ball.velocity.y>0){
        ball.pos.x=(Math.random()*canvas.width-200)+100;
        ball.pos.y=canvas.height-150;
    }

    ball.velocity.x*=-1;
    ball.velocity.y*=-1;
}

const h=document.querySelector("#h");
function heart(heartLeft){
    if(heartLeft==4){
        h.innerHTML="❤️❤️❤️❤️🤍";
    }
    if(heartLeft==3){
        h.innerHTML="❤️❤️❤️🤍🤍";
    }
    if(heartLeft==2){
        h.innerHTML="❤️❤️🤍🤍🤍";
    }
    if(heartLeft==1){ 
        h.innerHTML="❤️🤍🤍🤍🤍";
    }
    if(heartLeft==0){
        h.innerHTML="🤍🤍🤍🤍🤍";
        function pageRedirect() {
            window.location.replace("gameOver.html");
        }      
        setTimeout(pageRedirect(),200);
    }
}

function scoreIncrementation(ball,Paddle1,Paddle2){
    if(ball.pos.y<=-ball.radius){
        Paddle1.score+=1;
        document.getElementById("score-player1").innerHTML=Paddle1.score;
        responseball(ball);
    }
    
    if(ball.pos.y>=canvas.height+ball.radius){
        Paddle2.score+=1;
        document.getElementById("score-player2").innerHTML=Paddle2.score;
        heart(--heartLeft);
        responseball(ball);
    }
}

function ballPaddleCollusion(ball,Paddle){
    let dx=Math.abs(ball.pos.x-Paddle.getCenter().x);
    let dy=Math.abs(ball.pos.y-Paddle.getCenter().y);
    if(dy<=(ball.radius+Paddle.getHalfHeight()) && dx<=(ball.radius+Paddle.getHalfWidth())){
        ball.velocity.y*=-1;
    }
}

const ball=new Ball(xy(500,250),xy(12,12),20);
const Paddle1=new Paddle(xy(900,canvas.height-30),xy(16,16),200,30);
const Paddle2=new Paddle(xy(500,0),xy(30,30),200,30);

function gameUpdate(){
    ball.update();
    ballCollusionWithEdges(ball);
    Paddle1.update();
    PaddleCollusionWithEdges(Paddle1);
    PaddleCollusionWithEdges(Paddle2);
    player2(ball,Paddle2);
    ballPaddleCollusion(ball,Paddle1);
    ballPaddleCollusion(ball,Paddle2);
    scoreIncrementation(ball,Paddle1,Paddle2);
    
}

function gameDraw(){
    ball.draw();
    Paddle1.draw();
    Paddle2.draw();

}

function gameLoop(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw();
}



let heartLeft=5;
totalChancesHearts= new Array("❤️","❤️","❤️","❤️","❤️");
for(let i=0;i<totalChancesHearts.length;i++){
    document.getElementById("h").innerHTML+=totalChancesHearts[i];
}
        
gameLoop();


function ballColor(){
    ball.i+=1;
    Paddle1.i+=1;
    Paddle2.i+=1;
    if(ball.i==11 && Paddle1.i==11 && Paddle2.i){
        ball.i=0;
        Paddle1.i=0;  
        Paddle2.i=0;
    }
}setInterval(ballColor,3000);




