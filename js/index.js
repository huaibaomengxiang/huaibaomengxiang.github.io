var bg=document.querySelector(".myInfo");
var ch=bg.offsetHeight;
var c=document.querySelector("#bg");
var step=0
c.width=300;
c.height=ch;
var ctx=c.getContext("2d")

function loop() {
    ctx.clearRect(0,0,c.width,c.height)
    step++
    let left=Math.sin(Math.PI/180*step)*50
    let right=Math.cos(Math.PI/180*step)*50
    ctx.beginPath()
    ctx.fillStyle="#7ce0ff"
    ctx.moveTo(c.width/2+left,0)
    ctx.bezierCurveTo(c.width/2+left-50,c.height/2,c.width/2+right+50,c.height/2,c.width/2+right,c.height)
    ctx.lineTo(0,c.height)
    ctx.lineTo(0,0)
    ctx.closePath()
    ctx.fill()
}
setInterval(loop,16.66)