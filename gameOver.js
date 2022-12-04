const btnPlayAgain=document.querySelector("#btn-play-again");
const btn=document.querySelector(".btn");

const colors=["#FFFF00","#FF0000","#00FF33","#0033FF","#FF0099","#6E0DD0","#FF6600","#00FFFF","#FF00FF"];
let i=0
function btnAnimation() {
    i+=1;
    btn.style.border=`3.5px solid ${colors[i]}`;
    // console.log(colors[i]);
    if(i===9){
        i=0;
    }
} 
setInterval(btnAnimation,400);

function playAgainHandler(){
    console.log("index")
    function pageRedirect() {
        console.log("pageRedirect")
        window.location.replace("index.html");
    }      
    setTimeout(pageRedirect(),500);
}

btnPlayAgain.addEventListener("click",playAgainHandler);
