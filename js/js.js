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
       
  var selectday,
      obj_list = [],
      obj ,
      li_body         = document.createElement("li"),
      div_body        = document.createElement("div"),
      div_data        = document.createElement("div"),
      div_append_save = document.createElement("div"),
      div_append      = document.createElement("img"),
      div_save        = document.createElement("img"),
      ul_body         = document.createElement("ul");
      div_append.className = "div_append";
  let fcc;

  function append_text(){ //수정폼에서 할 일 추가 함수
    var input = document.createElement("input");
    li_body   = document.createElement("li");
    var del   = document.createElement("img");
    del.className = "del"
    del.src = "img/x.png"
    input.type = "text"
    input.className = "todo"
    if(ul_body.children.length < 5){
    li_body.appendChild(input);
    li_body.appendChild(del);
    ul_body.appendChild(li_body);
    
    del.addEventListener("click",function(event){//할 일 삭제 
      if(ul_body.children.length < 2){
        alert("1개 이상 내용을 입력해주세요")
      }else{
      event.target.parentNode.remove();
      }
    })
    }
  }
  
  function modify_text(ob,date){//캘린더 내용 수정, 추가하기 
    if(ob == null){
      append_text();
    }else{//이미 data에 값이 들어 있으면 값을 수정 할 수 있게 input text로 바뀜
      li_body = document.querySelectorAll("li")
      for(var i = 0; i < li_body.length ; i++){
        ul_body.removeChild(li_body[i])
      }
      for(var i = 0 ; i < ob.contents.length ; i++){
        var input = document.createElement("input");
        li_body   = document.createElement("li");
        var del   = document.createElement("img");
        del.className = "del" //삭제 버튼
        del.src = "img/x.png"
        input.type = "text";
        input.className = "todo"
        input.value = ob.contents[i];
        li_body.appendChild(input);
        li_body.appendChild(del);
        ul_body.appendChild(li_body);
        del.addEventListener("click",function(event){
          if(ul_body.children.length < 2){
            alert("1개 이상 내용을 입력해주세요")
          }else{
            event.target.parentNode.remove();
          }
        })
    }
    ob = null
    }
  
 //수정완료 버튼생성
    var div = document.createElement("div")
    var input = document.createElement("input")
    div.id = "div_append_save"
    div_append_save.className = "div_appendd"
    div_body.appendChild(div)
    div.appendChild(div_append_save)
    document.querySelector(".div_appendd").addEventListener("click",append_text)
    input.type = "button"
    input.className = "complete_button"
    div.appendChild(input)
    input.addEventListener("click",function(){
      save(date)
    })
  }

  function save_after(date){//저장 후 보여지는 데이터
    li_body = document.querySelectorAll("li")
    for(var i = 0 ; i < li_body.length ; i++){
      ul_body.removeChild(li_body[i]);
    }
    read(date)
    init();
  }

  function localstorage_save(date){//Localstorage에 저장
    localStorage.setItem("date",JSON.stringify(obj_list))
    save_after(date)
    document.querySelector("#div_append_save").remove()
  }

  function save(date){
    var r = new Array();
    obj_input = document.querySelectorAll(".todo");
    var le = obj_input.length;
    if(obj_input[0].value == ""){
      alert("1개 이상 내용을 입력해주세요")
    }else{    
      for(var obj_input_idx = 0; obj_input_idx < le ; obj_input_idx++){
        r.push(obj_input[obj_input_idx].value)
      }
      var num = null;
      for(var obj_list_idx = 0; obj_list_idx<obj_list.length; obj_list_idx++){
        if(obj_list[obj_list_idx].date == date){
            num = obj_list_idx ;
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
      localstorage_save(date)//Localstorage에 저장
    }
  }
  
  function read(date){ //localstorage 내용 가져와서 팝업에 띄워주기 
   
    var readdate = JSON.parse(localStorage.getItem("date")); //parse해서 localstorage 데이터 get해오기
    var num;
    selectday = true;
    if(readdate !== null){
    for(var readdate_idx = 0 ; readdate_idx < readdate.length ; readdate_idx++){
      if(readdate[readdate_idx].date == date){
        selectday = false;
        for(var li_idx = 0 ; li_idx < readdate[readdate_idx].contents.length ; li_idx++){
            li_body = document.createElement("li")
            li_body.className = "read_li"
            li_body.innerHTML = readdate[readdate_idx].contents[li_idx]
            ul_body.appendChild(li_body);
            num = readdate_idx
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
      if(selectday == true){ //data값에 해당 날짜 값이 들어있지 않으면 파라미터 전달x
        modify_text(null,date)
      }else if(selectday == false){ //data값에 해당 날짜 값이 들어있으면 파라미터 전달
        modify_text(readdate[num],date)
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
    for(var li_idx = 0; li_idx < li_body.length ; li_idx++){
      ul_body.removeChild(li_body[li_idx])
    }
    popup.id = "no-popup" //팝업삭제
    op_wrap.remove();
    var divv = document.querySelectorAll("div")
    for(var date_idx = 1 ; date_idx < data.length ; date_idx++){
      if(divv[date_idx].attributes.for == data){
        divv[date_idx].parentNode.removeChild(divv[date_idx])
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
    var event_day = event.currentTarget;
    event_day = event_day.dataset.date;
    div_body.id = "body";
    div_body.attributes.for = event_day
    popup.appendChild(div_body); 
    div_data.className = "data";
    div_data.innerHTML = event_day
    div_data.attributes.for = event_day
    div_body.appendChild(div_data);
    var div_head = document.querySelector(".head");
    div_head.appendChild(div_data)
    div_body.appendChild(ul_body);
    read(event_day,ul_body)
    
    div_save.addEventListener("click",function(){
      save(event_day);
    })
    op_wrap.addEventListener("click",function(){
      no_pop_up(event_day, op_wrap)
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
            daysList[dayIdx].style.background ="white";
          }
        }
      }

      daysList[dayIdx].addEventListener("click",pop_up)
    }
  }