//카운트 시작 숫자
var count = 1;
//카운트다운함수
var countdown = setInterval(function(){
    console.log(count)
    if (count == 0) {
        clearInterval(countdown);
        $(".ani").css("transform","rotateY(-180deg)");
        $(".ani").css("background","#666");
        }
    count--;//카운트 감소
}, 1000);