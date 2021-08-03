const   wrap= document.querySelector("#wrap"),
        body= document.querySelector("body"),
        html= document.querySelector("html"),
        ul  = document.querySelector("ul"),
        li  = document.querySelectorAll("li"),
        middle = document.querySelector("#middle"),
        Logo = document.querySelector(".Logo"); 




function move(event){
    let a = event.target.attributes.for.value
        a = parseInt(a)
        div = middle.children[0]
        console.log(a)
        var sign = a == 0 ? 1 : -1;
        var standard = 100;
        div.style.left = standard * a * sign +"%"
       a
   

    
   
}
        
function init(){
   

        for(var i = 0 ; i < 5 ; i++){
            li[i].addEventListener("click",move)
        }
    

}

init();