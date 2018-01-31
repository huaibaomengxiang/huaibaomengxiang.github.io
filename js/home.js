var list=[]
var pageTop=$(window).height()

$("li").each(function () {
    var obj={min:$(this).offset().top,max:$(this).offset().top+$(this).height()}
    list.push(obj)
})


list.forEach(function (v,i) {
    if(pageTop>v.min){
        $("li").eq(i).addClass("active")
    }
})

$(window).scroll(function () {
    var top=$(this).scrollTop()+950
    console.log(top)
    list.forEach(function (v,i) {
        if(top>=v.min){
            $("li").eq(i).addClass("active")
        }
    })
})