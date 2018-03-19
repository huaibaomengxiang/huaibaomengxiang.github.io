var list=[]
var maxPageTop=$(document.body).height()+$(window).scrollTop()
var minPageTop=$(window).scrollTop()-250
var animations=["active","fade","xuanzhuan","xuanzhuantwo","scale","threeRotate"]
var animation=animations[Math.round(Math.random()*5)]
console.log(animation)
$("li").each(function () {
    var obj={min:$(this).offset().top,max:$(this).offset().top+$(this).height()}
    list.push(obj)
})
list.forEach(function (v,i) {
    if(minPageTop<v.min&&v.min<maxPageTop){
        $("li").eq(i).addClass(animation)
    }
})

$(window).scroll(function () {
    var top=$(this).scrollTop()+900
    list.forEach(function (v,i) {
        if(top>=v.min&&top<=v.max){
            $("li").eq(i).addClass(animation)
        }
    })
})