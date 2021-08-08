var _calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    _calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    _calendar.render();

    init();
  });

 //위에까지 캘린더api

  const popup       = document.querySelector("#no-popup"),
        wrap        = document.querySelector("#wrap");
       
  var dav,
      obj_list = [],
      obj ,
      li_body = document.createElement("li"),
      div_body = document.createElement("div"),
      div_data = document.createElement("div"),
      div_append_save = document.createElement("div"),
      div_append  = document.createElement("img"),
      div_save    = document.createElement("img"),
      ul_body = document.createElement("ul");
      div_append.className = "div_append";
  let fcc;

  function append_text(){ //수정폼에서 할 일 추가 함수
    var input = document.createElement("input");
    li_body = document.createElement("li");
    var del = document.createElement("img");
    del.className = "del"
    del.src = "img/x.png"
    input.type = "text"
    input.className = "todo"
    if(ul_body.children.length < 5){
    li_body.appendChild(input);
    li_body.appendChild(del);
    ul_body.appendChild(li_body);
    
    del.addEventListener("click",function(event){//할 일 삭제 
      event.target.parentNode.remove();
      })
    }
  }
  
  function modify_text(ob,date){//캘린더 내용 수정, 추가하기 
    if(ob == null){
    }else{//이미 data에 값이 들어 있으면 값을 수정 할 수 있게 input text로 바뀜
    li_body = document.querySelectorAll("li")
    for(var i = 0; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i])
    }
    for(var i = 0 ; i < ob.contents.length ; i++){
    var input = document.createElement("input");
    li_body = document.createElement("li");
    var del = document.createElement("img");
    
    del.className = "del" //삭제 버튼
    del.src = "img/x.png"
    input.type = "text";
    input.className = "todo"
    input.value = ob.contents[i];
    li_body.appendChild(input);
    li_body.appendChild(del);
    ul_body.appendChild(li_body);
    del.addEventListener("click",function(event){
      event.target.parentNode.remove();
    })
    }
    ob = null
  }
  
 //수정완료 버튼생성
  var div = document.createElement("div")
    div.id = "div_append_save"
    div_append_save.className = "div_appendd"
    div_body.appendChild(div)
    div.appendChild(div_append_save)
    document.querySelector(".div_appendd").addEventListener("click",append_text)
  var input = document.createElement("input")
    input.type = "button"
    input.className = "complete_button"
    div.appendChild(input)
    input.addEventListener("click",function(){
      save(date)
    })
  }

  function save_after(date){
    li_body = document.querySelectorAll("li")
    for(var i = 0 ; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i]);
    }
    read(date)
    init();
  }
//ddd
  function real_save(date){
    localStorage.setItem("date",JSON.stringify(obj_list))
    save_after(date)
    document.querySelector("#div_append_save").remove()
  }

  function save(date){
    var r = new Array();
      obj_input = document.querySelectorAll(".todo");
      var le = obj_input.length;
      for(var i = 0; i < le ; i++){
        r.push(obj_input[i].value)
      }
    var num = null;
    for(var i = 0; i<obj_list.length; i++){
      if(obj_list[i].date == date){
          num = i ;
      }
    }
    if(num !== null){
      obj_list[num].contents = r
    }else{
      obj = {"date"     : date,
            "contents"  : r
            }
      obj_list.push(obj)
          }
      real_save(date)
  }
  
  function read(date){ //localstorage 내용 가져와서 팝업에 띄워주기 
   
    var a = JSON.parse(localStorage.getItem("date")); //parse해서 localstorage 데이터 get해오기
    var c;
    dav = true;
    if(a !== null){
    for(var i = 0 ; i < a.length ; i++){
      if(a[i].date == date){
        dav = false;
        for(var b = 0 ; b < a[i].contents.length ; b++){
            li_body = document.createElement("li")
            li_body.className = "read_li"
            li_body.innerHTML = a[i].contents[b]
            ul_body.appendChild(li_body);
            c = i
          }
        }
      }
    }
    
    // 수정,추가 버튼
    var input = document.createElement("input")
    var div = document.createElement("div")
    div.className = "modify"
    input.type = "button"
    input.className = "modify_button"
    div_body.appendChild(div)
    div.appendChild(input)
    var input_modify = document.querySelector(".modify")
    input_modify.addEventListener("click",function(){
      if(dav == true){ //data값에 해당 날짜 값이 들어있지 않으면 파라미터 전달x
        modify_text(null,date)
      }else if(dav == false){ //data값에 해당 날짜 값이 들어있으면 파라미터 전달
      modify_text(a[c],date)
    }
    div.remove()
    })
  }

  function no_pop_up(data,op_wrap){//팝업 close 함수
    if(document.querySelector(".modify") !== null){
      document.querySelector(".modify").remove()
    }
    if(document.querySelector("#div_append_save") !== null){
      document.querySelector("#div_append_save").remove() //팝업안에 button 없애기
    }
    li_body = document.querySelectorAll("li")
    for(var i = 0; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i])
    }
      popup.id = "no-popup" //팝업삭제
      op_wrap.remove();
      var divv = document.querySelectorAll("div")
      for(var i = 1 ; i <data.length ; i++){
        if(divv[i].attributes.for == data){
          divv[i].parentNode.removeChild(divv[i])
        } 
      }
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
    popup.appendChild(div_body); 
    div_data.className = "data";
    div_data.innerHTML = e
    div_data.attributes.for = e
    div_body.appendChild(div_data);
    var div_head = document.querySelector(".head");
    div_head.appendChild(div_data)
    div_body.appendChild(ul_body);
    read(e,ul_body)
    
    div_save.addEventListener("click",function(){
      save(e);
    })
    op_wrap.addEventListener("click",function(){
      no_pop_up(e, op_wrap)
    })
  }

  function init(){

    // 스토리지 정보 조회 후 파싱
    selectLocalstorage();
  }
 
  function selectLocalstorage(){
    var storageList = JSON.parse(localStorage.getItem("date"));
    daysList = document.querySelectorAll(".fc-daygrid-day");
    
    for(var dayIdx = 0 ; dayIdx < daysList.length ; dayIdx++){
      if(storageList !== null){
        obj_list = storageList;

        for(var storageIdx = 0 ; storageIdx < storageList.length ; storageIdx++){
          if(daysList[dayIdx].dataset.date == storageList[storageIdx].date ){
            daysList[dayIdx].style.background ="red";
          }
        }
      }

      daysList[dayIdx].addEventListener("click",pop_up)
    }
  }