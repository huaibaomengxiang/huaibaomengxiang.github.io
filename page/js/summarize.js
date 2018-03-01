$(document).ready(function () {
    $(".categary>p").click(function () {
        let index=$(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        $("section").eq(index).show().siblings().hide()
    })
})