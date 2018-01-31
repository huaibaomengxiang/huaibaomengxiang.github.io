var list=[]
var maxPageTop=$(document.body).height()+$(window).scrollTop()
var minPageTop=$(window).scrollTop()-250
$("li").each(function () {
    var obj={min:$(this).offset().top,max:$(this).offset().top+$(this).height()}
    list.push(obj)
})
console.log(maxPageTop,minPageTop)
console.log(list)
list.forEach(function (v,i) {
    if(minPageTop<v.min&&v.min<maxPageTop){
        $("li").eq(i).addClass("active")
    }
})

$(window).scroll(function () {
    var top=$(this).scrollTop()+900
    list.forEach(function (v,i) {
        if(top>=v.min&&top<=v.max){
            $("li").eq(i).addClass("active")
        }
    })
})