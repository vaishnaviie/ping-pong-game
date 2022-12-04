const text=document.querySelector("#text");
const btn=document.querySelector(".btn");

function textAnimation() {
    text.style.color="black";
    // console.log("white");
}      

function textAnimation2() {
    text.style.color="white";
    // console.log("black");
}      
setInterval(textAnimation,1000);
setInterval(textAnimation2,2000);

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

// myName.style.border="5px solid green";
