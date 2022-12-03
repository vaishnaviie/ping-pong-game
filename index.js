const text=document.querySelector("#text");

function textAnimation() {
    text.style.color="black";
    console.log("hey");
}      

function textAnimation2() {
    text.style.color="white";
    console.log("haha");
}      
setInterval(textAnimation,1000);
setInterval(textAnimation2,2000);
