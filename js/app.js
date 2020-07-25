// All of elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("text");

//All classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

//today's date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", options)


let dataList;
let id;


//import Data from local storage 
let data = localStorage.getItem("TODO")

if(data){ //Check if data's is empty
    dataList = JSON.parse(data);
    id = data.length; // set the id to the last item number we have in list
    loadList(dataList);

}else{ 
    dataList = [];
    id = 0;
}

function loadList(list){
    list.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });

}

//clear page and local storage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});




//to-do function
function addToDo(toDo, id, done, trash){
    if(trash){ return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : "";
    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>    
                 `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}

document,addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value; // check if input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);
            dataList.push({
                name : toDo,
                id   : id,
                done : false,
                trash: false

            });
            //insert Data to local storage
            localStorage.setItem("TODO", JSON.stringify(dataList));

            id++;

        }
        input.value = "";
    }

});

function completeTasks(item){
    item.classList.toggle(CHECK);
    item.classList.toggle(UNCHECK);
    item.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);

    dataList[item.id].done = dataList[item.id].done ? false : true;

}

function removeTasks(item){
    item.parentNode.parentNode.removeChild(item.parentNode);
    dataList[item.id].trash = true;

}



//event listner's

list.addEventListener("click", function(event){
   const element = event.target;
   const elementJob = element.attributes.job.value;

   if(elementJob == "complete"){
       completeTasks(element);

   }else if(elementJob == "delete"){
       removeTasks(element);
        //insert Data to local storage
        localStorage.setItem("TODO", JSON.stringify(dataList));

   }


});


