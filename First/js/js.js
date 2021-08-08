var _calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    _calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    _calendar.render();
  });

//   CalendarApi.prototype.prev = function () {
//     this.unselect();
//     this.dispatch({ type: 'PREV' });
// };
//   CalendarApi.prototype.next = function () {
//     this.unselect();
//     this.dispatch({ type: 'NEXT' });
// };



  const popup       = document.querySelector("#no-popup"),
        wrap        = document.querySelector("#wrap"),
        exit        = document.querySelector(".btn-close");
        //위에까지 캘린더api

  var li_body = document.createElement("li"),
      div_body = document.createElement("div"),
      div_data = document.createElement("div"),
      div_append_save = document.createElement("div"),
      div_append  = document.createElement("img"),
      div_save    = document.createElement("img"),
      ul_body = document.createElement("ul");

  let fcc;

  // function dele(event){
  //   console.log(event)
  // }


  function append_text(){
    var input = document.createElement("input");
    li_body = document.createElement("li");
    var del = document.createElement("img");
    del.className = "del"
    del.src = "img/x.png"
    input.type = "text";
    if(ul_body.children.length < 5){
    li_body.appendChild(input);
    li_body.appendChild(del);
    ul_body.appendChild(li_body);
  }
  }
  

  function modify_text(ob,date){//캘린더 내용 추가하기
    
    div_append_save.removeChild(div_append)
    console.log(ob)
    if(ob == null){

    }else{
    
    li_body = document.querySelectorAll("li")
    
    for(var i = 0; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i])
    }
    
    
    for(var i = 0 ; i < ob.contents.length ; i++){
    var input = document.createElement("input");
    li_body = document.createElement("li");
    var del = document.createElement("img");
    
    del.className = "del"
    del.src = "img/x.png"
    input.type = "text";
    input.value = ob.contents[i];
    li_body.appendChild(input);
    li_body.appendChild(del);
    ul_body.appendChild(li_body);
    }
    ul_body.attributes.for = null 
  }
  var d = document.querySelector(".div_button")
  if(d == null){
    var input = document.createElement("input")
    var div_button = document.createElement("div")
    div_button.className = "div_button"
    input.type = "button"
    input.value = "완료"
    div_body.appendChild(div_button);
    div_button.appendChild(input)
  }else{
  
}
  div_append_save.addEventListener("click",append_text)

  }

  // function save_after(date){
  //   li_body = document.querySelectorAll("li")
    
  //   for(var i = 0 ; i < li_body.length ; i++){
  //     ul_body.removeChild(li_body[i]);
  //   }
  //   read(date)
  // }


  // function save(date){
  //   var inn = [];
  //   var obj ={}
  //   var r = new Array();
  //     obj_input = document.querySelectorAll("input");
      
  //     var le = obj_input.length
     
  //     for(var i = 0; i < le ; i++){

  //       r.push(obj_input[i].value)       
        
          
  //     }
  //     obj = {"date": date,
  //     "contents" : r
  //     }
      
  //   inn.push(obj)
     
    
  //   localStorage.setItem("date",JSON.stringify(inn))
    
  //   save_after(date);
  // }


  //localstorage 내용 가져와서 팝업에 띄워주기
  function read(date){ 
   
    var a = JSON.parse(localStorage.getItem("date"));

    var c ;
    for(var i = 0 ; i < a.length ; i++){
        
      if(a[i].date == date){
        for(var b = 0 ; b < a[i].contents.length ; b++){
            li_body = document.createElement("li")
            li_body.innerHTML = a[i].contents[b]
            ul_body.appendChild(li_body);
            c = i
          }
        }
      }

    
  
    // 추가만들자
    div_body.appendChild(div_append_save);
    div_append_save.id = "div_append_save"
    div_append.src = "img/plus.png"
    div_append_save.appendChild(div_append)

    div_append.addEventListener("click",function(){
      if(a == null){
        modify_text(null,date)
      }else{
      modify_text(a[c],date)
    }
    })
    
    
  }



  function no_pop_up(data,op_wrap){
    var div_button = document.querySelector(".div_button")
   
    
    if(div_button !== null){
      div_button.remove();
    }
    
   
    li_body = document.querySelectorAll("li")
 
    for(var i = 0; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i])
    }
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
    popup.className = "normal"
    var op_wrap =  document.createElement("div");//투명한 백그라운드
        op_wrap.className = "op_wrap";
        wrap.appendChild(op_wrap);  
    var e = event.currentTarget;
        e = e.dataset.date;
 
    


     
        div_body.id = "body";
        div_body.attributes.for = e
        popup.appendChild(div_body); //해당 팝업에 date(날짜) 띄우기


    
        div_data.className = "data";
        div_data.innerHTML = e
        div_data.attributes.for = e
        div_body.appendChild(div_data);
        

    
    div_body.appendChild(ul_body);

  
          read(e,ul_body)
        
         
       

    
   
    

    
    div_save.addEventListener("click",function(){
      save(e);
    })

    op_wrap.addEventListener("click",function(){
      no_pop_up(e, op_wrap)
    })
    exit.addEventListener("click",function(){
      no_pop_up(e, op_wrap)
    })



  }

  function init(){
    var a = JSON.parse(localStorage.getItem("date"));

    for(var i = 0 ; i < fcc.length ; i++){
      for(var b = 0 ; b < a.length ; b++){
      if(fcc[i].dataset.date == a[b].date ){
        fcc[i].style.background ="red";
      }
    }
        fcc[i].addEventListener("click",pop_up)
        
      }
      
    
   
  }

  //로드가 다 된 후에 fc제어
 
  function real(){

    fcc = document.querySelectorAll(".fc-daygrid-day");
    init();


  }
  window.addEventListener('DOMContentLoaded', function(){
    fcc = document.querySelectorAll(".fc-daygrid-day");
    init();

  });