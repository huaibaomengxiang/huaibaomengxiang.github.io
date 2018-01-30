//波浪
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
    requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
//大背景
var ac=document.querySelector(".bbg");
ac.width=window.innerWidth;
ac.height=window.innerHeight;
var actx=ac.getContext('2d'),
    dots=[],
    lineDistance=80;
mouse=window.utils.captureMouse(ac);
function Dot() {
    this.x=Math.random()*ac.width;
    this.y=Math.random()*ac.height;
    this.r=Math.random()*3+1;
    this.angle=0;
    this.speed={
        x:Math.random()>0.5? Math.random()+0.1:-(Math.random()+0.1),
        y:Math.random()>0.5? Math.random()+0.1:-(Math.random()+0.1),
    }
    this.paint=function () {
        actx.beginPath()
        actx.fillStyle="rgba(0,0,0,0.6)"
        actx.arc(this.x,this.y,this.r,0,Math.PI*2)
        actx.closePath()
        actx.fill()
    }
    this.step=function () {
        this.x+=this.speed.x
        this.y+=this.speed.y
        if(this.x>ac.width||this.x<0){
            this.speed.x*=-1
        }
        if(this.y>ac.height||this.y<0){
            this.speed.y*=-1
        }
    }
}
function Line(d1,d2) {
    actx.beginPath()
    actx.strokeStyle="rgba(0,0,0,0.1)"
    actx.moveTo(d1.x,d1.y)
    actx.lineTo(d2.x,d2.y)
    actx.closePath()
    actx.stroke()
}
function creatDot(num) {
    if(dots.length<num){
        var aa=new Dot()
        dots.push(aa)
    }
}
function paintDot() {
    for(let i=0;i<dots.length;i++){
        dots[i].paint()
        if(Distance(dots[i],mouse)<lineDistance){
            var mouseLine=new Line(dots[i],mouse)
            let dx=mouse.x-dots[i].x
            let dy=mouse.y-dots[i].y
            dots[i].angle=Math.atan2(dy,dx)
            var vx=Math.cos(dots[i].angle)*2
            var vy=Math.sin(dots[i].angle)*2
            dots[i].x+=vx
            dots[i].y+=vy
        }
        for(let j=1;j<dots.length;j++){
            if(Distance(dots[i],dots[j])<lineDistance){
                var line=new Line(dots[i],dots[j])
            }
        }
    }
}
function stepDot() {
    for(let i=0;i<dots.length;i++){
        dots[i].step()
    }
}
function Distance(d1,d2) {
    return Math.sqrt(Math.pow(d1.x-d2.x,2)+Math.pow(d1.y-d2.y,2))
}
function amove() {
    actx.clearRect(0,0,ac.width,ac.height)
    creatDot(100)
    paintDot()
    stepDot()
    requestAnimationFrame(amove)
}
window.requestAnimationFrame(amove)
//导航栏的点击
$("li").click(function () {
    $(this).addClass("active")
    $(this).siblings().removeClass("active")
})





window.onresize=function () {
    ac.width=window.innerWidth;
    ac.height=window.innerHeight;
}