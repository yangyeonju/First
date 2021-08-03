document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });
  const popup       = document.querySelector("#no-popup"),
        wrap        = document.querySelector("#wrap"),
        exit        = document.querySelector(".btn-close");
        //위에까지 캘린더api


  var k = [];



  let fcc;
  
  function append_text(ul_body){//캘린더 내용 추가하기
    
    var li_body = document.createElement("li"),
    input = document.createElement("input");
    ul_body.appendChild(li_body);
    li_body.appendChild(input);

    input.type = "text";
  }


  function save(date){
    var inn = [];
    var obj ={}
    
      obj = document.querySelectorAll("input");
      var le = obj.length
      for(var i = 0; i < le ; i++){

      inn.push(obj[i].value)

    }
    
     
    
    localStorage.setItem(date,JSON.stringify(inn))
    
    
    
  }


  //캘린더 내용 가져와서 팝업에 띄워주기
  function read(date,ul_body){
    var a = localStorage.getItem(date);
    var li_body = document.createElement("li"),
    input = document.createElement("input");
    li_body.innerHTML = a
    ul_body.appendChild(li_body);
  }



  function no_pop_up(data,op_wrap){
      popup.id = "no-popup" //팝업삭제
      wrap.removeChild(op_wrap);
      var divv = document.querySelectorAll("div")
      for(var i = 1 ; i <data.length ; i++){
        if(divv[i].attributes.for == data){
          divv[i].parentNode.removeChild(divv[i])
        }
        
      }
       //해당 date(날짜) 삭제

      
  }

  //팝업 안 레이아웃과 띄우기 
  function pop_up(event){
    popup.id = "popup" //팝업띄우기
    var op_wrap =  document.createElement("div");//투명한 백그라운드
        op_wrap.className = "op_wrap";
        wrap.appendChild(op_wrap);
        
    var e = event.currentTarget;

    


    var div_body = document.createElement("div"); 
        div_body.id = "body";
        div_body.attributes.for = e.dataset.date
        popup.appendChild(div_body); //해당 팝업에 date(날짜) 띄우기


    var div_data = document.createElement("div");
        div_data.className = "data";
        div_data.innerHTML = e.dataset.date
        div_data.attributes.for = e.dataset.date
        div_body.appendChild(div_data);
        
    var div_append_save = document.createElement("div");
        div_append_save.className = "append_";

    var div_append  = document.createElement("img");
        div_save    = document.createElement("img");
        div_append.src = "img/plus.png";
        div_append.className = "append";
        div_save.src = "img/save.png";
        div_save.className = "save";

    var ul_body = document.createElement("ul")
    div_body.appendChild(ul_body);

    //localstorage에 key값이 있으면 read함수 호출
    if(localStorage.getItem(e.dataset.date) != null){
          read(e.dataset.date,ul_body)
        }else{
          div_body.appendChild(div_append_save);
          div_append_save.appendChild(div_append);
          div_append_save.appendChild(div_save);
        }

    
   
    

    div_append.addEventListener("click",function(){
      append_text(ul_body)
    })
    div_save.addEventListener("click",function(){
      save(e.dataset.date);
    })

    op_wrap.addEventListener("click",function(){
      no_pop_up(e.dataset.date, op_wrap)
    })
    exit.addEventListener("click",function(){
      no_pop_up(e.dataset.date, op_wrap)
    })



  }

  function init(){
    for(var i = 0 ; i < fcc.length ; i++){
      if(localStorage.getItem(fcc[i].dataset.date) == null ){
      
      }else{
        fcc[i].style.background ="black";
      }
        fcc[i].addEventListener("click",pop_up)
        
      }
      
    
   
  }

  //로드가 다 된 후에 fc제어
 
  function real(){
  window.addEventListener('DOMContentLoaded', function(){
    fcc = document.querySelectorAll(".fc-daygrid-day");
    init();

  });

  }
  real();